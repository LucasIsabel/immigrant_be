import { Inject, Injectable, Logger } from '@nestjs/common';
import { AiRouterService } from '@app/ai/ai-router.service';
import { StorageService } from '@app/storage';
import { buildPlaceWritingPrompt } from '@app/ai/prompts/place-writing.prompt';
import { placeTextsAiSchema } from '@app/ai/schemas/place-texts.schema';
import {
  INGESTION_DISPATCHER,
  type IngestionDispatcher,
  PermanentIngestionError,
  RetryableIngestionError,
} from '@app/ingestion';
import { env } from '@app/config/env';
import { normalizeCity } from '@app/geo';
import {
  CityIngestionScope,
  PlaceCategory,
} from '../../../../generated/prisma';
import {
  CityNotResolvedError,
  CountryNotSupportedError,
  type DiscoveredPlace,
  type DiscoveredPlaceInCountry,
  WikidataDiscoveryService,
} from './wikidata-discovery.service';
import {
  type CityLocation,
  type IngestionStats,
  PlaceIngestionRepository,
  type PlaceToPersist,
} from './place-ingestion.repository';
import { WikimediaService } from './wikimedia.service';

/**
 * How many places a city keeps.
 *
 * Thirty. The pilot ran with ten and Porto offered **174** candidates, so ten
 * left a city under-described; taking everything was turned down because the
 * tail is dolmens and hamlets and 174 cards in three languages stop being
 * reviewable. Thirty rather than forty is a product decision: the ingested
 * classics are the traffic bait, local businesses and events are the product —
 * the catalogue does not need depth it exists to hand attention away from.
 */
const PLACES_PER_CITY = 30;

/**
 * Popularity on a 100..1 scale, whatever the cut is.
 *
 * The old formula was `100 - 10 * rank`, which was welded to a cut of exactly
 * ten: at forty places the eleventh would score 0 and the fortieth **-290**,
 * ordering backwards and failing the admin PATCH validation, which accepts
 * 0..100. Deriving from the total keeps the first at 100 and the last at 1 for
 * any cut — and reproduces the old numbers exactly when `total` is 10.
 */
const scoreFor = (index: number, total: number) =>
  Math.max(1, Math.round((100 * (total - index)) / total));

/** Every category, for a sweep that named none — empty means all. */
const ALL_CATEGORIES = Object.values(PlaceCategory);

/**
 * How many candidates a sweep pays pageviews for, as a multiple of its cap.
 *
 * Pageviews are one request per candidate, in series: measured over Italy's
 * 8877 `LANDMARK` candidates, that leg is 26 minutes on its own, to keep a
 * hundred. The sitelink count that pre-cuts them is free — it already rides on
 * the `wbgetentities` call the titles come from — but it is a coarser signal,
 * so the cut leaves room rather than trusting it with the final order. Five
 * times the cap puts Italy at 500 requests, a minute and a half, and still
 * lets pageviews reorder freely inside the shortlist.
 */
const PRE_CUT_HEADROOM = 5;

/** The row `findIngestion` hands back, named once instead of restated. */
type IngestionRow = NonNullable<
  Awaited<ReturnType<PlaceIngestionRepository['findIngestion']>>
>;

/**
 * A candidate that already knows where it is.
 *
 * Both gathering legs answer in this shape and `rank` accepts nothing else:
 * a `DiscoveredPlaceInCountry` is structurally assignable to `DiscoveredPlace`,
 * so without this the sweep's city would be dropped on the floor and the
 * compiler would not say a word.
 */
interface LocatedCandidate {
  poi: DiscoveredPlace;
  location: CityLocation;
  /** Set only when the city was inferred from distance (#219). */
  nearestMunicipalityKm: number | null;
}

/** What one gathering leg found, and how much of it this run may keep. */
interface Gathered {
  countryCode: string;
  candidates: LocatedCandidate[];
  stats: Partial<IngestionStats>;
  cap: number;
  /**
   * How many candidates may reach the pageviews call. Absent on a city
   * ingestion, whose whole list is smaller than the shortlist would be.
   */
  preCutTo?: number;
}

/** The tuple a slug is unique inside — the unique index's own key. */
const bucketOf = (location: CityLocation) =>
  `${location.countryCode}|${location.city}|${location.stateKey ?? ''}`;

@Injectable()
export class PlaceIngestionService {
  private readonly logger = new Logger(PlaceIngestionService.name);

