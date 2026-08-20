jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  BlogPipelineStatus: {
    TRANSLATING: 'TRANSLATING',
    GENERATING_IMAGE: 'GENERATING_IMAGE',
    READY: 'READY',
    FAILED_TRANSLATION: 'FAILED_TRANSLATION',
    FAILED_IMAGE: 'FAILED_IMAGE',
  },
}));

import { AiRouterService } from '@app/ai';
import { PrismaService } from '@app/database';
import { Test, TestingModule } from '@nestjs/testing';
import { BlogTranslationWorkerService } from './blog-translation.service';

const POST_ID = 'post-1';

const post = {
  id: POST_ID,
  title: 'How to immigrate to Canada',
  excerpt: 'A guide.',
  content: '# Guide\n\nBody.',
  original_locale: 'en',
};

const translated = {
  title: 'Como imigrar para o Canadá',
  excerpt: 'Um guia.',
  content: '# Guia\n\nCorpo.',
};

const mockPrisma = {
  blogPost: { findUnique: jest.fn(), update: jest.fn(), updateMany: jest.fn() },
  blogPostTranslation: { upsert: jest.fn(), findMany: jest.fn() },
};

const mockAiRouter = { generateJson: jest.fn() };

describe('BlogTranslationWorkerService', () => {
  let service: BlogTranslationWorkerService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockPrisma.blogPost.findUnique.mockResolvedValue(post);
    mockPrisma.blogPostTranslation.upsert.mockResolvedValue({});
    mockPrisma.blogPostTranslation.findMany.mockResolvedValue([]);
    mockPrisma.blogPost.updateMany.mockResolvedValue({ count: 1 });
    mockPrisma.blogPost.update.mockResolvedValue({});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogTranslationWorkerService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: AiRouterService, useValue: mockAiRouter },
      ],
    }).compile();

    service = module.get(BlogTranslationWorkerService);
  });

  const routerAnswers = (model: string) =>
    mockAiRouter.generateJson.mockResolvedValue({
      data: translated,
      result: { model, provider: 'openrouter', usage: { costUsd: 0.004 } },
    });

  it('usa o cenário de tradução, não o de escrita', async () => {
    // Tradução é mecânica e tem schema validando a saída; pagar o modelo de
    // escrita por ela é desperdício que só apareceria na fatura.
    routerAnswers('google/gemini-3.1-flash-lite');

    await service.translatePost({ postId: POST_ID, targetLocale: 'pt' });

    expect(mockAiRouter.generateJson).toHaveBeenCalledWith(
      'blog_translation',
      expect.any(String),
      expect.anything(),
      expect.objectContaining({
        entityType: 'blog_translation',
        entityId: POST_ID,
      }),
    );
  });

  it('grava qual modelo traduziu, junto do translated_by que já existia', async () => {
    routerAnswers('google/gemini-3.1-flash-lite');

    await service.translatePost({ postId: POST_ID, targetLocale: 'pt' });

    const [args] = mockPrisma.blogPostTranslation.upsert.mock.calls[0] as [
      { create: Record<string, unknown>; update: Record<string, unknown> },
    ];

    // `translated_by` diz se foi IA ou gente; `translated_by_model` diz qual.
    expect(args.create).toMatchObject({
      translated_by: 'AI',
      translated_by_model: 'google/gemini-3.1-flash-lite',
    });
    expect(args.update).toMatchObject({
      translated_by_model: 'google/gemini-3.1-flash-lite',
    });
  });

  it('registra o modelo do fallback, não o que foi pedido', async () => {
    // O revisor precisa saber que a tradução saiu de um elo de degradação.
    routerAnswers('gemini-2.5-flash-lite');

    await service.translatePost({ postId: POST_ID, targetLocale: 'es' });

    const [args] = mockPrisma.blogPostTranslation.upsert.mock.calls[0] as [
      { create: Record<string, unknown> },
    ];
    expect(args.create.translated_by_model).toBe('gemini-2.5-flash-lite');
  });

  it('tira travessões da tradução antes de gravar', async () => {
    routerAnswers('google/gemini-3.1-flash-lite');
    mockAiRouter.generateJson.mockResolvedValue({
      data: {
        title: 'Canadá — novas metas',
        excerpt: 'Uma mudança — e a espera.',
        content: 'Corpo — ainda aqui.',
      },
      result: {
        model: 'google/gemini-3.1-flash-lite',
        provider: 'openrouter',
        usage: {},
      },
    });

    await service.translatePost({ postId: POST_ID, targetLocale: 'pt' });

    const [args] = mockPrisma.blogPostTranslation.upsert.mock.calls[0] as [
      { create: Record<string, unknown> },
    ];
    expect(args.create).toMatchObject({
      title: 'Canadá, novas metas',
      excerpt: 'Uma mudança, e a espera.',
      content: 'Corpo, ainda aqui.',
    });
  });

  it('falha nomeando o modelo quando a resposta não bate com o schema', async () => {
    mockAiRouter.generateJson.mockResolvedValue({
      data: null,
      result: { model: 'deepseek/deepseek-v4-flash', usage: {} },
    });

    await expect(
      service.translatePost({ postId: POST_ID, targetLocale: 'pt' }),
    ).rejects.toThrow(/deepseek\/deepseek-v4-flash/);
    expect(mockPrisma.blogPostTranslation.upsert).not.toHaveBeenCalled();
  });

  it('falha quando o post não existe, sem chamar modelo nenhum', async () => {
    mockPrisma.blogPost.findUnique.mockResolvedValue(null);

    await expect(
      service.translatePost({ postId: 'sumiu', targetLocale: 'pt' }),
    ).rejects.toThrow('BlogPost not found: sumiu');
    expect(mockAiRouter.generateJson).not.toHaveBeenCalled();
  });

  describe('avanço para a imagem', () => {
    const comLocales = (locales) =>
      mockPrisma.blogPostTranslation.findMany.mockResolvedValue(
        locales.map((locale) => ({ locale })),
      );

    it('não avança enquanto falta um idioma', async () => {
      comLocales(['pt']);

      expect(await service.advanceToImageIfTranslated(POST_ID)).toBe(false);
      expect(mockPrisma.blogPost.updateMany).not.toHaveBeenCalled();
    });

    it('avança quando o último idioma chega', async () => {
      comLocales(['pt', 'es']);

      expect(await service.advanceToImageIfTranslated(POST_ID)).toBe(true);
      expect(mockPrisma.blogPost.updateMany).toHaveBeenCalledWith({
        where: { id: POST_ID, pipeline_status: 'TRANSLATING' },
        data: { pipeline_status: 'GENERATING_IMAGE' },
      });
    });

    it('só um dos jobs paralelos avança — o outro vê a corrida perdida', async () => {
      // pt e es rodam ao mesmo tempo e podem terminar juntos. Se cada um
      // enfileirasse a capa, o post ganharia duas imagens pagas, com a segunda
      // sobrescrevendo a primeira. O `pipeline_status` no `where` é o
      // compare-and-set que o Postgres serializa: só um encontra a linha ainda
      // em TRANSLATING.
      comLocales(['pt', 'es']);
      mockPrisma.blogPost.updateMany
        .mockResolvedValueOnce({ count: 1 })
        .mockResolvedValueOnce({ count: 0 });

      const primeiro = await service.advanceToImageIfTranslated(POST_ID);
      const segundo = await service.advanceToImageIfTranslated(POST_ID);

      expect([primeiro, segundo]).toEqual([true, false]);
    });

    it('marca a falha da tradução com a etapa e o motivo', async () => {
      await service.markPipelineFailure(
        POST_ID,
        'FAILED_TRANSLATION',
        'translation:pt',
        'Every model failed for "blog_translation"',
      );

      const [args] = mockPrisma.blogPost.update.mock.calls[0];
      expect(args.data.pipeline_status).toBe('FAILED_TRANSLATION');
      expect(args.data.pipeline_error).toMatchObject({
        step: 'translation:pt',
        message: 'Every model failed for "blog_translation"',
      });
    });

    it('anotar a falha não pode virar uma segunda falha', async () => {
      // Se o post sumiu entre a falha e a anotação, engolir é o certo: quem
      // chama está no `onFailed` de um job que já falhou.
      mockPrisma.blogPost.update.mockRejectedValue(new Error('post sumiu'));

      await expect(
        service.markPipelineFailure(POST_ID, 'FAILED_TRANSLATION', 'x', 'y'),
      ).resolves.toBeUndefined();
    });
  });
});
