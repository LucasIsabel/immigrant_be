jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/database';
import { BusinessPagesRepository } from './business-pages.repository';

const mockPrismaService = {
  businessPage: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
  $transaction: jest.fn((ops: unknown[]) => Promise.all(ops)),
};

describe('BusinessPagesRepository', () => {
  let repository: BusinessPagesRepository;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessPagesRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();
    repository = module.get(BusinessPagesRepository);
  });

  describe('findPublicList', () => {
    it('só lista conteúdo no ar e nunca seleciona os campos de conteúdo', async () => {
      // É o contrato de segurança da rota anônima: DRAFT/PENDING_REVIEW/
      // REJECTED não podem aparecer, e pendingContent/approvedContent não
      // podem nem sair do banco — o select enxuto é a garantia estrutural.
      mockPrismaService.businessPage.findMany.mockResolvedValue([]);
      mockPrismaService.businessPage.count.mockResolvedValue(0);

      await repository.findPublicList(0, 50);

      const args = mockPrismaService.businessPage.findMany.mock.calls[0][0];
      expect(args.where.status.in.sort()).toEqual([
        'APPROVED',
        'APPROVED_WITH_PENDING',
      ]);
      expect(args.select).toEqual({
        slug: true,
        businessType: true,
        approvedAt: true,
      });
      expect(mockPrismaService.businessPage.count).toHaveBeenCalledWith({
        where: args.where,
      });
    });

    it('pagina com skip/take e ordena do aprovado mais recente', async () => {
      mockPrismaService.businessPage.findMany.mockResolvedValue([]);
      mockPrismaService.businessPage.count.mockResolvedValue(0);

      await repository.findPublicList(100, 50);

      const args = mockPrismaService.businessPage.findMany.mock.calls[0][0];
      expect(args.skip).toBe(100);
      expect(args.take).toBe(50);
      expect(args.orderBy).toEqual({ approvedAt: 'desc' });
    });
  });
});
