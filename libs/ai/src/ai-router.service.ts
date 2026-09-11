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
  UnusableResponseError,
  stripGeminiDirectPrefix,
} from './providers/ai-provider.types';
import { OpenRouterBreaker } from './openrouter-breaker.service';
import { parseJsonResponseDetailed } from './utils/json-response.util';

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
              : error instanceof UnusableResponseError
                ? 'unusable_response'
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
            // An unusable answer was still charged for. Booking it with no
            // cost is how 31 failed calls looked like successes on the bill.
            ...(error instanceof UnusableResponseError && error.usage
              ? {
                  inputTokens: error.usage.inputTokens,
                  outputTokens: error.usage.outputTokens,
                  costUsd: error.usage.costUsd,
                }
              : {}),
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
   * The parsing happens **inside** the link, not after the chain: an answer
   * that does not parse fails its model and the next one is asked. It used to
   * happen afterwards, which made an unusable answer a chain success — the
   * fallbacks were never consulted, and the caller's BullMQ retries all went
   * back to the model that had just failed. That is `IMMIGRANT-BE-1`: 31
   * events, 12 places, one of them failing nine times in a row.
   *
   * Still returns `null` when every model answered unusably, because seven
   * callers already treat `null` as "the model did not answer usefully".
   */
  async generateJson<T>(
    scenario: AiScenario,
    prompt: string,
    schema: z.ZodType<T>,
    context: AiCallContext = {},
  ): Promise<{ data: T | null; result: AiTextResult }> {
    return this.runParsedChain(scenario, context, schema, (model, direct) =>
      direct
        ? this.geminiDirect.generateText(model, prompt)
        : this.openRouter.generateText(model, prompt),
    );
  }

  /**
   * Walks the chain with the parser as part of each attempt.
   *
   * The `null` return is the reason this is not simply `runChain`: when every
   * model answers unusably the callers want `null` and the last result, not the
   * `Every model failed` throw a transport outage produces. Those are different
   * failures and the callers already tell them apart.
   */
  private async runParsedChain<T>(
    scenario: AiScenario,
    context: AiCallContext,
    schema: z.ZodType<T>,
    call: (model: string, viaGeminiDirect: boolean) => Promise<AiTextResult>,
  ): Promise<{ data: T | null; result: AiTextResult }> {
    let lastUnusable: { result: AiTextResult } | null = null;

    try {
      const result = await this.runChain<AiTextResult & { parsed: T }>(
        scenario,
        context,
        async (model, viaGeminiDirect) => {
          const answer = await call(model, viaGeminiDirect);
          const outcome = parseJsonResponseDetailed(
            answer.text,
            schema,
            answer.model,
          );

          if (!outcome.ok) {
            lastUnusable = { result: answer };
            throw new UnusableResponseError(
              answer.provider,
              answer.model,
              outcome.reason,
              outcome.detail,
              answer.usage,
            );
          }

          return { ...answer, parsed: outcome.data };
        },
      );

      return { data: result.parsed, result };
    } catch (error) {
      // Every link answered, and none of them usefully. The callers' `null`
      // branch is the right place for that; a throw would turn a bad answer
      // into an outage.
      if (lastUnusable) {
        return {
          data: null,
          result: (lastUnusable as { result: AiTextResult }).result,
        };
      }
      throw error;
    }
  }

  /**
   * Shows the model pictures and validates what it says about them.
   *
   * There is no `gemini-direct` branch, and its absence is the design: that
   * provider has no vision path, so a chain entry pointing at it throws
   * instead of quietly answering from the text alone. A moderator that
   * reports "low risk" on a photo nobody looked at is worse than one that
   * fails — failing sends the page to a human, which is where it belonged.
   */
  async analyseImages<T>(
    scenario: AiScenario,
    prompt: string,
    imageUrls: string[],
    schema: z.ZodType<T>,
    context: AiCallContext = {},
  ): Promise<{ data: T | null; result: AiTextResult }> {
    return this.runParsedChain(scenario, context, schema, (model, direct) => {
      if (direct) {
        throw new Error(
          `${model} cannot be used for ${scenario}: gemini-direct has no vision path`,
        );
      }
      return this.openRouter.analyseImages(model, prompt, imageUrls);
    });
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
