import { Module } from '@nestjs/common';
import { AiModule } from '@app/ai';
import { DatabaseModule } from '@app/database';
import { IngestionModule } from '@app/ingestion/ingestion.module';
import { StorageModule } from '@app/storage';
import { EventsModule } from '../events/events.module';
import { WikidataDiscoveryService } from './wikidata-discovery.service';
import { PlaceIngestionConsumer } from './place-ingestion.consumer';
import { PlaceIngestionRepository } from './place-ingestion.repository';
import { PlaceIngestionService } from './place-ingestion.service';
import { WikimediaService } from './wikimedia.service';

/**
 * The worker: consumer, pipeline, and the clients for the external sources.
 *
 * What knows which broker exists is `IngestionModule`, in the lib — this
 * module only imports it to receive `INGESTION_DISPATCHER`.
 */
@Module({
  imports: [
    DatabaseModule,
    AiModule,
    EventsModule,
    IngestionModule,
    StorageModule,
  ],
  providers: [
    PlaceIngestionConsumer,
    PlaceIngestionService,
    PlaceIngestionRepository,
    WikidataDiscoveryService,
    WikimediaService,
  ],
})
export class PlaceIngestionWorkerModule {}
