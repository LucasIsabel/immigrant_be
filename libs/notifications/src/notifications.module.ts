import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { EmailModule } from '@app/email';
import { NotificationsService } from './notifications.service';

/**
 * Global for the same reason `EmailModule` is: notifying is a cross-cutting
 * act, and both applications reach for it from services that have nothing else
 * to do with each other.
 */
@Global()
@Module({
  imports: [DatabaseModule, EmailModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
