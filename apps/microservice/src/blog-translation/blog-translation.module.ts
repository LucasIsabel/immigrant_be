import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DatabaseModule } from '@app/database';
import { AiModule } from '@app/ai';
import { BullMQConfigModule } from '@app/config/bull.module';
import {
  BLOG_TRANSLATION_QUEUE,
  AI_BLOG_IMAGE_QUEUE,
} from '@app/config/constants';
import { EventsModule } from '../events/events.module';
import { BlogTranslationConsumer } from './blog-translation.consumer';
import { BlogCategoryTranslationService } from './blog-category-translation.service';
import { BlogTranslationWorkerService } from './blog-translation.service';
import { BlogTranslationCronService } from './blog-translation-cron.service';

@Module({
  imports: [
    DatabaseModule,
    AiModule,
    BullMQConfigModule,
    EventsModule,
    BullModule.registerQueue({ name: BLOG_TRANSLATION_QUEUE }),
    // A última tradução enfileira a capa, então este módulo precisa da fila de
    // imagem — é aqui que a cadeia continua.
    BullModule.registerQueue({ name: AI_BLOG_IMAGE_QUEUE }),
  ],
  providers: [
    BlogTranslationConsumer,
    BlogTranslationWorkerService,
    BlogCategoryTranslationService,
    BlogTranslationCronService,
  ],
})
export class BlogTranslationWorkerModule {}
