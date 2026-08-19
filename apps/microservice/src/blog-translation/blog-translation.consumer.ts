import {
  InjectQueue,
  OnWorkerEvent,
  Processor,
  WorkerHost,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import {
  BlogTranslationWorkerService,
  TranslatePostJobData,
} from './blog-translation.service';
import { EventsService } from '../events/events.service';
import { EVENT_TYPES, isFinalAttempt } from '../events/event-types';
import {
  AI_BLOG_IMAGE_QUEUE,
  BLOG_TRANSLATION_QUEUE,
  GENERATE_AI_BLOG_IMAGE,
  TRANSLATE_BLOG_POST,
  TRANSLATE_ALL_PENDING,
} from '@app/config/constants';
import { BlogPipelineStatus } from '../../../../generated/prisma';
import {
  getCorrelationId,
  runWithCorrelationId,
} from '@app/config/request-context';
import {
  jobCorrelationId,
  reportJobFailure,
} from '../common/report-job-failure';

@Processor(BLOG_TRANSLATION_QUEUE)
export class BlogTranslationConsumer extends WorkerHost {
  private readonly logger = new Logger(BlogTranslationConsumer.name);

  constructor(
    private readonly translationService: BlogTranslationWorkerService,
    private readonly eventsService: EventsService,
    @InjectQueue(BLOG_TRANSLATION_QUEUE) private readonly queue: Queue,
    @InjectQueue(AI_BLOG_IMAGE_QUEUE) private readonly imageQueue: Queue,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    return runWithCorrelationId(jobCorrelationId(job), () => this.handle(job));
  }

  private async handle(job: Job): Promise<void> {
    switch (job.name) {
      case TRANSLATE_BLOG_POST: {
        const data = job.data as TranslatePostJobData;
        this.logger.log(
          `Translating post ${data.postId} → ${data.targetLocale} (job: ${job.id})`,
        );
        await this.translationService.translatePost(data);
        await this.continueToImage(data);

        if (data.requestedByUserId) {
          await this.eventsService.emit({
            userId: data.requestedByUserId,
            type: EVENT_TYPES.BLOG_TRANSLATION_COMPLETED,
            title: 'Tradução concluída',
            message: `Tradução do post para ${data.targetLocale.toUpperCase()} concluída.`,
            payload: { postId: data.postId, locale: data.targetLocale },
          });
        }
        break;
      }

      case TRANSLATE_ALL_PENDING: {
        this.logger.log('Scanning for pending translations…');
        const pending = await this.translationService.getPendingTranslations();

        if (pending.length === 0) {
          this.logger.log('No pending translations found');
          break;
        }

        // The fanned-out jobs inherit this scan's ID, so one cron tick and
        // everything it spawned share a trace.
        await this.queue.addBulk(
          pending.map((item) => ({
            name: TRANSLATE_BLOG_POST,
            data: { ...item, correlationId: getCorrelationId() },
          })),
        );

        this.logger.log(`Enqueued ${pending.length} translation jobs`);
        break;
      }

      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }

  /**
   * Enfileira a capa quando esta foi a última tradução que faltava.
   *
   * O serviço faz a transição com compare-and-set e só devolve `true` para um
   * dos jobs paralelos, então a capa é enfileirada uma vez só.
   */
  private async continueToImage(data: TranslatePostJobData): Promise<void> {
    const advanced = await this.translationService.advanceToImageIfTranslated(
      data.postId,
    );
    if (!advanced) return;

    const post = await this.translationService.getPostForImage(data.postId);
    if (!post) return;

    try {
      await this.imageQueue.add(GENERATE_AI_BLOG_IMAGE, {
        postId: post.id,
        slug: post.slug,
        title: post.title,
        countryName: post.countryName,
        requestedByUserId: data.requestedByUserId,
        correlationId: getCorrelationId(),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Falha ao enfileirar capa para ${post.id}: ${message}`);
      await this.translationService.markPipelineFailure(
        data.postId,
        BlogPipelineStatus.FAILED_IMAGE,
        'cover_image',
        message,
      );
      return;
    }

    if (data.requestedByUserId) {
      await this.eventsService.emit({
        userId: data.requestedByUserId,
        type: EVENT_TYPES.BLOG_COVER_IMAGE_STARTED,
        title: 'Imagem de capa enfileirada',
        message: 'A geração da imagem de capa foi iniciada.',
        payload: { postId: post.id },
      });
    }

    this.logger.log(`Traduções completas — capa enfileirada para ${post.id}`);
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job, error: Error): Promise<void> {
    this.logger.error(
      `Job de tradução falhou: ${job.id} (${job.name}) — tentativa ${job.attemptsMade}: ${error.message}`,
      error.stack,
    );

    reportJobFailure(BLOG_TRANSLATION_QUEUE, job, error);

    if (job.name !== TRANSLATE_BLOG_POST || !isFinalAttempt(job)) return;

    const data = job.data as TranslatePostJobData;

    // O estado é marcado independentemente de haver usuário para notificar: um
    // job de cron não tem `requestedByUserId`, e é justamente nele que a falha
    // silenciosa dói.
    await this.translationService.markPipelineFailure(
      data.postId,
      BlogPipelineStatus.FAILED_TRANSLATION,
      `translation:${data.targetLocale}`,
      error.message,
    );

    const aviso = {
      type: EVENT_TYPES.BLOG_TRANSLATION_FAILED,
      title: 'Falha na tradução',
      message: `Não foi possível traduzir o post para ${data.targetLocale.toUpperCase()} após várias tentativas.`,
      payload: {
        postId: data.postId,
        locale: data.targetLocale,
        error: error.message,
      },
    };

    // Sem `requestedByUserId` o job veio do cron, e antes daqui a falha não
    // chegava a ninguém: o post ficava marcado no banco e ninguém era avisado.
    if (data.requestedByUserId) {
      await this.eventsService.emit({
        userId: data.requestedByUserId,
        ...aviso,
      });
      return;
    }

    await this.eventsService.emitToAdmins(aviso);
  }
}
