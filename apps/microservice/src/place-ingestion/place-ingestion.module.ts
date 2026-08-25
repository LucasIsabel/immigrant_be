import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AiModule } from '@app/ai';
import { BullMQConfigModule } from '@app/config/bull.module';
import { PLACE_INGESTION_QUEUE } from '@app/config/constants';
import { DatabaseModule } from '@app/database';
import { EventsModule } from '../events/events.module';
import { BullmqIngestionDispatcher } from './bullmq-ingestion.dispatcher';
import { INGESTION_DISPATCHER } from './ingestion-dispatcher.port';
import { OverpassService } from './overpass.service';
import { PlaceIngestionConsumer } from './place-ingestion.consumer';
import { PlaceIngestionRepository } from './place-ingestion.repository';
import { PlaceIngestionService } from './place-ingestion.service';
import { WikimediaService } from './wikimedia.service';

/**
 * The one place where the pipeline meets a broker.
 *
 * `INGESTION_DISPATCHER` binds to the BullMQ adapter here and nowhere else, so
 * moving to Kafka or RabbitMQ is a different provider on this line plus a new
 * entry point — the service, the repository and the clients stay untouched.
 */
@Module({
  imports: [
    DatabaseModule,
    AiModule,
    BullMQConfigModule,
    EventsModule,
    BullModule.registerQueue({ name: PLACE_INGESTION_QUEUE }),
  ],
  providers: [
    PlaceIngestionConsumer,
    PlaceIngestionService,
    PlaceIngestionRepository,
    OverpassService,
    WikimediaService,
    { provide: INGESTION_DISPATCHER, useClass: BullmqIngestionDispatcher },
  ],
})
export class PlaceIngestionWorkerModule {}
