jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/database';
import { BusinessRepository } from './business.repository';

const mockPrismaService = {
  business: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
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

      expect(mockPrismaService.business.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'business-1',
          OR: [
            { isPublic: true },
            {
              businessPage: {
                status: { in: ['APPROVED', 'APPROVED_WITH_PENDING'] },
              },
            },
          ],
        },
        include: {
          businessPage: {
            select: { id: true, slug: true, status: true },
          },
        },
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
});
