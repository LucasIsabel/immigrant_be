jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { PrismaService } from '@app/database';
import { Test, TestingModule } from '@nestjs/testing';
import { AiRouterService } from './ai-router.service';
import { OpenRouterBreaker } from './openrouter-breaker.service';
import { ModelConfigService } from './model-config.service';
import { GeminiDirectProvider } from './providers/gemini-direct.provider';
import { OpenRouterService } from './providers/openrouter.service';
import {
  AiProviderError,
  InsufficientCreditsError,
  RateLimitedError,
} from './providers/ai-provider.types';

const textResult = (
  model: string,
  provider: 'openrouter' | 'gemini-direct',
) => ({
  text: '{"ok":true}',
  model,
  provider,
  usage: { inputTokens: 10, outputTokens: 20, costUsd: 0.001 },
});

const CHAIN = [
  'anthropic/claude-sonnet-5',
  'moonshotai/kimi-k2.5',
  'gemini-direct:gemini-2.5-flash-lite',
];

const mockPrisma = {
  aiUsageLog: { create: jest.fn().mockResolvedValue({}) },
};

const mockModelConfig = { getChain: jest.fn(), invalidate: jest.fn() };
const mockOpenRouter = { generateText: jest.fn(), generateImage: jest.fn() };
const mockGeminiDirect = { generateText: jest.fn(), generateImage: jest.fn() };

