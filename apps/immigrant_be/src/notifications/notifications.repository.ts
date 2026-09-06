import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { Prisma } from '../../../../generated/prisma';

const notificationSelect = {
  id: true,
  type: true,
  title: true,
  message: true,
  payload: true,
  readAt: true,
  createdAt: true,
} satisfies Prisma.EventsSelect;

export type NotificationRow = Prisma.EventsGetPayload<{
  select: typeof notificationSelect;
}>;

/**
 * Ownership is part of every query, never a check after the read.
 *
 * The mold is `ItinerariesRepository`. Reading a row and comparing `userId`
 * afterwards works until somebody forgets the second half, and the failure is
 * silent: a stranger's notification rendered as your own. Here there is no read
 * that could return it.
 */
@Injectable()
export class NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listOwned(
    userId: string,
    page: number,
    limit: number,
  ): Promise<[NotificationRow[], number]> {
    return this.prisma.$transaction([
      this.prisma.events.findMany({
        where: { userId },
        select: notificationSelect,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.events.count({ where: { userId } }),
    ]);
  }

  countUnread(userId: string): Promise<number> {
    return this.prisma.events.count({ where: { userId, readAt: null } });
  }

  /**
   * Marks one as read and answers with it, or answers null when it is not
   * this person's.
   *
   * `updateMany` rather than `update`, because `update` needs a unique where
   * and `id` alone is unique — which would let anyone mark anyone's row. The
   * pair `{ id, userId }` is not a unique index, so `updateMany` is the only
   * shape that can carry both.
   *
   * `readAt: null` in the filter is what makes this idempotent: marking an
   * already-read notice matches nothing, so the original timestamp survives.
   * The read afterwards is what tells apart "already read" from "not yours" —
   * the update alone reports zero for both.
   */
  async markRead(id: string, userId: string): Promise<NotificationRow | null> {
    await this.prisma.events.updateMany({
      where: { id, userId, readAt: null },
      data: { readAt: new Date() },
    });

    return this.prisma.events.findFirst({
      where: { id, userId },
      select: notificationSelect,
    });
  }

  async markAllRead(userId: string): Promise<number> {
    const { count } = await this.prisma.events.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
    return count;
  }
}
