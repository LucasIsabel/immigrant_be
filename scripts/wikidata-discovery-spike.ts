/**
 * Spike for #163: can Wikidata alone discover a city's places well enough?
 *
 * For each city: resolve its QID (verified by country, never the first search
 * hit — that is how "Castelo de São Jorge" once became a castle in Ghana),
 * run one SPARQL query, rank by monthly English Wikipedia views, and print
 * the top 15. For Lisbon, also compute the pilot's two metrics against the
 * hand-curated set in the database: rediscovery (target >= 7/10) and
 * Spearman rho (target >= 0.70).
 *
 *   pnpm tsx scripts/wikidata-discovery-spike.ts
 */
import { PrismaClient } from '../generated/prisma';

const USER_AGENT = 'aloravia/1.0 (https://aloravia.com; contato@aloravia.com)';
const WINDOW = { from: '2025080100', to: '2026080100' };

const CITIES = [
  { name: 'Lisbon', country: 'PT', countryQid: 'Q45', curated: true },
  { name: 'Rio de Janeiro', country: 'BR', countryQid: 'Q155', curated: false },
  { name: 'Miami', country: 'US', countryQid: 'Q30', curated: false },
];

/**
 * Wikidata class → our category. Explicit on purpose: filtering with
 * `P31/P279*` inside SPARQL is what timed out on Lisbon (the subclass closure
 * over 26 roots is the expensive part), while the same query without it
 * answers in 2 s. So the query fetches every candidate and this table
 * classifies on our side; a class missing here climbs one P279 hop before
 * being dropped, and the drop count is printed rather than hidden.
 */
/**
 * Classes that never make a guide, even when a parent class would map them.
 * Measured on Lisbon: Estádio da Luz and the airport topped the ranking by
 * pageviews once "architectural structure" was allowed in as a parent.
 */
const EXCLUDED_CLASSES = new Set([
  'Q1248784', // airport
  'Q483110', // stadium
  'Q1154710', // association football venue
  'Q641226', // arena
  'Q1076486', // sports venue
  'Q830528', // velodrome
  'Q55659167', // railway station
  'Q928830', // metro station
  'Q3918', // university
  'Q875538', // public university
  'Q23002037', // public educational institution
  'Q23002054', // private not-for-profit educational institution
  'Q9826', // high school
  'Q1244442', // school building
  'Q13402009', // apartment building
  'Q40357', // prison
  'Q44782', // port
  'Q159719', // power station
  'Q74047', // ghost town
  'Q3947', // house
  'Q41176', // building
  'Q811979', // architectural structure
]);

const CATEGORY_BY_CLASS: Record<string, string> = {
  // MUSEUM
  Q33506: 'MUSEUM',
  Q207694: 'MUSEUM',
  Q1007870: 'MUSEUM',
  Q17431399: 'MUSEUM',
  Q2772772: 'MUSEUM',
  Q1595639: 'MUSEUM',
  Q17102209: 'MUSEUM',
  Q5193377: 'MUSEUM',
  Q16735822: 'MUSEUM',
  Q3145846: 'MUSEUM',
  Q2087181: 'MUSEUM',
  // LANDMARK
  Q23413: 'LANDMARK',
  Q4989906: 'LANDMARK',
  Q12280: 'LANDMARK',
  Q16970: 'LANDMARK',
  Q2977: 'LANDMARK',
  Q570116: 'LANDMARK',
  Q16560: 'LANDMARK',
  Q839954: 'LANDMARK',
  Q174782: 'LANDMARK',
  Q57821: 'LANDMARK',
  Q210272: 'LANDMARK',
  Q1802963: 'LANDMARK',
  Q44613: 'LANDMARK',
  Q160742: 'LANDMARK',
  Q108325: 'LANDMARK',
  Q120560: 'LANDMARK',
  Q1370598: 'LANDMARK',
  Q483453: 'LANDMARK',
  Q37901: 'LANDMARK',
  Q55488: 'LANDMARK',
  Q1348006: 'LANDMARK',
  Q1329623: 'LANDMARK',
  Q24354: 'LANDMARK',
  Q153562: 'LANDMARK',
  Q35112127: 'LANDMARK',
  Q1785071: 'LANDMARK',
  Q17350442: 'LANDMARK',
  Q2065736: 'LANDMARK',
  Q12518: 'LANDMARK',
  Q862571: 'LANDMARK',
  Q1497364: 'LANDMARK',
  Q19860854: 'LANDMARK',
  Q39614: 'LANDMARK',
  Q752574: 'LANDMARK',
  Q11446: 'LANDMARK',
  Q1637706: 'LANDMARK',
  Q1021645: 'LANDMARK',
  Q1030034: 'LANDMARK',
  Q179700: 'LANDMARK',
  Q44539: 'LANDMARK',
  Q11303: 'LANDMARK',
  // NATURE
  Q22698: 'NATURE',
  Q1107656: 'NATURE',
  Q167346: 'NATURE',
  Q46169: 'NATURE',
  Q43501: 'NATURE',
  Q1519587: 'NATURE',
  Q179049: 'NATURE',
  Q4421: 'NATURE',
  Q8502: 'NATURE',
  Q54050: 'NATURE',
  Q23442: 'NATURE',
  Q4022: 'NATURE',
  Q35509: 'NATURE',
  // BEACH
  Q40080: 'BEACH',
  // VIEWPOINT
  Q2416723: 'VIEWPOINT',
  Q6017969: 'VIEWPOINT',
  // FOOD_MARKET
  Q330284: 'FOOD_MARKET',
  Q11315: 'FOOD_MARKET',
  Q132510: 'FOOD_MARKET',
  Q1183543: 'FOOD_MARKET',
  Q3243893: 'FOOD_MARKET',
  // NIGHTLIFE
  Q622425: 'NIGHTLIFE',
  Q187456: 'NIGHTLIFE',
  Q10689397: 'NIGHTLIFE',
  // NEIGHBORHOOD
  Q123705: 'NEIGHBORHOOD',
  Q5107: 'NEIGHBORHOOD',
  Q4286337: 'NEIGHBORHOOD',
  Q16626036: 'NEIGHBORHOOD',
  Q17272482: 'NEIGHBORHOOD',
  Q15243209: 'NEIGHBORHOOD',
  Q188509: 'NEIGHBORHOOD',
  Q20683285: 'NEIGHBORHOOD',
};

