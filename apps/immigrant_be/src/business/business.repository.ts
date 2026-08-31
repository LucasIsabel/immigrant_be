import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { Prisma } from '../../../../generated/prisma';
import { normalizeCity } from './city-key';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BusinessListQueryDto } from './dto/business-list-query.dto';
import { BusinessType } from '../../../../generated/prisma';

/**
 * O resumo da página pública, embutido em toda listagem de negócio.
 *
 * O dashboard usa o status para o badge; o /my-city usa o slug para linkar o
 * cartão à página que o dono desenhou. Sem o join nas rotas públicas o link
 * não existia: nada fora do dashboard sabia que a página existe, e o visitante
 * (e o crawler) não tinha como chegar nela.
 */
const BUSINESS_PAGE_SUMMARY = {
  businessPage: {
    select: { id: true, slug: true, status: true },
  },
} satisfies Prisma.BusinessInclude;

/**
 * What leaves the database for a visitor.
 *
 * A `select`, not an omission after the fact: the fields a visitor must not
 * see never leave Postgres, so no later `include`, mapper or serialiser can
 * put them back by accident.
 *
 * Absent on purpose — `draftData`, the owner's unpublished edit, which was
 * readable by anyone holding a business id; `userId`, which tells a visitor
 * who owns a listing and therefore which listings share an owner; and
 * `isPublic`, which since the approved-page fix would announce an owner's
 * choice not to appear in the directory.
 */
const PUBLIC_BUSINESS_SELECT = {
  id: true,
  businessType: true,
  name: true,
  description: true,
  address: true,
  city: true,
  country: true,
  state: true,
  lat: true,
  lng: true,
  phone: true,
  email: true,
  website: true,
  photos: true,
  typeData: true,
  // A página pública e o card da listagem leem o horário daqui, ao vivo — ele
  // não passa mais pelo conteúdo moderado da página.
  openingHours: true,
  timezone: true,
  createdAt: true,
  updatedAt: true,
  ...BUSINESS_PAGE_SUMMARY,
} satisfies Prisma.BusinessSelect;

export type PublicBusiness = Prisma.BusinessGetPayload<{
  select: typeof PUBLIC_BUSINESS_SELECT;
}>;

