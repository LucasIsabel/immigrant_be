import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import {
  AiImageWorkerService,
  GenerateAiImageJobData,
} from './ai-image.service';
import { EventsService } from '../events/events.service';
import { EVENT_TYPES, isFinalAttempt } from '../events/event-types';
import { AI_IMAGE_QUEUE, GENERATE_AI_IMAGE } from '@app/config/constants';
import { runWithCorrelationId } from '@app/config/request-context';
import {
  jobCorrelationId,
  reportJobFailure,
} from '../common/report-job-failure';

@Processor(AI_IMAGE_QUEUE)
export class AiImageConsumer extends WorkerHost {
  private readonly logger = new Logger(AiImageConsumer.name);

  constructor(
    private readonly aiImageWorkerService: AiImageWorkerService,
    private readonly eventsService: EventsService,
  ) {
    super();
  }

  async process(job: Job<GenerateAiImageJobData>): Promise<void> {
    return runWithCorrelationId(jobCorrelationId(job), async () => {
      if (job.name !== GENERATE_AI_IMAGE) {
        this.logger.warn(`Unknown job name: ${job.name}`);
        return;
      }

      this.logger.log(
        `Processing AI image job: ${job.id} (imageId: ${job.data.imageId})`,
      );
      await this.aiImageWorkerService.processImage(job.data);
      this.logger.log(`AI image job completed: ${job.id}`);

      if (job.data.requestedByUserId) {
        await this.eventsService.emit({
          userId: job.data.requestedByUserId,
          type: EVENT_TYPES.AI_IMAGE_COMPLETED,
          title: 'Imagem gerada',
          message: 'A imagem foi gerada e já está disponível na biblioteca.',
          payload: { imageId: job.data.imageId },
        });
      }
    });
  }

  @OnWorkerEvent('failed')
  async onFailed(
    job: Job<GenerateAiImageJobData>,
    error: Error,
  ): Promise<void> {
    this.logger.error(
      `Job de imagem falhou: ${job.id} (imageId: ${job.data.imageId}) — tentativa ${job.attemptsMade}: ${error.message}`,
      error.stack,
    );

    reportJobFailure(AI_IMAGE_QUEUE, job, error);

    if (!isFinalAttempt(job)) return;

    await this.aiImageWorkerService.markFailed(job.data.imageId, error.message);

    if (job.data.requestedByUserId) {
      await this.eventsService.emit({
        userId: job.data.requestedByUserId,
        type: EVENT_TYPES.AI_IMAGE_FAILED,
        title: 'Falha ao gerar imagem',
        message: 'Não foi possível gerar a imagem. Tente novamente.',
        payload: { imageId: job.data.imageId, error: error.message },
      });
    }
  }
}
