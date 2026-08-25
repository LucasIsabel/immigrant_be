import { DatabaseModule } from '@app/database';
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