  constructor(
    private readonly repository: PlaceIngestionRepository,
    private readonly discovery: WikidataDiscoveryService,
    private readonly wikimedia: WikimediaService,
    private readonly aiRouter: AiRouterService,
    private readonly storage: StorageService,
    @Inject(INGESTION_DISPATCHER)
    private readonly dispatcher: IngestionDispatcher,
  ) {}

  /**
   * Gather the facts for one reach and queue the writing.
   *
   * Every step is idempotent, so this is safe to run again: the resolved area
   * is cached, and persistence upserts on a unique key. That is what lets the
   * adapter retry without asking whether it already half-succeeded.
   *
   * Two legs, one shape. A city ingestion resolves the city it was handed and
   * asks Wikidata what is inside it; a country sweep asks for a class across a
   * country and every place brings its own city back (#343). What comes after —
   * rank, persist, texts, images — never learns which leg it came from.
   */
  async ingest(ingestionId: string): Promise<void> {
    const ingestion = await this.repository.findIngestion(ingestionId);
    if (!ingestion) {
      throw new PermanentIngestionError(
        `Ingestion ${ingestionId} no longer exists`,
        'discover',
      );
    }

    const gathered =
      ingestion.scope === CityIngestionScope.COUNTRY
        ? await this.sweepCountry(ingestion)
        : await this.ingestOneCity(ingestion);

    await this.finish(ingestionId, gathered);
  }

  /** The city the admin named: resolve it, then ask what is inside it. */
  private async ingestOneCity(ingestion: IngestionRow): Promise<Gathered> {
    const { id, countryCode, city, cityKey, state, stateKey } = ingestion;
    // The CHECK in the migration makes this unreachable through the API. It is
    // here because the columns are nullable since #220, and a null that slipped
    // in by another door would reach `persistDrafts` as a city named "null".
    if (city === null || cityKey === null) {
      throw new PermanentIngestionError(
        `Ingestão ${id} é de cidade e não tem cidade`,
        'resolve_city',
      );
    }

    await this.repository.markStep(id, 'resolve_city');
    const cityRef = await this.resolveCity(countryCode, city, state);
    await this.repository.saveCityWikidataId(id, cityRef.wikidataId);

    await this.repository.markStep(id, 'discover');
    const discovered = await this.discover(cityRef.wikidataId);

    // One location for the whole run: the admin named the city and the API
    // folded its keys when the row was created.
    const location: CityLocation = {
      countryCode,
      city,
      cityKey,
      state,
      stateKey,
    };

    return {
      countryCode,
      candidates: discovered.places.map((poi) => ({
        poi,
        location,
        nearestMunicipalityKm: null,
      })),
      stats: {
        rawElements: discovered.rawCount,
        droppedAsUnmapped: discovered.droppedAsUnmapped,
      },
      cap: PLACES_PER_CITY,
    };
  }

