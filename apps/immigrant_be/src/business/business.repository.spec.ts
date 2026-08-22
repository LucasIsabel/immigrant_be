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
});
