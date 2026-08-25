import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import {
  CityIngestionStatus,
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
    page: number;
    limit: number;
  }) {
    const where = params.status ? { status: params.status } : {};
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

  async updatePlace(
    placeId: string,
    data: { name?: string; isFree?: boolean; popularityScore?: number },
    translations: { language: string; description?: string; tip?: string }[],
  ) {
    for (const translation of translations) {
      await this.prisma.placeTranslation.update({
        where: {
          placeId_language: { placeId, language: translation.language },
        },
        data: {
          ...(translation.description !== undefined && {
            description: translation.description,
          }),
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
