/**
 * Enqueue translations for the categories that predate them.
 *
 * The blog has been running with categories in Portuguese only, so a reader on
 * /en saw a post translated in full under a heading that was not. Creating or
 * renaming a category now asks for its translation, but the ones already there
 * have nobody to ask on their behalf. This walks every category still missing
 * a language and enqueues the same job a fresh one would.
 *
 *   pnpm tsx scripts/backfill-category-translations.ts          # report only
 *   pnpm tsx scripts/backfill-category-translations.ts --run    # enqueue
 *
 * Needs DATABASE_URL and REDIS_URL, and a running microservice to consume.
 *
 * Run it AFTER the deploy: a consumer that predates this change logs the
 * unknown job name and drops it, so the work would vanish silently.
 */
import { Queue } from 'bullmq';
import {
  BLOG_TRANSLATION_QUEUE,
  TRANSLATE_BLOG_CATEGORY,
  translationTargetsFor,
} from '../libs/config/src/constants';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const run = process.argv.includes('--run');

  const categories = await prisma.blogCategory.findMany({
    select: {
      id: true,
      name: true,
      original_locale: true,
      translations: { select: { locale: true } },
    },
    orderBy: { name: 'asc' },
  });

  const pending = categories
    .map((category) => {
      const have = new Set(category.translations.map((t) => t.locale));
      const missing = translationTargetsFor(category.original_locale).filter(
        (locale) => !have.has(locale),
      );
      return { ...category, missing };
    })
    .filter((category) => category.missing.length > 0);

  console.log(`${categories.length} categories, ${pending.length} incomplete`);
  for (const category of pending) {
    console.log(`  ${category.name} — missing ${category.missing.join(', ')}`);
  }

  if (pending.length === 0) return;

  if (!run) {
    console.log('\nReport only. Pass --run to enqueue.');
    return;
  }

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) throw new Error('REDIS_URL is not set');

  const queue = new Queue(BLOG_TRANSLATION_QUEUE, {
    connection: { url: redisUrl },
  });

  await queue.addBulk(
    pending.map((category) => ({
      name: TRANSLATE_BLOG_CATEGORY,
      data: { categoryId: category.id },
    })),
  );

  console.log(`\nEnqueued ${pending.length} jobs.`);
  await queue.close();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
