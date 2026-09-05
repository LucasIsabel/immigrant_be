import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { EmailModule, EmailService } from '@app/email';
import {
  NOTIFICATION_MAILER,
  NotificationsService,
} from './notifications.service';

/**
 * Global for the same reason `EmailModule` is: notifying is a cross-cutting
 * act, and both applications reach for it from services that have nothing else
 * to do with each other.
 */
@Global()
@Module({
  imports: [DatabaseModule, EmailModule],
  providers: [
    NotificationsService,
    // The only place `@app/email` is named. Everything upstream of here — the
    // queue consumers included — reaches the service by its deep path and never
    // loads the mail library at all.
    { provide: NOTIFICATION_MAILER, useExisting: EmailService },
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
