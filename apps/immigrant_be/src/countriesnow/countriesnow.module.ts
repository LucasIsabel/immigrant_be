import { Module } from '@nestjs/common';
import { CountriesNowController } from './countriesnow.controller';
import { CountriesNowService } from './countriesnow.service';

@Module({
  controllers: [CountriesNowController],
  providers: [CountriesNowService],
  exports: [CountriesNowService],
})
export class CountriesNowModule {}
