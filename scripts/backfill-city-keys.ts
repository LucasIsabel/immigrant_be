/**
 * Recompute every stored city and state key with the fold the application
 * uses, and report — or fix — the rows that disagree.
 *
 * The migrations backfilled `city_key` and `state_key` in SQL, with a
 * `translate` map over Latin-1 and Latin Extended-A. `normalizeCity` folds in
 * TypeScript, through NFD, and the two do not agree on everything: letters
 * that decompose outside that range (Vietnamese, the Romanian `ș`/`ț`, pinyin
 * tones), input already in NFD, or a no-break space at the edges. A row whose
 * key the SQL folded differently is a row the public search cannot find, so
 * this walks all five tables that carry a key and compares each with what the
 * application would have written.
 *
 *   pnpm city-keys:backfill          # report only
 *   pnpm city-keys:backfill --run    # write the corrected keys
 *
 * Needs DATABASE_URL. Run it from a checkout: the production image ships
 * neither `scripts/` nor the `apps/` sources this imports the fold from.
 */
import { CityIngestionScope, PrismaClient } from '../generated/prisma';
import { cityIdentity } from '../apps/immigrant_be/src/business/city-key';

interface KeyedRow {
  id: string;
  city: string;
  state: string | null;
  cityKey: string;
  stateKey: string | null;
}

interface Keys {
  cityKey: string;
  stateKey: string | null;
}

interface Table {
  name: string;
  read(): Promise<KeyedRow[]>;
  /** The keys the application writes for this row. */
  expected(row: KeyedRow): Keys;
  write(id: string, keys: Keys): Promise<unknown>;
}

const SELECT = {
  id: true,
  city: true,
  state: true,
  cityKey: true,
  stateKey: true,
} as const;

function tables(prisma: PrismaClient): Table[] {
  return [
    {
      name: 'places',
      read: () => prisma.place.findMany({ select: SELECT }),
      // A place with no state holds the empty key, not null — see
      // `Place.stateKey` for why the unique index needs it.
      expected: (row) => {
        const keys = cityIdentity(row);
        return { cityKey: keys.cityKey, stateKey: keys.stateKey ?? '' };
      },
      write: (id, keys) =>
        prisma.place.update({
          where: { id },
          data: { cityKey: keys.cityKey, stateKey: keys.stateKey ?? '' },
        }),
    },
    {
      name: 'community_events',
      read: () => prisma.communityEvent.findMany({ select: SELECT }),
      expected: (row) => cityIdentity(row),
      write: (id, keys) =>
        prisma.communityEvent.update({ where: { id }, data: keys }),
    },
    {
      name: 'city_ingestions',
      // Only the city ones: since #220 a country sweep has no city, and no key
      // to reconcile. Narrowed rather than cast, so the filter and the type
      // say the same thing.
      read: async () =>
        (
          await prisma.cityIngestion.findMany({
            where: { scope: CityIngestionScope.CITY },
            select: SELECT,
          })
        ).filter((row): row is KeyedRow => row.city !== null),
      expected: (row) => cityIdentity(row),
      write: (id, keys) =>
        prisma.cityIngestion.update({ where: { id }, data: keys }),
    },
    {
      name: 'businesses',
      read: () => prisma.business.findMany({ select: SELECT }),
      expected: (row) => cityIdentity(row),
      write: (id, keys) => prisma.business.update({ where: { id }, data: keys }),
    },
    {
      name: 'itinerary_stops',
      read: () => prisma.itineraryStop.findMany({ select: SELECT }),
      expected: (row) => cityIdentity(row),
      write: (id, keys) =>
        prisma.itineraryStop.update({ where: { id }, data: keys }),
    },
  ];
}

async function main() {
  const run = process.argv.includes('--run');
  const prisma = new PrismaClient();
  let divergent = 0;
  let failed = 0;

  try {
    for (const table of tables(prisma)) {
      const rows = await table.read();
      const wrong = rows
        .map((row) => ({ row, keys: table.expected(row) }))
        .filter(
          ({ row, keys }) =>
            row.cityKey !== keys.cityKey || row.stateKey !== keys.stateKey,
        );

      console.log(
        `${table.name}: ${rows.length} rows, ${wrong.length} with a key the application would not write`,
      );
      for (const { row, keys } of wrong) {
        console.log(
          `  ${row.id} ${JSON.stringify(row.city)}/${JSON.stringify(row.state)}: ` +
            `${JSON.stringify([row.cityKey, row.stateKey])} → ${JSON.stringify([keys.cityKey, keys.stateKey])}`,
        );
      }
      divergent += wrong.length;

      if (!run) continue;
      for (const { row, keys } of wrong) {
        try {
          await table.write(row.id, keys);
        } catch (error) {
          // A place's state key is part of its unique key, so a correction can
          // collide with a row that already holds it. Reported, never forced.
          failed += 1;
          console.error(`  could not correct ${row.id}:`, error);
        }
      }
    }

    if (!run) {
      console.log(`\n${divergent} divergent rows; report only, pass --run to write`);
    } else {
      console.log(
        `\ncorrected ${divergent - failed} of ${divergent} divergent rows`,
      );
    }
  } finally {
    await prisma.$disconnect();
  }

  if (failed) process.exitCode = 1;
}

void main();