  /**
   * One country, one category at a time, each place carrying its own city.
   *
   * In series on purpose: the discovery service paces itself by comparing
   * against its own last request, so two callers at once compute the same gap
   * and fire together — which is the 502-after-five that #219 measured.
   */
  private async sweepCountry(ingestion: IngestionRow): Promise<Gathered> {
    const { id, countryCode } = ingestion;
    const categories = ingestion.categories.length
      ? ingestion.categories
      : ALL_CATEGORIES;

    await this.repository.markStep(id, 'discover');

    const found = new Map<string, DiscoveredPlaceInCountry>();
    const classesFailed = new Set<string>();
    const categoriesFailed: PlaceCategory[] = [];
    let rawElements = 0;
    let droppedAsExcluded = 0;
    let cityNotFound = 0;
    let cityLookupFailed = 0;
    let claimedTwice = 0;
    let truncated = false;

    for (const category of categories) {
      let discovery;
      try {
        discovery = await this.discovery.discoverInCountry(
          countryCode,
          category,
        );
      } catch (error) {
        // Three attempts will not put the country on Wikidata's map.
        if (error instanceof CountryNotSupportedError) {
          throw new PermanentIngestionError(error.message, 'discover');
        }
        // One category short is a thinner sweep; the whole run lost is nothing.
        categoriesFailed.push(category);
        this.logger.warn(
          `Sweep ${countryCode}: category ${category} did not answer (${String(error)})`,
        );
        continue;
      }

      rawElements += discovery.rawCount;
      droppedAsExcluded += discovery.droppedAsExcluded;
      cityNotFound += discovery.cityNotFound;
      cityLookupFailed += discovery.cityLookupFailed;
      truncated = truncated || discovery.truncated;
      for (const qid of discovery.classesFailed) classesFailed.add(qid);

      for (const place of discovery.places) {
        // The first category asked for keeps the item: a beach that is also a
        // nature reserve is one place, filed under what the admin listed first.
        if (found.has(place.wikidataId)) {
          claimedTwice += 1;
          continue;
        }
        found.set(place.wikidataId, place);
      }
    }

    if (categoriesFailed.length === categories.length) {
      throw new RetryableIngestionError(
        `Wikidata answered for none of the ${categories.length} categories of ${countryCode}`,
      );
    }

    // A place we cannot name a city for is not written: `Place.city` is NOT
    // NULL, and an invented city travels the whole pipeline with nothing to
    // give it away. Counted instead, with a sample to take back to the source.
    const withoutCitySample: string[] = [];
    const usable: DiscoveredPlaceInCountry[] = [];
    let unlabelled = 0;
    for (const place of found.values()) {
      const city = place.city;
      // No English label: the city would read "Q12345" on a public screen.
      if (!city || city.label === city.wikidataId) {
        if (city) unlabelled += 1;
        if (withoutCitySample.length < 50)
          withoutCitySample.push(place.wikidataId);
        continue;
      }
      usable.push(place);
    }

    // The label is derived, so two spellings of one municipality would become
    // two cities. The QID decides, and the first label to arrive is the one.
    const byCityQid = new Map<string, CityLocation>();
    const candidates: LocatedCandidate[] = usable.map((place) => {
      const city = place.city as NonNullable<DiscoveredPlaceInCountry['city']>;
      let location = byCityQid.get(city.wikidataId);
      if (!location) {
        location = {
          countryCode,
          city: city.label,
          cityKey: normalizeCity(city.label),
          // The discovery carries no state. `stateKey` becomes `''` on the
          // row, which is what the unique index means by "none".
          state: null,
          stateKey: null,
        };
        byCityQid.set(city.wikidataId, location);
      }
      return {
        poi: place,
        location,
        nearestMunicipalityKm:
          city.source === 'NEAREST_MUNICIPALITY' ? city.distanceKm : null,
      };
    });

    this.logger.log(
      `Sweep ${countryCode} [${categories.join(', ')}]: ${found.size} found, ` +
        `${candidates.length} usable across ${byCityQid.size} cities, ` +
        `${categoriesFailed.length} categories short`,
    );

    const byProximity = candidates.filter(
      (candidate) => candidate.nearestMunicipalityKm !== null,
    ).length;

    return {
      countryCode,
      candidates,
      stats: {
        rawElements,
        droppedAsExcluded,
        citiesFromP131: candidates.length - byProximity,
        citiesFromProximity: byProximity,
        withoutCity: {
          notFound: cityNotFound,
          lookupFailed: cityLookupFailed,
          unlabelled,
        },
        ...(withoutCitySample.length && { withoutCitySample }),
        ...(classesFailed.size && { classesFailed: [...classesFailed] }),
        ...(categoriesFailed.length && { categoriesFailed }),
        ...(truncated && { truncated }),
        ...(claimedTwice && { claimedTwice }),
      },
      cap: env.PLACES_PER_SWEEP,
      preCutTo: env.PLACES_PER_SWEEP * PRE_CUT_HEADROOM,
    };
  }

