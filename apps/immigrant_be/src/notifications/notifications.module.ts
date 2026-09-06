import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { NotificationsController } from './notifications.controller';
import { NotificationsInboxService } from './notifications.service';
import { NotificationsRepository } from './notifications.repository';

/**
 * `Http` in the name, and `Inbox` on the service, because `@app/notifications`
 * already publishes a `NotificationsModule` and a `NotificationsService` — that
 * one writes notifications, this one reads them back. Two things named the same
 * in one import list is a bug waiting for whoever adds the third.
 */
@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [NotificationsInboxService, NotificationsRepository],
})
export class NotificationsHttpModule {}
