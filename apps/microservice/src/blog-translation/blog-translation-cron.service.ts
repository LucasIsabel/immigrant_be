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
        // The scan only fans out into per-post jobs; retrying it would duplicate
        // that fan-out, and the next daily run picks up whatever was missed.
        attempts: 1,
      },
    );

    this.logger.log('Daily blog translation cron registered (03:00 UTC)');
  }
}
