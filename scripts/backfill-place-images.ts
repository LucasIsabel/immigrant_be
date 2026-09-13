/**
 * Enqueue image jobs for places that predate the image pipeline, or places
 * still carrying legacy Wikimedia Commons hotlinks.
 *
 * The ingestion only dispatches images for places it just created; anything
 * approved before this pipeline existed (or seeded originally with direct
 * Wikimedia URLs) either stays imageless or suffers from Wikimedia rate-limiting
 * and anti-hotlinking protections.
 *
 * This walks:
 *   1. Places carrying a legacy Wikimedia Commons URL (extracts the commons file
 *      from the URL so the exact curated image is downloaded to R2).
 *   2. Places that have a wikidataId and no imageUrl (resolves its P18 claim).
 *
 * And enqueues the same WRITE_PLACE_IMAGE job a fresh ingestion would.
 *
 *   pnpm tsx scripts/backfill-place-images.ts          # report only
 *   pnpm tsx scripts/backfill-place-images.ts --run    # enqueue to BullMQ
 *   pnpm tsx scripts/backfill-place-images.ts --direct # upload directly to R2 and update DB
 *
 * Needs DATABASE_URL (and REDIS_URL if using --run, or CLOUDFLARE_* if using --direct).
 */
import { Queue } from 'bullmq';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  PLACE_INGESTION_QUEUE,
  WRITE_PLACE_IMAGE,
} from '../libs/config/src/constants';
import { PrismaClient } from '../generated/prisma';

const USER_AGENT = 'aloravia/1.0 (https://aloravia.com; contato@aloravia.com)';
const BATCH = 50;

/** Extract Commons filename from a Wikimedia Commons thumbnail or direct URL. */
export function extractCommonsFileFromUrl(url: string): string | null {
  const thumbMatch = url.match(/\/commons\/thumb\/[^/]+\/[^/]+\/([^/]+)/);
  if (thumbMatch) return decodeURIComponent(thumbMatch[1]);
  const directMatch = url.match(/\/commons\/[^/]+\/[^/]+\/([^/]+)/);
  if (directMatch) return decodeURIComponent(directMatch[1]);
  return null;
}

function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 140);
}

function stripHtml(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return (
    value
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim() || undefined
  );
}

