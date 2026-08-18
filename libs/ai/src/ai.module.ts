import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { AiRouterService } from './ai-router.service';
import {
  AI_BREAKER_REDIS,
  OpenRouterBreaker,
} from './openrouter-breaker.service';
import { GeminiBaseService } from './gemini-base.service';
import { ModelConfigService } from './model-config.service';
import { GeminiDirectProvider } from './providers/gemini-direct.provider';
import { OpenRouterService } from './providers/openrouter.service';

/**
 * `GeminiBaseService` stays exported: `system`, `plan` and `business-pages` still
 * depend on it and are out of scope here. New callers should use
 * `AiRouterService`, which is the one that honours the configured model, the
 * fallback chain and the usage log.
 *
 * `DatabaseModule` is imported explicitly — it is not `@Global()` in this repo —
 * because the model config and the usage log both live in the database. That is
 * new for `libs/ai`, which used to be stateless.
 *
 * O cliente Redis existe pelo cooldown de crédito, que precisa valer para a API
 * e para o worker ao mesmo tempo. É uma conexão própria, deliberadamente não a do
 * BullMQ: o breaker não deve depender de quais filas o processo registrou.
 */
@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [
    GeminiBaseService,
    OpenRouterService,
    GeminiDirectProvider,
    ModelConfigService,
    OpenRouterBreaker,
    AiRouterService,
    {
      provide: AI_BREAKER_REDIS,
      /**
       * `REDIS_URL` vem pelo `ConfigService`, não pelo `env` importado: aquele
       * módulo valida `process.env` no topo do arquivo, então importá-lo aqui
       * fazia todo teste que toca `@app/ai` morrer no carregamento — o barrel
       * exporta `AiModule`, e o efeito colateral viajava com ele.
       */
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('REDIS_URL');

        if (!url) {
          // Sem URL o breaker segue funcionando, só deixa de ser compartilhado —
          // e o próprio `OpenRouterBreaker` avisa disso no boot.
          return undefined;
        }

        const client = new Redis(url, {
          lazyConnect: true,
          maxRetriesPerRequest: 0,
          connectTimeout: 2_000,
          retryStrategy: (times) => Math.min(times * 200, 2_000),
        });

        /**
         * Sem um listener de `error`, cada reconexão falha vira evento não
         * tratado e derruba o processo. O breaker já degrada para o estado local
         * quando o Redis não responde, então o evento em si é ruído.
         */
        client.on('error', () => undefined);

        return client;
      },
    },
  ],
  exports: [
    GeminiBaseService,
    AiRouterService,
    ModelConfigService,
    OpenRouterService,
    OpenRouterBreaker,
  ],
})
export class AiModule {}
