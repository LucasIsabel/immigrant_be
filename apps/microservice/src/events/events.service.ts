import { Injectable } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { EventDto } from './dto/event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async getEvents(userId: string): Promise<EventDto | null> {
    return await this.eventsRepository.getEvents(userId);
  }
}
