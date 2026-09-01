import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { Prisma } from '../../../../generated/prisma';
import {
  PlaceCitiesQueryDto,
  PlacesListQueryDto,
} from './dto/places-list-query.dto';

@Injectable()
export class PlacesRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(query: PlacesListQueryDto): Prisma.PlaceWhereInput {
    const where: Prisma.PlaceWhereInput = {
      countryCode: query.countryCode,
      isActive: true,
    };

    // A cidade chega do seletor do frontend, que lê do CountriesNow. A
    // comparação ignora caixa porque o mesmo nome aparece com grafias
    // diferentes entre a URL, o seed e o que o usuário digita.
    if (query.city) {
      where.city = { equals: query.city, mode: 'insensitive' };
    }
    if (query.category) {
      where.category = query.category;
    }
    if (query.q) {
      where.name = { contains: query.q, mode: 'insensitive' };
    }
    if (query.free) {
      where.isFree = true;
    }

    return where;
  }

  async findPublic(query: PlacesListQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const where = this.buildWhere(query);

    const orderBy: Prisma.PlaceOrderByWithRelationInput[] =
      query.sort === 'name'
        ? [{ name: 'asc' }]
        : [{ popularityScore: 'desc' }, { name: 'asc' }];

    const [data, total] = await Promise.all([
      this.prisma.place.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        // `select` explícito, e não `include`: assim a resposta tem exatamente
        // os campos de `PlaceResponseDto`. Com `include` vazavam `isActive`,
        // `createdAt` e `updatedAt` — campos que o contrato não promete, e
        // contrato que não bate com a resposta já custou um PR aqui.
        select: {
          id: true,
          name: true,
          slug: true,
          category: true,
          countryCode: true,
          countryId: true,
          city: true,
          lat: true,
          lng: true,
          imageUrl: true,
          imageLicense: true,
          imageAuthor: true,
          popularityScore: true,
          isFree: true,
          // A faixa de destaques lê daqui, junto com a lista.
          featureKind: true,
          featuredFrom: true,
          featuredUntil: true,
          address: true,
          website: true,
          sourceUrl: true,
          translations: {
            select: { language: true, description: true, tip: true },
          },
        },
      }),
      this.prisma.place.count({ where }),
    ]);

    return { data, total };
  }

  /**
   * Cidades que têm lugares, com o centro do mapa.
   *
   * O centro é a média das coordenadas dos lugares da cidade. Não existe model
   * City, então é daqui que sai o único centro confiável — e é por isso que
   * este endpoint existe separado da listagem.
   */
  async findCities(query: PlaceCitiesQueryDto) {
    const rows = await this.prisma.place.groupBy({
      by: ['countryCode', 'city'],
      where: {
        isActive: true,
        ...(query.countryCode ? { countryCode: query.countryCode } : {}),
      },
      _count: { _all: true },
      _avg: { lat: true, lng: true },
      orderBy: [{ countryCode: 'asc' }, { city: 'asc' }],
    });

    return rows.map((row) => ({
      countryCode: row.countryCode,
      city: row.city,
      count: row._count._all,
      lat: row._avg.lat ?? 0,
      lng: row._avg.lng ?? 0,
    }));
  }
}
