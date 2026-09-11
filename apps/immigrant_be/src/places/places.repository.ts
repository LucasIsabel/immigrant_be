import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { Prisma } from '../../../../generated/prisma';
import { featuredWhere } from '../common/featured/featured';
import { mergeCitySpellings } from '../business/city-groups';
import { normalizeCity, stateFilterKey } from '../business/city-key';
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

    // Compared by the folded key, as businesses are: the name reaches us from
    // two catalogues that disagree on accents, and "Póvoa de Varzim" has to
    // find the places stored as "Povoa de Varzim".
    if (query.city) {
      where.cityKey = normalizeCity(query.city);
    }
    // Which of two cities with that name, when the request says. Without a
    // state the filter is the one it always was.
    const stateKey = stateFilterKey(query);
    if (stateKey) {
      where.stateKey = stateKey;
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
    if (query.featured) {
      Object.assign(where, featuredWhere());
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
          state: true,
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
   *
   * Grouped by the state as well: two cities that share a name are two
   * entries with two centres, not one centre averaged between them.
   *
   * And by the keys, so the spellings of one city come back as one entry —
   * see `mergeCitySpellings`. The stored name is grouped too only so there is
   * a spelling to show.
   */
  async findCities(query: PlaceCitiesQueryDto) {
    const rows = await this.prisma.place.groupBy({
      by: ['countryCode', 'cityKey', 'stateKey', 'city', 'state'],
      where: {
        isActive: true,
        ...(query.countryCode ? { countryCode: query.countryCode } : {}),
      },
      _count: { _all: true },
      _avg: { lat: true, lng: true },
      orderBy: [{ countryCode: 'asc' }, { city: 'asc' }, { state: 'asc' }],
    });

    const cities = mergeCitySpellings(
      rows.map((row) => ({
        country: row.countryCode,
        city: row.city,
        state: row.state,
        cityKey: row.cityKey,
        stateKey: row.stateKey,
        count: row._count._all,
        // `lat` is required on a place, so every row of the group has one.
        located: row._count._all,
        lat: row._avg.lat,
        lng: row._avg.lng,
      })),
    );

    return cities.map((city) => ({
      countryCode: city.country,
      city: city.city,
      state: city.state,
      count: city.count,
      lat: city.lat ?? 0,
      lng: city.lng ?? 0,
    }));
  }
}
