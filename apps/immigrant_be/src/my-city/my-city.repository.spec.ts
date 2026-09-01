jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/database';
import { MyCityRepository } from './my-city.repository';

/**
 * The counts behind the tab labels.
 *
 * A tab that says six over a list of five is worse than no number at all, so
 * what these check is that the count is asked of the same rows the list would
 * show — one reach for the city, one for what is near it, and no row counted
 * twice for satisfying both.
 */

const mockPrismaService = {
  $queryRaw: jest.fn(),
  communityEvent: { count: jest.fn() },
  place: { count: jest.fn() },
};

/** The SQL the repository handed Prisma, flattened back into one string. */
function sqlOf(call: number): string {
  const statement = mockPrismaService.$queryRaw.mock.calls[call][0] as {
    strings?: string[];
    sql?: string;
    text?: string;
  };
  return statement.sql ?? statement.text ?? (statement.strings ?? []).join('?');
}

describe('MyCityRepository', () => {
  let repository: MyCityRepository;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockPrismaService.$queryRaw.mockResolvedValue([]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyCityRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    repository = module.get(MyCityRepository);
  });

  describe('counting businesses', () => {
    it('reads a count per business type', async () => {
      mockPrismaService.$queryRaw.mockResolvedValue([
        { business_type: 'RESTAURANT', count: BigInt(6) },
        { business_type: 'TOUR_GUIDE', count: BigInt(5) },
      ]);

      const counts = await repository.countBusinesses({
        country: 'Portugal',
        city: 'Porto',
      });

      expect(counts).toEqual({ RESTAURANT: 6, TOUR_GUIDE: 5 });
    });

    it('answers zero for a type nobody registered', async () => {
      mockPrismaService.$queryRaw.mockResolvedValue([
        { business_type: 'RESTAURANT', count: BigInt(2) },
      ]);

      const counts = await repository.countBusinesses({ city: 'Porto' });

      expect(counts.TOUR_GUIDE).toBeUndefined();
    });

    it('joins the city and the reach with OR, so neither excludes the other', async () => {
      // Two queries added together would count twice everything inside both —
      // a business in the city is also inside the box drawn around it.
      await repository.countBusinesses({
        country: 'Portugal',
        city: 'Porto',
        lat: 41.1579,
        lng: -8.6291,
        radius: 60,
      });

      const sql = sqlOf(0);
      expect(sql).toContain('city_key');
      expect(sql).toContain('BETWEEN');
      expect(sql).toContain(' OR ');
    });

    it('counts only the city when no reach was asked for', async () => {
      await repository.countBusinesses({ country: 'Portugal', city: 'Porto' });

      const sql = sqlOf(0);
      expect(sql).toContain('city_key');
      expect(sql).not.toContain('BETWEEN');
      expect(sql).not.toContain(' OR ');
    });

    it('never counts a business somebody chose to hide', async () => {
      await repository.countBusinesses({ city: 'Porto' });

      expect(sqlOf(0)).toContain('is_public = true');
    });

    it('scopes by country, because a reach crosses borders', async () => {
      // Elvas and Badajoz are fifteen kilometres apart.
      await repository.countBusinesses({
        country: 'Portugal',
        lat: 38.88,
        lng: -7.16,
        radius: 60,
      });

      expect(sqlOf(0)).toContain('lower(b.country)');
    });
  });

  describe('counting events', () => {
    it('counts only what has not finished', async () => {
      mockPrismaService.communityEvent.count.mockResolvedValue(3);

      await repository.countEvents({ countryCode: 'PT', city: 'Porto' });

      const where = mockPrismaService.communityEvent.count.mock.calls[0][0] as {
        where: { status: string; OR: unknown[] };
      };
      expect(where.where.status).toBe('APPROVED');
      expect(where.where.OR).toHaveLength(2);
    });
  });

  describe('counting places', () => {
    it('counts only what the public list would show', async () => {
      mockPrismaService.place.count.mockResolvedValue(30);

      await repository.countPlaces({ countryCode: 'PT', city: 'Porto' });

      const args = mockPrismaService.place.count.mock.calls[0][0] as {
        where: { isActive: boolean };
      };
      expect(args.where.isActive).toBe(true);
    });
  });
});