  /** Rank, persist and queue the writing — the half both legs share. */
  private async finish(ingestionId: string, gathered: Gathered): Promise<void> {
    await this.repository.markStep(ingestionId, 'rank');
    const ranked = await this.rank(
      gathered.candidates,
      gathered.cap,
      gathered.preCutTo,
    );

    const countryId = await this.resolveCountryId(gathered.countryCode);
    const { created, conflicts } = await this.repository.persistDrafts(
      ingestionId,
      countryId,
      ranked.places,
    );

    await this.repository.saveStats(ingestionId, {
      rawElements: 0,
      droppedAsUnmapped: 0,
      ...gathered.stats,
      withEnwiki: ranked.withEnwiki,
      kept: ranked.places.length,
      created: created.length,
      conflicts,
      cities: new Set(ranked.places.map((place) => bucketOf(place.location)))
        .size,
      ...(ranked.preCut && { preCut: ranked.preCut }),
    });

    if (!created.length) {
      // Nothing new to write about. Either the reach is genuinely empty or
      // every place in it was already curated — both are a finished ingestion,
      // not a failure, and the review screen will say which.
      await this.repository.markReadyIfDone(ingestionId);
      return;
    }

    await this.repository.markStep(ingestionId, 'write_texts');
    await this.dispatcher.dispatchPlaceTexts(
      created.map(({ id }) => ({ placeId: id, ingestionId })),
    );

    // Images ride outside the convergence: the reach is READY when its texts
    // are, and a photo that never lands degrades to the category tone. Only
    // places whose Wikidata entity carries a P18 get a job — measured on
    // Porto's set, that is about 85% of them. Paired by QID and not by slug:
    // a sweep can hold a `se` in Lisbon and another in Porto, and pairing by
    // slug would hand both the same photograph.
    const imageJobs = created
      .map(({ id, wikidataId }) => ({
        placeId: id,
        ingestionId,
        commonsFile: ranked.imagesByQid.get(wikidataId),
      }))
      .filter(
        (
          job,
        ): job is {
          placeId: string;
          ingestionId: string;
          commonsFile: string;
        } => !!job.commonsFile,
      );
    await this.dispatcher.dispatchPlaceImages(imageJobs);
  }

  /**
   * Fetch one place's image from Commons and put it on our bucket.
   *
   * Stored rather than hotlinked (decision on #152): Commons has no SLA and
   * discourages production hotlinking; the bucket gives a consistent 800px
   * rendition on the CDN the blog covers already use. Licence and author are
   * stored alongside — CC licences require the credit wherever the image
   * shows, and hosting the file does not lift that.
   */
  async writePlaceImage(placeId: string, commonsFile: string): Promise<void> {
    const place = await this.repository.findPlace(placeId);
    if (!place) {
      throw new PermanentIngestionError(
        `Place ${placeId} no longer exists`,
        'write_image',
      );
    }

    const info = await this.wikimedia.imageInfo(commonsFile);
    if (!info) {
      // The claim exists but Commons cannot resolve it (deleted file, odd
      // format). Nothing to retry into existence.
      throw new PermanentIngestionError(
        `Commons could not resolve ${commonsFile}`,
        'write_image',
      );
    }

    const bytes = await this.wikimedia.download(info.url);
    if (!bytes) {
      throw new RetryableIngestionError(`Download failed for ${commonsFile}`);
    }

    const extension = info.mime === 'image/png' ? 'png' : 'jpg';
    // The state enters the path only when there is one: two Campo Grandes
    // must not overwrite each other's `catedral`, and every object stored
    // before states existed keeps the key its URL already points at.
    const cityPath = place.state
      ? `${slugify(place.state)}/${slugify(place.city)}`
      : slugify(place.city);
    const key = `places/${place.countryCode.toLowerCase()}/${cityPath}/${place.slug}.${extension}`;
    const { url } = await this.storage.uploadFileAtKey(bytes, key, info.mime);

    await this.repository.savePlaceImage(placeId, {
      imageUrl: url,
      imageLicense: info.license,
      imageAuthor: info.author,
    });
  }

  /**
   * Write description and tip for one place, in three languages.
   *
   * Returns whether the ingestion became ready as a result, so the caller can
   * notify exactly once.
   */
  async writePlaceTexts(
    placeId: string,
    ingestionId: string,
  ): Promise<{ ingestionBecameReady: boolean }> {
    const place = await this.repository.findPlace(placeId);
    if (!place) {
      throw new PermanentIngestionError(
        `Place ${placeId} no longer exists`,
        'write_texts',
      );
    }

    const signal = place.wikidataId
      ? (await this.wikimedia.popularity([place.wikidataId]))[0]
      : undefined;

    const prompt = buildPlaceWritingPrompt({
      name: place.name,
      category: place.category,
      city: place.city,
      country: place.countryCode,
      isFree: place.isFree,
      address: place.address,
      website: place.website,
      wikipediaExtract: signal?.extract ?? null,
      monthlyViews: place.wikipediaMonthlyViews,
    });

    const { data, result } = await this.aiRouter.generateJson(
      'place_writing',
      prompt,
      placeTextsAiSchema,
      { entityType: 'place', entityId: placeId },
    );

    if (!data) {
      /*
       * Every model in the chain answered, and none of them usably — the router
       * tries them all now, so this is no longer "the primary had a bad
       * moment". Retrying is still the remedy, but the message carries the last
       * model so the Sentry event says who to stop trusting, instead of 31
       * events that only name the place.
       */
      throw new RetryableIngestionError(
        `Model returned no usable JSON for place ${placeId} (last tried: ${result.model})`,
      );
    }

    await this.repository.saveTexts(
      placeId,
      (['pt', 'en', 'es'] as const).map((language) => ({
        language,
        description: data[language].description,
        tip: data[language].tip,
      })),
      {
        generatedByModel: result.model,
        generationCostUsd: result.usage.costUsd ?? null,
      },
    );

    return { ingestionBecameReady: await this.settleIfDone(ingestionId) };
  }

