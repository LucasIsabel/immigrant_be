import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { ItinerariesAdminController } from './itineraries-admin.controller';
import { ItinerariesController } from './itineraries.controller';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesRepository } from './itineraries.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ItinerariesController, ItinerariesAdminController],
  providers: [ItinerariesService, ItinerariesRepository],
  exports: [ItinerariesService],
})
export class ItinerariesModule {}
