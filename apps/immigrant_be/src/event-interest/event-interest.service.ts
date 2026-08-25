import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { CreateEventInterestDto } from './dto/create-event-interest.dto';
import { EventInterestResponseDto } from './dto/event-interest-response.dto';

/**
 * Phase 0 of the events feature: measure organizer demand before building.
 *
 * Each row is somebody who clicked "promote your event" and left a contact.
 * The count per city over 4-6 weeks is the number that decides whether the
 * events epic (immigrant_fe#196) leaves the backlog. There is deliberately no
 * admin screen: `select city, count(*) from event_interests group by 1` is the
 * whole report, and building UI for a table that may die with the experiment
 * would be spending on the thing this table exists to avoid.
 */
@Injectable()
export class EventInterestService {
  constructor(private readonly prisma: PrismaService) {}

  async register(
    dto: CreateEventInterestDto,
  ): Promise<EventInterestResponseDto> {
    // A filled honeypot means a bot. Answering success anyway costs nothing
    // and tells the bot nothing; storing it would poison the one metric this
    // table exists to produce.
    if (dto.website) {
      return { id: 'discarded', createdAt: new Date() };
    }

    const saved = await this.prisma.eventInterest.create({
      data: {
        name: dto.name,
        contact: dto.contact,
        eventType: dto.eventType,
        countryCode: dto.countryCode,
        city: dto.city,
        message: dto.message,
      },
      select: { id: true, createdAt: true },
    });

    return saved;
  }
}
