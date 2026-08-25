import { PrismaService } from '@app/database';
import { Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import { ModelConfigService } from './model-config.service';
import { GeminiDirectProvider } from './providers/gemini-direct.provider';
import { OpenRouterService } from './providers/openrouter.service';
import {
  AiImageOptions,
  AiImageResult,
  AiScenario,
  AiTextResult,
  InsufficientCreditsError,
  isGeminiDirect,
  RateLimitedError,
  stripGeminiDirectPrefix,
} from './providers/ai-provider.types';
import { OpenRouterBreaker } from './openrouter-breaker.service';
import { parseJsonResponse } from './utils/json-response.util';

/** Only one wait per model, and never a long one — the chain is the real remedy. */
const MAX_RATE_LIMIT_WAIT_MS = 5_000;

export type AiCallContext = {
  entityType?: string;
  entityId?: string;
  /** Pushed to the front of the scenario chain when the persona names a model. */
  preferredModel?: string;
};

/**
 * The single door between the app and any model.
 *
 * Callers name a scenario, not a model. The router resolves the chain, tries each
 * link, records what it cost, and gives up only when every link has failed —
 * at which point the caller's BullMQ job retries, which is the behaviour the
 * queues already have.
 */
@Injectable()
export class AiRouterService {
  private readonly logger = new Logger(AiRouterService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly modelConfig: ModelConfigService,
    private readonly openRouter: OpenRouterService,
    private readonly geminiDirect: GeminiDirectProvider,
    private readonly breaker: OpenRouterBreaker,
  ) {}

  /**
   * Visible to the admin endpoint so the state is inspectable, not folklore.
   *
   * Assíncrono porque o cooldown agora é compartilhado entre os processos: quem
   * pergunta pelo estado precisa da resposta do worker que está gerando, não da
   * cópia local de quem atende a requisição.
   */
  async getOpenRouterStatus(): Promise<{
    blocked: boolean;
    blockedUntil: Date | null;
  }> {
    const blockedUntil = await this.breaker.blockedUntil();

    return { blocked: blockedUntil !== null, blockedUntil };
  }

  private async recordUsage(
    scenario: AiScenario,
    row: {
      model: string;
      provider: string;
      inputTokens?: number;
      outputTokens?: number;
      costUsd?: number;
      errorKind?: string;
    },
    context: AiCallContext,
  ): Promise<void> {
    try {
      await this.prisma.aiUsageLog.create({
        data: {
          scenario,
          model: row.model,
          provider: row.provider,
          inputTokens: row.inputTokens,
          outputTokens: row.outputTokens,
          costUsd: row.costUsd,
          errorKind: row.errorKind,
          entityType: context.entityType,
          entityId: context.entityId,
        },
      });
    } catch (error) {
      // Losing an audit row must never fail the generation that succeeded.
      this.logger.warn(
        `Could not write the usage log: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  /**
   * Walks the chain for `scenario`, returning the first success.
   *
   * `attempt` is what differs between text and image; everything else — the
   * cooldown, the 429 wait, the usage log, the error accumulation — is identical,
   * and duplicating it once per modality is how the two drift apart.
   */
  private async runChain<
    T extends {
      model: string;
      provider: string;
      usage: { inputTokens?: number; outputTokens?: number; costUsd?: number };
    },
  >(
    scenario: AiScenario,
    context: AiCallContext,
    attempt: (model: string, viaGeminiDirect: boolean) => Promise<T>,
  ): Promise<T> {
    const chain = this.withPreferredModel(
      await this.modelConfig.getChain(scenario),
      context.preferredModel,
    );
    const failures: string[] = [];

    // Uma leitura por geração, não uma por elo: o estado compartilhado não muda
    // no meio da cadeia por conta de outro processo de um jeito que nos ajude, e
    // um 402 nosso atualiza a variável abaixo na hora.
    let openRouterBlocked = await this.breaker.isBlocked();

    for (const entry of chain) {
      const viaGeminiDirect = isGeminiDirect(entry);
      const model = viaGeminiDirect ? stripGeminiDirectPrefix(entry) : entry;

      // A `:free` model rides through the credit cooldown: the breaker exists
      // because paid calls fail on depleted credit, but free models cost
      // nothing and keep answering. Skipping them too is what would turn
      // "both paid providers are out" into an outage — which is the incident
      // that put the free tail on the API scenarios' chains.
      const isFreeModel = entry.endsWith(':free');
      if (!viaGeminiDirect && openRouterBlocked && !isFreeModel) {
        failures.push(`${entry}: skipped, OpenRouter in cooldown`);
        continue;
      }

      try {
        const result = await attempt(model, viaGeminiDirect);

        await this.recordUsage(
          scenario,
          {
            model: result.model,
            provider: result.provider,
            inputTokens: result.usage.inputTokens,
            outputTokens: result.usage.outputTokens,
            costUsd: result.usage.costUsd,
          },
          context,
        );

        if (failures.length) {
          this.logger.warn(
            `"${scenario}" fell back to ${entry} after: ${failures.join(' | ')}`,
          );
        }

        return result;
      } catch (error) {
        const kind =
          error instanceof InsufficientCreditsError
            ? 'insufficient_credits'
            : error instanceof RateLimitedError
              ? 'rate_limited'
              : 'provider_error';

        failures.push(
          `${entry}: ${error instanceof Error ? error.message : String(error)}`,
        );

        await this.recordUsage(
          scenario,
          {
            model,
            provider: viaGeminiDirect ? 'gemini-direct' : 'openrouter',
            errorKind: kind,
          },
          context,
        );

        if (error instanceof InsufficientCreditsError) {
          await this.breaker.block();
          openRouterBlocked = true;
          continue;
        }

        if (error instanceof RateLimitedError) {
          const wait = Math.min(
            error.retryAfterMs ?? 0,
            MAX_RATE_LIMIT_WAIT_MS,
          );

          if (wait > 0) {
            await new Promise((resolve) => setTimeout(resolve, wait));

            try {
              const retried = await attempt(model, viaGeminiDirect);

              await this.recordUsage(
                scenario,
                {
                  model: retried.model,
                  provider: retried.provider,
                  inputTokens: retried.usage.inputTokens,
                  outputTokens: retried.usage.outputTokens,
                  costUsd: retried.usage.costUsd,
                },
                context,
              );

              return retried;
            } catch {
              // Still limited. The next link is a better bet than waiting again.
            }
          }
        }
      }
    }

    throw new Error(
      `Every model failed for "${scenario}". Attempts: ${failures.join(' | ')}`,
    );
  }

  private withPreferredModel(chain: string[], preferred?: string): string[] {
    if (!preferred) {
      return chain;
    }

    return [preferred, ...chain.filter((model) => model !== preferred)];
  }

  async generateText(
    scenario: AiScenario,
    prompt: string,
    context: AiCallContext = {},
  ): Promise<AiTextResult> {
    return this.runChain(scenario, context, (model, viaGeminiDirect) =>
      viaGeminiDirect
        ? this.geminiDirect.generateText(model, prompt)
        : this.openRouter.generateText(model, prompt),
    );
  }

  /**
   * Text plus schema validation, which is what every caller actually wants.
   *
   * Returns `null` when the model answered but the answer is unusable — the same
   * contract `GeminiBaseService.parseJsonResponse` already established, so
   * migrating a caller does not change how it handles failure.
   */
  async generateJson<T>(
    scenario: AiScenario,
    prompt: string,
    schema: z.ZodType<T>,
    context: AiCallContext = {},
  ): Promise<{ data: T | null; result: AiTextResult }> {
    const result = await this.generateText(scenario, prompt, context);

    return {
      data: parseJsonResponse(result.text, schema, result.model),
      result,
    };
  }

  async generateImage(
    scenario: AiScenario,
    prompt: string,
    context: AiCallContext = {},
    options: AiImageOptions = {},
  ): Promise<AiImageResult> {
    return this.runChain(scenario, context, (model, viaGeminiDirect) =>
      viaGeminiDirect
        ? this.geminiDirect.generateImage(model, prompt, options)
        : this.openRouter.generateImage(model, prompt, options),
    );
  }
}
