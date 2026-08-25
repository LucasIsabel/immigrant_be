jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { PrismaService } from '@app/database';
import { Test, TestingModule } from '@nestjs/testing';
import {
  DEFAULT_MODEL_CHAINS,
  ModelConfigService,
} from './model-config.service';
import { AI_SCENARIOS } from './providers/ai-provider.types';

const mockPrisma = { aiModelConfig: { findUnique: jest.fn() } };

describe('ModelConfigService', () => {
  let service: ModelConfigService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModelConfigService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get(ModelConfigService);
  });

  it('puts the primary model first and the fallbacks in order', async () => {
    mockPrisma.aiModelConfig.findUnique.mockResolvedValue({
      scenario: 'blog_writing_opinion',
      primaryModel: 'a/one',
      fallbackModels: ['b/two', 'gemini-direct:three'],
    });

    await expect(service.getChain('blog_writing_opinion')).resolves.toEqual([
      'a/one',
      'b/two',
      'gemini-direct:three',
    ]);
  });

  it('falls back to the code default when the scenario has no row', async () => {
    mockPrisma.aiModelConfig.findUnique.mockResolvedValue(null);

    // A database that was never seeded still has to generate content.
    await expect(service.getChain('blog_image')).resolves.toEqual([
      DEFAULT_MODEL_CHAINS.blog_image.primaryModel,
      ...DEFAULT_MODEL_CHAINS.blog_image.fallbackModels,
    ]);
  });

  it('uses the default when the database read fails', async () => {
    mockPrisma.aiModelConfig.findUnique.mockRejectedValue(new Error('db down'));

    // A hiccup reading config must not stop generation.
    await expect(service.getChain('blog_translation')).resolves.toEqual([
      DEFAULT_MODEL_CHAINS.blog_translation.primaryModel,
      ...DEFAULT_MODEL_CHAINS.blog_translation.fallbackModels,
    ]);
  });

  it('caches so a batch of jobs does not hit the database per call', async () => {
    mockPrisma.aiModelConfig.findUnique.mockResolvedValue({
      primaryModel: 'a/one',
      fallbackModels: [],
    });

    await service.getChain('blog_writing_standard');
    await service.getChain('blog_writing_standard');

    expect(mockPrisma.aiModelConfig.findUnique).toHaveBeenCalledTimes(1);
  });

  it('invalidate makes an admin edit visible without waiting for the TTL', async () => {
    mockPrisma.aiModelConfig.findUnique.mockResolvedValue({
      primaryModel: 'a/one',
      fallbackModels: [],
    });

    await service.getChain('blog_writing_standard');
    service.invalidate('blog_writing_standard');
    await service.getChain('blog_writing_standard');

    expect(mockPrisma.aiModelConfig.findUnique).toHaveBeenCalledTimes(2);
  });

  it('has a default chain for every scenario', () => {
    // A scenario added to the enum without a default would throw at runtime on a
    // fresh database, which is the worst place to find out.
    for (const scenario of AI_SCENARIOS) {
      expect(DEFAULT_MODEL_CHAINS[scenario]).toBeDefined();
    }
  });

  it('gives every default chain a link that survives OpenRouter credit exhaustion', () => {
    // OpenRouter credits are per account: a chain of only paid OpenRouter
    // models has nowhere to go when they run out. Two shapes satisfy this —
    // a gemini-direct link (different provider, different billing) or a
    // `:free` model (rides through the credit cooldown by design). The API
    // scenarios put gemini-direct FIRST and end on `:free`, so the old
    // "ends on gemini-direct" phrasing stopped describing the invariant.
    for (const scenario of AI_SCENARIOS) {
      const { primaryModel, fallbackModels } = DEFAULT_MODEL_CHAINS[scenario];
      const chain = [primaryModel, ...fallbackModels];
      const survivesCreditExhaustion = chain.some(
        (model) =>
          model.startsWith('gemini-direct:') || model.endsWith(':free'),
      );
      expect(survivesCreditExhaustion).toBe(true);
    }
  });
});
