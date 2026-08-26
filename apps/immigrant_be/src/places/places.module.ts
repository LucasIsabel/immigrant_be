import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { IngestionModule } from '@app/ingestion/ingestion.module';
import { PlacesAdminController } from './places-admin.controller';
import { PlacesCatalogAdminController } from './places-catalog-admin.controller';
import { PlacesCatalogAdminService } from './places-catalog-admin.service';
import { PlacesAdminRepository } from './places-admin.repository';
import { PlacesAdminService } from './places-admin.service';
import { PlacesPublicController } from './places-public.controller';
import { PlacesRepository } from './places.repository';
import { PlacesService } from './places.service';

@Module({
  // `IngestionModule` provides `INGESTION_DISPATCHER`: the API asks for the
  // city to be processed without knowing which broker carries the request.
  imports: [DatabaseModule, IngestionModule],
  // Ingestion controller before the catalogue one: `admin/places/ingestions`
  // must win over `admin/places/:id`-shaped routes, and Nest matches in
  // registration order.
  controllers: [
    PlacesPublicController,
    PlacesAdminController,
    PlacesCatalogAdminController,
  ],
  providers: [
    PlacesService,
    PlacesRepository,
    PlacesAdminService,
    PlacesAdminRepository,
    PlacesCatalogAdminService,
  ],
})
export class PlacesModule {}
