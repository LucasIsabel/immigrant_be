import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DatabaseModule } from '@app/database';
import { AiModule } from '@app/ai';
import { StorageModule } from '@app/storage';
import { AI_IMAGE_QUEUE } from '@app/config/constants';
import { AiImageConsumer } from './ai-image.consumer';
import { AiImageWorkerService } from './ai-image.service';

@Module({
  imports: [
    DatabaseModule,
    AiModule,
    StorageModule,
    BullModule.registerQueue({ name: AI_IMAGE_QUEUE }),
  ],
  providers: [AiImageConsumer, AiImageWorkerService],
})
export class AiImageWorkerModule {}
