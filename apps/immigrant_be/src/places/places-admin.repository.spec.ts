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
    count: jest.fn(),
  },
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

  it('compares the city without caring about case', async () => {
    // The name comes from CountriesNow and is stored as it arrived; a caller
    // can reach us in another case, and an exact match would return zero.
    await repository.list({ city: 'Lisbon', page: 1, limit: 20 });

    expect(whereOfTheQuery()).toEqual({
      city: { equals: 'Lisbon', mode: 'insensitive' },
    });
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
      city: { equals: 'Rio de Janeiro', mode: 'insensitive' },
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
