import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  BLOG_TRANSLATION_QUEUE,
  TRANSLATE_ALL_PENDING,
} from '@app/config/constants';

@Injectable()
export class BlogTranslationCronService implements OnModuleInit {
  private readonly logger = new Logger(BlogTranslationCronService.name);

  constructor(
    @InjectQueue(BLOG_TRANSLATION_QUEUE) private readonly queue: Queue,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.queue.add(
      TRANSLATE_ALL_PENDING,
      {},
      {
        repeat: { pattern: '0 3 * * *' },
        jobId: 'daily-blog-translation-scan',
        removeOnComplete: 10,
        removeOnFail: 5,
      },
    );

    this.logger.log('Daily blog translation cron registered (03:00 UTC)');
  }
}
