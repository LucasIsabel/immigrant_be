import { SystemRepository } from './system.repository';
import { EventResponseDto } from './dto/event.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  constructor(private readonly systemRepository: SystemRepository) {}

  async getEvents(userId: string): Promise<EventResponseDto | null> {
    return await this.systemRepository.getEvents(userId);
  }

  /**
   * Fetches and consumes the next pending event for the user.
   * Used by SSE to deliver each event exactly once.
   */
  async getAndConsumeNextEvent(
    userId: string,
  ): Promise<EventResponseDto | null> {
    return await this.systemRepository.getAndConsumeNextEvent(userId);
  }
}
