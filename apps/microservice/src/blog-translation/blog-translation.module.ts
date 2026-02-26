import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DatabaseModule } from '@app/database';
import { AiModule } from '@app/ai';
import { BullMQConfigModule } from '@app/config/bull.module';
import { BLOG_TRANSLATION_QUEUE } from '@app/config/constants';
import { BlogTranslationConsumer } from './blog-translation.consumer';
import { BlogTranslationWorkerService } from './blog-translation.service';
import { BlogTranslationCronService } from './blog-translation-cron.service';

@Module({
  imports: [
    DatabaseModule,
    AiModule,
    BullMQConfigModule,
    BullModule.registerQueue({ name: BLOG_TRANSLATION_QUEUE }),
  ],
  providers: [
    BlogTranslationConsumer,
    BlogTranslationWorkerService,
    BlogTranslationCronService,
  ],
})
export class BlogTranslationWorkerModule {}
