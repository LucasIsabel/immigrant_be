import { PrismaService } from '@app/database';
import { NotificationStatus } from 'generated/prisma';
import { EventDto } from './dto/event.dto';

export class EventsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getEvents(userId: string): Promise<EventDto | null> {
    const result = await this.prisma.events.findFirst({
      where: {
        user_id: userId,
        status: NotificationStatus.pending,
      },
    });

    return result as EventDto | null;
  }
}
