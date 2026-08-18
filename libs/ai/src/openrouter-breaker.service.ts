import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import type Redis from 'ioredis';
import { AI_ALERT_SINK, type AiAlertSink } from './ai-alert.port';

export const AI_BREAKER_REDIS = 'AI_BREAKER_REDIS';

/**
 * How long OpenRouter is considered unavailable after a 402.
 *
 * Credits belong to the account, so once one model reports insufficient credit
 * every other OpenRouter model will too. Hammering the API to rediscover that on
 * each job wastes latency on every request; the first 402 skips OpenRouter for
 * the whole cooldown and generation goes straight to the Gemini link.
 */
export const CREDITS_COOLDOWN_MS = 15 * 60_000;

const REDIS_KEY = 'ai:openrouter:blocked_until';

/**
 * The 402 cooldown, shared between processes.
 *
 * The API and the microservice are separate processes with separate heaps. While
 * this lived in a field, each one had its own cooldown: the worker would trip the
 * breaker and keep generating through the fallback chain, and
 * `GET /admin/ai/models/status` — served by the API — kept answering "not
 * blocked", because the API's own copy had never been touched. The admin was
 * reading the state of the process that wasn't generating anything.
 *
 * Redis is the shared truth. The in-memory timestamp stays as a floor rather
 * than a cache: if Redis is unreachable, a process that already saw a 402 must
 * keep honouring it — losing the cooldown would send every job back to hammering
 * an account with no credit. So a block is remembered locally *and* published,
 * and the effective deadline is whichever is further away.
 */
@Injectable()
export class OpenRouterBreaker {
  private readonly logger = new Logger(OpenRouterBreaker.name);
  private localBlockedUntil = 0;

  constructor(
    @Optional() @Inject(AI_BREAKER_REDIS) private readonly redis?: Redis,
    @Optional() @Inject(AI_ALERT_SINK) private readonly alerts?: AiAlertSink,
  ) {
    if (!redis) {
      this.logger.warn(
        'Sem cliente Redis: o cooldown de crédito vale só neste processo. ' +
          'A API e o worker vão divergir sobre o estado do OpenRouter.',
      );
    }
  }

  async block(): Promise<void> {
    const until = Date.now() + CREDITS_COOLDOWN_MS;
    this.localBlockedUntil = Math.max(this.localBlockedUntil, until);

    try {
      // O próprio TTL expira a chave, então não sobra estado velho para limpar.
      await this.redis?.set(REDIS_KEY, until, 'PX', CREDITS_COOLDOWN_MS);
    } catch (error) {
      // Publicar é o que os outros processos veem; não conseguir publicar é
      // ruim, mas não pode custar o cooldown local nem derrubar a geração.
      this.logger.warn(
        `Não foi possível publicar o cooldown no Redis: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }

    this.logger.error(
      `OpenRouter is out of credit — skipping it for ${
        CREDITS_COOLDOWN_MS / 60_000
      } minutes and using the fallback chain.`,
    );

    // Avisar não pode custar a geração: o 402 já foi tratado e a cadeia segue
    // para o fallback, com ou sem alarme.
    await this.alerts
      ?.creditsExhausted({ blockedUntil: new Date(until) })
      .catch((error: unknown) => {
        this.logger.warn(
          `Não foi possível emitir o alerta de crédito esgotado: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      });
  }

  async isBlocked(): Promise<boolean> {
    return (await this.blockedUntil()) !== null;
  }

  /** O instante em que o cooldown termina, ou `null` se não há bloqueio. */
  async blockedUntil(): Promise<Date | null> {
    const shared = await this.readShared();
    const effective = Math.max(this.localBlockedUntil, shared);

    return Date.now() < effective ? new Date(effective) : null;
  }

  private async readShared(): Promise<number> {
    if (!this.redis) return 0;

    try {
      const raw = await this.redis.get(REDIS_KEY);
      if (!raw) return 0;

      const parsed = Number(raw);
      return Number.isFinite(parsed) ? parsed : 0;
    } catch (error) {
      // Redis fora do ar não pode impedir geração: cai para o que este processo
      // sabe. O pior caso é voltar ao comportamento anterior a esta mudança.
      this.logger.warn(
        `Não foi possível ler o cooldown do Redis: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      return 0;
    }
  }
}