/**
 * Both WDQS and the Wikidata API are free services under load: a 502/503
 * every so often is normal, not a verdict. Three attempts with a growing
 * pause; anything else (4xx, timeout page) fails immediately.
 */
async function fetchJson<T>(
  url: string,
  accept = 'application/json',
): Promise<T> {
  let lastError: Error | null = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await fetchJsonOnce<T>(url, accept);
    } catch (error) {
      lastError = error as Error;
      if (!/^HTTP 5\d\d/.test(lastError.message)) throw lastError;
      await new Promise((r) => setTimeout(r, attempt * 5000));
    }
  }
  throw lastError as Error;
}

async function fetchJsonOnce<T>(url: string, accept: string): Promise<T> {
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, Accept: accept },
  });
  const text = await response.text();
  // A timeout can arrive as HTTP 200 with the error page spliced into the
  // partially streamed JSON. Detect it by content, not by status.
  if (text.includes('SPARQL-QUERY: queryStr=')) {
    throw new Error('WDQS timed out mid-stream (query too expensive)');
  }
  if (!response.ok) {
    // WDQS answers a timeout with HTTP 500 and a text page whose first line
    // says why; surfacing it beats a JSON parse error at position 49136.
    throw new Error(
      `HTTP ${response.status}: ${text.split('\n')[0].slice(0, 160)}`,
    );
  }
  return JSON.parse(text) as T;
}

type Entity = {
  claims?: Record<
    string,
    { mainsnak?: { datavalue?: { value?: { id?: string } } } }[]
  >;
  labels?: Record<string, { value: string }>;
  sitelinks?: Record<string, unknown>;
};

/**
 * The city's QID, verified — never the first search hit.
 *
 * Not verified by P31 class: Lisbon is an instance of a Portugal-specific
 * class, and across 62 countries a class allowlist never closes. What every
 * city has instead: the right country (P17), the exact English label, and a
 * coordinate (P625). Ties break on sitelink count — a real city has dozens,
 * a namesake village a handful.
 */
async function resolveCity(name: string, countryQid: string): Promise<string> {
  const search = await fetchJson<{ search: { id: string }[] }>(
    'https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json' +
      `&language=en&limit=10&search=${encodeURIComponent(name)}`,
  );
  const ids = search.search.map((h) => h.id);
  const data = await fetchJson<{ entities: Record<string, Entity> }>(
    'https://www.wikidata.org/w/api.php?action=wbgetentities' +
      `&props=claims|labels|sitelinks&format=json&ids=${ids.join('|')}`,
  );

  const scored = ids
    .map((id) => {
      const entity = data.entities[id];
      const claims = entity.claims ?? {};
      const claimIds = (p: string) =>
        (claims[p] ?? [])
          .map((c) => c.mainsnak?.datavalue?.value?.id)
          .filter(Boolean);
      const inCountry = claimIds('P17').includes(countryQid);
      const hasCoordinate = (claims.P625 ?? []).length > 0;
      const exactLabel =
        entity.labels?.en?.value?.toLowerCase() === name.toLowerCase();
      const sitelinks = Object.keys(entity.sitelinks ?? {}).length;
      return { id, ok: inCountry && hasCoordinate && exactLabel, sitelinks };
    })
    .filter((c) => c.ok)
    .sort((a, b) => b.sitelinks - a.sitelinks);

  if (!scored.length)
    throw new Error(`Could not resolve ${name} in ${countryQid}`);
  return scored[0].id;
}

