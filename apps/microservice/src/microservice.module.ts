import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { PlanModule } from './plan/plan.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [PlanModule, DatabaseModule, EventsModule],
})
export class MicroserviceModule {}
