import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { DatabaseModule } from '@app/database';
import { CountryRepository } from './country.repository';

@Module({
  controllers: [CountryController],
  providers: [CountryService, CountryRepository],
  exports: [CountryService],
  imports: [DatabaseModule],
})
export class CountryModule {}
