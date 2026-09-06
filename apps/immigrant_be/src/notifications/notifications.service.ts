import { Injectable, NotFoundException } from '@nestjs/common';
import {
  NotificationsRepository,
  type NotificationRow,
} from './notifications.repository';
import { ListNotificationsQueryDto } from './dto/list-notifications-query.dto';
import {
  NotificationDto,
  PaginatedNotificationsResponseDto,
  ReadAllResponseDto,
  UnreadCountResponseDto,
} from './dto/notification-response.dto';

@Injectable()
export class NotificationsInboxService {
  constructor(private readonly repository: NotificationsRepository) {}

  async list(
    userId: string,
    query: ListNotificationsQueryDto,
  ): Promise<PaginatedNotificationsResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const [rows, total] = await this.repository.listOwned(userId, page, limit);

    return { data: rows.map(toDto), total, page, limit };
  }

  async unreadCount(userId: string): Promise<UnreadCountResponseDto> {
    return { count: await this.repository.countUnread(userId) };
  }

  async markRead(id: string, userId: string): Promise<NotificationDto> {
    const row = await this.repository.markRead(id, userId);
    if (!row) throw new NotFoundException('Notificação não encontrada');
    return toDto(row);
  }

  async markAllRead(userId: string): Promise<ReadAllResponseDto> {
    return { updated: await this.repository.markAllRead(userId) };
  }
}

function toDto(row: NotificationRow): NotificationDto {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    message: row.message,
    payload: row.payload as Record<string, unknown> | null,
    readAt: row.readAt,
    createdAt: row.createdAt,
  };
}
