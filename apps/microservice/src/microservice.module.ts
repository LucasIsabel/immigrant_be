import { DatabaseModule } from '@app/database';
import { SentryModule } from '@sentry/nestjs/setup';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { buildPinoOptions } from '@app/config/logger';
import { EventsModule } from './events/events.module';
import { AiBlogWorkerModule } from './ai-blog/ai-blog.module';
import { AiImageWorkerModule } from './ai-image/ai-image.module';
import { BlogTranslationWorkerModule } from './blog-translation/blog-translation.module';
import { PlaceIngestionWorkerModule } from './place-ingestion/place-ingestion.module';

@Module({
  imports: [
    /*
     * Passo prescrito pelo SDK, e que faltava nos dois apps.
     *
     * O `instrument.ts` inicializa o Sentry antes de tudo, e o filtro de
     * exceções já reportava com `captureException` — mas a documentação do
     * `@sentry/nestjs` pede também este módulo na raiz, que é o que liga a
     * instrumentação específica do Nest. Sem ele o SDK carregava pela metade e
     * ninguém notava, porque a metade que faltava não dá erro: só não gera dado.
     */
    SentryModule.forRoot(),
    LoggerModule.forRoot(buildPinoOptions('microservice')),
    DatabaseModule,
    EventsModule,
    AiBlogWorkerModule,
    AiImageWorkerModule,
    BlogTranslationWorkerModule,
    PlaceIngestionWorkerModule,
  ],
})
export class MicroserviceModule {}