  /**
   * Called when a text job ends, successfully or for good.
   *
   * A place whose text failed every attempt still counts as settled: leaving
   * the city stuck in PROCESSING because one description never came would hide
   * nine good places behind one bad one. The review screen shows the gap and
   * offers a retry.
   */
  async settleIfDone(ingestionId: string): Promise<boolean> {
    const pending = await this.repository.countPendingTexts(ingestionId);
    if (pending > 0) return false;
    return this.repository.markReadyIfDone(ingestionId);
  }

  /** How many places of this city came out with no text. */
  countTextFailures(ingestionId: string): Promise<number> {
    return this.repository.countTextFailures(ingestionId);
  }

  /** A text that exhausted its attempts. Settles the place so the city can end. */
  async abandonPlaceTexts(
    ingestionId: string,
    placeId: string,
  ): Promise<boolean> {
    await this.repository.recordTextFailure(ingestionId, placeId);
    return this.settleIfDone(ingestionId);
  }

  async recordFailure(
    ingestionId: string,
    step: string | null,
    message: string,
  ): Promise<void> {
    const recorded = await this.repository.markFailed(
      ingestionId,
      step,
      message,
    );
    if (!recorded) {
      // The row went away before its own failure could be written. Nothing to
      // repair — the job is already refused — but this line is the only trace
      // the orphan leaves, and without it the failure is invisible twice over.
      this.logger.warn(
        `Ingestion ${ingestionId} no longer exists; its failure was not recorded: ${message}`,
      );
    }
  }

  private async resolveCity(
    countryCode: string,
    city: string,
    state: string | null,
  ) {
    try {
      const resolved = await this.discovery.resolveCity(
        countryCode,
        city,
        state ?? undefined,
      );
      this.logger.log(
        `${city}${state ? `, ${state}` : ''} (${countryCode}) is ${resolved.wikidataId} "${resolved.label}"`,
      );
      return resolved;
    } catch (error) {
      if (error instanceof CityNotResolvedError) {
        // Trying again will not help: the city is not on Wikidata under that
        // name in that country. It surfaces to a human.
        throw new PermanentIngestionError(error.message, 'resolve_city');
      }
      throw new RetryableIngestionError(
        `Could not resolve ${city} on Wikidata`,
        error,
      );
    }
  }

  private async discover(cityQid: string) {
    try {
      return await this.discovery.discover(cityQid);
    } catch (error) {
      throw new RetryableIngestionError('Wikidata discovery failed', error);
    }
  }

