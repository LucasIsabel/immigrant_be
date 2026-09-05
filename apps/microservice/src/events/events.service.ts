import { Injectable } from '@nestjs/common';
import {
  NotificationsService,
  type EmitEventInput,
} from '@app/notifications/notifications.service';

export type CreateEventInput = EmitEventInput;

/**
 * The workers' way in to `@app/notifications`.
 *
 * Everything that used to live here — the write, and the one-row-per-admin
 * fan-out with the reasoning behind it — moved into the library, because the
 * API needs to notify people too and a service that only the microservice can
 * reach cannot serve both. What is left is the name the five consumers already
 * inject, so that move cost them nothing.
 *
 * The deep path, not the barrel: the barrel pulls in `NotificationsModule`, and
 * with it `@app/email` and the environment parsing behind it. A worker that
 * only wants to write a row should not fail to load because no mail server is
 * configured.
 */
@Injectable()
export class EventsService {
  constructor(private readonly notifications: NotificationsService) {}

  /**
   * Emits an event to be delivered via SSE to the user.
   * Called by queue consumers when a task completes.
   */
  async emit(input: CreateEventInput): Promise<void> {
    await this.notifications.emit(input);
  }

  /** Emits a notice that has no owner: a cron failure, exhausted credit. */
  async emitToAdmins(input: Omit<CreateEventInput, 'userId'>): Promise<void> {
    await this.notifications.emitToAdmins(input);
  }
}
