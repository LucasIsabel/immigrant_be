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
    findFirst: jest.fn(),
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

  describe('findApprovedBySlug', () => {
    /**
     * A rota anónima da página pública.
     *
     * O `select` é a segurança da consulta, não uma optimização: o controlador
     * devolve o que o serviço lhe der, e o Nest não retira campos que o DTO não
     * declara. Sem ele, `pendingContent` — conteúdo submetido e ainda não
     * aprovado — ia no HTML servido a qualquer visitante, e dava para ler a
     * próxima versão de uma página antes de ela existir publicamente.
     */
    const camposDeModeracao = [
      'pendingContent',
      'moderationResult',
      'rejectionReason',
      'approvedById',
      'rejectedById',
      'rejectedAt',
      'submittedAt',
      'slugLockedAt',
    ];

    it('nunca traz da base o que ainda não foi aprovado', async () => {
      mockPrismaService.businessPage.findFirst.mockResolvedValue(null);

      await repository.findApprovedBySlug('meu-slug');

      const { select } = mockPrismaService.businessPage.findFirst.mock
        .calls[0][0] as { select: Record<string, boolean> };

      expect(select).toBeDefined();
      for (const campo of camposDeModeracao) {
        expect(select).not.toHaveProperty(campo);
      }
    });

    it('traz exactamente o que o contrato público promete', async () => {
      // Os campos de `BusinessPagePublicResponseDto`. Um campo novo na página
      // pública entra nos dois sítios — é essa a fricção que se quer.
      mockPrismaService.businessPage.findFirst.mockResolvedValue(null);

      await repository.findApprovedBySlug('meu-slug');

      const { select } = mockPrismaService.businessPage.findFirst.mock
        .calls[0][0] as { select: Record<string, boolean> };

      expect(Object.keys(select).sort()).toEqual([
        'approvedAt',
        'approvedContent',
        'businessId',
        'businessType',
        'id',
        'slug',
        'status',
      ]);
    });

    it('continua a servir a página que tem uma edição por aprovar', async () => {
      // O conteúdo APROVADO dessas páginas está no ar; o que muda é que a
      // edição pendente deixa de viajar com ele.
      mockPrismaService.businessPage.findFirst.mockResolvedValue(null);

      await repository.findApprovedBySlug('meu-slug');

      const { where } = mockPrismaService.businessPage.findFirst.mock
        .calls[0][0] as { where: { status: { in: string[] } } };

      expect(where.status.in).toEqual(['APPROVED', 'APPROVED_WITH_PENDING']);
    });
  });
});
