import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { IngestionModule } from '@app/ingestion';
import { PlacesAdminController } from './places-admin.controller';
import { PlacesAdminRepository } from './places-admin.repository';
import { PlacesAdminService } from './places-admin.service';
import { PlacesPublicController } from './places-public.controller';
import { PlacesRepository } from './places.repository';
import { PlacesService } from './places.service';

@Module({
  // `IngestionModule` traz o `INGESTION_DISPATCHER`: a API pede que a cidade
  // seja processada sem saber qual broker leva o pedido.
  imports: [DatabaseModule, IngestionModule],
  controllers: [PlacesPublicController, PlacesAdminController],
  providers: [
    PlacesService,
    PlacesRepository,
    PlacesAdminService,
    PlacesAdminRepository,
  ],
})
export class PlacesModule {}
