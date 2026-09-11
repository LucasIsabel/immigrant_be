// Without this, importing the repository pulls @app/database -> config ->
// better-auth, which does not boot under test. Same mock as places.repository.
jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test } from '@nestjs/testing';
import { PrismaService } from '@app/database';
import { CityIngestionStatus } from '../../../../generated/prisma';
import { PlacesAdminRepository } from './places-admin.repository';

const prisma = {
  cityIngestion: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
  },
  $executeRaw: jest.fn(),
};

describe('PlacesAdminRepository.list', () => {
  let repository: PlacesAdminRepository;

  beforeEach(async () => {
    jest.clearAllMocks();
    prisma.cityIngestion.findMany.mockResolvedValue([]);
    prisma.cityIngestion.count.mockResolvedValue(0);

    const moduleRef = await Test.createTestingModule({
      providers: [
        PlacesAdminRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = moduleRef.get(PlacesAdminRepository);
  });

  const whereOfTheQuery = () =>
    (
      prisma.cityIngestion.findMany.mock.calls[0][0] as {
        where: Record<string, unknown>;
      }
    ).where;

  it('filters on nothing when nothing was asked for', async () => {
    // A `where` carrying keys set to `undefined` would still be correct for
    // Prisma; the test exists to pin the intent — no filter is the whole table.
    await repository.list({ page: 1, limit: 20 });

    expect(whereOfTheQuery()).toEqual({});
  });

  it('filters by country without touching the city', async () => {
    await repository.list({ countryCode: 'PT', page: 1, limit: 20 });

    expect(whereOfTheQuery()).toEqual({ countryCode: 'PT' });
  });

  it('compares the city by its folded key, whatever its case and accents', async () => {
    // The name comes from CountriesNow and is stored as it arrived; its two
    // catalogues disagree on accents, and an exact match would return zero.
    await repository.list({ city: 'Póvoa de Varzim', page: 1, limit: 20 });

    expect(whereOfTheQuery()).toEqual({ cityKey: 'povoa de varzim' });
  });

  it('combines all three filters', async () => {
    await repository.list({
      status: CityIngestionStatus.FAILED,
      countryCode: 'BR',
      city: 'Rio de Janeiro',
      page: 1,
      limit: 20,
    });

    expect(whereOfTheQuery()).toEqual({
      status: 'FAILED',
      countryCode: 'BR',
      cityKey: 'rio de janeiro',
    });
  });

  it('counts with the same where it searches with', async () => {
    // A `where` that differs between findMany and count yields a pagination
    // that promises pages which do not exist.
    await repository.list({ countryCode: 'PT', page: 2, limit: 20 });

    const countArgs = prisma.cityIngestion.count.mock.calls[0][0] as {
      where: Record<string, unknown>;
    };
    expect(countArgs.where).toEqual(whereOfTheQuery());
  });
});

describe('PlacesAdminRepository and the state of a city', () => {
  let repository: PlacesAdminRepository;

  beforeEach(async () => {
    jest.clearAllMocks();
    prisma.cityIngestion.findMany.mockResolvedValue([]);
    prisma.cityIngestion.findFirst.mockResolvedValue(null);
    prisma.cityIngestion.count.mockResolvedValue(0);

    const moduleRef = await Test.createTestingModule({
      providers: [
        PlacesAdminRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = moduleRef.get(PlacesAdminRepository);
  });

  const activeWhere = (call: number) =>
    (
      prisma.cityIngestion.findFirst.mock.calls[call][0] as {
        where: Record<string, unknown>;
      }
    ).where;

  it('looks for an active ingestion of the same city in the same state', async () => {
    // Campo Grande in Mato Grosso do Sul and in Alagoas write their places
    // under different keys: they compete for nothing, so neither blocks the
    // other. The same triple still does.
    await repository.findActiveForCity(
      'BR',
      'Campo Grande',
      'Mato Grosso do Sul',
    );
    await repository.findActiveForCity('BR', 'Campo Grande', 'Alagoas');

    expect(activeWhere(0)).toMatchObject({
      countryCode: 'BR',
      cityKey: 'campo grande',
      stateKey: 'mato grosso do sul',
    });
    expect(activeWhere(1)).toMatchObject({ stateKey: 'alagoas' });
  });

  it('treats the two spellings of one city as one active ingestion', async () => {
    // Both would write into one city; running them side by side is the race
    // the guard exists to stop.
    await repository.findActiveForCity('PT', 'Póvoa de Varzim');

    expect(activeWhere(0)).toMatchObject({ cityKey: 'povoa de varzim' });
    expect('city' in activeWhere(0)).toBe(false);
  });

  it('compares a missing state as a missing state', async () => {
    // `null` is `IS NULL` to Prisma: two stateless ingestions of one name
    // still collide, exactly as they did before states existed.
    await repository.findActiveForCity('PT', 'Lisbon');

    expect(activeWhere(0)).toMatchObject({ stateKey: null });
  });

  it('narrows the list by state only alongside a city', async () => {
    await repository.list({
      city: 'Campo Grande',
      state: 'Alagoas',
      page: 1,
      limit: 20,
    });
    await repository.list({ state: 'Alagoas', page: 1, limit: 20 });

    const [withCity, withoutCity] =
      prisma.cityIngestion.findMany.mock.calls.map(
        ([args]: [{ where: Record<string, unknown> }]) => args.where,
      );
    expect(withCity).toMatchObject({ stateKey: 'alagoas' });
    expect(withoutCity).toEqual({});
  });
});

/*
 * The place whose texts never landed was the one place the review screen could
 * not edit.
 *
 * `update` answered P2025 — a 500 with `Internal server error` — because there
 * was no translation row to update, and the admin was trying to write the very
 * texts that were missing. Sentry IMMIGRANT-BE-3, on the Larnaca ingestion:
 * seven of eight places had three translations each, and the eighth had none.
 */
describe('PlacesAdminRepository.updatePlace', () => {
  let repository: PlacesAdminRepository;

  // The client the transaction hands back. The assertions read from here on
  // purpose: a write landing on `prisma` instead would be a write outside the
  // transaction, which is the partial-save defect.
  const tx = {
    placeTranslation: { upsert: jest.fn(), update: jest.fn() },
    place: { update: jest.fn() },
  };

  const transactional = {
    $transaction: jest.fn((run: (client: typeof tx) => unknown) => run(tx)),
    placeTranslation: { upsert: jest.fn(), update: jest.fn() },
    place: { update: jest.fn() },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    tx.place.update.mockResolvedValue({ id: 'p1' });

    const moduleRef = await Test.createTestingModule({
      providers: [
        PlacesAdminRepository,
        { provide: PrismaService, useValue: transactional },
      ],
    }).compile();

    repository = moduleRef.get(PlacesAdminRepository);
  });

  it('creates a translation the place does not have yet', async () => {
    await repository.updatePlace('p1', {}, [
      {
        language: 'pt',
        description: 'Uma descrição com mais de vinte caracteres.',
        tip: '',
      },
    ]);

    expect(tx.placeTranslation.upsert).toHaveBeenCalledTimes(1);
    const [args] = tx.placeTranslation.upsert.mock.calls[0] as [
      { create: Record<string, unknown>; update: Record<string, unknown> },
    ];
    expect(args.create).toEqual({
      placeId: 'p1',
      language: 'pt',
      description: 'Uma descrição com mais de vinte caracteres.',
      tip: '',
    });
    expect(args.update).toEqual({
      description: 'Uma descrição com mais de vinte caracteres.',
      tip: '',
    });
  });

  it('writes everything inside one transaction', async () => {
    await repository.updatePlace('p1', { name: 'Outro' }, [
      {
        language: 'pt',
        description: 'Uma descrição com mais de vinte caracteres.',
      },
    ]);

    expect(transactional.$transaction).toHaveBeenCalledTimes(1);
    // Nothing may touch the client outside it: a language written before a
    // later one fails is a partial save reported to the admin as no save.
    expect(transactional.placeTranslation.upsert).not.toHaveBeenCalled();
    expect(transactional.place.update).not.toHaveBeenCalled();
    expect(tx.place.update).toHaveBeenCalledTimes(1);
  });

  it('never invents a description when only the tip was sent', async () => {
    // `description` is not nullable, so an upsert here could only create a row
    // with an empty one — a blank place that looks answered. The service has
    // already refused the case where the row does not exist.
    await repository.updatePlace('p1', {}, [
      { language: 'pt', tip: 'Vá cedo.' },
    ]);

    expect(tx.placeTranslation.upsert).not.toHaveBeenCalled();
    expect(tx.placeTranslation.update).toHaveBeenCalledTimes(1);
    const [args] = tx.placeTranslation.update.mock.calls[0] as [
      { data: Record<string, unknown> },
    ];
    expect(args.data).toEqual({ tip: 'Vá cedo.' });
  });
});

describe('PlacesAdminRepository.clearTextFailure', () => {
  let repository: PlacesAdminRepository;

  beforeEach(async () => {
    jest.clearAllMocks();
    prisma.$executeRaw.mockResolvedValue(1);

    const moduleRef = await Test.createTestingModule({
      providers: [
        PlacesAdminRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = moduleRef.get(PlacesAdminRepository);
  });

  it('sends both ids to the statement as parameters', async () => {
    await repository.clearTextFailure('ingestion-1', 'place-1');

    // A tagged template: the strings come first, the interpolated values after.
    const values = prisma.$executeRaw.mock.calls[0].slice(1);
    expect(values).toEqual(['place-1', 'ingestion-1']);
  });

  it('removes the id rather than rewriting the whole array', async () => {
    // Rewriting would race the worker, which appends to the same array from a
    // different process; `-` is one atomic statement.
    await repository.clearTextFailure('ingestion-1', 'place-1');

    const sql = (prisma.$executeRaw.mock.calls[0][0] as string[]).join('?');
    expect(sql).toContain("(stats->'textFailures') - ");
    expect(sql).toContain("stats ? 'textFailures'");
  });
});

describe('PlacesAdminRepository and the spelling of a city', () => {
  let repository: PlacesAdminRepository;

  const client = {
    cityIngestion: { create: jest.fn() },
    place: { findMany: jest.fn(), count: jest.fn() },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    client.cityIngestion.create.mockResolvedValue({ id: 'ingestion-1' });
    client.place.findMany.mockResolvedValue([]);
    client.place.count.mockResolvedValue(0);

    const moduleRef = await Test.createTestingModule({
      providers: [
        PlacesAdminRepository,
        { provide: PrismaService, useValue: client },
      ],
    }).compile();

    repository = moduleRef.get(PlacesAdminRepository);
  });

  it('folds the city key when an ingestion is created, for the worker to copy', async () => {
    await repository.create({
      countryCode: 'PT',
      city: 'Póvoa de Varzim',
      state: 'Porto',
    });

    const [{ data }] = client.cityIngestion.create.mock.calls[0] as [
      { data: Record<string, unknown> },
    ];
    expect(data).toMatchObject({
      city: 'Póvoa de Varzim',
      cityKey: 'povoa de varzim',
      state: 'Porto',
      stateKey: 'porto',
    });
  });

  it('filters the live catalogue by the folded key', async () => {
    // It used to compare the name exactly, so "Povoa" hid every place stored
    // as "Póvoa" from the admin who picked it.
    await repository.listCatalog({
      countryCode: 'PT',
      city: 'Povoa de Varzim',
      page: 1,
      limit: 20,
    });

    const [{ where }] = client.place.findMany.mock.calls[0] as [
      { where: Record<string, unknown> },
    ];
    expect(where).toEqual({ countryCode: 'PT', cityKey: 'povoa de varzim' });
    expect(client.place.count).toHaveBeenCalledWith({ where });
  });
});
