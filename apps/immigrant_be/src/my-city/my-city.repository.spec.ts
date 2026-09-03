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

  /*
   * The radius reached businesses and nothing else, so a reader who narrowed it
   * to a kilometre still saw a place nine kilometres away — reported from
   * production in Faro, where seven places stayed on screen at the tightest
   * setting.
   *
   * What these check is the shape of the answer, since a mocked Prisma cannot
   * measure a distance: with a reach, the count leaves the typed query for SQL
   * that carries both the box and the Haversine; without one, it stays on the
   * typed path so a city view with no GPS answers exactly what it always did.
   */
  /*
   * Around a city centre the reach widens; around the reader it narrows.
   *
   * The centre is a point nobody chose, so narrowing there would hide the
   * supply of the very city that was asked for. The reader's own position is
   * the opposite: they asked for what is within N km of themselves, and a
   * guide 7.8km away staying on screen at a 1km reach is what was reported.
   *
   * Measured against the database with three guides around Lisbon at 1.0, 7.8
   * and 19.2km: widening answered 2, 2, 2, 3 across the four reaches while
   * narrowing answered 0, 1, 2, 3 — the second column matching the exact
   * Haversine at every step.
   */
  describe('what the reach does depends on whose it is', () => {
    const around = {
      country: 'Portugal',
      city: 'Lisbon',
      lat: 38.6916,
      lng: -9.216,
      radius: 5,
    };

    it('joins the city and the reach with OR around a city centre', async () => {
      await repository.countBusinesses(around);

      const sql = sqlOf(0);
      expect(sql).toContain('b.city_key');
      expect(sql).toContain(' OR ');
    });

    it('drops the city entirely when the reach is the reader’s', async () => {
      await repository.countBusinesses({ ...around, nearMe: true });

      const sql = sqlOf(0);
      // Being inside the chosen city does not make something near the reader,
      // so the city stops widening the answer.
      expect(sql).not.toContain('b.city_key');
      expect(sql).toContain('acos');
    });

    it('still counts the city when the reader shared nothing', async () => {
      await repository.countBusinesses({
        country: 'Portugal',
        city: 'Lisbon',
        nearMe: true,
      });

      // `nearMe` with no coordinates is not a reach at all — dropping the city
      // then would answer with everything in the country.
      const sql = sqlOf(0);
      expect(sql).toContain('b.city_key');
    });

    it('measures the reach with the Haversine, not just the box', async () => {
      await repository.countBusinesses(around);

      // The box alone admitted a guide 19.2km out at a 15km reach, so the tab
      // read three over a list of two.
      expect(sqlOf(0)).toContain('acos');
    });
  });

  describe('honouring the reach', () => {
    const reach = { countryCode: 'PT', city: 'Lisbon', lat: 38.69, lng: -9.21 };

    it('measures places with the box and the Haversine', async () => {
      mockPrismaService.$queryRaw.mockResolvedValue([{ total: 3n }]);

      const total = await repository.countPlaces({ ...reach, radius: 5 });

      expect(total).toBe(3);
      expect(mockPrismaService.place.count).not.toHaveBeenCalled();

      const sql = sqlOf(0);
      expect(sql).toContain('BETWEEN');
      expect(sql).toContain('acos');
      expect(sql).toContain('p.is_active = true');
    });

    it('measures events the same way', async () => {
      mockPrismaService.$queryRaw.mockResolvedValue([{ total: 2n }]);

      const total = await repository.countEvents({ ...reach, radius: 5 });

      expect(total).toBe(2);
      expect(mockPrismaService.communityEvent.count).not.toHaveBeenCalled();

      const sql = sqlOf(0);
      expect(sql).toContain('acos');
      expect(sql).toContain("e.status::text = 'APPROVED'");
    });

    /*
     * The box alone would have been cheaper, and `countBusinesses` above does
     * stop there. Measured in Lisbon at one kilometre, the box admitted two
     * places and the Haversine one — so the tab would have read two over a
     * list of one. Generous is fine when the numbers are large; at small radii
     * it is just wrong.
     */
    it('does not settle for the box, which over-counts at the corners', async () => {
      mockPrismaService.$queryRaw.mockResolvedValue([{ total: 1n }]);

      await repository.countPlaces({ ...reach, radius: 1 });

      expect(sqlOf(0)).toContain('acos');
    });

    it.each([
      ['no radius', { ...reach }],
      ['no origin', { countryCode: 'PT', city: 'Lisbon', radius: 5 }],
      [
        'half an origin',
        { countryCode: 'PT', city: 'Lisbon', lat: 38.69, radius: 5 },
      ],
    ])('stays on the typed query with %s', async (_label, args) => {
      mockPrismaService.place.count.mockResolvedValue(10);

      await repository.countPlaces(args);

      expect(mockPrismaService.place.count).toHaveBeenCalled();
      expect(mockPrismaService.$queryRaw).not.toHaveBeenCalled();
    });
  });
});
