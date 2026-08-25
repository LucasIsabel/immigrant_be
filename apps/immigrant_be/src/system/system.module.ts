import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { DatabaseModule } from '@app/database';
import { AiModule } from '@app/ai';
import { GeminiService } from './gemini.service';
import { CountryModule } from '../countries/country.module';
import { SystemRepository } from './system.repository';
import { EventsService } from './events.service';

@Module({
  imports: [DatabaseModule, AiModule, CountryModule],
  providers: [SystemService, GeminiService, SystemRepository, EventsService],
  controllers: [SystemController],
  exports: [EventsService],
})
export class SystemModule {}
