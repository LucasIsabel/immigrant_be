import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { DatabaseModule } from '@app/database';
import { GeminiService } from './gemini.service';
import { CountryModule } from '../countries/country.module';

@Module({
  imports: [DatabaseModule, CountryModule],
  providers: [SystemService, GeminiService],
  controllers: [SystemController],
})
export class SystemModule {}
