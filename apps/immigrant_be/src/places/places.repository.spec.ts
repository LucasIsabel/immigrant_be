// Sem isto, importar o repositório puxa @app/database -> config -> better-auth,
// que não sobe no ambiente de teste. Mesmo mock de country.repository.spec.
jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test } from '@nestjs/testing';
import { PrismaService } from '@app/database';
import { PlaceCategory } from '../../../../generated/prisma';
import { PlacesRepository } from './places.repository';

const prisma = {
  place: {
    findMany: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
  },
};

describe('PlacesRepository', () => {
  let repository: PlacesRepository;

  beforeEach(async () => {
    jest.clearAllMocks();
    prisma.place.findMany.mockResolvedValue([]);
    prisma.place.count.mockResolvedValue(0);
    prisma.place.groupBy.mockResolvedValue([]);

    const moduleRef = await Test.createTestingModule({
      providers: [
        PlacesRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = moduleRef.get(PlacesRepository);
  });

  // O mock é `jest.fn()` sem genérico, então `mock.calls` é `any`. A asserção
  // dá tipo ao que o teste inspeciona sem precisar tipar o mock inteiro.
  const argsDaBusca = () =>
    prisma.place.findMany.mock.calls[0][0] as {
      where: Record<string, unknown>;
      orderBy: unknown;
      skip: number;
      take: number;
    };

  it('só devolve lugar ativo do país pedido', async () => {
    await repository.findPublic({ countryCode: 'PT' });

    expect(argsDaBusca().where).toMatchObject({
      countryCode: 'PT',
      isActive: true,
    });
  });

  it('compara a cidade ignorando caixa', async () => {
    // O nome chega da URL e do seletor, e as grafias divergem.
    await repository.findPublic({ countryCode: 'PT', city: 'lisbon' });

    expect(argsDaBusca().where.city).toEqual({
      equals: 'lisbon',
      mode: 'insensitive',
    });
  });

  it('ordena por popularidade e desempata pelo nome', async () => {
    await repository.findPublic({ countryCode: 'PT', sort: 'popular' });

    expect(argsDaBusca().orderBy).toEqual([
      { popularityScore: 'desc' },
      { name: 'asc' },
    ]);
  });

  it('aceita ordenar por nome', async () => {
    await repository.findPublic({ countryCode: 'PT', sort: 'name' });

    expect(argsDaBusca().orderBy).toEqual([{ name: 'asc' }]);
  });

  it('filtra por categoria, busca e gratuito', async () => {
    await repository.findPublic({
      countryCode: 'ES',
      category: PlaceCategory.MUSEUM,
      q: 'picasso',
      free: true,
    });

    expect(argsDaBusca().where).toMatchObject({
      category: PlaceCategory.MUSEUM,
      name: { contains: 'picasso', mode: 'insensitive' },
      isFree: true,
    });
  });

  it('não filtra por gratuito quando `free` é falso', async () => {
    // `free=false` significa "tanto faz", não "só os pagos".
    await repository.findPublic({ countryCode: 'PT', free: false });

    expect(argsDaBusca().where).not.toHaveProperty('isFree');
  });

  it('pagina a partir de 1', async () => {
    await repository.findPublic({ countryCode: 'PT', page: 3, limit: 10 });

    expect(argsDaBusca()).toMatchObject({ skip: 20, take: 10 });
  });

  it('conta com o mesmo filtro da listagem', async () => {
    prisma.place.count.mockResolvedValue(7);
    const { total } = await repository.findPublic({
      countryCode: 'PT',
      city: 'Lisbon',
    });

    expect(total).toBe(7);
    expect(prisma.place.count.mock.calls[0][0].where).toEqual(
      argsDaBusca().where,
    );
  });

  it('devolve a média das coordenadas como centro da cidade', async () => {
    prisma.place.groupBy.mockResolvedValue([
      {
        countryCode: 'PT',
        city: 'Lisbon',
        _count: { _all: 10 },
        _avg: { lat: 38.71, lng: -9.14 },
      },
    ]);

    await expect(repository.findCities({})).resolves.toEqual([
      { countryCode: 'PT', city: 'Lisbon', count: 10, lat: 38.71, lng: -9.14 },
    ]);
  });

  it('cai para zero quando a média vem nula', async () => {
    // `_avg` é null quando o grupo não tem linha com coordenada; sem isto o
    // JSON sairia com `lat: null` e o mapa tentaria centrar em nada.
    prisma.place.groupBy.mockResolvedValue([
      {
        countryCode: 'CA',
        city: 'Toronto',
        _count: { _all: 0 },
        _avg: { lat: null, lng: null },
      },
    ]);

    const [cidade] = await repository.findCities({});
    expect(cidade).toMatchObject({ lat: 0, lng: 0 });
  });

  it('filtra as cidades por país quando pedido', async () => {
    await repository.findCities({ countryCode: 'ES' });

    expect(prisma.place.groupBy.mock.calls[0][0].where).toMatchObject({
      countryCode: 'ES',
      isActive: true,
    });
  });

  it('lista todas as cidades quando não vem país', async () => {
    // É o que alimenta o estado vazio do frontend: "cidades já mapeadas".
    await repository.findCities({});

    expect(prisma.place.groupBy.mock.calls[0][0].where).toEqual({
      isActive: true,
    });
  });
});
