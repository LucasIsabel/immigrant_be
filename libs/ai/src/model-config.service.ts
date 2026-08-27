import { PrismaService } from '@app/database';
import { Injectable, Logger } from '@nestjs/common';
import { AiScenario } from './providers/ai-provider.types';

/**
 * Fallback chains used when a scenario has no row yet.
 *
 * Duplicated in `prisma/seeds/ai-model-config.seed.ts` on purpose: the seed makes
 * the rows editable from the admin screen, and this makes the app work on a fresh
 * database that has not been seeded — including the first deploy, before anyone
 * runs the seed. Neither is redundant with the other.
 *
 * Model choice reasoning lives in immigrant_be#69. In short: opinion columns pay
 * for adherence to guardrails and to JSON, routine posts pay for volume, and
 * translation is mechanical.
 */
export const DEFAULT_MODEL_CHAINS: Record<
  AiScenario,
  { primaryModel: string; fallbackModels: string[] }
> = {
  blog_writing_opinion: {
    primaryModel: 'anthropic/claude-sonnet-5',
    fallbackModels: [
      'moonshotai/kimi-k2.5',
      'gemini-direct:gemini-2.5-flash-lite',
    ],
  },
  blog_writing_standard: {
    primaryModel: 'moonshotai/kimi-k2.5',
    fallbackModels: [
      'deepseek/deepseek-v4-pro',
      'gemini-direct:gemini-2.5-flash-lite',
    ],
  },
  blog_translation: {
    primaryModel: 'google/gemini-3.1-flash-lite',
    fallbackModels: [
      'deepseek/deepseek-v4-flash',
      'gemini-direct:gemini-2.5-flash-lite',
    ],
  },
  place_writing: {
    primaryModel: 'google/gemini-3.1-flash-lite',
    fallbackModels: [
      'deepseek/deepseek-v4-flash',
      'gemini-direct:gemini-2.5-flash-lite',
    ],
  },
  /**
   * The four API-app scenarios share one chain shape. A person is waiting on
   * all four, so the chain is ordered by measured latency rather than by which
   * model these paths used to call directly.
   *
   * Timed in production on 2026-08-27 with a quiz-sized prompt:
   * `google/gemini-3.1-flash-lite` 1.3 s, `minimax/minimax-m3:free` 3.3 s,
   * `nvidia/nemotron-3.5-lightning:free` 10.4 s, `deepseek/deepseek-v4-flash`
   * 50 s in isolation and 100 s inside the real request. `z-ai/glm-5.2:free`
   * was dropped: its provider answered 429, so as a last resort it was no
   * resort at all. `minimax/minimax-m3:free` takes that seat — still the
   * zero-cost net for the day both paid providers are out, but one that
   * actually answers.
   *
   * `gemini-direct:gemini-2.5-flash-lite` is out of the chain only while the
   * Google AI Studio prepay credit is exhausted (it 429s, embeddings included).
   * When the credit is restored it can be put back from the admin panel, with
   * no deploy — the row shadows this default.
   */
  quiz_suggestions: {
    primaryModel: 'google/gemini-3.1-flash-lite',
    fallbackModels: ['deepseek/deepseek-v4-flash', 'minimax/minimax-m3:free'],
  },
  visa_recommendation: {
    primaryModel: 'google/gemini-3.1-flash-lite',
    fallbackModels: ['deepseek/deepseek-v4-flash', 'minimax/minimax-m3:free'],
  },
  visa_steps_translation: {
    primaryModel: 'google/gemini-3.1-flash-lite',
    fallbackModels: ['deepseek/deepseek-v4-flash', 'minimax/minimax-m3:free'],
  },
  business_moderation: {
    primaryModel: 'google/gemini-3.1-flash-lite',
    fallbackModels: ['deepseek/deepseek-v4-flash', 'minimax/minimax-m3:free'],
  },
  blog_image: {
    primaryModel: 'bytedance-seed/seedream-5-0-lite',
    fallbackModels: [
      'google/gemini-3.1-flash-image',
      'gemini-direct:gemini-2.5-flash-image',
    ],
  },
};

/** Long enough to spare the database on a batch of jobs, short enough that an
 * admin editing a model sees it take effect without waiting or redeploying. */
const CACHE_TTL_MS = 60_000;

type CachedChain = {
  chain: string[];
  expiresAt: number;
};

@Injectable()
export class ModelConfigService {
  private readonly logger = new Logger(ModelConfigService.name);
  private readonly cache = new Map<AiScenario, CachedChain>();

  constructor(private readonly prisma: PrismaService) {}

  /**
   * The ordered list of models to try for a scenario: primary first, then each
   * fallback. The router walks it and stops at the first one that answers.
   */
  async getChain(scenario: AiScenario): Promise<string[]> {
    const cached = this.cache.get(scenario);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.chain;
    }

    const config = await this.prisma.aiModelConfig
      .findUnique({ where: { scenario } })
      .catch((error: unknown) => {
        // A database hiccup must not stop content generation — the defaults are
        // good enough to keep working while it recovers.
        this.logger.error(
          `Could not read the model config for "${scenario}", using defaults: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
        return null;
      });

    const chain = config
      ? [config.primaryModel, ...config.fallbackModels]
      : [
          DEFAULT_MODEL_CHAINS[scenario].primaryModel,
          ...DEFAULT_MODEL_CHAINS[scenario].fallbackModels,
        ];

    this.cache.set(scenario, { chain, expiresAt: Date.now() + CACHE_TTL_MS });

    return chain;
  }

  /** Called by the admin endpoint so an edit is visible immediately. */
  invalidate(scenario?: AiScenario): void {
    if (scenario) {
      this.cache.delete(scenario);
      return;
    }
    this.cache.clear();
  }
}
