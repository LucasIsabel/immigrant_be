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

  it('compares the city by its folded key, so either spelling finds it', async () => {
    // The name reaches us from the URL and the selector, and the two
    // catalogues behind them disagree on accents and case.
    await repository.findPublic({ countryCode: 'PT', city: 'Póvoa de Varzim' });
    const accented = argsDaBusca().where;
    prisma.place.findMany.mockClear();
    await repository.findPublic({ countryCode: 'PT', city: 'POVOA DE VARZIM' });

    expect(accented.cityKey).toBe('povoa de varzim');
    expect(argsDaBusca().where.cityKey).toBe('povoa de varzim');
    expect('city' in accented).toBe(false);
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

  it('narrows to the featured window when asked', async () => {
    // The Destaques row asks for its own rows rather than picking from the
    // list's page — see the business repository spec for why.
    await repository.findPublic({ countryCode: 'PT', featured: true });

    const { where } = argsDaBusca();
    expect(where).toMatchObject({ featureKind: { not: null } });
    expect(where.AND).toHaveLength(2);
  });

  it('leaves the ordinary list untouched', async () => {
    await repository.findPublic({ countryCode: 'PT' });

    expect(argsDaBusca().where).not.toHaveProperty('featureKind');
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

  describe('the state of a city', () => {
    it('narrows the city by its state when one is sent', async () => {
      await repository.findPublic({
        countryCode: 'BR',
        city: 'Campo Grande',
        state: 'Alagoas',
      });

      expect(argsDaBusca().where).toMatchObject({ stateKey: 'alagoas' });
    });

    it('builds the filter it always built when no state is sent', async () => {
      await repository.findPublic({ countryCode: 'BR', city: 'Campo Grande' });

      expect('stateKey' in argsDaBusca().where).toBe(false);
    });

    it('answers one city per state, each with its own centre', async () => {
      prisma.place.groupBy.mockResolvedValue([
        {
          countryCode: 'BR',
          cityKey: 'campo grande',
          stateKey: 'alagoas',
          city: 'Campo Grande',
          state: 'Alagoas',
          _count: { _all: 2 },
          _avg: { lat: -9.95, lng: -36.16 },
        },
        {
          countryCode: 'BR',
          cityKey: 'campo grande',
          stateKey: 'mato grosso do sul',
          city: 'Campo Grande',
          state: 'Mato Grosso do Sul',
          _count: { _all: 8 },
          _avg: { lat: -20.46, lng: -54.62 },
        },
      ]);

      const cities = await repository.findCities({ countryCode: 'BR' });

      expect(prisma.place.groupBy.mock.calls[0][0].by).toEqual([
        'countryCode',
        'cityKey',
        'stateKey',
        'city',
        'state',
      ]);
      expect(cities.map((c) => [c.state, c.lat])).toEqual([
        ['Alagoas', -9.95],
        ['Mato Grosso do Sul', -20.46],
      ]);
    });
  });

  describe('the spelling of a city', () => {
    /*
     * Places ingested before states existed carry the unaccented spelling of
     * the flat catalogue; later ones, the accented spelling of the per-state
     * list. Grouped by the stored name they were two options in the selector,
     * each holding part of one city.
     */
    it('answers one entry for the two spellings of one city', async () => {
      prisma.place.groupBy.mockResolvedValue([
        {
          countryCode: 'PT',
          cityKey: 'povoa de varzim',
          stateKey: '',
          city: 'Povoa de Varzim',
          state: null,
          _count: { _all: 1 },
          _avg: { lat: 41.4, lng: -8.8 },
        },
        {
          countryCode: 'PT',
          cityKey: 'povoa de varzim',
          stateKey: '',
          city: 'Póvoa de Varzim',
          state: null,
          _count: { _all: 3 },
          _avg: { lat: 41.36, lng: -8.76 },
        },
      ]);

      const cities = await repository.findCities({ countryCode: 'PT' });

      expect(cities).toHaveLength(1);
      expect(cities[0]).toMatchObject({
        countryCode: 'PT',
        city: 'Póvoa de Varzim',
        state: null,
        count: 4,
      });
      expect(cities[0].lat).toBeCloseTo(41.37);
      expect(cities[0].lng).toBeCloseTo(-8.77);
    });
  });
});
