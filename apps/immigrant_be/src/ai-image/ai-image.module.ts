import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DatabaseModule } from '@app/database';
import { StorageModule } from '@app/storage';
import { AI_IMAGE_QUEUE } from '@app/config/constants';
import { AiImageController } from './ai-image.controller';
import { AiImageService } from './ai-image.service';
import { AiImageRepository } from './ai-image.repository';

@Module({
  imports: [
    DatabaseModule,
    StorageModule,
    BullModule.registerQueue({ name: AI_IMAGE_QUEUE }),
  ],
  controllers: [AiImageController],
  providers: [AiImageService, AiImageRepository],
})
export class AiImageModule {}
