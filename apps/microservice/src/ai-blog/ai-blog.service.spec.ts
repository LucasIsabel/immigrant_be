jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  BlogPostStatus: {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
  },
  BlogPipelineStatus: {
    TRANSLATING: 'TRANSLATING',
    GENERATING_IMAGE: 'GENERATING_IMAGE',
    READY: 'READY',
    FAILED_TRANSLATION: 'FAILED_TRANSLATION',
    FAILED_IMAGE: 'FAILED_IMAGE',
  },
  BlogPersonaTheme: {
    IMMIGRATION: 'IMMIGRATION',
    TOURISM: 'TOURISM',
  },
}));

import { AiRouterService } from '@app/ai';
import { PrismaService } from '@app/database';
import { getQueueToken } from '@nestjs/bullmq';
import { Test, TestingModule } from '@nestjs/testing';
import {
  AI_BLOG_QUEUE,
  BLOG_TRANSLATION_QUEUE,
  TRANSLATE_BLOG_POST,
  TRANSLATION_LOCALES,
} from '@app/config/constants';
import { AiBlogWorkerService } from './ai-blog.service';

const COUNTRY_ID = 'country-1';
const CATEGORY_ID = 'category-1';

const RSS = `<?xml version="1.0"?><rss><channel>
  <item><title>Canada raises immigration targets</title><link>https://news.example/1</link><pubDate>Mon, 18 Aug 2026 00:00:00 GMT</pubDate><source>Example</source></item>
</channel></rss>`;

const aiPost = {
  title: 'What Canada’s new targets mean',
  excerpt: 'A short read.',
  content: 'Body of the post.',
  suggested_tags: ['canada'],
};

const mockPrisma = {
  country: { findUnique: jest.fn() },
  blogPost: { create: jest.fn(), update: jest.fn() },
  blogTag: { upsert: jest.fn() },
  blogPersona: { findUnique: jest.fn(), findFirst: jest.fn() },
  users: { findUnique: jest.fn(), findFirst: jest.fn() },
  userRoles: { findFirst: jest.fn() },
};

const mockAiRouter = { generateJson: jest.fn() };
const mockQueue = { add: jest.fn(), addBulk: jest.fn() };