  private async rank(
    candidates: LocatedCandidate[],
    cap: number,
    preCutTo?: number,
  ): Promise<{
    places: PlaceToPersist[];
    withEnwiki: number;
    /** QID → Commons file for the kept places that have a P18 image. */
    imagesByQid: Map<string, string>;
    /** Set only when a shortlist was asked for, for the stats to record. */
    preCut?: { askedFor: number; of: number };
  }> {
    if (!candidates.length)
      return { places: [], withEnwiki: 0, imagesByQid: new Map() };

    const signals = await this.wikimedia.popularity(
      candidates.map(({ poi }) => poi.wikidataId),
      // The summary is fetched later, for the ones that survive the cut.
      { withExtract: false, preCutTo },
    );
    const byWikidata = new Map(signals.map((s) => [s.wikidataId, s]));

    const scored = candidates
      .map((candidate) => ({
        candidate,
        signal: byWikidata.get(candidate.poi.wikidataId),
      }))
      .filter(
        (
          row,
        ): row is {
          candidate: LocatedCandidate;
          signal: (typeof signals)[number];
        } => row.signal !== undefined,
      )
      .sort((a, b) => b.signal.monthlyViews - a.signal.monthlyViews);

    const kept = scored.slice(0, cap);
    const slugs = uniqueSlugs(kept.map(({ candidate }) => candidate));

    const imagesByQid = new Map<string, string>();
    for (const { candidate, signal } of kept) {
      if (signal.commonsFile)
        imagesByQid.set(candidate.poi.wikidataId, signal.commonsFile);
    }

    // The score orders one city's list, so it is measured inside that city.
    // Global, a village with a single place would score 3 and sit beside the
    // curated hundreds of Lisbon, mixing two scales in one table. The raw
    // number that keeps the order auditable is `wikipediaMonthlyViews`, which
    // stays global and honest.
    const sizeOf = new Map<string, number>();
    for (const { candidate } of kept) {
      const bucket = bucketOf(candidate.location);
      sizeOf.set(bucket, (sizeOf.get(bucket) ?? 0) + 1);
    }
    const placed = new Map<string, number>();

    const places = kept.map(({ candidate, signal }) => {
      const bucket = bucketOf(candidate.location);
      const index = placed.get(bucket) ?? 0;
      placed.set(bucket, index + 1);

      return {
        location: candidate.location,
        nearestMunicipalityKm: candidate.nearestMunicipalityKm,
        name: candidate.poi.name,
        slug: slugs.get(candidate.poi.wikidataId) as string,
        category: candidate.poi.category,
        lat: candidate.poi.lat,
        lng: candidate.poi.lng,
        address: candidate.poi.address,
        website: candidate.poi.website,
        // Wikidata rarely records admission fees; "unknown" renders as paid,
        // which the writing prompt already treats as "say nothing about price".
        isFree: false,
        wikidataId: candidate.poi.wikidataId,
        wikipediaMonthlyViews: signal.monthlyViews,
        popularityScore: scoreFor(index, sizeOf.get(bucket) as number),
        // Provenance per record. CC0, so no attribution obligation — but the
        // link is how a reviewer audits where a place came from.
        sourceUrl: `https://www.wikidata.org/wiki/${candidate.poi.wikidataId}`,
      };
    });

    return {
      places,
      withEnwiki: scored.length,
      imagesByQid,
      // The ceiling, not the event: the cut ranks the candidates that have an
      // English article, which is fewer than these. Read together with
      // `withEnwiki` — itself counted after the cut — the two say what
      // happened without claiming more than is known.
      ...(preCutTo !== undefined &&
        candidates.length > preCutTo && {
          preCut: { askedFor: preCutTo, of: candidates.length },
        }),
    };
  }

  private async resolveCountryId(countryCode: string): Promise<string | null> {
    // The FK is a convenience, not the search key: places are found by
    // countryCode, and a country that is not a registered destination still has
    // places worth showing.
    const country = await this.repository.findCountryIdByName(
      COUNTRY_NAMES[countryCode] ?? '',
    );
    return country?.id ?? null;
  }
}

/**
 * ISO2 → the name used in the `countries` table.
 *
 * Only the pilot countries for now. A country missing here just means a null
 * FK, which the schema allows on purpose.
 */
const COUNTRY_NAMES: Record<string, string> = {
  PT: 'Portugal',
  ES: 'Spain',
  CA: 'Canada',
  BR: 'Brazil',
  US: 'United States',
};

/**
 * A slug for each place, unique **inside its own city**.
 *
 * The uniqueness that matters is the one the database enforces:
 * `(countryCode, city, stateKey, slug)`. Two beaches called "Praia da Rocha"
 * in different municipalities are two rows and both keep the clean slug; two
 * in the same one is where the loser takes the QID as a suffix — ugly, stable,
 * and never a counter, which would move when a run finds one place more.
 */
function uniqueSlugs(candidates: LocatedCandidate[]): Map<string, string> {
  const slugs = new Map<string, string>();
  const taken = new Map<string, Set<string>>();

  for (const { poi, location } of candidates) {
    const bucket = bucketOf(location);
    let used = taken.get(bucket);
    if (!used) {
      used = new Set<string>();
      taken.set(bucket, used);
    }

    const base = slugify(poi.name);
    const slug = used.has(base)
      ? `${base}-${poi.wikidataId.toLowerCase()}`
      : base;
    used.add(slug);
    slugs.set(poi.wikidataId, slug);
  }

  return slugs;
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
