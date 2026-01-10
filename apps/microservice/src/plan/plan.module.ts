import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { BullMQConfigModule } from '@app/config/bull.module';
import { BullModule } from '@nestjs/bullmq';
import { PlanQueueProcessor } from './plan.consumer';
import { EventsModule } from '../events/events.module';
import { PLAN_QUEUE } from '@app/config/constants';

@Module({
  imports: [
    EventsModule,
    BullMQConfigModule,
    BullModule.registerQueue({
      name: PLAN_QUEUE,
    }),
  ],
  providers: [PlanService, PlanQueueProcessor],
})
export class PlanModule {}
