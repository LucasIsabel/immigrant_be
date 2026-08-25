import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import {
  CityIngestionStatus,
  PlaceReviewStatus,
  Prisma,
} from '../../../../generated/prisma';

/** Estados em que a cidade ainda está em jogo — nem aprovada, nem descartada. */
const EM_ANDAMENTO: CityIngestionStatus[] = [
  CityIngestionStatus.PROCESSING,
  CityIngestionStatus.READY_FOR_REVIEW,
];

const LUGAR_ADMIN = {
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
   * Uma ingestão ativa por cidade.
   *
   * É guarda de serviço e não constraint de banco de propósito: a mesma cidade
   * pode ter várias ingestões ao longo do tempo — aprovadas, recusadas, uma nova
   * depois de melhorar o pipeline. O que não pode é **duas ao mesmo tempo**, que
   * disputariam os mesmos slugs.
   */
  findActiveForCity(countryCode: string, city: string) {
    return this.prisma.cityIngestion.findFirst({
      where: { countryCode, city, status: { in: EM_ANDAMENTO } },
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
          select: LUGAR_ADMIN,
          orderBy: { popularityScore: 'desc' },
        },
      },
    });
  }

  findPlaceInIngestion(ingestionId: string, placeId: string) {
    return this.prisma.place.findFirst({
      where: { id: placeId, ingestionId },
      select: LUGAR_ADMIN,
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
      select: LUGAR_ADMIN,
    });
  }

  rejectPlace(placeId: string) {
    return this.prisma.place.update({
      where: { id: placeId },
      data: { reviewStatus: PlaceReviewStatus.REJECTED, isActive: false },
      select: LUGAR_ADMIN,
    });
  }

  /**
   * Guarda o porquê de um lugar ter sido recusado.
   *
   * Vai no `stats` da ingestão e não numa coluna de `Place` porque é registro
   * desta corrida, não atributo do lugar — e porque uma coluna nova custaria
   * uma migration coordenada com produção para guardar uma frase. O `jsonb ||`
   * faz o append dentro do próprio UPDATE, então duas recusas simultâneas não
   * se perdem.
   *
   * A alternativa era aceitar o motivo e descartá-lo, o que é pior que não
   * pedir: o admin escreve uma justificativa que some sem aviso.
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
   * Rascunhos que ainda não têm as três traduções.
   *
   * São eles que impedem a cidade de ser aprovada: publicar um lugar sem
   * descrição em espanhol o deixaria mudo para quem navega em espanhol, e o
   * card já está na tela. Uma consulta só, filtrada aqui — a alternativa em SQL
   * seria um `having count(*)` que ninguém lê depois.
   */
  async findDraftsMissingTexts(ingestionId: string, languages: string[]) {
    const rascunhos = await this.prisma.place.findMany({
      where: { ingestionId, reviewStatus: PlaceReviewStatus.DRAFT },
      select: {
        id: true,
        name: true,
        slug: true,
        translations: { select: { language: true } },
      },
    });

    return rascunhos
      .filter((lugar) => {
        const tem = new Set(lugar.translations.map((t) => t.language));
        return !languages.every((language) => tem.has(language));
      })
      .map(({ id, name, slug }) => ({ id, name, slug }));
  }

  /**
   * Aprovar a cidade publica os rascunhos numa transação.
   *
   * Os dois updates andam juntos porque um lugar `APPROVED` mas `isActive:
   * false` seria invisível sem ninguém saber por quê, e uma cidade `APPROVED`
   * com rascunhos soltos não teria como ser reaprovada.
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

  /** Devolve a ingestão a PROCESSING para uma nova tentativa. */
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
