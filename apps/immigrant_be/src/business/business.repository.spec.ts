jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/database';
import { BusinessRepository } from './business.repository';

const mockPrismaService = {
  // findPublic batches the page and the count; the mock resolves the array it
  // is handed, which is what Prisma does.
  $transaction: jest.fn((ops: unknown[]) => Promise.all(ops)),
  // The radius search builds SQL by hand, so it never touches business.findMany
  // for the page — it asks for ids and then hydrates them.
  $queryRaw: jest.fn(),
  business: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('BusinessRepository', () => {
  let repository: BusinessRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    repository = module.get(BusinessRepository);
  });

  describe('scoping by country', () => {
    /**
     * City names repeat across the world. `Córdoba` is in Argentina and in
     * Spain; so are `Santiago`, `Valencia`, `Toledo` and `Barcelona`. Without a
     * country the city filter answers about all of them at once.
     */
    it('filters by country alongside the city', async () => {
      mockPrismaService.business.findMany.mockResolvedValue([]);
      mockPrismaService.business.count.mockResolvedValue(0);

      await repository.findPublic({
        country: 'Portugal',
        city: 'Porto',
      } as never);

      const args = mockPrismaService.business.findMany.mock.calls[0][0] as {
        where: Record<string, unknown>;
      };
      expect(args.where).toMatchObject({
        country: { equals: 'Portugal', mode: 'insensitive' },
        cityKey: 'porto',
      });
    });

    it('leaves the country out when none was asked for', async () => {
      mockPrismaService.business.findMany.mockResolvedValue([]);
      mockPrismaService.business.count.mockResolvedValue(0);

      await repository.findPublic({ city: 'Porto' } as never);

      const args = mockPrismaService.business.findMany.mock.calls[0][0] as {
        where: Record<string, unknown>;
      };
      expect('country' in args.where).toBe(false);
    });
  });

  describe('the city key', () => {
    /**
     * A row whose key does not match its name is a business the public search
     * cannot find, and no screen would say so. These pin every live write.
     */
    it('derives the key when a business is created', async () => {
      mockPrismaService.business.create.mockResolvedValue({});

      await repository.create('user-1', {
        city: 'Póvoa de Varzim',
      } as never);

      const args = mockPrismaService.business.create.mock.calls[0][0] as {
        data: Record<string, unknown>;
      };
      expect(args.data.cityKey).toBe('povoa de varzim');
      expect(args.data.city).toBe('Póvoa de Varzim');
    });

    it('derives the key when a draft is applied live', async () => {
      mockPrismaService.business.update.mockResolvedValue({});

      await repository.applyDraftAndClearDraft('b-1', {
        city: 'Águas Santas',
      } as never);

      const args = mockPrismaService.business.update.mock.calls[0][0] as {
        data: Record<string, unknown>;
      };
      expect(args.data.cityKey).toBe('aguas santas');
    });

    it('leaves the key alone when a write does not touch the city', async () => {
      // Overwriting it with `undefined` would blank the column and hide the
      // business — worse than not updating at all.
      mockPrismaService.business.update.mockResolvedValue({});

      await repository.applyDraftAndClearDraft('b-1', {
        name: 'Outro nome',
      } as never);

      const args = mockPrismaService.business.update.mock.calls[0][0] as {
        data: Record<string, unknown>;
      };
      expect('cityKey' in args.data).toBe(false);
    });

    it('searches by the key, not by what was typed', async () => {
      mockPrismaService.business.findMany.mockResolvedValue([]);
      mockPrismaService.business.count.mockResolvedValue(0);

      await repository.findPublic({ city: 'POVOA de Varzim' } as never);

      const args = mockPrismaService.business.findMany.mock.calls[0][0] as {
        where: Record<string, unknown>;
      };
      expect(args.where).toMatchObject({ cityKey: 'povoa de varzim' });
      expect('city' in args.where).toBe(false);
    });
  });

  describe('findPublicCities', () => {
    const groupByArgs = () =>
      mockPrismaService.business.groupBy.mock.calls[0][0] as {
        by: string[];
        where: Record<string, unknown>;
      };

    it('counts only what an owner chose to list', async () => {
      // The whole point of the endpoint is "what is there to look at". A
      // hidden business is not there.
      mockPrismaService.business.groupBy.mockResolvedValue([]);

      await repository.findPublicCities({ country: 'Portugal' });

      expect(groupByArgs().by).toEqual(['country', 'city']);
      expect(groupByArgs().where).toMatchObject({
        isPublic: true,
        country: 'Portugal',
      });
    });

    it('skips rows with no country when none was asked for', async () => {
      // `country` is nullable, and a row without one belongs to no country the
      // selector could be showing — counting it would inflate a total nobody
      // can reach.
      mockPrismaService.business.groupBy.mockResolvedValue([]);

      await repository.findPublicCities({});

      expect(groupByArgs().where).toMatchObject({ country: { not: null } });
    });

    it('drops a null country from the result rather than answering one', async () => {
      mockPrismaService.business.groupBy.mockResolvedValue([
        {
          country: 'Portugal',
          city: 'Matosinhos',
          _count: { _all: 3 },
          _avg: { lat: 41.18, lng: -8.69 },
        },
        {
          country: null,
          city: 'Nowhere',
          _count: { _all: 9 },
          _avg: { lat: null, lng: null },
        },
      ]);

      const rows = await repository.findPublicCities({});

      expect(rows).toEqual([
        {
          country: 'Portugal',
          city: 'Matosinhos',
          count: 3,
          lat: 41.18,
          lng: -8.69,
        },
      ]);
    });

    it('carries a centre, so a city can be searched around', async () => {
      // Picking "Porto" has to be able to reach a business in Vila Nova de
      // Gaia, four kilometres away. Without a centre there is nothing to
      // search around.
      mockPrismaService.business.groupBy.mockResolvedValue([]);

      await repository.findPublicCities({});

      const args = mockPrismaService.business.groupBy.mock.calls[0][0] as {
        _avg: Record<string, boolean>;
      };
      expect(args._avg).toEqual({ lat: true, lng: true });
    });

    it('answers a null centre rather than a made-up one', async () => {
      // Every business in the city was registered without coordinates. Zero is
      // a real place off the coast of Africa, so it must not be invented.
      mockPrismaService.business.groupBy.mockResolvedValue([
        {
          country: 'Portugal',
          city: 'Fafe',
          _count: { _all: 1 },
          _avg: { lat: null, lng: null },
        },
      ]);

      const rows = await repository.findPublicCities({});

      expect(rows[0]).toMatchObject({ lat: null, lng: null });
    });
  });

  describe('findAllByUserId', () => {
    it('inclui o resumo da página pública no join', async () => {
      // A listagem do dashboard mostra o status da página em cada card. Sem o
      // include, o FE fazia uma requisição por card (N+1 sobre HTTP) só para
      // descobrir o badge — este teste trava o join como parte do contrato.
      mockPrismaService.business.findMany.mockResolvedValue([]);

      await repository.findAllByUserId('user-1');

      expect(mockPrismaService.business.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        orderBy: { createdAt: 'desc' },
        include: {
          businessPage: {
            select: { id: true, slug: true, status: true },
          },
        },
      });
    });

    it('devolve o resultado do Prisma sem transformar', async () => {
      const rows = [
        {
          id: 'b1',
          name: 'Restaurante',
          businessPage: { id: 'p1', slug: 'restaurante', status: 'APPROVED' },
        },
        { id: 'b2', name: 'Guia', businessPage: null },
      ];
      mockPrismaService.business.findMany.mockResolvedValue(rows);

      await expect(repository.findAllByUserId('user-1')).resolves.toBe(rows);
    });
  });

  describe('findVisibleById', () => {
    it('reads the business behind a page the platform has approved', async () => {
      // `isPublic` is the owner's directory switch, and it was gating this
      // read by accident: an approved page whose owner had never flipped it
      // went live with prices missing their currency and no photographs,
      // because both come from the business record.
      mockPrismaService.business.findFirst.mockResolvedValue(null);

      await repository.findVisibleById('business-1');

      const call = mockPrismaService.business.findFirst.mock.calls[0][0];
      expect(call.where).toEqual({
        id: 'business-1',
        OR: [
          { isPublic: true },
          {
            businessPage: {
              status: { in: ['APPROVED', 'APPROVED_WITH_PENDING'] },
            },
          },
        ],
      });
      expect(call.select.businessPage).toEqual({
        select: { id: true, slug: true, status: true },
      });
    });

    it('still answers for a business the owner did list, page or no page', async () => {
      mockPrismaService.business.findFirst.mockResolvedValue(null);

      await repository.findVisibleById('business-2');

      const where = mockPrismaService.business.findFirst.mock.calls[0][0].where;
      expect(where.OR).toContainEqual({ isPublic: true });
    });

    it('does not reach a business that is neither listed nor behind a live page', async () => {
      // A page still in review must not open a window onto its business.
      mockPrismaService.business.findFirst.mockResolvedValue(null);

      const result = await repository.findVisibleById('business-3');

      expect(result).toBeNull();
      const where = mockPrismaService.business.findFirst.mock.calls[0][0].where;
      expect(where.OR[1].businessPage.status.in).not.toContain(
        'PENDING_REVIEW',
      );
      expect(where.OR[1].businessPage.status.in).not.toContain('DRAFT');
    });
  });

  describe('what the public queries let out of the database', () => {
    /**
     * The fields a visitor must not see never leave Postgres, so no later
     * include, mapper or serialiser can put them back by accident. This test
     * is the lock: it names the exact key set, so widening it is a decision
     * somebody has to make on purpose.
     */
    const PUBLIC_KEYS = [
      'address',
      'businessPage',
      'businessType',
      'city',
      'country',
      'createdAt',
      'description',
      'email',
      'featureKind',
      'featuredFrom',
      'featuredUntil',
      'id',
      'lat',
      'lng',
      'name',
      'openingHours',
      'phone',
      'photos',
      'state',
      'timezone',
      'typeData',
      'updatedAt',
      'website',
    ];

    /*
     * `featuredFrom` e `featuredUntil` saem da base mas não da API: o serviço
     * usa-as para decidir `featuredNow` e deita-as fora. Estão aqui porque esta
     * lista é sobre o que a consulta lê, e ler é onde uma coluna esquecida se
     * torna uma fuga.
     */
    it('never lets the owner draft, the owner id or the listing switch out', async () => {
      mockPrismaService.business.findFirst.mockResolvedValue(null);

      await repository.findVisibleById('business-1');

      const select = mockPrismaService.business.findFirst.mock.calls[0][0]
        .select as Record<string, unknown>;
      expect(Object.keys(select).sort()).toEqual(PUBLIC_KEYS);
      expect(select).not.toHaveProperty('draftData');
      expect(select).not.toHaveProperty('userId');
      expect(select).not.toHaveProperty('isPublic');
    });

    it('uses the same shape for the directory listing', async () => {
      mockPrismaService.business.findMany.mockResolvedValue([]);
      mockPrismaService.business.count.mockResolvedValue(0);

      await repository.findPublic({ page: 1, limit: 20 });

      const select = mockPrismaService.business.findMany.mock.calls[0][0]
        .select as Record<string, unknown>;
      expect(Object.keys(select).sort()).toEqual(PUBLIC_KEYS);
    });

    it('keeps the owner listing on the full shape, draft and all', async () => {
      // The owner's own dashboard needs the draft: it is how an unpublished
      // edit is shown back to them.
      mockPrismaService.business.findMany.mockResolvedValue([]);

      await repository.findAllByUserId('user-1');

      const call = mockPrismaService.business.findMany.mock.calls[0][0];
      expect(call.select).toBeUndefined();
      expect(call.include).toBeDefined();
    });
  });

  describe('the featured filter', () => {
    /**
     * The Destaques row asks for its own rows.
     *
     * It cannot pick from the list's page: a page may hold no featured row at
     * all, and one that sits on page four would slide into the row as the
     * reader scrolled — a row that changes under you is not a row of featured
     * things, it is a row of whatever happened to load.
     */
    it('narrows the plain query to the featured window', async () => {
      mockPrismaService.business.findMany.mockResolvedValue([]);
      mockPrismaService.business.count.mockResolvedValue(0);

      await repository.findPublic({
        country: 'Portugal',
        city: 'Porto',
        featured: true,
      } as never);

      const args = mockPrismaService.business.findMany.mock.calls[0][0] as {
        where: Record<string, unknown>;
      };
      expect(args.where).toMatchObject({ featureKind: { not: null } });
      // The dates are half the rule: a campaign that ended yesterday is not
      // featured today, and one that starts tomorrow is not featured yet.
      expect(args.where.AND).toHaveLength(2);
    });

    it('leaves the ordinary list untouched', async () => {
      // Without the flag the list is everything — a featured constraint
      // leaking in here would empty the page for every city that has no
      // featured business, which is all of them at first.
      mockPrismaService.business.findMany.mockResolvedValue([]);
      mockPrismaService.business.count.mockResolvedValue(0);

      await repository.findPublic({
        country: 'Portugal',
        city: 'Porto',
      } as never);

      const args = mockPrismaService.business.findMany.mock.calls[0][0] as {
        where: Record<string, unknown>;
      };
      expect(args.where.featureKind).toBeUndefined();
      expect(args.where.AND).toBeUndefined();
    });

    /**
     * The radius path is the one that would have failed in silence.
     *
     * Every My City tab sends a radius, so a filter honoured only by the Prisma
     * branch would answer "here is everything" to a request for the featured
     * few — and the row above the list would quietly become the list.
     */
    it('reaches the SQL of the radius search', async () => {
      mockPrismaService.$queryRaw
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ count: BigInt(0) }]);

      await repository.findPublic({
        country: 'Portugal',
        lat: 41.15,
        lng: -8.61,
        radius: 60,
        featured: true,
      } as never);

      const sql = mockPrismaService.$queryRaw.mock.calls[0][0] as {
        sql: string;
      };
      expect(sql.sql).toContain('feature_kind');
      expect(sql.sql).toContain('featured_until');
    });

    it('does not narrow the radius search when the flag is absent', async () => {
      mockPrismaService.$queryRaw
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ count: BigInt(0) }]);

      await repository.findPublic({
        country: 'Portugal',
        lat: 41.15,
        lng: -8.61,
        radius: 60,
      } as never);

      const sql = mockPrismaService.$queryRaw.mock.calls[0][0] as {
        sql: string;
      };
      expect(sql.sql).not.toContain('feature_kind');
    });
  });

  describe('the city-centre fallback in the radius search', () => {
    const runRadius = async (extra: Record<string, unknown> = {}) => {
      mockPrismaService.$queryRaw
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ count: BigInt(0) }]);

      await repository.findPublic({
        country: 'Portugal',
        lat: 41.1579,
        lng: -8.6291,
        radius: 60,
        ...extra,
      } as never);

      return (mockPrismaService.$queryRaw.mock.calls[0][0] as { sql: string })
        .sql;
    };

    /**
     * A business without coordinates is invisible to every radius search, and
     * its city alone was enough to know it is nearby: someone browsing Porto
     * never saw the perfectly correct Gaia record that happened to be missing
     * the pair of numbers.
     */
    it('lets a row with no coordinates in through its city', async () => {
      const sql = await runRadius();

      expect(sql).toContain('b.lat IS NULL');
      expect(sql).toContain('c.city_key = b.city_key');
    });

    it('keeps the indexed path for rows that have their own point', async () => {
      // Two branches in an OR rather than COALESCE(b.lat, c.lat): a COALESCE
      // over the joined column cannot use the (lat, lng) index, and the query
      // would fall back to the Seq Scan the bounding box exists to avoid.
      const sql = await runRadius();

      expect(sql).toContain('b.lat BETWEEN');
      expect(sql).not.toContain('COALESCE');
    });

    it('requires a centre to exist before using one', async () => {
      // A city where no business has coordinates has no centre, and the row
      // stays out. `0, 0` is a real point in the Atlantic — never inferred.
      const sql = await runRadius();

      expect(sql).toContain('c.lat IS NOT NULL');
    });

    it('averages only public rows that have a point', async () => {
      const sql = await runRadius();

      expect(sql).toMatch(/avg\(lat\)[\s\S]*is_public = true/);
    });
  });
});
