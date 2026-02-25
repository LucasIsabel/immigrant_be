import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { AiBlogWorkerService, GenerateBlogPostJobData } from './ai-blog.service';
import { AI_BLOG_QUEUE, GENERATE_AI_BLOG_POST } from '@app/config/constants';

@Processor(AI_BLOG_QUEUE)
export class AiBlogConsumer extends WorkerHost {
  private readonly logger = new Logger(AiBlogConsumer.name);

  constructor(private readonly aiBlogWorkerService: AiBlogWorkerService) {
    super();
  }

  async process(job: Job<GenerateBlogPostJobData>): Promise<void> {
    switch (job.name) {
      case GENERATE_AI_BLOG_POST: {
        this.logger.log(`Processing AI blog post generation job: ${job.id}`);
        await this.aiBlogWorkerService.generatePost(job.data);
        this.logger.log(`AI blog post generation completed for job: ${job.id}`);
        break;
      }
      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }
}
