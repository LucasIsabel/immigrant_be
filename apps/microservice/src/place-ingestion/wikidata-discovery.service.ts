import { Injectable, Logger } from '@nestjs/common';
import { env } from '@app/config/env';
import { PlaceCategory } from '../../../../generated/prisma';

/** A place as Wikidata knows it — the raw material the ranking works on. */
export interface DiscoveredPlace {
  wikidataId: string;
  name: string;
  /** English Wikipedia article title; the pageview key. */
  articleTitle: string;
  lat: number;
  lng: number;
  category: PlaceCategory;
  address?: string;
  website?: string;
}

export interface ResolvedCity {
  wikidataId: string;
  label: string;
}

/** The city is not on Wikidata under that name in that country. Not retryable. */
export class CityNotResolvedError extends Error {
  constructor(
    readonly countryCode: string,
    readonly city: string,
  ) {
    super(`No Wikidata entity for ${city} (${countryCode})`);
    this.name = 'CityNotResolvedError';
  }
}

/** WDQS or the Wikidata API refused or timed out. Retryable. */
export class WikidataUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WikidataUnavailableError';
  }
}

const WIKIDATA_API = 'https://www.wikidata.org/w/api.php';
const WDQS = 'https://query.wikidata.org/sparql';
const BATCH = 50;

/** ISO2 → country entity, so a city's QID is verified before it is used. */
const COUNTRY_QID: Record<string, string> = {
  AR: 'Q414',
  AU: 'Q408',
  AT: 'Q40',
  BE: 'Q31',
  BR: 'Q155',
  CA: 'Q16',
  CL: 'Q298',
  CN: 'Q148',
  CO: 'Q739',
  CR: 'Q800',
  HR: 'Q224',
  CY: 'Q229',
  CZ: 'Q213',
  DK: 'Q35',
  DO: 'Q786',
  EC: 'Q736',
  EG: 'Q79',
  EE: 'Q191',
  FI: 'Q33',
  FR: 'Q142',
  DE: 'Q183',
  GR: 'Q41',
  HK: 'Q8646',
  HU: 'Q28',
  IS: 'Q189',
  IN: 'Q668',
  ID: 'Q252',
  IE: 'Q27',
  IL: 'Q801',
  IT: 'Q38',
  JP: 'Q17',
  LU: 'Q32',
  MY: 'Q833',
  MT: 'Q233',
  MX: 'Q96',
  MA: 'Q1028',
  NL: 'Q55',
  NZ: 'Q664',
  NO: 'Q20',
  PA: 'Q804',
  PY: 'Q733',
  PE: 'Q419',
  PH: 'Q928',
  PL: 'Q36',
  PT: 'Q45',
  QA: 'Q846',
  RO: 'Q218',
  SA: 'Q851',
  SG: 'Q334',
  ZA: 'Q258',
  KR: 'Q884',
  ES: 'Q29',
  SE: 'Q34',
  CH: 'Q39',
  TW: 'Q865',
  TH: 'Q869',
  TR: 'Q43',
  AE: 'Q878',
  GB: 'Q145',
  US: 'Q30',
  UY: 'Q77',
  VN: 'Q881',
};

/**
 * Classes that never make a guide, even when a parent class would map them.
 *
 * Measured: with "architectural structure" allowed as a parent, Lisbon's
 * ranking opened with Estádio da Luz and the airport; Miami's carried a
 * federal detention centre. Each entry here was seen leaking, not imagined.
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

/**
 * Wikidata class → our category.
 *
 * Explicit on purpose. Filtering with `P31/P279*` inside SPARQL is what timed
 * out on Lisbon — the subclass closure is the expensive part — while the same
 * query without it answers in under a second. So the query fetches every
 * candidate and this table classifies on our side; a class missing here
 * climbs one P279 hop before being dropped, and the drop is counted.
 */
