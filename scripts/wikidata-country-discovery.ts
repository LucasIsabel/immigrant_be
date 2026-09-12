/**
 * Sweep one category over one country against the live WDQS, and report.
 *
 * The evidence behind #219: how many places a country has for a category, how
 * many got their city from `P131` and how many from the nearest municipality,
 * and how long the whole thing takes. Nothing in the pipeline calls the sweep
 * yet, so this is how it is exercised end to end.
 *
 *   pnpm places:discover-country
 *   pnpm places:discover-country --country=IT --category=LANDMARK
 *
 * Reports only — there is no `--run` here, unlike the other scripts in this
 * folder, because there is nothing to write: the sweep touches no table.
 *
 * Needs the env the service parses at import (`INGESTION_USER_AGENT` has a
 * default, so a plain checkout is enough).
 */
import { WikidataDiscoveryService } from '../apps/microservice/src/place-ingestion/wikidata-discovery.service';
import { PlaceCategory } from '../generated/prisma';

/** What the issue measured, and what the PR reports back. */
const DEFAULT_RUNS: { country: string; category: PlaceCategory }[] = [
  { country: 'PT', category: 'BEACH' },
  { country: 'BR', category: 'BEACH' },
];

function argOf(name: string): string | undefined {
  return process.argv
    .find((arg) => arg.startsWith(`--${name}=`))
    ?.split('=')[1];
}

function seconds(from: number): string {
  return `${((Date.now() - from) / 1000).toFixed(1)}s`;
}

async function sweep(
  service: WikidataDiscoveryService,
  country: string,
  category: PlaceCategory,
): Promise<void> {
  console.log(`\n=== ${country} · ${category}`);
  const startedAt = Date.now();
  const result = await service.discoverInCountry(country, category);
  const elapsed = seconds(startedAt);

  console.log(
    `${result.rawCount} candidates, ${result.places.length} kept, ` +
      `${result.droppedAsExcluded} vetoed, in ${elapsed}`,
  );
  console.log(
    `cities: ${result.fromP131} by P131, ${result.fromProximity} by proximity, ` +
      `${result.cityNotFound} not found, ${result.cityLookupFailed} unasked`,
  );
  if (result.classesFailed.length) {
    console.log(
      `classes that did not answer: ${result.classesFailed.join(', ')}`,
    );
  }
  if (result.truncated) console.log('WARNING: a class hit the row limit');

  const byProximity = result.places.flatMap((place) =>
    place.city?.source === 'NEAREST_MUNICIPALITY'
      ? [
          {
            name: place.name,
            city: place.city.label,
            km: place.city.distanceKm,
          },
        ]
      : [],
  );
  if (byProximity.length) {
    console.log('\nassigned by proximity:');
    for (const row of byProximity) {
      console.log(`  ${row.name} — ${row.city} — ${row.km.toFixed(1)} km`);
    }
    const distances = byProximity.map((row) => row.km).sort((a, b) => a - b);
    const mean = distances.reduce((sum, km) => sum + km, 0) / distances.length;
    const median = distances[Math.floor(distances.length / 2)];
    console.log(
      `  mean ${mean.toFixed(1)} km · median ${median.toFixed(1)} km · ` +
        `worst ${distances[distances.length - 1].toFixed(1)} km`,
    );
  }

  const withoutCity = result.places.filter((place) => !place.city);
  if (withoutCity.length) {
    console.log('\nleft without a city:');
    for (const place of withoutCity) {
      console.log(
        `  ${place.wikidataId} ${place.name} (${place.lat}, ${place.lng})`,
      );
    }
  }
}

async function main(): Promise<void> {
  const service = new WikidataDiscoveryService();
  const country = argOf('country');
  const category = argOf('category') as PlaceCategory | undefined;
  const runs =
    country || category
      ? [
          {
            country: country ?? 'PT',
            category: category ?? ('BEACH' as PlaceCategory),
          },
        ]
      : DEFAULT_RUNS;

  const startedAt = Date.now();
  for (const run of runs) await sweep(service, run.country, run.category);
  console.log(`\ntotal ${seconds(startedAt)}`);
}

void main();
