import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import {
  CityIngestionStatus,
  PlaceCategory,
  PlaceReviewStatus,
  Prisma,
} from '../../../../generated/prisma';

/** States where the city is still in play — neither approved nor discarded. */
const IN_FLIGHT: CityIngestionStatus[] = [
  CityIngestionStatus.PROCESSING,
  CityIngestionStatus.READY_FOR_REVIEW,
];

const ADMIN_PLACE = {
  id: true,
  name: true,
  countryCode: true,
  city: true,
  imageUrl: true,
  imageLicense: true,
  imageAuthor: true,
  slug: true,
  category: true,
  reviewStatus: true,
  isActive: true,
  lat: true,
  lng: true,
  isFree: true,
  popularityScore: true,
  address: true,
  website: true,
  sourceUrl: true,
  wikidataId: true,
  wikipediaMonthlyViews: true,
  generatedByModel: true,
  generationCostUsd: true,
  translations: {
    select: { language: true, description: true, tip: true },
  },
} satisfies Prisma.PlaceSelect;

@Injectable()
export class PlacesAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * One active ingestion per city.
   *
   * Deliberately a service guard and not a database constraint: the same city
   * can be ingested many times over its life — approved, rejected, run again
   * once the pipeline improves. What it cannot have is **two at once**, which
   * would compete for the same slugs.
   */
  findActiveForCity(countryCode: string, city: string) {
    return this.prisma.cityIngestion.findFirst({
      where: { countryCode, city, status: { in: IN_FLIGHT } },
      select: { id: true, status: true },
    });
  }

  create(data: {
    countryCode: string;
    city: string;
    osmAreaId?: number;
    requestedById?: string;
  }) {
    return this.prisma.cityIngestion.create({
      data: {
        countryCode: data.countryCode,
        city: data.city,
        osmAreaId: data.osmAreaId ? BigInt(data.osmAreaId) : null,
        requestedById: data.requestedById,
      },
    });
  }

  async list(params: {
    status?: CityIngestionStatus;
    countryCode?: string;
    city?: string;
    page: number;
    limit: number;
  }) {
    const where: Prisma.CityIngestionWhereInput = {
      ...(params.status && { status: params.status }),
      ...(params.countryCode && { countryCode: params.countryCode }),
      // The city is stored as CountriesNow spelled it; `insensitive` stops
      // "lisbon" from returning nothing. Equality and not `contains`: the list
      // of cities is closed, so whoever filters picked one from it rather than
      // typing a fragment of a name.
      ...(params.city && {
        city: { equals: params.city, mode: Prisma.QueryMode.insensitive },
      }),
    };
    const [data, total] = await Promise.all([
      this.prisma.cityIngestion.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (params.page - 1) * params.limit,
        take: params.limit,
      }),
      this.prisma.cityIngestion.count({ where }),
    ]);
    return { data, total };
  }

  findById(id: string) {
    return this.prisma.cityIngestion.findUnique({ where: { id } });
  }

  findDetail(id: string) {
    return this.prisma.cityIngestion.findUnique({
      where: { id },
      include: {
        places: {
          select: ADMIN_PLACE,
          orderBy: { popularityScore: 'desc' },
        },
      },
    });
  }

  findPlaceInIngestion(ingestionId: string, placeId: string) {
    return this.prisma.place.findFirst({
      where: { id: placeId, ingestionId },
      select: ADMIN_PLACE,
    });
  }

  /**
   * Writes the edits an admin made to a draft place.
   *
   * `upsert`, because a place whose text writing failed has no translation
   * row at all, and `update` answered P2025 — a 500 — for the one place on
   * the screen that most needed editing.
   *
   * All of it in one transaction. The loop used to write each language on its
   * own, so a place holding `pt` but not `en` had the `pt` edit land and the
   * request then fail: a partial save reported to the admin as no save.
   */
  updatePlace(
    placeId: string,
    data: { name?: string; isFree?: boolean; popularityScore?: number },
    translations: { language: string; description?: string; tip?: string }[],
  ) {
    return this.prisma.$transaction(async (tx) => {
      for (const translation of translations) {
        if (translation.description === undefined) {
          // Only reachable for a language that already has a row: the service
          // refuses a request that would create one without a description,
          // because the column is not nullable and an empty one would put a
          // blank place in the catalogue.
          await tx.placeTranslation.update({
            where: {
              placeId_language: { placeId, language: translation.language },
            },
            data: {
              ...(translation.tip !== undefined && { tip: translation.tip }),
            },
          });
          continue;
        }

        await tx.placeTranslation.upsert({
          where: {
            placeId_language: { placeId, language: translation.language },
          },
          update: {
            description: translation.description,
            ...(translation.tip !== undefined && { tip: translation.tip }),
          },
          create: {
            placeId,
            language: translation.language,
            description: translation.description,
            tip: translation.tip ?? null,
          },
        });
      }

      return tx.place.update({
        where: { id: placeId },
        data,
        select: ADMIN_PLACE,
      });
    });
  }

  rejectPlace(placeId: string) {
    return this.prisma.place.update({
      where: { id: placeId },
      data: { reviewStatus: PlaceReviewStatus.REJECTED, isActive: false },
      select: ADMIN_PLACE,
    });
  }

  /**
   * Keep why a place was turned down.
   *
   * Stored in the ingestion's stats rather than a `Place` column because it
   * records this run, not an attribute of the place — and a new column would
   * cost a production-coordinated migration to hold one sentence. The
   * `jsonb ||` appends inside the UPDATE, so two rejections at the same moment
   * cannot lose one another.
   *
   * The alternative was accepting the reason and discarding it, which is worse
   * than not asking: the admin writes a justification that vanishes unnoticed.
   */
  recordPlaceRejection(ingestionId: string, placeId: string, reason: string) {
    return this.prisma.$executeRaw`
      UPDATE city_ingestions
      SET stats = jsonb_set(
        COALESCE(stats, '{}'::jsonb),
        '{placeRejections}',
        COALESCE(stats->'placeRejections', '[]'::jsonb)
          || jsonb_build_object('placeId', ${placeId}::text, 'reason', ${reason}::text)
      )
      WHERE id = ${ingestionId}::uuid
    `;
  }

  /**
   * Drafts that do not yet carry all three translations.
   *
   * They are what blocks the city from being approved: publishing a place with
   * no Spanish description would leave it mute for anyone browsing in Spanish,
   * and the card is already on screen. One query, filtered here — the SQL
   * alternative is a `having count(*)` nobody reads later.
   */
  async findDraftsMissingTexts(ingestionId: string, languages: string[]) {
    const drafts = await this.prisma.place.findMany({
      where: { ingestionId, reviewStatus: PlaceReviewStatus.DRAFT },
      select: {
        id: true,
        name: true,
        slug: true,
        translations: { select: { language: true } },
      },
    });

    return drafts
      .filter((place) => {
        const present = new Set(place.translations.map((t) => t.language));
        return !languages.every((language) => present.has(language));
      })
      .map(({ id, name, slug }) => ({ id, name, slug }));
  }

  /**
   * Approving the city publishes its drafts in one transaction.
   *
   * The two updates travel together because a place left `APPROVED` but
   * `isActive: false` would be invisible with nobody knowing why, and a city
   * marked `APPROVED` with drafts still loose could never be approved again.
   */
  approve(ingestionId: string, adminId: string) {
    return this.prisma.$transaction(async (tx) => {
      const { count } = await tx.place.updateMany({
        where: { ingestionId, reviewStatus: PlaceReviewStatus.DRAFT },
        data: { reviewStatus: PlaceReviewStatus.APPROVED, isActive: true },
      });

      const ingestion = await tx.cityIngestion.update({
        where: { id: ingestionId },
        data: {
          status: CityIngestionStatus.APPROVED,
          approvedAt: new Date(),
          approvedById: adminId,
        },
      });

      return { ingestion, published: count };
    });
  }

  reject(ingestionId: string, adminId: string, reason: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.place.updateMany({
        where: { ingestionId, reviewStatus: PlaceReviewStatus.DRAFT },
        data: { reviewStatus: PlaceReviewStatus.REJECTED, isActive: false },
      });

      return tx.cityIngestion.update({
        where: { id: ingestionId },
        data: {
          status: CityIngestionStatus.REJECTED,
          rejectedAt: new Date(),
          rejectedById: adminId,
          rejectionReason: reason,
        },
      });
    });
  }

  // ── Live catalogue (#159) ─────────────────────────────────────────────
  // Everything below operates on the whole `places` table — curated rows
  // included, which belong to no ingestion and were invisible to the review
  // flow above.

  async listCatalog(params: {
    countryCode?: string;
    city?: string;
    category?: PlaceCategory;
    reviewStatus?: PlaceReviewStatus;
    isActive?: boolean;
    search?: string;
    page: number;
    limit: number;
  }) {
    const where: Prisma.PlaceWhereInput = {
      ...(params.countryCode && { countryCode: params.countryCode }),
      ...(params.city && { city: params.city }),
      ...(params.category && { category: params.category }),
      ...(params.reviewStatus && { reviewStatus: params.reviewStatus }),
      ...(params.isActive !== undefined && { isActive: params.isActive }),
      ...(params.search && {
        name: { contains: params.search, mode: 'insensitive' as const },
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.place.findMany({
        where,
        select: ADMIN_PLACE,
        orderBy: [{ city: 'asc' }, { popularityScore: 'desc' }],
        skip: (params.page - 1) * params.limit,
        take: params.limit,
      }),
      this.prisma.place.count({ where }),
    ]);

    return { data, total };
  }

  findCatalogPlace(id: string) {
    return this.prisma.place.findUnique({
      where: { id },
      select: ADMIN_PLACE,
    });
  }

  /**
   * Edit any live place, whatever its review status.
   *
   * Translations are upserted, not updated: a curated place edited into a
   * language it never had should gain it, not 500. The ingestion PATCH above
   * keeps its stricter update — there, a missing translation means the text
   * job has not run yet, and writing one would race it.
   */
  async updateCatalogPlace(
    placeId: string,
    data: {
      name?: string;
      category?: PlaceCategory;
      isFree?: boolean;
      popularityScore?: number;
      address?: string;
      website?: string;
    },
    translations: { language: string; description?: string; tip?: string }[],
  ) {
    for (const translation of translations) {
      if (!translation.description) continue;
      await this.prisma.placeTranslation.upsert({
        where: {
          placeId_language: { placeId, language: translation.language },
        },
        create: {
          placeId,
          language: translation.language,
          description: translation.description,
          tip: translation.tip ?? null,
        },
        update: {
          description: translation.description,
          ...(translation.tip !== undefined && { tip: translation.tip }),
        },
      });
    }

    return this.prisma.place.update({
      where: { id: placeId },
      data,
      select: ADMIN_PLACE,
    });
  }

  setPlaceActive(placeId: string, isActive: boolean) {
    return this.prisma.place.update({
      where: { id: placeId },
      data: { isActive },
      select: ADMIN_PLACE,
    });
  }

  /** Translations cascade on delete (schema-level), nothing else references a place. */
  deletePlace(placeId: string) {
    return this.prisma.place.delete({ where: { id: placeId } });
  }

  /** Hand the ingestion back to PROCESSING for another attempt. */
  reopen(id: string) {
    return this.prisma.cityIngestion.update({
      where: { id },
      data: {
        status: CityIngestionStatus.PROCESSING,
        errorMessage: null,
      },
    });
  }
}
