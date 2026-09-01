jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/database';
import { FeaturableEntity } from './dto/set-feature.dto';
import { FeaturedService } from './featured.service';

/**
 * A faixa de destaques fica acima da lista, onde o leitor acredita estar a ver
 * o melhor da cidade. O que estes testes protegem é essa crença.
 */

const prisma = {
  business: { update: jest.fn() },
  place: { update: jest.fn() },
  communityEvent: { update: jest.fn() },
};

const AMANHA = new Date('2026-09-02T12:00:00Z');
const ONTEM = new Date('2026-08-31T12:00:00Z');

describe('FeaturedService', () => {
  let service: FeaturedService;

  beforeEach(async () => {
    jest.clearAllMocks();
    for (const table of [
      prisma.business,
      prisma.place,
      prisma.communityEvent,
    ]) {
      table.update.mockImplementation(({ data }: { data: unknown }) =>
        Promise.resolve({ id: 'x', ...(data as object) }),
      );
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeaturedService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get(FeaturedService);
  });

  it('recusa um destaque pago sem data de fim', async () => {
    // Sem fim, uma campanha paga fica no ar para sempre porque ninguém se
    // lembrou dela — e o leitor continua a lê-la como escolha nossa.
    await expect(
      service.set(FeaturableEntity.BUSINESS, 'id', { featureKind: 'PAID' }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(prisma.business.update).not.toHaveBeenCalled();
  });

  it('aceita um destaque editorial sem data de fim', async () => {
    const result = await service.set(FeaturableEntity.BUSINESS, 'id', {
      featureKind: 'CURATED',
    });

    expect(result.featuredNow).toBe(true);
  });

  it('recusa uma janela que acaba antes de começar', async () => {
    await expect(
      service.set(FeaturableEntity.PLACE, 'id', {
        featureKind: 'PAID',
        featuredFrom: AMANHA,
        featuredUntil: ONTEM,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('leva as datas junto quando o destaque sai', async () => {
    // Deixá-las para trás faz a próxima marcação herdar uma janela que
    // ninguém escolheu.
    await service.set(FeaturableEntity.EVENT, 'id', {
      featureKind: null,
      featuredFrom: ONTEM,
      featuredUntil: AMANHA,
    });

    const { data } = prisma.communityEvent.update.mock.calls[0][0] as {
      data: { featuredFrom: Date | null; featuredUntil: Date | null };
    };
    expect(data.featuredFrom).toBeNull();
    expect(data.featuredUntil).toBeNull();
  });

  it('diz que ainda não é destaque quando a janela começa amanhã', async () => {
    const result = await service.set(FeaturableEntity.PLACE, 'id', {
      featureKind: 'PAID',
      featuredFrom: AMANHA,
      featuredUntil: AMANHA,
    });

    expect(result.featuredNow).toBe(false);
  });

  it('escreve na tabela da entidade pedida', async () => {
    await service.set(FeaturableEntity.PLACE, 'id', { featureKind: 'CURATED' });

    expect(prisma.place.update).toHaveBeenCalled();
    expect(prisma.business.update).not.toHaveBeenCalled();
  });

  it('responde 404 quando o item não existe', async () => {
    prisma.business.update.mockRejectedValue(new Error('no row'));

    await expect(
      service.set(FeaturableEntity.BUSINESS, 'id', { featureKind: 'CURATED' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
