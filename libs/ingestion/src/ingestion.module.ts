import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { BullMQConfigModule } from '@app/config/bull.module';
import { PLACE_INGESTION_QUEUE } from '@app/config/constants';
import { BullmqIngestionDispatcher } from './bullmq-ingestion.dispatcher';
import { INGESTION_DISPATCHER } from './ingestion-dispatcher.port';

/**
 * The one place in the monorepo where ingestion touches a broker.
 *
 * It lives in a lib because both apps dispatch: the API queues a city's
 * ingestion when an admin asks, and the worker queues one text job per place
 * found. If each injected the `Queue` directly, swapping BullMQ for Kafka or
 * RabbitMQ would mean changing both — and the API, which only wants to say
 * "process this city", would know about the broker without needing to.
 *
 * Changing broker is changing the `useClass` on this line.
 */
@Module({
  imports: [
    BullMQConfigModule,
    BullModule.registerQueue({ name: PLACE_INGESTION_QUEUE }),
  ],
  providers: [
    { provide: INGESTION_DISPATCHER, useClass: BullmqIngestionDispatcher },
  ],
  exports: [INGESTION_DISPATCHER],
})
export class IngestionModule {}