type Candidate = {
  qid: string;
  label: string;
  title: string;
  lat: number;
  lng: number;
  category: string;
};

/** Every place in the city with a coordinate and an English article. */
async function discover(
  cityQid: string,
): Promise<{ raw: Candidate[]; seconds: number }> {
  const sparql = `
SELECT DISTINCT ?item ?itemLabel ?coord ?article WHERE {
  { ?item wdt:P131 wd:${cityQid} . }
  UNION
  { ?item wdt:P131/wdt:P131 wd:${cityQid} . }
  ?item wdt:P625 ?coord .
  ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
} LIMIT 2000`;

  const started = Date.now();
  const data = await fetchJson<{
    results: { bindings: Record<string, { value: string }>[] };
  }>(
    'https://query.wikidata.org/sparql?format=json&query=' +
      encodeURIComponent(sparql),
    'application/sparql-results+json',
  );
  const seconds = (Date.now() - started) / 1000;

  const raw = data.results.bindings.map((b) => {
    const match = /Point\(([-\d.]+) ([-\d.]+)\)/.exec(b.coord.value);
    return {
      qid: b.item.value.split('/').pop() as string,
      label: b.itemLabel.value,
      title: decodeURIComponent(b.article.value.split('/wiki/')[1]).replace(
        /_/g,
        ' ',
      ),
      lng: Number(match?.[1]),
      lat: Number(match?.[2]),
      category: '',
    };
  });
  // Two coordinates on one item come back as two rows; the item is one place.
  const seen = new Set<string>();
  return {
    raw: raw.filter((c) => !seen.has(c.qid) && seen.add(c.qid)),
    seconds,
  };
}

type ClaimsEntity = {
  claims?: Record<
    string,
    { mainsnak?: { datavalue?: { value?: { id?: string } } } }[]
  >;
};

async function claimIdsFor(
  qids: string[],
  property: string,
): Promise<Map<string, string[]>> {
  const out = new Map<string, string[]>();
  for (let i = 0; i < qids.length; i += 50) {
    const batch = qids.slice(i, i + 50);
    const data = await fetchJson<{ entities: Record<string, ClaimsEntity> }>(
      'https://www.wikidata.org/w/api.php?action=wbgetentities&props=claims' +
        `&format=json&ids=${batch.join('|')}`,
    );
    for (const [qid, entity] of Object.entries(data.entities)) {
      out.set(
        qid,
        (entity.claims?.[property] ?? [])
          .map((c) => c.mainsnak?.datavalue?.value?.id)
          .filter((v): v is string => !!v),
      );
    }
  }
  return out;
}

/**
 * Classify on our side: P31 of each item; for classes the table does not
 * know, one P279 hop up (unique classes are few, so this is cheap). Items
 * still unmapped are dropped — and counted.
 */
async function classify(
  raw: Candidate[],
): Promise<{ kept: Candidate[]; dropped: number; unknownClasses: string[] }> {
  const p31 = await claimIdsFor(
    raw.map((c) => c.qid),
    'P31',
  );
  const unknown = new Set<string>();
  for (const classes of p31.values()) {
    for (const cls of classes) if (!CATEGORY_BY_CLASS[cls]) unknown.add(cls);
  }
  const parents = await claimIdsFor([...unknown], 'P279');

  const categoryOf = (classes: string[]): string | null => {
    if (classes.some((cls) => EXCLUDED_CLASSES.has(cls))) return null;
    for (const cls of classes)
      if (CATEGORY_BY_CLASS[cls]) return CATEGORY_BY_CLASS[cls];
    for (const cls of classes) {
      for (const parent of parents.get(cls) ?? [])
        if (CATEGORY_BY_CLASS[parent]) return CATEGORY_BY_CLASS[parent];
    }
    return null;
  };

  const kept: Candidate[] = [];
  let dropped = 0;
  const stillUnknown = new Set<string>();
  for (const c of raw) {
    const classes = p31.get(c.qid) ?? [];
    const category = categoryOf(classes);
    if (category) kept.push({ ...c, category });
    else {
      dropped += 1;
      for (const cls of classes) stillUnknown.add(cls);
    }
  }
  return { kept, dropped, unknownClasses: [...stillUnknown].slice(0, 12) };
}

async function monthlyViews(title: string): Promise<number | null> {
  const article = encodeURIComponent(title.replace(/ /g, '_'));
  try {
    const data = await fetchJson<{ items?: { views: number }[] }>(
      'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/' +
        `en.wikipedia/all-access/user/${article}/monthly/${WINDOW.from}/${WINDOW.to}`,
    );
    const items = data.items ?? [];
    return items.length
      ? Math.round(items.reduce((s, i) => s + i.views, 0) / items.length)
      : null;
  } catch {
    return null;
  }
}

