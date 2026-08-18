jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
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
  blogPost: { findUnique: jest.fn() },
  blogPostTranslation: { upsert: jest.fn() },
};

const mockAiRouter = { generateJson: jest.fn() };

describe('BlogTranslationWorkerService', () => {
  let service: BlogTranslationWorkerService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockPrisma.blogPost.findUnique.mockResolvedValue(post);
    mockPrisma.blogPostTranslation.upsert.mockResolvedValue({});

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
});
