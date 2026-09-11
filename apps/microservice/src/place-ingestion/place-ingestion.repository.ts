import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import {
  CityIngestionStatus,
  PlaceCategory,
} from '../../../../generated/prisma';

export interface PlaceToPersist {
  name: string;
  slug: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  address?: string;
  website?: string;
  isFree: boolean;
  wikidataId: string;
  wikipediaMonthlyViews: number;
  popularityScore: number;
  sourceUrl: string;
}

/**
 * A place the ingestion found but refused to touch, and why.
 *
 * A type alias and not an interface: this ends up inside a Prisma `Json`
 * column, and only aliases satisfy `InputJsonValue`'s index signature.
 */
export type Conflict = {
  slug: string;
  wikidataId: string;
  rank: number;
  monthlyViews: number;
};

/** What one run found, kept and refused. The review screen reads this. */
export type IngestionStats = {
  rawElements: number;
  /** Candidates whose Wikidata class maps to no category of ours. */
  droppedAsUnmapped: number;
  withEnwiki: number;
  kept: number;
  created: number;
  conflicts: Conflict[];
};

/** Which city the places belong to: the name alone does not say. */
export interface CityLocation {
  countryCode: string;
  city: string;
  state: string | null;
  /** As the API folded it on the ingestion row; null when there is no state. */
  stateKey: string | null;
}

export interface PersistResult {
  /** Id and slug together: the caller pairs the row with per-slug side data. */
  created: { id: string; slug: string }[];
  conflicts: Conflict[];
}

export interface PlaceTexts {
  language: string;
  description: string;
  tip: string | null;
}

