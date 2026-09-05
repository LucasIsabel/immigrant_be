import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { EmailService } from '@app/email';
import { NotificationStatus, Prisma } from 'generated/prisma';
import type {
  NotificationPayloads,
  UserNotificationType,
} from './notification-types';

/** A row written with prose already in it — the workers' shape. */
export interface EmitEventInput {
  userId: string;
  type: string;
  title?: string;
  message?: string;
  payload?: Record<string, unknown>;
}

export interface NotifyInput<T extends UserNotificationType> {
  userId: string;
  type: T;
  payload: NotificationPayloads[T];
  /**
   * Sent only when the recipient still wants e-mail. The row is written either
   * way: the bell is now the channel that always works, and e-mail is the one
   * they can switch off.
   */
  email?: { subject: string; html: string };
}

/**
 * The one place a notification is written.
 *
 * It writes to `events`, which was already the SSE queue and is now also the
 * inbox — the same INSERT that raises a toast is the row the bell reads back.
 * Two columns keep the two states apart: `status` is the transport's delivery
 * state, `readAt` is whether a person looked. A notification delivered to a
 * background tab is `delivered` and unread, which is the truth.
 */
@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
  ) {}

  /**
   * Notifies the owner of something that changed, and optionally e-mails them.
   *
   * Best-effort from the caller's point of view: whatever happened has already
   * been committed by the time this runs, so a failure here loses the notice
   * and not the approval — the same contract the inline e-mail had.
   */
  async notify<T extends UserNotificationType>(
    input: NotifyInput<T>,
  ): Promise<void> {
    await this.write({
      userId: input.userId,
      type: input.type,
      payload: input.payload as unknown as Record<string, unknown>,
    });

    if (!input.email) return;

    // The switch in the profile has existed, with an endpoint behind it, and
    // no emitter has ever read it. From here on it means what it says.
    const user = await this.prisma.users.findUnique({
      where: { id: input.userId },
      select: { email: true, emailNotificationsEnabled: true },
    });

    if (!user?.emailNotificationsEnabled || !user.email) return;

    try {
      await this.email.send({
        to: user.email,
        subject: input.email.subject,
        html: input.email.html,
      });
    } catch (error: unknown) {
      // The notification is already stored; a mail server having a bad day is
      // not a reason to fail the caller.
      this.logger.warn(
        `Could not e-mail ${input.userId} about "${input.type}": ${describe(error)}`,
      );
    }
  }

  /** Writes a worker-authored notice for one user. */
  async emit(input: EmitEventInput): Promise<void> {
    await this.write(input);
  }

  /**
   * Emite um aviso que não tem dono: falha de job de cron, crédito esgotado.
   *
   * Grava uma linha por admin em vez de uma linha sem `userId`. Parece
   * desperdício e não é: a entrega marca o evento como `delivered`, então um
   * único registro compartilhado chegaria **a um** admin — o primeiro cujo
   * polling o pegasse — e sumiria para os outros. Justamente num alarme, que
   * todos precisam ver.
   */
  async emitToAdmins(input: Omit<EmitEventInput, 'userId'>): Promise<void> {
    const admins = await this.prisma.userRoles.findMany({
      where: { role: { name: 'admin' } },
      select: { userId: true },
    });

    const ids = [...new Set(admins.map((a) => a.userId))];

    if (ids.length === 0) {
      // Sem admin cadastrado o aviso não tem para onde ir. Fica no log, que é
      // melhor que desaparecer sem deixar rastro.
      this.logger.warn(
        `No admin to receive "${input.type}": ${input.message ?? input.title ?? ''}`,
      );
      return;
    }

    await Promise.all(
      ids.map((userId) =>
        this.write({ ...input, userId }).catch((error: unknown) => {
          // Um admin que falhe não pode impedir os outros de saber.
          this.logger.warn(
            `Could not notify admin ${userId} about "${input.type}": ${describe(error)}`,
          );
        }),
      ),
    );
  }

  private async write(input: EmitEventInput): Promise<void> {
    await this.prisma.events.create({
      data: {
        userId: input.userId,
        type: input.type,
        title: input.title ?? null,
        message: input.message ?? null,
        payload:
          (input.payload as Prisma.InputJsonValue | undefined) ?? Prisma.DbNull,
        status: NotificationStatus.pending,
      },
    });
  }
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
