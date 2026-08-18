jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { AiRouterService } from '@app/ai';
import { PrismaService } from '@app/database';
import { getQueueToken } from '@nestjs/bullmq';
import { Test, TestingModule } from '@nestjs/testing';
import { AI_BLOG_IMAGE_QUEUE } from '@app/config/constants';
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
  blogPost: { create: jest.fn() },
  blogTag: { upsert: jest.fn() },
  users: { findUnique: jest.fn(), findFirst: jest.fn() },
  // `resolveAuthorId` cai em `getSystemUserId`, que procura o admin por role
  // antes de tentar o primeiro usuário.
  userRoles: { findFirst: jest.fn() },
};

const mockAiRouter = { generateJson: jest.fn() };
const mockQueue = { add: jest.fn() };

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
        { provide: getQueueToken(AI_BLOG_IMAGE_QUEUE), useValue: mockQueue },
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
});