@Injectable()
export class PlaceIngestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  findIngestion(id: string) {
    return this.prisma.cityIngestion.findUnique({ where: { id } });
  }

  findPlace(id: string) {
    return this.prisma.place.findUnique({ where: { id } });
  }

  markStep(id: string, step: string) {
    return this.prisma.cityIngestion.update({
      where: { id },
      data: { step, status: CityIngestionStatus.PROCESSING },
    });
  }

  /**
   * A `step` of null keeps whichever step the ingestion had reached — the
   * pipeline already recorded it on the way in, and a generic failure knows
   * less about where it happened than that mark does.
   */
  markFailed(id: string, step: string | null, errorMessage: string) {
    return this.prisma.cityIngestion.update({
      where: { id },
      data: {
        status: CityIngestionStatus.FAILED,
        errorMessage,
        ...(step ? { step } : {}),
      },
    });
  }

  /**
   * Keep the Wikidata entity the city resolved to.
   *
   * It is the only identity of the city anyone has verified — the name is
   * what the admin asked for, this is what was found — and it used to reach
   * the log and nothing else.
   */
  saveCityWikidataId(id: string, cityWikidataId: string) {
    return this.prisma.cityIngestion.update({
      where: { id },
      data: { cityWikidataId },
    });
  }

  saveStats(id: string, stats: IngestionStats) {
    return this.prisma.cityIngestion.update({
      where: { id },
      data: { stats },
    });
  }

  /**
   * Write the ranked places as drafts, without ever overwriting curated ones.
   *
   * The unique key is `[countryCode, city, stateKey, slug]`, so re-running a
   * city lands on the same rows — and Campo Grande in Alagoas never lands on
   * the rows of Campo Grande in Mato Grosso do Sul. That is what makes the job
   * safe to retry, but it is also what would let a generated description
   * replace a hand-written one.
   *
   * The state key is the one the API folded when it created the ingestion,
   * copied as it is; `''` stands for "no state", because the unique index
   * would treat a NULL as different from every other NULL.
   *
   * So anything already in the table under a status other than DRAFT is left
   * exactly as it is and reported as a conflict. Two reasons:
   *
   * - Lisbon holds ten places written by hand. They are the control the pilot
   *   measures against; overwriting them would destroy the comparison.
   * - A REJECTED place is a decision somebody made. Re-creating it on the next
   *   run would quietly undo that decision.
   *
   * The conflict list is not a consolation prize — it is the redisovery metric:
   * how many hand-picked places the pipeline found on its own.
   */
  async persistDrafts(
    ingestionId: string,
    location: CityLocation,
    countryId: string | null,
    places: PlaceToPersist[],
  ): Promise<PersistResult> {
    const { countryCode, city, state } = location;
    const stateKey = location.stateKey ?? '';

    const existing = await this.prisma.place.findMany({
      where: {
        countryCode,
        city,
        stateKey,
        slug: { in: places.map((place) => place.slug) },
        reviewStatus: { not: 'DRAFT' },
      },
      select: { slug: true },
    });
    const untouchable = new Set(existing.map((row) => row.slug));

    const created: { id: string; slug: string }[] = [];
    const conflicts: Conflict[] = [];

    for (const [index, place] of places.entries()) {
      if (untouchable.has(place.slug)) {
        conflicts.push({
          slug: place.slug,
          wikidataId: place.wikidataId,
          rank: index + 1,
          monthlyViews: place.wikipediaMonthlyViews,
        });
        continue;
      }

      const data = {
        ...place,
        countryCode,
        city,
        state,
        stateKey,
        countryId,
        ingestionId,
        reviewStatus: 'DRAFT' as const,
        // Invisible to the public until a human approves the city. The public
        // repository already filters on isActive, so nothing else changes.
        isActive: false,
      };

      const saved = await this.prisma.place.upsert({
        where: {
          countryCode_city_stateKey_slug: {
            countryCode,
            city,
            stateKey,
            slug: place.slug,
          },
        },
        create: data,
        update: data,
        select: { id: true },
      });
      created.push({ id: saved.id, slug: place.slug });
    }

    return { created, conflicts };
  }

  async saveTexts(
    placeId: string,
    texts: PlaceTexts[],
    provenance: {
      generatedByModel: string | null;
      generationCostUsd: number | null;
    },
  ): Promise<void> {
    for (const text of texts) {
      await this.prisma.placeTranslation.upsert({
        where: {
          placeId_language: { placeId, language: text.language },
        },
        create: { ...text, placeId },
        update: { description: text.description, tip: text.tip },
      });
    }

    await this.prisma.place.update({
      where: { id: placeId },
      data: {
        generatedByModel: provenance.generatedByModel,
        generationCostUsd: provenance.generationCostUsd,
      },
    });
  }

  /** The image landed: URL plus the attribution the licence requires. */
  savePlaceImage(
    placeId: string,
    image: {
      imageUrl: string;
      imageLicense: string | null;
      imageAuthor: string | null;
    },
  ) {
    return this.prisma.place.update({
      where: { id: placeId },
      data: image,
    });
  }

  findCountryIdByName(name: string) {
    return this.prisma.country.findUnique({
      where: { name },
      select: { id: true },
    });
  }

  /**
   * Record that a place's text gave up for good.
   *
   * Written straight into the stats JSON rather than read-modify-written from
   * TypeScript: `jsonb ||` appends inside the single UPDATE, so two workers
   * failing at the same moment cannot lose one another's entry. Read-modify-
   * write would, and this list is what decides whether the city is finished.
   */
  /**
   * How many places of this city came out with no text.
   *
   * Read straight from the same array `recordTextFailure` writes, so the number
   * the admin is told matches what the review screen will show them.
   */
  async countTextFailures(ingestionId: string): Promise<number> {
    const stats = await this.prisma.cityIngestion.findUnique({
      where: { id: ingestionId },
      select: { stats: true },
    });
    const failures = (stats?.stats as { textFailures?: string[] } | null)
      ?.textFailures;
    return failures?.length ?? 0;
  }

  recordTextFailure(ingestionId: string, placeId: string) {
    return this.prisma.$executeRaw`
      UPDATE city_ingestions
      SET stats = jsonb_set(
        COALESCE(stats, '{}'::jsonb),
        '{textFailures}',
        COALESCE(stats->'textFailures', '[]'::jsonb) || to_jsonb(${placeId}::text)
      )
      WHERE id = ${ingestionId}::uuid
    `;
  }

  /**
   * How many places of this ingestion are still waiting on their text.
   *
   * A place whose text failed every attempt is not waiting for anything — it is
   * done, badly. Counting it forever would leave the city in PROCESSING and
   * hide nine good places behind one bad one, so the recorded failures come out
   * of the count and surface on the review screen instead.
   */
  async countPendingTexts(ingestionId: string): Promise<number> {
    const ingestion = await this.prisma.cityIngestion.findUnique({
      where: { id: ingestionId },
      select: { stats: true },
    });
    const stats = ingestion?.stats as { textFailures?: string[] } | null;

    return this.prisma.place.count({
      where: {
        ingestionId,
        reviewStatus: 'DRAFT',
        translations: { none: {} },
        id: { notIn: stats?.textFailures ?? [] },
      },
    });
  }

  /**
   * Move the ingestion to READY_FOR_REVIEW, but only from PROCESSING.
   *
   * Every text job calls this when it finishes. They run in parallel, so
   * several may find the work done at the same moment; the `status` in the
   * where clause makes the transition a compare-and-set, and only one of them
   * changes a row. The count tells the caller whether it was the one that won,
   * so the "city is ready" notification fires exactly once.
   */
  async markReadyIfDone(ingestionId: string): Promise<boolean> {
    const { count } = await this.prisma.cityIngestion.updateMany({
      where: { id: ingestionId, status: CityIngestionStatus.PROCESSING },
      data: { status: CityIngestionStatus.READY_FOR_REVIEW, step: null },
    });
    return count === 1;
  }
}
