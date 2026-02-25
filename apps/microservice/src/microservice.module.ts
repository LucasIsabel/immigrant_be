import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { PlanModule } from './plan/plan.module';
import { EventsModule } from './events/events.module';
import { AiBlogWorkerModule } from './ai-blog/ai-blog.module';

@Module({
  imports: [PlanModule, DatabaseModule, EventsModule, AiBlogWorkerModule],
})
export class MicroserviceModule {}
