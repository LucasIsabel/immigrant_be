import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { PlacesPublicController } from './places-public.controller';
import { PlacesRepository } from './places.repository';
import { PlacesService } from './places.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PlacesPublicController],
  providers: [PlacesService, PlacesRepository],
})
export class PlacesModule {}
