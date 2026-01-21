import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { BullMQConfigModule } from '@app/config/bull.module';
import { BullModule } from '@nestjs/bullmq';
import { PlanQueueProcessor } from './plan.consumer';
import { EventsModule } from '../events/events.module';
import { PLAN_QUEUE } from '@app/config/constants';
import { PlanRepository } from './plan.repository';
import { GeminiService } from './gemini.service';
import { DatabaseModule } from '@app/database';
import { VisaStepsService } from './visa-steps.service';

@Module({
  imports: [
    EventsModule,
    BullMQConfigModule,
    DatabaseModule,
    BullModule.registerQueue({
      name: PLAN_QUEUE,
    }),
  ],
  providers: [
    PlanService,
    PlanQueueProcessor,
    PlanRepository,
    GeminiService,
    VisaStepsService,
  ],
})
export class PlanModule {}
