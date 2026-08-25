import { Inject, Injectable, Logger } from '@nestjs/common';
import { AiRouterService } from '@app/ai/ai-router.service';
import { buildPlaceWritingPrompt } from '@app/ai/prompts/place-writing.prompt';
import { placeTextsAiSchema } from '@app/ai/schemas/place-texts.schema';
import {
  INGESTION_DISPATCHER,
  type IngestionDispatcher,
  PermanentIngestionError,
  RetryableIngestionError,
} from '@app/ingestion';
import {
  AreaNotResolvedError,
  OverpassService,
  type OverpassPoi,
} from './overpass.service';
import {
  PlaceIngestionRepository,
  type PlaceToPersist,
} from './place-ingestion.repository';
import { WikimediaService } from './wikimedia.service';

/**
 * How many places a city keeps.
 *
 * Ten because that is what a person browsing a city actually reads, and because
 * the hand-curated fixture uses ten — the pilot compares like with like.
 */
const PLACES_PER_CITY = 10;

/** The scale the seed already uses: 100 for the first, then down by ten. */
const topScore = (rank: number) => 100 - 10 * rank;

@Injectable()
export class PlaceIngestionService {
  private readonly logger = new Logger(PlaceIngestionService.name);

  constructor(
    private readonly repository: PlaceIngestionRepository,
    private readonly overpass: OverpassService,
    private readonly wikimedia: WikimediaService,
    private readonly aiRouter: AiRouterService,
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

    const areaId = await this.resolveArea(
      ingestionId,
      countryCode,
      city,
      ingestion.osmAreaId,
    );

    await this.repository.markStep(ingestionId, 'fetch_pois');
    const pois = await this.fetchPois(areaId);

    await this.repository.markStep(ingestionId, 'rank');
    const ranked = await this.rank(pois);

    const countryId = await this.resolveCountryId(countryCode);
    const { createdIds, conflicts } = await this.repository.persistDrafts(
      ingestionId,
      countryCode,
      city,
      countryId,
      ranked.places,
    );

    await this.repository.saveStats(ingestionId, {
      rawElements: pois.length,
      withEnwiki: ranked.withEnwiki,
      kept: ranked.places.length,
      created: createdIds.length,
      conflicts,
    });

    if (!createdIds.length) {
      // Nothing new to write about. Either the city is genuinely empty or every
      // place there was already curated — both are a finished ingestion, not a
      // failure, and the review screen will say which.
      await this.repository.markReadyIfDone(ingestionId);
      return;
    }

    await this.repository.markStep(ingestionId, 'write_texts');
    await this.dispatcher.dispatchPlaceTexts(
      createdIds.map((placeId) => ({ placeId, ingestionId })),
    );
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

  private async resolveArea(
    ingestionId: string,
    countryCode: string,
    city: string,
    cached: bigint | null,
  ): Promise<number> {
    if (cached) return Number(cached);

    await this.repository.markStep(ingestionId, 'resolve_area');
    try {
      const areaId = await this.overpass.resolveArea(countryCode, city);
      await this.repository.saveResolvedArea(
        ingestionId,
        areaId,
        await this.matchedName(areaId),
      );
      return areaId;
    } catch (error) {
      if (error instanceof AreaNotResolvedError) {
        // Trying again will not help: the city is not in OpenStreetMap under
        // any name we know. It has to surface to a human, who can unblock it by
        // supplying the area id.
        throw new PermanentIngestionError(error.message, 'resolve_area');
      }
      throw new RetryableIngestionError(
        `Could not resolve area for ${city}`,
        error,
      );
    }
  }

  /**
   * O nome que o OSM usa para a área — "Lisboa" onde a nossa lista diz "Lisbon".
   *
   * Falha aqui não derruba nada. Resolver a área custa até quatro consultas
   * mais uma sonda, e visto acontecer: a resolução de Sintra passou e o pedido
   * seguinte, do nome, tomou 504 — o que descartava a área recém-resolvida e
   * obrigava o retry a refazer tudo, por um rótulo de tela.
   */
  private async matchedName(areaId: number): Promise<string | null> {
    try {
      return await this.overpass.areaName(areaId);
    } catch {
      return null;
    }
  }

  private async fetchPois(areaId: number): Promise<OverpassPoi[]> {
    try {
      return await this.overpass.fetchPois(areaId);
    } catch (error) {
      throw new RetryableIngestionError('Overpass refused the query', error);
    }
  }

  /**
   * Turn raw points of interest into a ranked shortlist.
   *
   * This is the step that separates a guide from an inventory. OpenStreetMap
   * has no notion of importance — in Miami, 88 of 99 results were neighbourhood
   * parks. Having an English Wikipedia article, and how many people read it, is
   * the closest free signal to "people actually visit this".
   */
  private async rank(pois: OverpassPoi[]): Promise<{
    places: PlaceToPersist[];
    withEnwiki: number;
  }> {
    if (!pois.length) return { places: [], withEnwiki: 0 };

    const signals = await this.wikimedia.popularity(
      pois.map((poi) => poi.wikidataId),
      // O resumo é buscado depois, para os 10 que sobreviverem ao corte.
      { withExtract: false },
    );
    const byWikidata = new Map(signals.map((s) => [s.wikidataId, s]));

    const scored = pois
      .map((poi) => ({ poi, signal: byWikidata.get(poi.wikidataId) }))
      .filter(
        (row): row is { poi: OverpassPoi; signal: (typeof signals)[number] } =>
          row.signal !== undefined,
      )
      .sort((a, b) => b.signal.monthlyViews - a.signal.monthlyViews);

    const places = scored
      .slice(0, PLACES_PER_CITY)
      .map(({ poi, signal }, index) => ({
        name: poi.name,
        slug: slugify(poi.name),
        category: poi.category,
        lat: poi.lat,
        lng: poi.lng,
        address: poi.address,
        website: poi.website,
        isFree: poi.isFree,
        osmType: poi.osmType,
        osmId: poi.osmId,
        wikidataId: poi.wikidataId,
        wikipediaMonthlyViews: signal.monthlyViews,
        popularityScore: topScore(index),
        // Per-record attribution, which the ODbL licence requires.
        sourceUrl: `https://www.openstreetmap.org/${poi.osmType}/${poi.osmId}`,
      }));

    return { places, withEnwiki: scored.length };
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

function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 140);
}
