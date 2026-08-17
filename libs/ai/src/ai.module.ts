import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiRouterService } from './ai-router.service';
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
 */
@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [
    GeminiBaseService,
    OpenRouterService,
    GeminiDirectProvider,
    ModelConfigService,
    AiRouterService,
  ],
  exports: [
    GeminiBaseService,
    AiRouterService,
    ModelConfigService,
    OpenRouterService,
  ],
})
export class AiModule {}
