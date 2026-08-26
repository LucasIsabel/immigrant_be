/**
 * Enqueue image jobs for places that predate the image pipeline.
 *
 * The ingestion only dispatches images for places it just created; anything
 * approved before this pipeline existed (or whose image job was abandoned)
 * stays imageless forever, because re-running the city refuses to touch
 * non-draft rows. This walks every place that has a wikidataId and no
 * imageUrl, resolves its P18 claim, and enqueues the same WRITE_PLACE_IMAGE
 * job a fresh ingestion would.
 *
 *   pnpm tsx scripts/backfill-place-images.ts          # report only
 *   pnpm tsx scripts/backfill-place-images.ts --run    # enqueue
 *
 * Needs DATABASE_URL and REDIS_URL, and a running microservice to consume.
 */
import { Queue } from 'bullmq';
import {
  PLACE_INGESTION_QUEUE,
  WRITE_PLACE_IMAGE,
} from '../libs/config/src/constants';
import { PrismaClient } from '../generated/prisma';

const USER_AGENT = 'aloravia/1.0 (https://aloravia.com; contato@aloravia.com)';
const BATCH = 50;

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

async function main() {
  const run = process.argv.includes('--run');
  const prisma = new PrismaClient();

  const places = await prisma.place.findMany({
    where: { wikidataId: { not: null }, imageUrl: null },
    select: {
      id: true,
      name: true,
      city: true,
      wikidataId: true,
      ingestionId: true,
    },
  });
  console.log(`places with a wikidataId and no image: ${places.length}`);
  if (!places.length) return prisma.$disconnect();

  const files = await p18ByQid(places.map((p) => p.wikidataId as string));
  const jobs = places
    .map((place) => ({
      placeId: place.id,
      ingestionId: place.ingestionId ?? 'backfill',
      commonsFile: files.get(place.wikidataId as string),
      name: place.name,
      city: place.city,
    }))
    .filter(
      (job): job is typeof job & { commonsFile: string } => !!job.commonsFile,
    );

  console.log(`with a P18 image on Wikidata: ${jobs.length}`);
  for (const job of jobs) console.log(`  ${job.city} — ${job.name}`);

  if (!run) {
    console.log('\nreport only; pass --run to enqueue');
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
  console.log(`enqueued ${jobs.length} image jobs`);
}

void main();
