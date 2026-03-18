import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import {
  AiImageWorkerService,
  GenerateAiImageJobData,
} from './ai-image.service';
import { AI_IMAGE_QUEUE, GENERATE_AI_IMAGE } from '@app/config/constants';

@Processor(AI_IMAGE_QUEUE)
export class AiImageConsumer extends WorkerHost {
  private readonly logger = new Logger(AiImageConsumer.name);

  constructor(private readonly aiImageWorkerService: AiImageWorkerService) {
    super();
  }

  async process(job: Job<GenerateAiImageJobData>): Promise<void> {
    if (job.name !== GENERATE_AI_IMAGE) {
      this.logger.warn(`Unknown job name: ${job.name}`);
      return;
    }

    this.logger.log(
      `Processing AI image job: ${job.id} (imageId: ${job.data.imageId})`,
    );
    await this.aiImageWorkerService.processImage(job.data);
    this.logger.log(`AI image job completed: ${job.id}`);
  }
}
