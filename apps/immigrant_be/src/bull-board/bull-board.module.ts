import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ADMIN_VISIBLE_QUEUES } from '@app/config/constants';
import { bullBoardBasicAuth } from './basic-auth.middleware';

/**
 * Queue dashboard, mounted only when it is safe to (see `app.module.ts`).
 *
 * Lives at `/admin/queues-board` so `/admin/queues` can be the JSON API the
 * admin UI polls. Same four queues as that API — `ADMIN_VISIBLE_QUEUES` —
 * so a typo here cannot open a board onto a queue nobody writes to.
 */
@Module({
  imports: [
    BullModule.registerQueue(...ADMIN_VISIBLE_QUEUES.map((name) => ({ name }))),
    BullBoardModule.forRoot({
      route: '/admin/queues-board',
      adapter: ExpressAdapter,
      middleware: bullBoardBasicAuth,
    }),
    ...ADMIN_VISIBLE_QUEUES.map((name) =>
      BullBoardModule.forFeature({ name, adapter: BullMQAdapter }),
    ),
  ],
})
export class AppBullBoardModule {}
