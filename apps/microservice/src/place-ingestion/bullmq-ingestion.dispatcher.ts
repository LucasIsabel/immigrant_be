import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import {
  INGEST_CITY,
  PLACE_INGESTION_QUEUE,
  WRITE_PLACE_TEXTS,
} from '@app/config/constants';
import { getCorrelationId } from '@app/config/request-context';
import { IngestionDispatcher } from './ingestion-dispatcher.port';

/**
 * The BullMQ half of the port.
 *
 * Everything broker-specific lives here: the queue name, the job names, the
 * correlation id riding along in the payload. Replacing BullMQ means writing a
 * sibling of this file and changing one provider binding.
 */
@Injectable()
export class BullmqIngestionDispatcher implements IngestionDispatcher {
  constructor(
    @InjectQueue(PLACE_INGESTION_QUEUE) private readonly queue: Queue,
  ) {}

  async dispatchCity(ingestionId: string): Promise<void> {
    await this.queue.add(INGEST_CITY, {
      ingestionId,
      correlationId: getCorrelationId(),
    });
  }

  /**
   * `addBulk` rather than a loop: one round trip to Redis, and the ten jobs
   * become visible to the worker together instead of trickling in.
   */
  async dispatchPlaceTexts(
    jobs: { placeId: string; ingestionId: string }[],
  ): Promise<void> {
    if (!jobs.length) return;

    const correlationId = getCorrelationId();
    await this.queue.addBulk(
      jobs.map((job) => ({
        name: WRITE_PLACE_TEXTS,
        data: { ...job, correlationId },
      })),
    );
  }
}