/** A curated place's QID, verified by country — the first hit is a guess. */
async function resolveCurated(
  name: string,
  countryQid: string,
): Promise<string | null> {
  const search = await fetchJson<{ search: { id: string }[] }>(
    'https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json' +
      `&language=pt&uselang=pt&limit=8&search=${encodeURIComponent(name)}`,
  );
  const ids = search.search.map((h) => h.id);
  if (!ids.length) return null;
  const p17 = await claimIdsFor(ids, 'P17');
  const p131 = await claimIdsFor(ids, 'P131');
  for (const id of ids) {
    if ((p17.get(id) ?? []).includes(countryQid)) return id;
    if ((p131.get(id) ?? []).length && (p17.get(id) ?? []).length === 0)
      continue;
  }
  return null;
}

function spearman(a: number[], b: number[]): number {
  const n = a.length;
  const rank = (v: number[]) => {
    const order = [...v.keys()].sort((x, y) => v[y] - v[x]);
    const r = new Array<number>(n);
    order.forEach((i, pos) => {
      r[i] = pos + 1;
    });
    return r;
  };
  const [ra, rb] = [rank(a), rank(b)];
  const d2 = ra.reduce((s, v, i) => s + (v - rb[i]) ** 2, 0);
  return 1 - (6 * d2) / (n * (n * n - 1));
}

async function main() {
  const prisma = new PrismaClient();

  const only = process.argv.find((a) => a.startsWith('--city='))?.slice(7);
  for (const city of CITIES.filter((c) => !only || c.name === only)) {
    console.log(`\n════ ${city.name} (${city.country}) ════`);
    const qid = await resolveCity(city.name, city.countryQid);
    console.log(`city QID: ${qid}`);

    const { raw, seconds } = await discover(qid);
    console.log(`SPARQL: ${raw.length} candidates in ${seconds.toFixed(1)}s`);
    const { kept: rows, dropped, unknownClasses } = await classify(raw);
    console.log(
      `classified: ${rows.length} kept, ${dropped} dropped as unmapped (sample of unknown classes: ${unknownClasses.join(', ')})`,
    );

    const ranked: (Candidate & { views: number })[] = [];
    for (const row of rows) {
      const views = await monthlyViews(row.title);
      if (views !== null) ranked.push({ ...row, views });
      await new Promise((r) => setTimeout(r, 80));
    }
    ranked.sort((a, b) => b.views - a.views);
    console.log(`with pageviews: ${ranked.length}`);
    console.log('top 15 by monthly views:');
    for (const r of ranked.slice(0, 15))
      console.log(
        `  ${String(r.views).padStart(7)}  ${r.label}  [${r.category}]`,
      );

    if (city.curated) {
      const curated = await prisma.place.findMany({
        where: { city: city.name, reviewStatus: 'APPROVED', wikidataId: null },
        select: { name: true, popularityScore: true },
        orderBy: { popularityScore: 'desc' },
      });
      // Match by QID, never by name: the curated names are Portuguese and the
      // discovered labels English. The first version of this spike compared
      // strings and marked Belém Tower as missing while it sat at #3.
      const byQid = new Map(
        ranked.map((r, index) => [r.qid, { ...r, rank: index + 1 }]),
      );
      const found: {
        name: string;
        score: number;
        hit: number | null;
        rank: number | null;
      }[] = [];
      for (const c of curated) {
        const qid = await resolveCurated(c.name, city.countryQid);
        const hit = qid ? byQid.get(qid) : undefined;
        found.push({
          name: c.name,
          score: c.popularityScore,
          hit: hit ? hit.views : null,
          rank: hit ? hit.rank : null,
        });
      }
      const inTop30 = found.filter(
        (f) => f.rank !== null && f.rank <= 30,
      ).length;
      console.log(
        `\nrediscovery of the curated set: ${found.filter((f) => f.hit).length}/${curated.length} found, ${inTop30}/${curated.length} in the top 30  [target >= 7/10]`,
      );
      for (const f of found)
        console.log(
          `  ${f.hit ? '✓' : '✗'} ${f.name}${f.hit ? ` (#${f.rank}, ${f.hit} views)` : ''}`,
        );
      const paired = found.filter((f) => f.hit !== null) as {
        score: number;
        hit: number;
      }[];
      if (paired.length >= 4) {
        console.log(
          `Spearman rho on the ${paired.length} rediscovered: ${spearman(
            paired.map((p) => p.score),
            paired.map((p) => p.hit),
          ).toFixed(3)}  [target >= 0.70]`,
        );
      }
    }
  }
  await prisma.$disconnect();
}

void main();