describe('AiBlogWorkerService — proveniência da geração', () => {
  let service: AiBlogWorkerService;
  let fetchMock: jest.SpyInstance;

  beforeEach(async () => {
    jest.clearAllMocks();

    fetchMock = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(RSS, { status: 200 }));

    mockPrisma.country.findUnique.mockResolvedValue({
      id: COUNTRY_ID,
      name: 'Canada',
    });
    mockPrisma.blogTag.upsert.mockResolvedValue({ id: 'tag-1' });
    mockPrisma.userRoles.findFirst.mockResolvedValue({ userId: 'admin-1' });
    mockPrisma.users.findFirst.mockResolvedValue({ id: 'admin-1' });
    mockPrisma.users.findUnique.mockResolvedValue({ id: 'admin-1' });
    mockPrisma.blogPost.create.mockResolvedValue({
      id: 'post-1',
      slug: 'slug',
      title: aiPost.title,
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiBlogWorkerService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: AiRouterService, useValue: mockAiRouter },
        { provide: getQueueToken(BLOG_TRANSLATION_QUEUE), useValue: mockQueue },
        { provide: getQueueToken(AI_BLOG_QUEUE), useValue: mockQueue },
      ],
    }).compile();

    service = module.get(AiBlogWorkerService);
  });

  afterEach(() => fetchMock.mockRestore());

  const routerAnswers = (model: string, costUsd?: number) =>
    mockAiRouter.generateJson.mockResolvedValue({
      data: aiPost,
      result: { model, provider: 'openrouter', usage: { costUsd } },
    });

  const created = () =>
    (
      mockPrisma.blogPost.create.mock.calls[0] as [
        { data: Record<string, unknown> },
      ]
    )[0].data;

  it('escreve pelo cenário de posts de rotina', async () => {
    routerAnswers('moonshotai/kimi-k2.5', 0.01);

    await service.generatePost({
      country_id: COUNTRY_ID,
      category_id: CATEGORY_ID,
    });

    expect(mockAiRouter.generateJson).toHaveBeenCalledWith(
      'blog_writing_standard',
      expect.any(String),
      expect.anything(),
      expect.objectContaining({ entityType: 'blog_post' }),
    );
  });

  it('grava o modelo e o custo no post', async () => {
    routerAnswers('moonshotai/kimi-k2.5', 0.0123);

    await service.generatePost({
      country_id: COUNTRY_ID,
      category_id: CATEGORY_ID,
    });

    expect(created()).toMatchObject({
      generated_by_model: 'moonshotai/kimi-k2.5',
      generation_cost_usd: 0.0123,
      is_ai_generated: true,
    });
  });

  it('grava o modelo do fallback, que é o que o revisor precisa ver', async () => {
    // Um post escrito pelo elo de degradação sai diferente do configurado. Sem
    // isso, a fila de aprovação não distingue um do outro.
    routerAnswers('gemini-2.5-flash-lite', 0.002);

    await service.generatePost({
      country_id: COUNTRY_ID,
      category_id: CATEGORY_ID,
    });

    expect(created().generated_by_model).toBe('gemini-2.5-flash-lite');
  });

  it('deixa o custo nulo quando o provider não reporta', async () => {
    // Estimar aqui envenenaria a auditoria com número que ninguém reconcilia
    // contra a fatura — o Gemini direto não devolve custo.
    routerAnswers('gemini-2.5-flash-lite', undefined);

    await service.generatePost({
      country_id: COUNTRY_ID,
      category_id: CATEGORY_ID,
    });

    expect(created().generation_cost_usd).toBeUndefined();
  });

  it('tira travessões do texto antes de gravar', async () => {
    mockAiRouter.generateJson.mockResolvedValue({
      data: {
        ...aiPost,
        title: 'Canada — new targets',
        excerpt: 'A change — and a wait.',
        content: 'Body — still here. Years 2019–2024.',
      },
      result: {
        model: 'moonshotai/kimi-k2.5',
        provider: 'openrouter',
        usage: {},
      },
    });

    await service.generatePost({
      country_id: COUNTRY_ID,
      category_id: CATEGORY_ID,
    });

    expect(created()).toMatchObject({
      title: 'Canada, new targets',
      excerpt: 'A change, and a wait.',
      content: 'Body, still here. Years 2019-2024.',
    });
  });

  it('falha nomeando o modelo quando a resposta não bate com o schema', async () => {
    mockAiRouter.generateJson.mockResolvedValue({
      data: null,
      result: { model: 'deepseek/deepseek-v4-pro', usage: {} },
    });

    await expect(
      service.generatePost({
        country_id: COUNTRY_ID,
        category_id: CATEGORY_ID,
      }),
    ).rejects.toThrow(/deepseek\/deepseek-v4-pro/);
    expect(mockPrisma.blogPost.create).not.toHaveBeenCalled();
  });

  describe('cadeia e tópico', () => {
    it('enfileira as traduções, não a capa', async () => {
      // A capa vinha logo depois do texto e a tradução ficava de fora da cadeia:
      // o cron das 03:00 só varre posts publicados, então um DRAFT nunca era
      // traduzido sozinho — e o refinamento exige pt+es. O admin tinha de
      // enfileirar tradução na mão entre gerar e refinar.
      routerAnswers('moonshotai/kimi-k2.5', 0.01);

      await service.generatePost({
        country_id: COUNTRY_ID,
        category_id: CATEGORY_ID,
      });

      expect(mockQueue.addBulk).toHaveBeenCalledTimes(1);
      const [jobs] = mockQueue.addBulk.mock.calls[0] as [
        Array<{ name: string; data: { targetLocale: string } }>,
      ];
      expect(jobs.map((j) => j.name)).toEqual(
        TRANSLATION_LOCALES.map(() => TRANSLATE_BLOG_POST),
      );
      expect(jobs.map((j) => j.data.targetLocale)).toEqual([
        ...TRANSLATION_LOCALES,
      ]);
    });

    it('o post nasce em TRANSLATING', async () => {
      // `cover_image_url` nulo não distingue "ainda vem" de "falhou"; o estado
      // agregado é o que a fila de aprovação passa a ler.
      routerAnswers('moonshotai/kimi-k2.5', 0.01);

      await service.generatePost({
        country_id: COUNTRY_ID,
        category_id: CATEGORY_ID,
      });

      expect(created()).toMatchObject({ pipeline_status: 'TRANSLATING' });
    });

    it('o tópico entra na busca de notícias junto do país, e não no lugar dele', async () => {
      // Sozinho, o tópico traria notícia do assunto em qualquer lugar do mundo —
      // e o post é sobre um país.
      routerAnswers('moonshotai/kimi-k2.5', 0.01);

      await service.generatePost({
        country_id: COUNTRY_ID,
        category_id: CATEGORY_ID,
        topic: 'metas de imigração 2027',
      });

      const url = String(fetchMock.mock.calls[0]?.[0]);
      expect(decodeURIComponent(url)).toContain(
        'Canada metas de imigração 2027',
      );
      expect(created()).toMatchObject({
        source_topic: 'metas de imigração 2027',
      });
    });

    it('sem tópico, mantém a busca genérica de imigração', async () => {
      routerAnswers('moonshotai/kimi-k2.5', 0.01);

      await service.generatePost({
        country_id: COUNTRY_ID,
        category_id: CATEGORY_ID,
      });

      const url = String(fetchMock.mock.calls[0]?.[0]);
      expect(decodeURIComponent(url)).toContain('Canada immigration');
      expect(created()).toMatchObject({ source_topic: null });
    });
  });

  it('colunas de imigração usam o cenário de opinião e a persona', async () => {
    mockPrisma.blogPersona.findUnique.mockResolvedValue({
      id: 'persona-1',
      name: 'Helena Vargas',
      theme: 'IMMIGRATION',
      editorial_stance: 'RESTRICTIONIST',
      persona_prompt: 'You are Helena.',
      style_guidelines: 'Short.',
      preferred_model: 'anthropic/claude-sonnet-5',
      blog_author_id: 'author-1',
    });
    mockAiRouter.generateJson
      .mockResolvedValueOnce({
        data: aiPost,
        result: {
          model: 'anthropic/claude-sonnet-5',
          provider: 'openrouter',
          usage: { costUsd: 0.03 },
        },
      })
      .mockResolvedValueOnce({
        data: {
          recommendation: 'approve',
          riskLevel: 'low',
          flags: [],
          summary: 'ok',
        },
        result: { model: 'moonshotai/kimi-k2.5', usage: {} },
      });

    await service.generatePost({
      country_id: COUNTRY_ID,
      category_id: CATEGORY_ID,
      persona_id: 'persona-1',
    });

    expect(mockAiRouter.generateJson).toHaveBeenNthCalledWith(
      1,
      'blog_writing_opinion',
      expect.any(String),
      expect.anything(),
      expect.objectContaining({
        entityType: 'blog_post',
        preferredModel: 'anthropic/claude-sonnet-5',
      }),
    );
    expect(created()).toMatchObject({
      persona_id: 'persona-1',
      display_author_id: 'author-1',
    });
  });
});
