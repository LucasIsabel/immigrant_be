import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [PlanModule, ConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class MicroserviceModule {}
