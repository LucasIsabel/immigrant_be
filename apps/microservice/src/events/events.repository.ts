import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { NotificationStatus, Prisma } from 'generated/prisma';
import { EventDto } from './dto/event.dto';

export interface CreateEventInput {
  userId: string;
  type: string;
  title?: string;
  message?: string;
  payload?: Record<string, unknown>;
}

@Injectable()
export class EventsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getEvents(userId: string): Promise<EventDto | null> {
    const result = await this.prisma.events.findFirst({
      where: {
        userId,
        status: NotificationStatus.pending,
      },
    });

    return result as EventDto | null;
  }

  async createEvent(input: CreateEventInput): Promise<EventDto> {
    const event = await this.prisma.events.create({
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

    return {
      id: event.id,
      user_id: event.userId,
      type: event.type,
      title: event.title,
      message: event.message,
      payload: event.payload as Record<string, unknown> | null,
      status: event.status,
      created_at: event.createdAt,
      updated_at: event.updatedAt,
    } as EventDto;
  }
}