@Injectable()
export class BusinessRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Derives `cityKey` whenever a write carries a city.
   *
   * Every live write to `city` goes through here, and that is the whole point:
   * a row whose key does not match its name is a business the public search
   * cannot find, and nothing on any screen would say so. Leaving each caller
   * to remember is how that happens.
   */
  private withCityKey<T extends { city?: string }>(data: T): T {
    return data.city === undefined
      ? data
      : { ...data, cityKey: normalizeCity(data.city) };
  }

  create(userId: string, data: CreateBusinessDto) {
    return this.prisma.business.create({
      // `openingHours` é uma classe no DTO — para o swagger, e portanto para o
      // tipo gerado no frontend, dizerem a forma de verdade em vez de `object`.
      // O Prisma quer JSON puro, e a conversão é aqui, na borda.
      data: { userId, ...this.withCityKey(data) } as never,
    });
  }

  findAllByUserId(userId: string) {
    // A página pública vem junto (join na relação 1:1) porque a listagem do
    // dashboard mostra o status dela em cada card. Sem isto o FE fazia uma
    // requisição por card só para descobrir o badge — N+1 sobre HTTP.
    return this.prisma.business.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: BUSINESS_PAGE_SUMMARY,
    });
  }

  findByIdAndUserId(id: string, userId: string) {
    return this.prisma.business.findFirst({
      where: { id, userId },
    });
  }

  update(id: string, data: UpdateBusinessDto) {
    return this.prisma.business.update({
      where: { id },
      data: this.withCityKey(data) as never,
    });
  }

  /** Apply validated draft fields to live business and clear `draftData`. */
  applyDraftAndClearDraft(id: string, data: UpdateBusinessDto) {
    return this.prisma.business.update({
      where: { id },
      data: {
        ...this.withCityKey(data),
        draftData: Prisma.JsonNull,
      } as never,
    });
  }

  saveDraft(id: string, draft: object) {
    return this.prisma.business.update({
      where: { id },
      data: { draftData: draft },
    });
  }

  clearDraft(id: string) {
    return this.prisma.business.update({
      where: { id },
      data: { draftData: Prisma.JsonNull },
    });
  }

  delete(id: string) {
    return this.prisma.business.delete({
      where: { id },
    });
  }

  toggleVisibility(id: string, isPublic: boolean) {
    return this.prisma.business.update({
      where: { id },
      data: { isPublic },
    });
  }

  async findPublic(
    query: BusinessListQueryDto,
  ): Promise<{ data: PublicBusiness[]; total: number }> {
    const {
      country,
      city,
      businessType,
      search,
      page = 1,
      limit = 20,
      lat,
      lng,
      radius,
    } = query;

    const useGeo =
      lat !== undefined && lng !== undefined && radius !== undefined;

    if (useGeo) {
      return this.findPublicByRadius({
        country,
        city,
        businessType,
        search,
        page,
        limit,
        lat: lat,
        lng: lng,
        radius: radius,
      });
    }

    const where = {
      isPublic: true,
      // Sem país, "Córdoba" traz a argentina e a espanhola no mesmo balde.
      // `insensitive` por segurança barata; o nome vem do mesmo catálogo dos
      // dois lados, então na prática já casa.
      ...(country && {
        country: { equals: country, mode: 'insensitive' as const },
      }),
      // Comparada na forma normalizada, não como foi escrita: os dois
      // catálogos de onde os nomes vêm discordam nos acentos, e uma igualdade
      // exata perde a cidade certa por causa de um til.
      ...(city && { cityKey: normalizeCity(city) }),
      ...(businessType && { businessType }),
      ...(search && {
        name: { contains: search, mode: 'insensitive' as const },
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.business.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: PUBLIC_BUSINESS_SELECT,
      }),
      this.prisma.business.count({ where }),
    ]);

    return { data, total };
  }

  /**
   * The cities that have something to show, straight from the businesses.
   *
   * The city selector on My City used to be built from a third-party
   * catalogue, and a city that catalogue did not name could never be picked —
   * so a business there was unreachable no matter how correct its record was.
   * Derived from real rows, the option offered is by construction the spelling
   * that is stored, which also sidesteps the exact-match comparison in
   * `findPublic`.
   *
   * Grouped by the country **name**: that is what `Business.country` holds.
   */
  async findPublicCities(params: { country?: string }) {
    const rows = await this.prisma.business.groupBy({
      by: ['country', 'city'],
      where: {
        isPublic: true,
        // `country` is nullable on the model, and a row without one cannot be
        // attributed to any country the selector might be showing.
        ...(params.country
          ? { country: params.country }
          : { country: { not: null } }),
      },
      _count: { _all: true },
      // O centro serve à busca por proximidade: escolher "Porto" tem de poder
      // encontrar um negócio em Vila Nova de Gaia, a quatro quilómetros. A
      // média ignora linhas sem coordenada, e devolve null se nenhuma tiver.
      _avg: { lat: true, lng: true },
      orderBy: [{ country: 'asc' }, { city: 'asc' }],
    });

    return rows
      .filter((row): row is typeof row & { country: string } =>
        Boolean(row.country),
      )
      .map((row) => ({
        country: row.country,
        city: row.city,
        count: row._count._all,
        lat: row._avg.lat,
        lng: row._avg.lng,
      }));
  }

  private async findPublicByRadius(params: {
    country?: string;
    city?: string;
    businessType?: BusinessType;
    search?: string;
    page: number;
    limit: number;
    lat: number;
    lng: number;
    radius: number;
  }): Promise<{ data: PublicBusiness[]; total: number }> {
    const {
      country,
      city,
      businessType,
      search,
      page,
      limit,
      lat,
      lng,
      radius,
    } = params;
    const offset = (page - 1) * limit;

    const conditions: Prisma.Sql[] = [
      Prisma.sql`b.is_public = true`,
      Prisma.sql`b.lat IS NOT NULL`,
      Prisma.sql`b.lng IS NOT NULL`,
      Prisma.sql`(6371 * acos(cos(radians(${lat})) * cos(radians(b.lat)) * cos(radians(b.lng) - radians(${lng})) + sin(radians(${lat})) * sin(radians(b.lat)))) <= ${radius}`,
    ];

    // O país entra também aqui: um raio junto de uma fronteira atravessa-a —
    // Elvas e Badajoz estão a quinze quilómetros uma da outra.
    if (country)
      conditions.push(Prisma.sql`lower(b.country) = ${country.toLowerCase()}`);
    if (city) conditions.push(Prisma.sql`b.city_key = ${normalizeCity(city)}`);
    if (businessType)
      conditions.push(
        Prisma.sql`b.business_type = ${businessType}::"BusinessType"`,
      );
    if (search) conditions.push(Prisma.sql`b.name ILIKE ${'%' + search + '%'}`);

    const where = Prisma.join(conditions, ' AND ');

    // Raw SQL returns only IDs to avoid snake_case/camelCase mismatch.
    // Prisma ORM then fetches full records with correct field mapping.
    const [idRows, countRows] = await Promise.all([
      this.prisma.$queryRaw<{ id: string }[]>(
        Prisma.sql`SELECT b.id FROM businesses b WHERE ${where} ORDER BY b.created_at DESC LIMIT ${limit} OFFSET ${offset}`,
      ),
      this.prisma.$queryRaw<[{ count: bigint }]>(
        Prisma.sql`SELECT COUNT(*) as count FROM businesses b WHERE ${where}`,
      ),
    ]);

    const ids = idRows.map((r) => r.id);
    const data =
      ids.length > 0
        ? await this.prisma.business.findMany({
            where: { id: { in: ids } },
            orderBy: { createdAt: 'desc' },
            select: PUBLIC_BUSINESS_SELECT,
          })
        : [];

    return { data, total: Number(countRows[0].count) };
  }

  /**
   * The business behind a page a visitor can already see.
   *
   * `isPublic` is the owner's own switch, and what it promises them is
   * "list publicly on My City" — the directory, the map, the event
   * eligibility. It was also, by accident, gating this read, which is where
   * the public page gets the currency its prices are in and the gallery it
   * shows. So an approved page whose owner had never flipped that switch went
   * live with prices missing their symbol and no photographs at all.
   *
   * A page the platform has approved is public by that fact. The switch keeps
   * meaning one thing — whether the business appears in the directory — and
   * the listings below still honour it.
   */
  findVisibleById(id: string) {
    return this.prisma.business.findFirst({
      where: {
        id,
        OR: [
          { isPublic: true },
          {
            businessPage: {
              status: { in: ['APPROVED', 'APPROVED_WITH_PENDING'] },
            },
          },
        ],
      },
      select: PUBLIC_BUSINESS_SELECT,
    });
  }
}
