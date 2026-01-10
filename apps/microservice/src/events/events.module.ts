import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [EventsRepository, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
