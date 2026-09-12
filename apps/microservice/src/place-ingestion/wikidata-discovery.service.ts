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

/**
 * Which of the two paths gave a place its city, never conflated.
 *
 * `P131` is what Wikidata says the place belongs to. The proximity path is our
 * inference when it says nothing, and `distanceKm` is the only thing that lets
 * review judge it — so it exists on that branch alone.
 */
export type PlaceCity =
  | { wikidataId: string; label: string; source: 'WIKIDATA_P131' }
  | {
      wikidataId: string;
      label: string;
      source: 'NEAREST_MUNICIPALITY';
      distanceKm: number;
    };

/**
 * A place found by country and category, where the city is an answer rather
 * than the question — unlike `discover`, which is handed one city up front.
 *
 * `city` is absent when neither path answered. The place stays in the list:
 * inventing a city would send it through the pipeline with nothing to give it
 * away, and the counters below say how many are in that state.
 */
export interface DiscoveredPlaceInCountry extends DiscoveredPlace {
  city?: PlaceCity;
}

export interface CountryDiscovery {
  places: DiscoveredPlaceInCountry[];
  rawCount: number;
  droppedAsExcluded: number;
  fromP131: number;
  fromProximity: number;
  /** Asked, and no municipality within the radius. */
  cityNotFound: number;
  /** WDQS never answered for that item; the question stayed unasked. */
  cityLookupFailed: number;
  /**
   * Classes whose own query never answered, by QID. The sweep is that much
   * thinner and says so, rather than passing for complete.
   */
  classesFailed: string[];
  /** A class hit the row limit: that slice of the country came back cut. */
  truncated: boolean;
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

/**
 * The country is not in `COUNTRY_QID`. Not retryable.
 *
 * Its own error because a sweep has no city to name: folding it into
 * `CityNotResolvedError`, as the city path does, would mean inventing one.
 */
export class CountryNotSupportedError extends Error {
  constructor(readonly countryCode: string) {
    super(`No Wikidata entity for country ${countryCode}`);
    this.name = 'CountryNotSupportedError';
  }
}

const WIKIDATA_API = 'https://www.wikidata.org/w/api.php';
const WDQS = 'https://query.wikidata.org/sparql';
const BATCH = 50;

/**
 * The floor between two calls to Wikidata.
 *
 * Measured for #219: WDQS answers 502 after about five rapid queries in a row,
 * and 600 ms between them held for a whole run. It applies to every call this
 * service makes — the batches of 50 `wbgetentities` had no pause at all, and
 * they are the likeliest to trip it.
 */
const MIN_REQUEST_INTERVAL_MS = 600;

/**
 * WDQS abandons its own queries at 60 s, so past that a socket is hung rather
 * than slow. Without a deadline the worker waited on it forever.
 */
const WDQS_TIMEOUT_MS = 60_000;

/**
 * How far a place may be from the municipality that answers for it.
 *
 * Measured for #219 over the Portuguese beaches without `P131`: 12 of 12
 * resolve, 3.9 km away on average. A municipality further than this is not
 * the city of anything in any useful sense, so there is no second, wider
 * attempt — it would double the slowest leg to dress up a miss.
 */
const MUNICIPALITY_RADIUS_KM = 30;

/**
 * When to stop asking for cities in a sweep that keeps being refused.
 *
 * With WDQS down, thirty items times three attempts times the growing pauses
 * is some seven minutes spent learning the same thing. The fourth failure in a
 * row is not news; the items left are counted as unasked.
 */
const MAX_CONSECUTIVE_CITY_FAILURES = 3;

/** Rows per class query. Hitting it means the slice came back cut. */
const ROW_LIMIT = 5000;

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

/**
 * Category → its classes, derived from the table above so that one stays the
 * only source of truth: a class added there enters both directions at once.
 *
 * A sweep queries one class at a time, and that is measured, not cautious.
 * With the 41 classes of LANDMARK in a single `VALUES`, WDQS answered 504 for
 * Portugal, Brazil and Italy alike; eight classes took 16 s for Portugal and
 * still failed for Italy. One class answers in seconds (#219).
 */
const CLASSES_BY_CATEGORY = Object.entries(CATEGORY_BY_CLASS).reduce(
  (byCategory, [qid, category]) => {
    (byCategory[category] ??= []).push(qid);
    return byCategory;
  },
  {} as Record<PlaceCategory, string[]>,
);

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
   *
   * Except when the namesake is the one asked for. Campo Grande in Alagoas is
   * a real town with fewer sitelinks than the capital of Mato Grosso do Sul,
   * and by sitelinks alone it could never be reached. So with a state, the
   * candidate that sits inside it wins; without one, or when none does, the
   * tie-break stands as it was.
   */
  async resolveCity(
    countryCode: string,
    city: string,
    state?: string,
  ): Promise<ResolvedCity> {
    const countryQid = COUNTRY_QID[countryCode.toUpperCase()];
    if (!countryQid) throw new CityNotResolvedError(countryCode, city);

    const search = await this.fetchJson<{ search: { id: string }[] }>(
      `${WIKIDATA_API}?action=wbsearchentities&format=json&language=en&limit=10` +
        `&search=${encodeURIComponent(city)}`,
    );
    const ids = search.search.map((hit) => hit.id);
    if (!ids.length) throw new CityNotResolvedError(countryCode, city);

    const entities = await this.entities(ids, 'claims|labels|sitelinks');
    // Accent-folded on both sides: CountriesNow spells it "Sao Paulo", the
    // English label on Wikidata is "São Paulo". Exact-by-bytes marked the
    // largest city in the hemisphere as nonexistent.
    const wanted = foldAccents(city);

    const candidates = ids
      .map((id) => {
        const entity = entities[id];
        const inCountry = claimIds(entity, 'P17').includes(countryQid);
        const hasCoordinate = (entity.claims?.P625 ?? []).length > 0;
        const label = entity.labels?.en?.value ?? '';
        const exactLabel = foldAccents(label) === wanted;
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

    // One candidate is the answer whatever its state says, so the extra
    // requests are only paid for when there is a choice to make.
    const inState =
      state && candidates.length > 1
        ? await this.candidateInState(candidates, entities, state)
        : undefined;
    if (state && candidates.length > 1 && !inState) {
      this.logger.warn(
        `No ${city} (${countryCode}) candidate lies in ${state}; keeping the best-known one`,
      );
    }

    const chosen = inState ?? candidates[0];
    return { wikidataId: chosen.id, label: chosen.label };
  }

  /**
   * The first candidate whose P131 chain passes through the state, if any.
   *
   * A Brazilian municipality sits one hop below its state; elsewhere a county
   * or a district can come in between, so a second hop is read — but only
   * when the first did not settle it. Labels are folded like the city's, and
   * every language counts: CountriesNow may name the state in English or in
   * the local tongue. The candidates arrive ordered by sitelinks, so between
   * two that both qualify the better-known still wins.
   */
  private async candidateInState<T extends { id: string }>(
    candidates: T[],
    entities: Record<string, Entity>,
    state: string,
  ): Promise<T | undefined> {
    const wanted = foldAccents(state);
    const isTheState = (entity: Entity | undefined) =>
      Object.values(entity?.labels ?? {}).some(
        (label) => foldAccents(label.value) === wanted,
      );

    const withParents = candidates.map((candidate) => ({
      candidate,
      parents: claimIds(entities[candidate.id], 'P131'),
    }));
    const firstHop = [...new Set(withParents.flatMap((c) => c.parents))];
    if (!firstHop.length) return undefined;

    const parents = await this.entities(firstHop, 'claims|labels');
    const direct = withParents.find(({ parents: ids }) =>
      ids.some((id) => isTheState(parents[id])),
    );
    if (direct) return direct.candidate;

    const withGrandparents = withParents.map(({ candidate, parents: ids }) => ({
      candidate,
      grandparents: ids.flatMap((id) => claimIds(parents[id], 'P131')),
    }));
    const secondHop = [
      ...new Set(withGrandparents.flatMap((c) => c.grandparents)),
    ];
    if (!secondHop.length) return undefined;

    const grandparents = await this.entities(secondHop, 'labels');
    return withGrandparents.find(({ grandparents: ids }) =>
      ids.some((id) => isTheState(grandparents[id])),
    )?.candidate;
  }

  /**
   * The nearest municipality to a point, or null when none is in range.
   *
   * What a place belongs to when Wikidata does not say: 29 of Portugal's 59
   * beaches carry no `P131` at all. Anchored on municipality (`Q15284`) and
   * not on settlement (`Q486972`), which was measured and rejected — the
   * settlement is nearer and useless, answering with hamlets like Caramujeira
   * where the municipality answers Albufeira, Lagoa, Póvoa de Varzim.
   *
   * Bounded by the country, which the issue does not ask for and the map
   * demands: without it a beach on the Algarve coast takes a Spanish
   * municipality, and a city that wrong is visible to nobody until review.
   */
  async nearestMunicipality(
    lat: number,
    lng: number,
    countryCode: string,
  ): Promise<{ wikidataId: string; label: string; distanceKm: number } | null> {
    const countryQid = COUNTRY_QID[countryCode.toUpperCase()];
    if (!countryQid) throw new CountryNotSupportedError(countryCode);

    const sparql = `
SELECT ?city ?cityLabel ?distance WHERE {
  SERVICE wikibase:around {
    ?city wdt:P625 ?location .
    bd:serviceParam wikibase:center "Point(${lng} ${lat})"^^geo:wktLiteral .
    bd:serviceParam wikibase:radius "${MUNICIPALITY_RADIUS_KM}" .
    bd:serviceParam wikibase:distance ?distance .
  }
  ?city wdt:P31/wdt:P279* wd:Q15284 .
  ?city wdt:P17 wd:${countryQid} .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
} ORDER BY ?distance LIMIT 1`;

    const data = await this.fetchJson<{
      results: { bindings: Record<string, { value: string }>[] };
    }>(
      `${WDQS}?format=json&query=${encodeURIComponent(sparql)}`,
      'application/sparql-results+json',
    );

    const row = data.results.bindings[0];
    if (!row) return null;

    const wikidataId = row.city.value.split('/').pop() as string;
    return {
      wikidataId,
      // An entity with no English label comes back as its own QID; keeping it
      // is honest, and review sees a name it can look up.
      label: row.cityLabel?.value ?? wikidataId,
      distanceKm: Number(row.distance.value),
    };
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

  /**
   * One category over a whole country, each place carrying its own city.
   *
   * The mirror of `discover`: there the city is the question and the category
   * is worked out afterwards; here the class is the question and the city is
   * the answer. The class filter therefore lives **inside** the query, which
   * the warning above forbids for the city-anchored shape — and rightly: the
   * anchor there is one city with nothing else to narrow it, while here the
   * country, the coordinate and the English article narrow it together.
   *
   * **One query per class, and that is measured.** With the 41 classes of
   * LANDMARK in a single `VALUES`, WDQS answered 504 for Portugal, Brazil and
   * Italy alike; eight classes took 16 s for Portugal and still failed for
   * Italy; one class answers in seconds (#219). A class that will not answer
   * is recorded in `classesFailed` and the sweep goes on without it.
   *
   * Nothing in the pipeline calls this yet — the consumer is #220, and it is
   * also where two categories claiming the same item has to be resolved, since
   * this answers "the items of this class", not "the class of this item".
   */
  async discoverInCountry(
    countryCode: string,
    category: PlaceCategory,
  ): Promise<CountryDiscovery> {
    const countryQid = COUNTRY_QID[countryCode.toUpperCase()];
    if (!countryQid) throw new CountryNotSupportedError(countryCode);

    const raw = new Map<
      string,
      {
        name: string;
        articleTitle: string;
        lat: number;
        lng: number;
        adminQid?: string;
        adminLabel?: string;
      }
    >();
    const classesFailed: string[] = [];
    let truncated = false;

    for (const classQid of CLASSES_BY_CATEGORY[category] ?? []) {
      const sparql = `
SELECT DISTINCT ?item ?itemLabel ?coord ?article ?admin ?adminLabel WHERE {
  VALUES ?class { wd:${classQid} }
  ?item wdt:P31/wdt:P279* ?class .
  ?item wdt:P17 wd:${countryQid} .
  ?item wdt:P625 ?coord .
  ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> .
  OPTIONAL { ?item wdt:P131 ?admin . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
} LIMIT ${ROW_LIMIT}`;

      let bindings: Record<string, { value: string }>[];
      try {
        const data = await this.fetchJson<{
          results: { bindings: Record<string, { value: string }>[] };
        }>(
          `${WDQS}?format=json&query=${encodeURIComponent(sparql)}`,
          'application/sparql-results+json',
        );
        bindings = data.results.bindings;
      } catch (error) {
        if (!(error instanceof WikidataUnavailableError)) throw error;
        // One class short is a thinner sweep; the whole run lost is nothing.
        classesFailed.push(classQid);
        this.logger.warn(
          `Wikidata sweep ${countryCode}/${category}: class ${classQid} did not answer (${error.message})`,
        );
        continue;
      }

      if (bindings.length === ROW_LIMIT) {
        truncated = true;
        this.logger.warn(
          `Wikidata sweep ${countryCode}/${category}: class ${classQid} hit the ${ROW_LIMIT} row limit`,
        );
      }

      for (const row of bindings) {
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
          adminQid: row.admin?.value.split('/').pop(),
          adminLabel: row.adminLabel?.value,
        });
      }
    }

    const qids = [...raw.keys()];
    // The same call earns three things: the veto below, and the website and
    // address the query does not carry.
    const entities = await this.entities(qids, 'claims');

    const places: DiscoveredPlaceInCountry[] = [];
    let droppedAsExcluded = 0;
    let fromP131 = 0;
    for (const qid of qids) {
      const entity = entities[qid];
      // The subclass closure lets through what the table vetoes elsewhere: a
      // prison that is a subclass of castle arrives under LANDMARK.
      if (claimIds(entity, 'P31').some((cls) => EXCLUDED_CLASSES.has(cls))) {
        droppedAsExcluded += 1;
        continue;
      }
      const base = raw.get(qid) as NonNullable<ReturnType<typeof raw.get>>;
      // `P131` is whatever Wikidata files the place under, which is sometimes
      // a parish rather than the city — Praia de Valadares comes back under
      // Gulpilhares e Valadares. Taken as given here; review is where a human
      // disagrees with it.
      const city: PlaceCity | undefined = base.adminQid
        ? {
            wikidataId: base.adminQid,
            label: base.adminLabel ?? base.adminQid,
            source: 'WIKIDATA_P131',
          }
        : undefined;
      if (city) fromP131 += 1;
      places.push({
        wikidataId: qid,
        name: base.name,
        articleTitle: base.articleTitle,
        lat: base.lat,
        lng: base.lng,
        category,
        website: claimString(entity, 'P856'),
        address: claimMonolingual(entity, 'P6375'),
        city,
      });
    }

    let fromProximity = 0;
    let cityNotFound = 0;
    let cityLookupFailed = 0;
    let consecutiveFailures = 0;
    for (const place of places) {
      if (place.city) continue;
      if (consecutiveFailures >= MAX_CONSECUTIVE_CITY_FAILURES) {
        cityLookupFailed += 1;
        continue;
      }
      try {
        const near = await this.nearestMunicipality(
          place.lat,
          place.lng,
          countryCode,
        );
        consecutiveFailures = 0;
        if (!near) {
          // Never invent one: a made-up city travels the whole pipeline with
          // nothing to give it away.
          cityNotFound += 1;
          this.logger.warn(
            `Wikidata sweep ${countryCode}/${category}: no municipality within ${MUNICIPALITY_RADIUS_KM} km of ${place.wikidataId} (${place.lat}, ${place.lng})`,
          );
          continue;
        }
        place.city = { ...near, source: 'NEAREST_MUNICIPALITY' };
        fromProximity += 1;
      } catch (error) {
        if (!(error instanceof WikidataUnavailableError)) throw error;
        consecutiveFailures += 1;
        cityLookupFailed += 1;
        this.logger.warn(
          `Wikidata sweep ${countryCode}/${category}: no city for ${place.wikidataId} (${error.message})`,
        );
      }
    }

    this.logger.log(
      `Wikidata sweep ${countryCode}/${category}: ${raw.size} candidates, ${places.length} kept, ` +
        `${droppedAsExcluded} vetoed, cities ${fromP131} by P131 and ${fromProximity} by proximity, ` +
        `${cityNotFound} without one, ${cityLookupFailed} unasked, ${classesFailed.length} classes short`,
    );

    return {
      places,
      rawCount: raw.size,
      droppedAsExcluded,
      fromP131,
      fromProximity,
      cityNotFound,
      cityLookupFailed,
      classesFailed,
      truncated,
    };
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
        await this.pace();
        response = await fetch(url, {
          headers: { 'User-Agent': env.INGESTION_USER_AGENT, Accept: accept },
          signal: AbortSignal.timeout(WDQS_TIMEOUT_MS),
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
      try {
        return JSON.parse(text) as T;
      } catch {
        // A body that does not parse is a body that was cut. Measured for
        // #219: a dense class answered 200 with 672 KiB of JSON ending
        // mid-token, and WDQS then served that same truncated body from its
        // cache in under a second. Retrying is still right — the cache
        // expires — but the caller must survive the case where it does not.
        lastError = new WikidataUnavailableError(
          'Wikidata answered 200 with a truncated body',
        );
        await this.wait(attempt * 5_000);
        continue;
      }
    }
    throw lastError;
  }

  /** When the last request went out, for `pace` to measure the gap from. */
  private lastRequestAt = 0;

  /**
   * Holds every call to `MIN_REQUEST_INTERVAL_MS` apart from the last one.
   *
   * Through `wait`, so the specs that already silence the retry pauses silence
   * this too, and a spec can assert on the pacing without fake timers.
   */
  private async pace(): Promise<void> {
    const since = Date.now() - this.lastRequestAt;
    if (since < MIN_REQUEST_INTERVAL_MS) {
      await this.wait(MIN_REQUEST_INTERVAL_MS - since);
    }
    this.lastRequestAt = Date.now();
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

/** "São Paulo" and "Sao Paulo" are the same name. */
function foldAccents(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Mn}/gu, '')
    .toLowerCase();
}
