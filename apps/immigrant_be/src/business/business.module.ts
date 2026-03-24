import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { BusinessController } from './business.controller';
import { BusinessPublicController } from './business-public.controller';
import { BusinessService } from './business.service';
import { BusinessRepository } from './business.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [BusinessController, BusinessPublicController],
  providers: [BusinessService, BusinessRepository],
})
export class BusinessModule {}
