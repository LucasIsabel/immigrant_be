import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import {
  AI_BLOG_IMAGE_QUEUE,
  AI_BLOG_QUEUE,
  AI_IMAGE_QUEUE,
  BLOG_TRANSLATION_QUEUE,
} from '@app/config/constants';
import { bullBoardBasicAuth } from './basic-auth.middleware';

const QUEUES = [
  AI_BLOG_QUEUE,
  AI_BLOG_IMAGE_QUEUE,
  BLOG_TRANSLATION_QUEUE,
  AI_IMAGE_QUEUE,
];

/**
 * Queue dashboard, mounted only when it is safe to (see `app.module.ts`).
 * Queue names come from the shared constants — a literal here would silently
 * open a board onto a queue nobody writes to.
 */
@Module({
  imports: [
    BullModule.registerQueue(...QUEUES.map((name) => ({ name }))),
    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter,
      middleware: bullBoardBasicAuth,
    }),
    ...QUEUES.map((name) =>
      BullBoardModule.forFeature({ name, adapter: BullMQAdapter }),
    ),
  ],
})
export class AppBullBoardModule {}
