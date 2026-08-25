import { Module } from '@nestjs/common';
import { AiModule } from '@app/ai';
import { DatabaseModule } from '@app/database';
import { IngestionModule } from '@app/ingestion';
import { EventsModule } from '../events/events.module';
import { OverpassService } from './overpass.service';
import { PlaceIngestionConsumer } from './place-ingestion.consumer';
import { PlaceIngestionRepository } from './place-ingestion.repository';
import { PlaceIngestionService } from './place-ingestion.service';
import { WikimediaService } from './wikimedia.service';

/**
 * O worker: consumidor, pipeline e os clientes das fontes externas.
 *
 * Quem sabe qual broker existe é o `IngestionModule`, na lib — este módulo
 * apenas o importa para receber o `INGESTION_DISPATCHER`.
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
