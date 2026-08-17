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
