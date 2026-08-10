import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import {
  AiBlogImageWorkerService,
  GenerateBlogImageJobData,
} from './ai-blog-image.service';
import { AiBlogRefineService } from './ai-blog-refine.service';
import { EventsService } from '../events/events.service';
import { EVENT_TYPES, isFinalAttempt } from '../events/event-types';
import {
  AI_BLOG_IMAGE_QUEUE,
  GENERATE_AI_BLOG_IMAGE,
  REFINE_AI_BLOG_POST,
} from '@app/config/constants';
import { runWithCorrelationId } from '@app/config/request-context';
import { CorrelatedJobData } from '@app/config/job-data';
import {
  jobCorrelationId,
  reportJobFailure,
} from '../common/report-job-failure';

type ImageQueueJobData =
  | GenerateBlogImageJobData
  | (CorrelatedJobData & { postId: string; requestedByUserId?: string });

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
    return runWithCorrelationId(jobCorrelationId(job), () => this.handle(job));
  }

  private async handle(job: Job<ImageQueueJobData>): Promise<void> {
    const userId =
      'requestedByUserId' in job.data ? job.data.requestedByUserId : undefined;

    switch (job.name) {
      case GENERATE_AI_BLOG_IMAGE: {
        this.logger.log(
          `Processando geração de imagem para post: ${job.data.postId}`,
        );
        await this.aiBlogImageWorkerService.generateAndAttachImage(
          job.data as GenerateBlogImageJobData,
        );
        if (userId) {
          await this.eventsService.emit({
            userId,
            type: EVENT_TYPES.BLOG_COVER_IMAGE_COMPLETED,
            title: 'Imagem de capa gerada',
            message: 'A imagem de capa do post foi gerada com sucesso.',
            payload: { postId: job.data.postId },
          });
        }
        break;
      }
      case REFINE_AI_BLOG_POST: {
        this.logger.log(`Processando refinamento de post: ${job.data.postId}`);
        const result = await this.refineService.refinePost({
          postId: job.data.postId,
        });
        if (userId) {
          if (result.allGenerated) {
            await this.eventsService.emit({
              userId,
              type: EVENT_TYPES.BLOG_REFINE_COMPLETED,
              title: 'Refinamento concluído',
              message: 'As imagens do post foram geradas e inseridas.',
              payload: { postId: job.data.postId },
            });
          } else {
            await this.eventsService.emit({
              userId,
              type: EVENT_TYPES.BLOG_REFINE_PARTIAL,
              title: 'Refinamento parcial',
              message: `${result.generated} de ${result.total} imagens foram geradas. Algumas falharam.`,
              payload: {
                postId: job.data.postId,
                generated: result.generated,
                total: result.total,
              },
            });
          }
        }
        break;
      }
      default:
        this.logger.warn(`Job desconhecido: ${job.name}`);
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<ImageQueueJobData>): void {
    this.logger.log(
      `Job de imagem concluído: ${job.id} (post: ${job.data.postId})`,
    );
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job<ImageQueueJobData>, error: Error): Promise<void> {
    this.logger.error(
      `Job de imagem falhou: ${job.id} (post: ${job.data.postId}) — tentativa ${job.attemptsMade}: ${error.message}`,
      error.stack,
    );

    reportJobFailure(AI_BLOG_IMAGE_QUEUE, job, error);

    if (!isFinalAttempt(job)) return;

    const userId =
      'requestedByUserId' in job.data ? job.data.requestedByUserId : undefined;
    if (!userId) return;

    const isRefine = job.name === REFINE_AI_BLOG_POST;
    await this.eventsService.emit({
      userId,
      type: isRefine
        ? EVENT_TYPES.BLOG_REFINE_FAILED
        : EVENT_TYPES.BLOG_COVER_IMAGE_FAILED,
      title: isRefine ? 'Falha no refinamento' : 'Falha na imagem de capa',
      message: isRefine
        ? 'Não foi possível refinar o post após várias tentativas.'
        : 'Não foi possível gerar a imagem de capa após várias tentativas.',
      payload: { postId: job.data.postId, error: error.message },
    });
  }
}
