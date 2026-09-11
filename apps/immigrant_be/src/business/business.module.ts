import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { CountriesNowModule } from '../countriesnow/countriesnow.module';
import { BusinessController } from './business.controller';
import { BusinessPublicController } from './business-public.controller';
import { BusinessService } from './business.service';
import { BusinessRepository } from './business.repository';

@Module({
  imports: [DatabaseModule, CountriesNowModule],
  controllers: [BusinessController, BusinessPublicController],
  providers: [BusinessService, BusinessRepository],
})
export class BusinessModule {}
