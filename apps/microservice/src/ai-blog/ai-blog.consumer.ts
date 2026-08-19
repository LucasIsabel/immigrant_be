import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import {
  AiBlogWorkerService,
  GenerateBlogPostJobData,
} from './ai-blog.service';
import { EventsService } from '../events/events.service';
import { EVENT_TYPES, isFinalAttempt } from '../events/event-types';
import { AI_BLOG_QUEUE, GENERATE_AI_BLOG_POST } from '@app/config/constants';
import { runWithCorrelationId } from '@app/config/request-context';
import {
  jobCorrelationId,
  reportJobFailure,
} from '../common/report-job-failure';

@Processor(AI_BLOG_QUEUE)
export class AiBlogConsumer extends WorkerHost {
  private readonly logger = new Logger(AiBlogConsumer.name);

  constructor(
    private readonly aiBlogWorkerService: AiBlogWorkerService,
    private readonly eventsService: EventsService,
  ) {
    super();
  }

  async process(job: Job<GenerateBlogPostJobData>): Promise<void> {
    return runWithCorrelationId(jobCorrelationId(job), async () => {
      switch (job.name) {
        case GENERATE_AI_BLOG_POST: {
          this.logger.log(`Processing AI blog post generation job: ${job.id}`);
          await this.aiBlogWorkerService.generatePost(job.data);
          this.logger.log(
            `AI blog post generation completed for job: ${job.id}`,
          );

          if (job.data.requestedByUserId) {
            await this.eventsService.emit({
              userId: job.data.requestedByUserId,
              type: EVENT_TYPES.BLOG_POST_GENERATED,
              title: 'Post gerado',
              message:
                'O post foi gerado e está na fila de aprovação. Tradução e imagem de capa serão processadas em sequência.',
              payload: {},
            });
          }
          break;
        }
        default:
          this.logger.warn(`Unknown job name: ${job.name}`);
      }
    });
  }

  @OnWorkerEvent('failed')
  async onFailed(
    job: Job<GenerateBlogPostJobData>,
    error: Error,
  ): Promise<void> {
    this.logger.error(
      `Geração de post falhou: ${job.id} (country: ${job.data.country_id}) — tentativa ${job.attemptsMade}: ${error.message}`,
      error.stack,
    );

    reportJobFailure(AI_BLOG_QUEUE, job, error);

    if (!isFinalAttempt(job)) return;

    const aviso = {
      type: EVENT_TYPES.BLOG_POST_FAILED,
      title: 'Falha ao gerar post',
      message:
        'Não foi possível gerar o post após várias tentativas. Tente novamente.',
      payload: { countryId: job.data.country_id, error: error.message },
    };

    // Esta é a falha mais silenciosa que existia: quando a escrita falha nenhum
    // post é criado, então não há linha no banco para marcar — e sem
    // `requestedByUserId`, que o cron não tem, também não havia evento. O
    // agendamento simplesmente não produzia nada, sem deixar rastro.
    if (job.data.requestedByUserId) {
      await this.eventsService.emit({
        userId: job.data.requestedByUserId,
        ...aviso,
      });
      return;
    }

    await this.eventsService.emitToAdmins(aviso);
  }
}
