import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { ItinerariesController } from './itineraries.controller';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesRepository } from './itineraries.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ItinerariesController],
  providers: [ItinerariesService, ItinerariesRepository],
  exports: [ItinerariesService],
})
export class ItinerariesModule {}
