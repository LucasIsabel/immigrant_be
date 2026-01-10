import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { DatabaseModule } from '@app/database';
import { GeminiService } from './gemini.service';
import { CountryModule } from '../countries/country.module';
import { SystemRepository } from './system.repository';
import { BullModule } from '@nestjs/bullmq';
import { BullMQConfigModule } from '@app/config/bull.module';
import { EventsService } from './events.service';

@Module({
  imports: [
    DatabaseModule,
    CountryModule,
    BullMQConfigModule,
    BullModule.registerQueue({
      name: 'plan',
    }),
  ],
  providers: [SystemService, GeminiService, SystemRepository, EventsService],
  controllers: [SystemController],
  exports: [EventsService],
})
export class SystemModule {}
