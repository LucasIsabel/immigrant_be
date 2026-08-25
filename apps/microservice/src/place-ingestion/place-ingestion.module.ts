import { Module } from '@nestjs/common';
import { AiModule } from '@app/ai';
import { DatabaseModule } from '@app/database';
import { IngestionModule } from '@app/ingestion/ingestion.module';
import { EventsModule } from '../events/events.module';
import { OverpassService } from './overpass.service';
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
  imports: [DatabaseModule, AiModule, EventsModule, IngestionModule],
  providers: [
    PlaceIngestionConsumer,
    PlaceIngestionService,
    PlaceIngestionRepository,
    OverpassService,
    WikimediaService,
  ],
})
export class PlaceIngestionWorkerModule {}