const CATEGORY_BY_CLASS: Record<string, PlaceCategory> = {
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

type Snak = { mainsnak?: { datavalue?: { value?: unknown } } };
type Entity = {
  claims?: Record<string, Snak[]>;
  labels?: Record<string, { value: string }>;
  sitelinks?: Record<string, unknown>;
};

/**
 * Finds a city's places on Wikidata — the source that already decides the
 * ranking (English article, pageviews, P18 image), with no rate wall.
 *
 * Overpass used to supply the raw candidate list. It was the one component
 * that blocked the pilot, and its extract for our 62 destination countries
 * would have been the whole planet. Going to the source removed the
 * bottleneck instead of scaling it — and moved the places' licence from
 * ODbL to CC0.
 */
@Injectable()
export class WikidataDiscoveryService {
  private readonly logger = new Logger(WikidataDiscoveryService.name);

  /**
   * The city's entity, verified — never the first search hit.
   *
   * Not verified by P31 class: Lisbon is an instance of a Portugal-only class,
   * and across 62 countries a class allowlist never closes. What every city
   * has instead: the right country (P17), the exact English label, and a
   * coordinate (P625). Ties break on sitelink count — a real city has dozens,
   * a namesake village a handful.
   */
  async resolveCity(countryCode: string, city: string): Promise<ResolvedCity> {
    const countryQid = COUNTRY_QID[countryCode.toUpperCase()];
    if (!countryQid) throw new CityNotResolvedError(countryCode, city);

    const search = await this.fetchJson<{ search: { id: string }[] }>(
      `${WIKIDATA_API}?action=wbsearchentities&format=json&language=en&limit=10` +
        `&search=${encodeURIComponent(city)}`,
    );
    const ids = search.search.map((hit) => hit.id);
    if (!ids.length) throw new CityNotResolvedError(countryCode, city);

    const entities = await this.entities(ids, 'claims|labels|sitelinks');
    const wanted = city.toLowerCase();

    const candidates = ids
      .map((id) => {
        const entity = entities[id];
        const inCountry = claimIds(entity, 'P17').includes(countryQid);
        const hasCoordinate = (entity.claims?.P625 ?? []).length > 0;
        const label = entity.labels?.en?.value ?? '';
        const exactLabel = label.toLowerCase() === wanted;
        return {
          id,
          label,
          ok: inCountry && hasCoordinate && exactLabel,
          sitelinks: Object.keys(entity.sitelinks ?? {}).length,
        };
      })
      .filter((candidate) => candidate.ok)
      .sort((a, b) => b.sitelinks - a.sitelinks);

    if (!candidates.length) throw new CityNotResolvedError(countryCode, city);
    return { wikidataId: candidates[0].id, label: candidates[0].label };
  }

  /**
   * Every candidate in the city, classified.
   *
   * Bounded P131 hops, not the transitive `P131+`: a parish sits one hop
   * below the city, a neighbourhood two. Unbounded `P131+` took 44 s on
   * Porto and timed out on Lisbon.
   */
  async discover(cityQid: string): Promise<{
    places: DiscoveredPlace[];
    rawCount: number;
    droppedAsUnmapped: number;
  }> {
    const sparql = `
SELECT DISTINCT ?item ?itemLabel ?coord ?article WHERE {
  { ?item wdt:P131 wd:${cityQid} . }
  UNION
  { ?item wdt:P131/wdt:P131 wd:${cityQid} . }
  ?item wdt:P625 ?coord .
  ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
} LIMIT 2000`;

    const data = await this.fetchJson<{
      results: { bindings: Record<string, { value: string }>[] };
    }>(
      `${WDQS}?format=json&query=${encodeURIComponent(sparql)}`,
      'application/sparql-results+json',
    );

    // Two coordinates on one item come back as two rows; the item is one place.
    const raw = new Map<
      string,
      { name: string; articleTitle: string; lat: number; lng: number }
    >();
    for (const row of data.results.bindings) {
      const qid = row.item.value.split('/').pop() as string;
      if (raw.has(qid)) continue;
      const point = /Point\(([-\d.]+) ([-\d.]+)\)/.exec(row.coord.value);
      if (!point) continue;
      raw.set(qid, {
        name: row.itemLabel.value,
        articleTitle: decodeURIComponent(
          row.article.value.split('/wiki/')[1] ?? '',
        ).replace(/_/g, ' '),
        lng: Number(point[1]),
        lat: Number(point[2]),
      });
    }

    const qids = [...raw.keys()];
    const entities = await this.entities(qids, 'claims');

    // One P279 hop for the classes the table does not know. Unique classes
    // are few compared with items, so this is a handful of requests.
    const unknown = new Set<string>();
    for (const qid of qids) {
      for (const cls of claimIds(entities[qid], 'P31')) {
        if (!CATEGORY_BY_CLASS[cls] && !EXCLUDED_CLASSES.has(cls))
          unknown.add(cls);
      }
    }
    const parents = unknown.size
      ? await this.entities([...unknown], 'claims')
      : {};

    const places: DiscoveredPlace[] = [];
    let droppedAsUnmapped = 0;
    for (const qid of qids) {
      const entity = entities[qid];
      const category = categoryOf(claimIds(entity, 'P31'), parents);
      if (!category) {
        droppedAsUnmapped += 1;
        continue;
      }
      const base = raw.get(qid) as NonNullable<ReturnType<typeof raw.get>>;
      places.push({
        wikidataId: qid,
        name: base.name,
        articleTitle: base.articleTitle,
        lat: base.lat,
        lng: base.lng,
        category,
        website: claimString(entity, 'P856'),
        address: claimMonolingual(entity, 'P6375'),
      });
    }

    this.logger.log(
      `Wikidata discovery for ${cityQid}: ${raw.size} candidates, ${places.length} classified, ${droppedAsUnmapped} dropped as unmapped`,
    );
    return { places, rawCount: raw.size, droppedAsUnmapped };
  }

  private async entities(
    ids: string[],
    props: string,
  ): Promise<Record<string, Entity>> {
    const out: Record<string, Entity> = {};
    for (let i = 0; i < ids.length; i += BATCH) {
      const batch = ids.slice(i, i + BATCH);
      const data = await this.fetchJson<{ entities?: Record<string, Entity> }>(
        `${WIKIDATA_API}?action=wbgetentities&props=${props}&format=json&ids=${batch.join('|')}`,
      );
      Object.assign(out, data.entities ?? {});
    }
    return out;
  }

  /**
   * Both WDQS and the Wikidata API are free services under load: a 502 every
   * so often is normal, not a verdict. Three attempts with a growing pause;
   * a WDQS timeout arrives as HTTP 200 with the error page spliced into the
   * partially streamed JSON, so it is detected by content, not status.
   */
  private async fetchJson<T>(
    url: string,
    accept = 'application/json',
  ): Promise<T> {
    let lastError: Error = new Error('unreachable');
    for (let attempt = 1; attempt <= 3; attempt++) {
      let response: Response;
      try {
        response = await fetch(url, {
          headers: { 'User-Agent': env.INGESTION_USER_AGENT, Accept: accept },
        });
      } catch (error) {
        lastError = new WikidataUnavailableError(String(error));
        await this.wait(attempt * 5_000);
        continue;
      }
      const text = await response.text();
      if (text.includes('SPARQL-QUERY: queryStr=')) {
        throw new WikidataUnavailableError(
          'WDQS timed out (query too expensive)',
        );
      }
      if (response.status >= 500) {
        lastError = new WikidataUnavailableError(
          `Wikidata answered ${response.status}`,
        );
        await this.wait(attempt * 5_000);
        continue;
      }
      if (!response.ok) {
        throw new WikidataUnavailableError(
          `Wikidata answered ${response.status}`,
        );
      }
      return JSON.parse(text) as T;
    }
    throw lastError;
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

function claimIds(entity: Entity | undefined, property: string): string[] {
  return (entity?.claims?.[property] ?? [])
    .map(
      (snak) =>
        (snak.mainsnak?.datavalue?.value as { id?: string } | undefined)?.id,
    )
    .filter((id): id is string => !!id);
}

function claimString(entity: Entity, property: string): string | undefined {
  const value = entity.claims?.[property]?.[0]?.mainsnak?.datavalue?.value;
  return typeof value === 'string' ? value : undefined;
}

function claimMonolingual(
  entity: Entity,
  property: string,
): string | undefined {
  const value = entity.claims?.[property]?.[0]?.mainsnak?.datavalue?.value as
    | { text?: string }
    | undefined;
  return value?.text;
}

function categoryOf(
  classes: string[],
  parents: Record<string, Entity>,
): PlaceCategory | null {
  if (classes.some((cls) => EXCLUDED_CLASSES.has(cls))) return null;
  for (const cls of classes) {
    if (CATEGORY_BY_CLASS[cls]) return CATEGORY_BY_CLASS[cls];
  }
  for (const cls of classes) {
    for (const parent of claimIds(parents[cls], 'P279')) {
      if (EXCLUDED_CLASSES.has(parent)) return null;
      if (CATEGORY_BY_CLASS[parent]) return CATEGORY_BY_CLASS[parent];
    }
  }
  return null;
}
