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
import {
  CityNotResolvedError,
  type DiscoveredPlace,
  WikidataDiscoveryService,
} from './wikidata-discovery.service';
import {
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
   * Gather the facts for one city and queue the writing.
   *
   * Every step is idempotent, so this is safe to run again: the resolved area
   * is cached, and persistence upserts on a unique key. That is what lets the
   * adapter retry without asking whether it already half-succeeded.
   */
  async ingestCity(ingestionId: string): Promise<void> {
    const ingestion = await this.repository.findIngestion(ingestionId);
    if (!ingestion) {
      throw new PermanentIngestionError(
        `Ingestion ${ingestionId} no longer exists`,
        'resolve_area',
      );
    }

    const { countryCode, city } = ingestion;

    await this.repository.markStep(ingestionId, 'resolve_city');
    const cityRef = await this.resolveCity(countryCode, city);

    await this.repository.markStep(ingestionId, 'discover');
    const discovered = await this.discover(cityRef.wikidataId);

    await this.repository.markStep(ingestionId, 'rank');
    const ranked = await this.rank(discovered.places);

    const countryId = await this.resolveCountryId(countryCode);
    const { created, conflicts } = await this.repository.persistDrafts(
      ingestionId,
      countryCode,
      city,
      countryId,
      ranked.places,
    );

    await this.repository.saveStats(ingestionId, {
      rawElements: discovered.rawCount,
      droppedAsUnmapped: discovered.droppedAsUnmapped,
      withEnwiki: ranked.withEnwiki,
      kept: ranked.places.length,
      created: created.length,
      conflicts,
    });

    if (!created.length) {
      // Nothing new to write about. Either the city is genuinely empty or every
      // place there was already curated — both are a finished ingestion, not a
      // failure, and the review screen will say which.
      await this.repository.markReadyIfDone(ingestionId);
      return;
    }

    await this.repository.markStep(ingestionId, 'write_texts');
    await this.dispatcher.dispatchPlaceTexts(
      created.map(({ id }) => ({ placeId: id, ingestionId })),
    );

    // Images ride outside the convergence: the city is READY when its texts
    // are, and a photo that never lands degrades to the category tone. Only
    // places whose Wikidata entity carries a P18 get a job — measured on
    // Porto's set, that is about 85% of them.
    const imageJobs = created
      .map(({ id, slug }) => ({
        placeId: id,
        ingestionId,
        commonsFile: ranked.imagesBySlug.get(slug),
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
    const key = `places/${place.countryCode.toLowerCase()}/${slugify(place.city)}/${place.slug}.${extension}`;
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
      // Unparsable output. Retrying is the remedy — same contract the blog
      // pipeline uses.
      throw new RetryableIngestionError(
        `Model returned no usable JSON for place ${placeId}`,
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
    await this.repository.markFailed(ingestionId, step, message);
  }

  private async resolveCity(countryCode: string, city: string) {
    try {
      const resolved = await this.discovery.resolveCity(countryCode, city);
      this.logger.log(
        `${city} (${countryCode}) is ${resolved.wikidataId} "${resolved.label}"`,
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

  private async rank(pois: DiscoveredPlace[]): Promise<{
    places: PlaceToPersist[];
    withEnwiki: number;
    /** slug → Commons file for the kept places that have a P18 image. */
    imagesBySlug: Map<string, string>;
  }> {
    if (!pois.length)
      return { places: [], withEnwiki: 0, imagesBySlug: new Map() };

    const signals = await this.wikimedia.popularity(
      pois.map((poi) => poi.wikidataId),
      // The summary is fetched later, for the ones that survive the cut.
      { withExtract: false },
    );
    const byWikidata = new Map(signals.map((s) => [s.wikidataId, s]));

    const scored = pois
      .map((poi) => ({ poi, signal: byWikidata.get(poi.wikidataId) }))
      .filter(
        (
          row,
        ): row is { poi: DiscoveredPlace; signal: (typeof signals)[number] } =>
          row.signal !== undefined,
      )
      .sort((a, b) => b.signal.monthlyViews - a.signal.monthlyViews);

    const kept = scored.slice(0, PLACES_PER_CITY);
    const slugs = uniqueSlugs(kept.map(({ poi }) => poi));

    const imagesBySlug = new Map<string, string>();
    for (const { poi, signal } of kept) {
      if (signal.commonsFile) {
        imagesBySlug.set(
          slugs.get(poi.wikidataId) as string,
          signal.commonsFile,
        );
      }
    }

    const places = kept.map(({ poi, signal }, index) => ({
      name: poi.name,
      slug: slugs.get(poi.wikidataId) as string,
      category: poi.category,
      lat: poi.lat,
      lng: poi.lng,
      address: poi.address,
      website: poi.website,
      // Wikidata rarely records admission fees; "unknown" renders as paid,
      // which the writing prompt already treats as "say nothing about price".
      isFree: false,
      wikidataId: poi.wikidataId,
      wikipediaMonthlyViews: signal.monthlyViews,
      popularityScore: scoreFor(index, kept.length),
      // Provenance per record. CC0, so no attribution obligation — but the
      // link is how a reviewer audits where a place came from.
      sourceUrl: `https://www.wikidata.org/wiki/${poi.wikidataId}`,
    }));

    return { places, withEnwiki: scored.length, imagesBySlug };
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
 * A slug per place, where two different places can share a name.
 *
 * `[countryCode, city, slug]` is the unique key, so two distinct places
 * colliding on it means the second upsert silently overwrites the first — one
 * place lost, and the run still reporting both as created. At ten places this
 * was theoretical; measured across Porto's full set it is not: **Forte de São
 * João Baptista** is two different forts (Q10283826 and Q10284015), and **São
 * Nicolau** two different things.
 *
 * The loser of a collision is suffixed with its Wikidata id rather than a
 * counter, because the id is stable: a counter would depend on ordering, and a
 * re-run that reordered would mint a new slug and a duplicate row — the exact
 * outcome this function exists to prevent. The most-visited one keeps the clean
 * slug, so the URL that matters stays readable.
 */
function uniqueSlugs(pois: DiscoveredPlace[]): Map<string, string> {
  const taken = new Set<string>();
  const assigned = new Map<string, string>();

  for (const poi of pois) {
    const base = slugify(poi.name);
    const slug = taken.has(base)
      ? `${base}-${poi.wikidataId.toLowerCase()}`
      : base;
    taken.add(slug);
    assigned.set(poi.wikidataId, slug);
  }

  return assigned;
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
