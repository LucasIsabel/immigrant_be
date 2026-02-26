import { Injectable } from '@nestjs/common';
import { EventsRepository, type CreateEventInput } from './events.repository';
import { EventDto } from './dto/event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async getEvents(userId: string): Promise<EventDto | null> {
    return await this.eventsRepository.getEvents(userId);
  }

  /**
   * Emits an event to be delivered via SSE to the user.
   * Called by queue consumers when a task completes.
   */
  async emit(input: CreateEventInput): Promise<void> {
    await this.eventsRepository.createEvent(input);
  }
}
