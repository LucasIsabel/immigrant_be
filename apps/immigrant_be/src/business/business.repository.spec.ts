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
  business: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
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
        { country: 'Portugal', city: 'Matosinhos', _count: { _all: 3 } },
        { country: null, city: 'Nowhere', _count: { _all: 9 } },
      ]);

      const rows = await repository.findPublicCities({});

      expect(rows).toEqual([
        { country: 'Portugal', city: 'Matosinhos', count: 3 },
      ]);
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
});
