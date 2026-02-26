import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DatabaseModule } from '@app/database';
import { AiModule } from '@app/ai';
import { StorageModule } from '@app/storage';
import { AI_BLOG_QUEUE, AI_BLOG_IMAGE_QUEUE } from '@app/config/constants';
import { EventsModule } from '../events/events.module';
import { AiBlogConsumer } from './ai-blog.consumer';
import { AiBlogWorkerService } from './ai-blog.service';
import { AiBlogImageConsumer } from './ai-blog-image.consumer';
import { AiBlogImageWorkerService } from './ai-blog-image.service';
import { AiBlogRefineService } from './ai-blog-refine.service';

@Module({
  imports: [
    DatabaseModule,
    AiModule,
    StorageModule,
    EventsModule,
    BullModule.registerQueue({ name: AI_BLOG_QUEUE }),
    BullModule.registerQueue({ name: AI_BLOG_IMAGE_QUEUE }),
  ],
  providers: [
    AiBlogConsumer,
    AiBlogWorkerService,
    AiBlogImageConsumer,
    AiBlogImageWorkerService,
    AiBlogRefineService,
  ],
})
export class AiBlogWorkerModule {}
