import { Processor, WorkerHost, InjectQueue } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import {
  BlogTranslationWorkerService,
  TranslatePostJobData,
} from './blog-translation.service';
import {
  BLOG_TRANSLATION_QUEUE,
  TRANSLATE_BLOG_POST,
  TRANSLATE_ALL_PENDING,
} from '@app/config/constants';

@Processor(BLOG_TRANSLATION_QUEUE)
export class BlogTranslationConsumer extends WorkerHost {
  private readonly logger = new Logger(BlogTranslationConsumer.name);

  constructor(
    private readonly translationService: BlogTranslationWorkerService,
    @InjectQueue(BLOG_TRANSLATION_QUEUE) private readonly queue: Queue,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    switch (job.name) {
      case TRANSLATE_BLOG_POST: {
        const data = job.data as TranslatePostJobData;
        this.logger.log(
          `Translating post ${data.postId} → ${data.targetLocale} (job: ${job.id})`,
        );
        await this.translationService.translatePost(data);
        break;
      }

      case TRANSLATE_ALL_PENDING: {
        this.logger.log('Scanning for pending translations…');
        const pending = await this.translationService.getPendingTranslations();

        if (pending.length === 0) {
          this.logger.log('No pending translations found');
          break;
        }

        await this.queue.addBulk(
          pending.map((item) => ({
            name: TRANSLATE_BLOG_POST,
            data: item,
            opts: { removeOnComplete: 10, removeOnFail: 5 },
          })),
        );

        this.logger.log(`Enqueued ${pending.length} translation jobs`);
        break;
      }

      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }
}
