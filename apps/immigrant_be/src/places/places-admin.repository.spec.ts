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
