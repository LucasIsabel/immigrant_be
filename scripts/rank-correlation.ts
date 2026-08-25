/**
 * Does the popularity signal agree with human judgement?
 *
 * The ingestion ranks places by mean monthly views of their English Wikipedia
 * article. The curated cities were ranked by hand. If the two orders disagree,
 * the whole ranking step is built on the wrong signal — so this measures the
 * agreement instead of assuming it.
 *
 * Wikidata and Wikimedia only: it does not need Overpass, so it can be re-run
 * whenever the curated set changes.
 *
 *   pnpm tsx scripts/rank-correlation.ts Lisbon
 */
import { PrismaClient } from '../generated/prisma';

const USER_AGENT = 'aloravia/1.0 (https://aloravia.com; contato@aloravia.com)';
const PORTUGAL = 'Q45';

/** Twelve months back, as the pageviews API wants it. */
const WINDOW = { from: '2025080100', to: '2026080100' };

interface Row {
  name: string;
  popularityScore: number;
  wikidataId: string | null;
  title: string | null;
  monthlyViews: number | null;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) throw new Error(`HTTP ${response.status} on ${url}`);
  return (await response.json()) as T;
}

/**
 * Resolve a place to its Wikidata entity, verifying it is in the right country.
 *
 * The verification is the whole point: `wbsearchentities` for "Castelo de São
 * Jorge" returns **Elmina Castle, in Ghana** as its first hit. Taking the first
 * result produced a correlation computed partly against a Ghanaian castle.
 */
async function resolveEntity(
  name: string,
  countryQid: string,
  cityQid: string,
): Promise<{ id: string; title: string | null } | null> {
  const search = await fetchJson<{ search: { id: string }[] }>(
    'https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json' +
      `&language=pt&uselang=pt&limit=8&search=${encodeURIComponent(name)}`,
  );

  for (const hit of search.search) {
    const data = await fetchJson<{
      entities: Record<
        string,
        {
          claims?: Record<
            string,
            { mainsnak?: { datavalue?: { value?: { id?: string } } } }[]
          >;
          sitelinks?: { enwiki?: { title?: string } };
        }
      >;
    }>(
      'https://www.wikidata.org/w/api.php?action=wbgetentities' +
        `&props=claims|sitelinks&format=json&ids=${hit.id}`,
    );

    const entity = data.entities[hit.id];
    const idsOf = (property: string) =>
      (entity.claims?.[property] ?? [])
        .map((claim) => claim.mainsnak?.datavalue?.value?.id)
        .filter(Boolean);

    const country = idsOf('P17');
    const admin = idsOf('P131');
    if (country.includes(countryQid) || admin.includes(cityQid)) {
      return { id: hit.id, title: entity.sitelinks?.enwiki?.title ?? null };
    }
  }

  return null;
}

async function monthlyViews(title: string): Promise<number | null> {
  const article = encodeURIComponent(title.replace(/ /g, '_'));
  try {
    const data = await fetchJson<{ items?: { views: number }[] }>(
      'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/' +
        `en.wikipedia/all-access/user/${article}/monthly/${WINDOW.from}/${WINDOW.to}`,
    );
    const items = data.items ?? [];
    if (!items.length) return null;
    return Math.round(
      items.reduce((sum, item) => sum + item.views, 0) / items.length,
    );
  } catch {
    return null;
  }
}

/** Spearman's rank correlation. No ties expected: scores and views are distinct. */
function spearman(a: number[], b: number[]): number {
  const n = a.length;
  const rank = (values: number[]) => {
    const order = [...values.keys()].sort((x, y) => values[y] - values[x]);
    const ranks = new Array<number>(n);
    order.forEach((index, position) => {
      ranks[index] = position + 1;
    });
    return ranks;
  };
  const [ra, rb] = [rank(a), rank(b)];
  const squaredDiff = ra.reduce(
    (sum, value, i) => sum + (value - rb[i]) ** 2,
    0,
  );
  return 1 - (6 * squaredDiff) / (n * (n * n - 1));
}

async function main() {
  const city = process.argv[2] ?? 'Lisbon';
  const countryQid = process.argv[3] ?? PORTUGAL;
  const cityQid = process.argv[4] ?? 'Q597';

  const prisma = new PrismaClient();
  const curated = await prisma.place.findMany({
    where: { city, reviewStatus: 'APPROVED' },
    select: { name: true, popularityScore: true },
    orderBy: { popularityScore: 'desc' },
  });
  await prisma.$disconnect();

  const rows: Row[] = [];
  for (const place of curated) {
    const entity = await resolveEntity(place.name, countryQid, cityQid);
    const title = entity?.title ?? null;
    rows.push({
      name: place.name,
      popularityScore: place.popularityScore,
      wikidataId: entity?.id ?? null,
      title,
      monthlyViews: title ? await monthlyViews(title) : null,
    });
  }

  console.table(rows);

  const usable = rows.filter((row) => row.monthlyViews !== null);
  console.log(`resolved with views: ${usable.length}/${rows.length}`);

  if (usable.length >= 4) {
    const rho = spearman(
      usable.map((row) => row.popularityScore),
      usable.map((row) => row.monthlyViews as number),
    );
    console.log(`Spearman rho = ${rho.toFixed(3)} (target >= 0.70)`);
  }
}

void main();
