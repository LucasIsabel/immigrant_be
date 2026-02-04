import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { VisaStepsController } from './visa-steps.controller';
import { VisaStepsService } from './visa-steps.service';
import { VisaStepsRepository } from './visa-steps.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [VisaStepsController],
  providers: [VisaStepsService, VisaStepsRepository],
  exports: [VisaStepsService],
})
export class VisaStepsModule {}
