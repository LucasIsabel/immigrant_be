import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { AiBlogImageWorkerService, GenerateBlogImageJobData } from './ai-blog-image.service';
import { AiBlogRefineService } from './ai-blog-refine.service';
import { EventsService } from '../events/events.service';
import { AI_BLOG_IMAGE_QUEUE, GENERATE_AI_BLOG_IMAGE, REFINE_AI_BLOG_POST } from '@app/config/constants';

type ImageQueueJobData =
  | GenerateBlogImageJobData
  | { postId: string; requestedByUserId?: string };

@Processor(AI_BLOG_IMAGE_QUEUE)
export class AiBlogImageConsumer extends WorkerHost {
  private readonly logger = new Logger(AiBlogImageConsumer.name);

  constructor(
    private readonly aiBlogImageWorkerService: AiBlogImageWorkerService,
    private readonly refineService: AiBlogRefineService,
    private readonly eventsService: EventsService,
  ) {
    super();
  }

  async process(job: Job<ImageQueueJobData>): Promise<void> {
    const userId = 'requestedByUserId' in job.data ? job.data.requestedByUserId : undefined;

    switch (job.name) {
      case GENERATE_AI_BLOG_IMAGE: {
        this.logger.log(`Processando geração de imagem para post: ${job.data.postId}`);
        await this.aiBlogImageWorkerService.generateAndAttachImage(job.data as GenerateBlogImageJobData);
        if (userId) {
          await this.eventsService.emit({
            userId,
            type: 'blog_cover_image_completed',
            title: 'Imagem de capa gerada',
            message: 'A imagem de capa do post foi gerada com sucesso.',
            payload: { postId: job.data.postId },
          });
        }
        break;
      }
      case REFINE_AI_BLOG_POST: {
        this.logger.log(`Processando refinamento de post: ${job.data.postId}`);
        await this.refineService.refinePost({ postId: job.data.postId });
        if (userId) {
          await this.eventsService.emit({
            userId,
            type: 'blog_refine_completed',
            title: 'Refinamento concluído',
            message: 'As imagens do post foram geradas e inseridas.',
            payload: { postId: job.data.postId },
          });
        }
        break;
      }
      default:
        this.logger.warn(`Job desconhecido: ${job.name}`);
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<ImageQueueJobData>): void {
    this.logger.log(`Job de imagem concluído: ${job.id} (post: ${job.data.postId})`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<ImageQueueJobData>, error: Error): void {
    this.logger.error(
      `Job de imagem falhou: ${job.id} (post: ${job.data.postId}) — ${error.message}`,
      error.stack,
    );
  }
}
