import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DatabaseModule } from '@app/database';
import { AiModule } from '@app/ai';
import { AI_BLOG_QUEUE } from '@app/config/constants';
import { AiBlogConsumer } from './ai-blog.consumer';
import { AiBlogWorkerService } from './ai-blog.service';

@Module({
  imports: [
    DatabaseModule,
    AiModule,
    BullModule.registerQueue({ name: AI_BLOG_QUEUE }),
  ],
  providers: [AiBlogConsumer, AiBlogWorkerService],
})
export class AiBlogWorkerModule {}