describe('AiRouterService', () => {
  let service: AiRouterService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockModelConfig.getChain.mockResolvedValue(CHAIN);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiRouterService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ModelConfigService, useValue: mockModelConfig },
        { provide: OpenRouterService, useValue: mockOpenRouter },
        { provide: GeminiDirectProvider, useValue: mockGeminiDirect },
        // Breaker real, sem cliente Redis: os testes abaixo passam a exercitar o
        // caminho de degradação local, que é o que vale quando o Redis cai.
        OpenRouterBreaker,
      ],
    }).compile();

    service = module.get(AiRouterService);
  });

  describe('happy path', () => {
    it('uses the primary model and logs what it cost', async () => {
      mockOpenRouter.generateText.mockResolvedValue(
        textResult('anthropic/claude-sonnet-5', 'openrouter'),
      );

      const result = await service.generateText(
        'blog_writing_opinion',
        'prompt',
      );

      expect(result.model).toBe('anthropic/claude-sonnet-5');
      expect(mockOpenRouter.generateText).toHaveBeenCalledTimes(1);
      expect(mockPrisma.aiUsageLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            scenario: 'blog_writing_opinion',
            provider: 'openrouter',
            costUsd: 0.001,
          }),
        }),
      );
    });

    it('records the model that actually answered, not the one requested', async () => {
      // OpenRouter can route internally; the audit row must reflect reality.
      mockOpenRouter.generateText.mockResolvedValue(
        textResult('anthropic/claude-sonnet-5-20260101', 'openrouter'),
      );

      await service.generateText('blog_writing_opinion', 'prompt');

      expect(mockPrisma.aiUsageLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            model: 'anthropic/claude-sonnet-5-20260101',
          }),
        }),
      );
    });
  });

  describe('credit exhaustion (402)', () => {
    it('skips the rest of OpenRouter and lands on the Gemini link', async () => {
      mockOpenRouter.generateText.mockRejectedValue(
        new InsufficientCreditsError('openrouter'),
      );
      mockGeminiDirect.generateText.mockResolvedValue(
        textResult('gemini-2.5-flash-lite', 'gemini-direct'),
      );

      const result = await service.generateText(
        'blog_writing_opinion',
        'prompt',
      );

      expect(result.provider).toBe('gemini-direct');
      // The second OpenRouter model is never tried: credits are per account, so
      // it would fail for the same reason.
      expect(mockOpenRouter.generateText).toHaveBeenCalledTimes(1);
      expect(mockGeminiDirect.generateText).toHaveBeenCalledWith(
        'gemini-2.5-flash-lite',
        'prompt',
      );
    });

    it('keeps OpenRouter in cooldown for the next call', async () => {
      mockOpenRouter.generateText.mockRejectedValue(
        new InsufficientCreditsError('openrouter'),
      );
      mockGeminiDirect.generateText.mockResolvedValue(
        textResult('gemini-2.5-flash-lite', 'gemini-direct'),
      );

      await service.generateText('blog_writing_opinion', 'prompt');
      expect((await service.getOpenRouterStatus()).blocked).toBe(true);

      mockOpenRouter.generateText.mockClear();
      await service.generateText('blog_writing_opinion', 'prompt');

      // Second call does not even try OpenRouter.
      expect(mockOpenRouter.generateText).not.toHaveBeenCalled();
    });

    it('still tries a :free model while OpenRouter is in cooldown', async () => {
      // The cooldown exists because paid calls fail on depleted credit; a
      // free model costs nothing and keeps answering. This is the incident
      // scenario: Gemini dead AND OpenRouter credit-blocked — the free tail
      // is what stands between that and an outage.
      mockModelConfig.getChain.mockResolvedValue([
        'gemini-direct:gemini-2.5-flash-lite',
        'deepseek/deepseek-v4-flash',
        'z-ai/glm-5.2:free',
      ]);
      mockGeminiDirect.generateText.mockRejectedValue(
        new Error('API key not valid'),
      );
      mockOpenRouter.generateText
        .mockRejectedValueOnce(new InsufficientCreditsError('openrouter'))
        .mockResolvedValueOnce(textResult('z-ai/glm-5.2:free', 'openrouter'));

      const result = await service.generateText('quiz_suggestions', 'prompt');

      expect(result.model).toBe('z-ai/glm-5.2:free');
      // The paid model opened the cooldown; the free one was tried anyway.
      expect((await service.getOpenRouterStatus()).blocked).toBe(true);
      expect(mockOpenRouter.generateText).toHaveBeenCalledTimes(2);
      expect(mockOpenRouter.generateText).toHaveBeenLastCalledWith(
        'z-ai/glm-5.2:free',
        'prompt',
      );
    });

    it('logs the failed attempt, not only the success', async () => {
      mockOpenRouter.generateText.mockRejectedValue(
        new InsufficientCreditsError('openrouter'),
      );
      mockGeminiDirect.generateText.mockResolvedValue(
        textResult('gemini-2.5-flash-lite', 'gemini-direct'),
      );

      await service.generateText('blog_writing_opinion', 'prompt');

      const kinds = mockPrisma.aiUsageLog.create.mock.calls.map(
        ([arg]: [{ data: { errorKind?: string } }]) => arg.data.errorKind,
      );
      expect(kinds).toContain('insufficient_credits');
    });
  });

  describe('rate limit (429)', () => {
    it('waits once and retries the same model', async () => {
      mockOpenRouter.generateText
        .mockRejectedValueOnce(new RateLimitedError('openrouter', 10))
        .mockResolvedValueOnce(
          textResult('anthropic/claude-sonnet-5', 'openrouter'),
        );

      const result = await service.generateText(
        'blog_writing_opinion',
        'prompt',
      );

      expect(result.model).toBe('anthropic/claude-sonnet-5');
      expect(mockOpenRouter.generateText).toHaveBeenCalledTimes(2);
    });

    it('does not block OpenRouter — a rate limit is not a credit problem', async () => {
      mockOpenRouter.generateText
        .mockRejectedValueOnce(new RateLimitedError('openrouter', 10))
        .mockResolvedValueOnce(
          textResult('anthropic/claude-sonnet-5', 'openrouter'),
        );

      await service.generateText('blog_writing_opinion', 'prompt');

      expect((await service.getOpenRouterStatus()).blocked).toBe(false);
    });

    it('moves to the next model when the wait does not help', async () => {
      mockOpenRouter.generateText
        // primary: limited, then still limited on retry
        .mockRejectedValueOnce(new RateLimitedError('openrouter', 10))
        .mockRejectedValueOnce(new RateLimitedError('openrouter', 10))
        // second model answers
        .mockResolvedValueOnce(
          textResult('moonshotai/kimi-k2.5', 'openrouter'),
        );

      const result = await service.generateText(
        'blog_writing_opinion',
        'prompt',
      );

      expect(result.model).toBe('moonshotai/kimi-k2.5');
    });
  });

  describe('generic provider failure', () => {
    it('walks to the next model in the chain', async () => {
      mockOpenRouter.generateText
        .mockRejectedValueOnce(new AiProviderError('openrouter', 500))
        .mockResolvedValueOnce(
          textResult('moonshotai/kimi-k2.5', 'openrouter'),
        );

      const result = await service.generateText(
        'blog_writing_standard',
        'prompt',
      );

      expect(result.model).toBe('moonshotai/kimi-k2.5');
    });

    it('throws when the whole chain fails, listing every attempt', async () => {
      mockOpenRouter.generateText.mockRejectedValue(
        new AiProviderError('openrouter', 500, 'boom'),
      );
      mockGeminiDirect.generateText.mockRejectedValue(
        new AiProviderError('gemini-direct', undefined, 'also boom'),
      );

      // The BullMQ retry is what happens next; the message has to say what was
      // tried or the job log is useless.
      await expect(
        service.generateText('blog_writing_opinion', 'prompt'),
      ).rejects.toThrow(/Every model failed.*boom.*also boom/s);
    });
  });

  describe('generateJson', () => {
    it('validates against the schema and returns the parsed object', async () => {
      const { z } = await import('zod');
      mockOpenRouter.generateText.mockResolvedValue({
        ...textResult('anthropic/claude-sonnet-5', 'openrouter'),
        text: '```json\n{"title":"Hello"}\n```',
      });

      const { data } = await service.generateJson(
        'blog_writing_opinion',
        'prompt',
        z.object({ title: z.string() }),
      );

      expect(data).toEqual({ title: 'Hello' });
    });

    it('returns null data when the answer does not match the schema', async () => {
      const { z } = await import('zod');
      mockOpenRouter.generateText.mockResolvedValue({
        ...textResult('anthropic/claude-sonnet-5', 'openrouter'),
        text: '{"unexpected":1}',
      });

      const { data, result } = await service.generateJson(
        'blog_writing_opinion',
        'prompt',
        z.object({ title: z.string() }),
      );

      expect(data).toBeNull();
      // The call still happened and still cost money — the caller needs both.
      expect(result.model).toBe('anthropic/claude-sonnet-5');
    });
  });

  describe('images', () => {
    it('falls back through the image chain too', async () => {
      mockModelConfig.getChain.mockResolvedValue([
        'bytedance/seedream-4.5',
        'gemini-direct:gemini-2.5-flash-image',
      ]);
      mockOpenRouter.generateImage.mockRejectedValue(
        new InsufficientCreditsError('openrouter'),
      );
      mockGeminiDirect.generateImage.mockResolvedValue({
        image: Buffer.from('png'),
        model: 'gemini-2.5-flash-image',
        provider: 'gemini-direct',
        usage: {},
      });

      const result = await service.generateImage('blog_image', 'prompt');

      expect(result.provider).toBe('gemini-direct');
      expect(result.image.toString()).toBe('png');
    });

    it('leva a geometria pedida para o elo que atender, inclusive o de degradação', async () => {
      // A queda para o fallback não pode virar troca silenciosa de formato: um
      // card 16:9 preenchido com imagem quadrada continua sendo defeito visível,
      // mesmo que a geração tenha "funcionado".
      mockModelConfig.getChain.mockResolvedValue([
        'bytedance-seed/seedream-5-0-lite',
        'gemini-direct:gemini-2.5-flash-image',
      ]);
      mockOpenRouter.generateImage.mockRejectedValue(
        new InsufficientCreditsError('openrouter'),
      );
      mockGeminiDirect.generateImage.mockResolvedValue({
        image: Buffer.from('png'),
        model: 'gemini-2.5-flash-image',
        provider: 'gemini-direct',
        usage: {},
      });

      const options = { aspectRatio: '16:9', resolution: '2K' } as const;

      await service.generateImage('blog_image', 'prompt', {}, options);

      expect(mockOpenRouter.generateImage).toHaveBeenCalledWith(
        'bytedance-seed/seedream-5-0-lite',
        'prompt',
        options,
      );
      expect(mockGeminiDirect.generateImage).toHaveBeenCalledWith(
        'gemini-2.5-flash-image',
        'prompt',
        options,
      );
    });
  });

  describe('usage log resilience', () => {
    it('still returns the generation when the audit write fails', async () => {
      mockOpenRouter.generateText.mockResolvedValue(
        textResult('anthropic/claude-sonnet-5', 'openrouter'),
      );
      mockPrisma.aiUsageLog.create.mockRejectedValueOnce(new Error('db down'));

      await expect(
        service.generateText('blog_writing_opinion', 'prompt'),
      ).resolves.toMatchObject({ model: 'anthropic/claude-sonnet-5' });
    });
  });
});
