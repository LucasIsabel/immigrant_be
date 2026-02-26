import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { AiBlogImageWorkerService, GenerateBlogImageJobData } from './ai-blog-image.service';
import { AI_BLOG_IMAGE_QUEUE, GENERATE_AI_BLOG_IMAGE } from '@app/config/constants';

@Processor(AI_BLOG_IMAGE_QUEUE)
export class AiBlogImageConsumer extends WorkerHost {
  private readonly logger = new Logger(AiBlogImageConsumer.name);

  constructor(private readonly aiBlogImageWorkerService: AiBlogImageWorkerService) {
    super();
  }

  async process(job: Job<GenerateBlogImageJobData>): Promise<void> {
    switch (job.name) {
      case GENERATE_AI_BLOG_IMAGE: {
        this.logger.log(`Processando geração de imagem para post: ${job.data.postId}`);
        await this.aiBlogImageWorkerService.generateAndAttachImage(job.data);
        break;
      }
      default:
        this.logger.warn(`Job desconhecido: ${job.name}`);
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job): void {
    this.logger.log(`Job de imagem concluído: ${job.id} (post: ${job.data.postId})`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error): void {
    this.logger.error(
      `Job de imagem falhou: ${job.id} (post: ${job.data.postId}) — ${error.message}`,
      error.stack,
    );
  }
}
