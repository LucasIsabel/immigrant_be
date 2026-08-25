import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { EventInterestController } from './event-interest.controller';
import { EventInterestService } from './event-interest.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EventInterestController],
  providers: [EventInterestService],
})
export class EventInterestModule {}