async function p18ByQid(qids: string[]): Promise<Map<string, string>> {
  const found = new Map<string, string>();
  for (let i = 0; i < qids.length; i += BATCH) {
    const ids = qids.slice(i, i + BATCH).join('|');
    const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&props=claims&format=json&ids=${ids}`;
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
    });
    if (!response.ok) throw new Error(`Wikidata answered ${response.status}`);
    const data = (await response.json()) as {
      entities?: Record<
        string,
        {
          claims?: {
            P18?: { mainsnak?: { datavalue?: { value?: string } } }[];
          };
        }
      >;
    };
    for (const [qid, entity] of Object.entries(data.entities ?? {})) {
      const file = entity.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
      if (file) found.set(qid, file);
    }
  }
  return found;
}

interface ImageInfoResult {
  url: string;
  mime: string;
  license: string | null;
  author: string | null;
}

async function fetchCommonsImageInfo(
  commonsFile: string,
): Promise<ImageInfoResult | null> {
  const title = encodeURIComponent(`File:${commonsFile}`);
  const url = `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json&titles=${title}`;
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
  });
  if (!response.ok) return null;
  const data = (await response.json()) as {
    query?: {
      pages?: Record<
        string,
        {
          imageinfo?: {
            thumburl?: string;
            thumbmime?: string;
            extmetadata?: Record<string, { value?: string }>;
          }[];
        }
      >;
    };
  };
  const page = Object.values(data?.query?.pages ?? {})[0];
  const info = page?.imageinfo?.[0];
  if (!info?.thumburl) return null;

  const meta = info.extmetadata ?? {};
  return {
    url: info.thumburl,
    mime: info.thumbmime ?? 'image/jpeg',
    license: stripHtml(meta.LicenseShortName?.value) ?? null,
    author: stripHtml(meta.Artist?.value) ?? null,
  };
}

async function main() {
  const run = process.argv.includes('--run');
  const direct = process.argv.includes('--direct');
  const prisma = new PrismaClient();

  const places = await prisma.place.findMany({
    where: {
      OR: [
        { wikidataId: { not: null }, imageUrl: null },
        { imageUrl: { contains: 'wikimedia.org' } },
      ],
    },
    select: {
      id: true,
      name: true,
      slug: true,
      city: true,
      state: true,
      countryCode: true,
      imageUrl: true,
      wikidataId: true,
      ingestionId: true,
    },
  });

  const legacyHotlinked = places.filter(
    (p) => p.imageUrl && p.imageUrl.includes('wikimedia.org'),
  );
  const imageless = places.filter((p) => !p.imageUrl && p.wikidataId);

  console.log(`Places found: ${places.length}`);
  console.log(`  - with legacy Wikimedia hotlink: ${legacyHotlinked.length}`);
  console.log(`  - imageless with wikidataId: ${imageless.length}`);

  if (!places.length) return prisma.$disconnect();

  const qidsNeedingLookup = imageless.map((p) => p.wikidataId as string);
  const p18Files = qidsNeedingLookup.length
    ? await p18ByQid(qidsNeedingLookup)
    : new Map<string, string>();

  const jobs = places
    .map((place) => {
      let commonsFile: string | null = null;
      if (place.imageUrl && place.imageUrl.includes('wikimedia.org')) {
        commonsFile = extractCommonsFileFromUrl(place.imageUrl);
      } else if (place.wikidataId) {
        commonsFile = p18Files.get(place.wikidataId) ?? null;
      }

      return {
        placeId: place.id,
        place,
        ingestionId: place.ingestionId ?? 'backfill',
        commonsFile,
        name: place.name,
        city: place.city,
        source: place.imageUrl?.includes('wikimedia.org')
          ? 'legacy-url'
          : 'wikidata-p18',
      };
    })
    .filter(
      (job): job is typeof job & { commonsFile: string } => !!job.commonsFile,
    );

  console.log(`\nPlaces with a resolvable Commons file: ${jobs.length}`);
  for (const job of jobs) {
    console.log(
      `  [${job.source}] ${job.city} — ${job.name} (${job.commonsFile})`,
    );
  }

  if (direct) {
    console.log(
      `\nExecuting direct migration to Cloudflare R2 for ${jobs.length} places...`,
    );
    const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
    const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
    const endpoint = process.env.CLOUDFLARE_ENDPOINT;

    if (
      !accessKeyId ||
      !secretAccessKey ||
      !bucket ||
      !publicUrl ||
      !endpoint
    ) {
      console.error(
        'Missing Cloudflare R2 environment variables. Ensure .env is loaded.',
      );
      return prisma.$disconnect();
    }

    const s3 = new S3Client({
      region: 'auto',
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
      forcePathStyle: false,
    });

    let succeeded = 0;
    let failed = 0;

    for (const job of jobs) {
      try {
        console.log(`Processing: ${job.city} — ${job.name}...`);
        const info = await fetchCommonsImageInfo(job.commonsFile);
        if (!info) {
          console.warn(
            `  Could not resolve image info on Commons for ${job.commonsFile}`,
          );
          failed++;
          continue;
        }

        const imgResponse = await fetch(info.url, {
          headers: { 'User-Agent': USER_AGENT },
        });
        if (!imgResponse.ok) {
          console.warn(
            `  Download failed with ${imgResponse.status} from ${info.url}`,
          );
          failed++;
          continue;
        }

        const bytes = Buffer.from(await imgResponse.arrayBuffer());
        const extension = info.mime === 'image/png' ? 'png' : 'jpg';
        const cityPath = job.place.state
          ? `${slugify(job.place.state)}/${slugify(job.place.city)}`
          : slugify(job.place.city);
        const key = `places/${job.place.countryCode.toLowerCase()}/${cityPath}/${job.place.slug}.${extension}`;

        await s3.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: bytes,
            ContentType: info.mime,
          }),
        );

        const r2Url = `${publicUrl}/${key}`;
        await prisma.place.update({
          where: { id: job.placeId },
          data: {
            imageUrl: r2Url,
            imageLicense: info.license,
            imageAuthor: info.author,
          },
        });

        console.log(`  ✓ Uploaded to R2: ${r2Url}`);
        succeeded++;
      } catch (err) {
        console.error(`  ✗ Error processing ${job.name}:`, err);
        failed++;
      }
    }

    console.log(
      `\nDirect migration finished: ${succeeded} succeeded, ${failed} failed.`,
    );
    return prisma.$disconnect();
  }

  if (!run) {
    console.log('\nReport only:');
    console.log(
      '  - Pass --run to enqueue into BullMQ (requires running microservice)',
    );
    console.log('  - Pass --direct to upload directly to R2 and update DB');
    return prisma.$disconnect();
  }

  const queue = new Queue(PLACE_INGESTION_QUEUE, {
    connection: { url: process.env.REDIS_URL ?? 'redis://localhost:6379' },
  });
  await queue.addBulk(
    jobs.map(({ placeId, ingestionId, commonsFile }) => ({
      name: WRITE_PLACE_IMAGE,
      data: { placeId, ingestionId, commonsFile },
    })),
  );
  await queue.close();
  await prisma.$disconnect();
  console.log(
    `\nEnqueued ${jobs.length} image jobs to ${PLACE_INGESTION_QUEUE}`,
  );
}

if (!process.env.JEST_WORKER_ID && process.env.NODE_ENV !== 'test') {
  void main();
}
