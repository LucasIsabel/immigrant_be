import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { BullMQConfigModule } from '@app/config/bull.module';
import { PLACE_INGESTION_QUEUE } from '@app/config/constants';
import { BullmqIngestionDispatcher } from './bullmq-ingestion.dispatcher';
import { INGESTION_DISPATCHER } from './ingestion-dispatcher.port';

/**
 * O único lugar do monorepo onde a ingestão encosta num broker.
 *
 * Vive numa lib porque os dois apps precisam despachar: a API dispara a
 * ingestão de uma cidade quando o admin pede, e o worker dispara um job de
 * texto por lugar encontrado. Se cada um injetasse a `Queue` direto, trocar o
 * BullMQ por Kafka ou RabbitMQ seria mexer nos dois — e a API, que só quer
 * dizer "processe esta cidade", passaria a conhecer o broker sem precisar.
 *
 * Trocar de broker é trocar o `useClass` desta linha.
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
