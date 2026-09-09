import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { DatabaseModule } from '@app/database';
import { AiModule } from '@app/ai';
import { GeminiService } from './gemini.service';
import { CountryModule } from '../countries/country.module';
import { SystemRepository } from './system.repository';
import { EventsService } from './events.service';
import { QuizAdminController } from './quiz-admin.controller';
import { QuizAnalyticsService } from './quiz-analytics.service';
import { QuizSubmissionsRepository } from './quiz-submissions.repository';

@Module({
  imports: [DatabaseModule, AiModule, CountryModule],
  providers: [
    SystemService,
    GeminiService,
    SystemRepository,
    EventsService,
    QuizAnalyticsService,
    QuizSubmissionsRepository,
  ],
  controllers: [SystemController, QuizAdminController],
  exports: [EventsService],
})
export class SystemModule {}
