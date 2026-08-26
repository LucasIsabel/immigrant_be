import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import {
  INGEST_CITY,
  PLACE_INGESTION_QUEUE,
  WRITE_PLACE_IMAGE,
  WRITE_PLACE_TEXTS,
} from '@app/config/constants';
import { runWithCorrelationId } from '@app/config/request-context';
import {
  jobCorrelationId,
  reportJobFailure,
} from '../common/report-job-failure';
import { EVENT_TYPES, isFinalAttempt } from '../events/event-types';
import { EventsService } from '../events/events.service';
import { PermanentIngestionError } from '@app/ingestion';
import { PlaceIngestionService } from './place-ingestion.service';

interface IngestCityJob {
  ingestionId: string;
}

interface WritePlaceTextsJob {
  placeId: string;
  ingestionId: string;
}

interface WritePlaceImageJob {
  placeId: string;
  ingestionId: string;
  commonsFile: string;
}

/**
 * The only file in the pipeline that knows what a job is.
 *
 * It unpacks a payload, calls a method, and turns the outcome into a
 * notification. Nothing here decides anything — that all lives in
 * `PlaceIngestionService`, which never imports BullMQ.
 *
 * `concurrency: 1` with a limiter of one job per minute is not caution, it is
 * the Overpass budget: the public instance returned 429 after a handful of
 * queries in quick succession, and each city costs eight of them. One city a
 * minute still clears the 186-city list in about three hours.
 */
@Processor(PLACE_INGESTION_QUEUE, {
  concurrency: 1,
  limiter: { max: 1, duration: 60_000 },
})
export class PlaceIngestionConsumer extends WorkerHost {
  private readonly logger = new Logger(PlaceIngestionConsumer.name);

  constructor(
    private readonly ingestion: PlaceIngestionService,
    private readonly events: EventsService,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    try {
      return await runWithCorrelationId(jobCorrelationId(job), () =>
        this.handle(job),
      );
    } catch (error) {
      if (error instanceof PermanentIngestionError) {
        // Three attempts at a city OpenStreetMap does not have is three
        // identical failures and half an hour of backoff. `discard` ends it
        // now, and keeps the real reason in the admin's message instead of
        // "failed after 3 attempts".
        job.discard();
      }
      throw error;
    }
  }

  private async handle(job: Job): Promise<void> {
    switch (job.name) {
      case INGEST_CITY: {
        const { ingestionId } = job.data as IngestCityJob;
        this.logger.log(`Ingesting city for ${ingestionId} (job: ${job.id})`);
        await this.ingestion.ingestCity(ingestionId);
        break;
      }

      case WRITE_PLACE_TEXTS: {
        const { placeId, ingestionId } = job.data as WritePlaceTextsJob;
        const { ingestionBecameReady } = await this.ingestion.writePlaceTexts(
          placeId,
          ingestionId,
        );
        if (ingestionBecameReady) await this.announceReady(ingestionId);
        break;
      }

      case WRITE_PLACE_IMAGE: {
        const { placeId, commonsFile } = job.data as WritePlaceImageJob;
        await this.ingestion.writePlaceImage(placeId, commonsFile);
        break;
      }

      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }

  private async announceReady(ingestionId: string): Promise<void> {
    // Only one of the parallel text jobs wins the compare-and-set, so this
    // fires exactly once per city.
    await this.events.emitToAdmins({
      type: EVENT_TYPES.CITY_INGESTION_READY,
      title: 'Cidade pronta para revisão',
      message: 'Os lugares de uma cidade terminaram de ser gerados.',
      payload: { ingestionId },
    });
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job, error: Error): Promise<void> {
    this.logger.error(
      `Ingestion job failed: ${job.id} (${job.name}) — attempt ${job.attemptsMade}: ${error.message}`,
      error.stack,
    );

    reportJobFailure(PLACE_INGESTION_QUEUE, job, error);

    const permanent = error instanceof PermanentIngestionError;
    if (!permanent && !isFinalAttempt(job)) return;

    if (job.name === WRITE_PLACE_IMAGE) {
      // Images sit outside the convergence and are cosmetic by design: the
      // card falls back to the category tone. A final failure is logged and
      // nothing else — no admin alert, no city state change. Re-ingesting the
      // city retries the image for free.
      const { placeId, commonsFile } = job.data as WritePlaceImageJob;
      this.logger.warn(
        `Image abandoned for place ${placeId} (${commonsFile}): ${error.message}`,
      );
      return;
    }

    if (job.name === WRITE_PLACE_TEXTS) {
      const { placeId, ingestionId } = job.data as WritePlaceTextsJob;
      // One description that never came must not strand the other nine. The
      // place is recorded as failed and the city is allowed to finish; the
      // review screen shows the gap and offers a retry.
      const becameReady = await this.ingestion.abandonPlaceTexts(
        ingestionId,
        placeId,
      );
      if (becameReady) await this.announceReady(ingestionId);
      return;
    }

    const { ingestionId } = job.data as IngestCityJob;
    const step = permanent ? error.step : null;
    await this.ingestion.recordFailure(ingestionId, step, error.message);

    await this.events.emitToAdmins({
      type: EVENT_TYPES.CITY_INGESTION_FAILED,
      title: 'Falha na ingestão de lugares',
      message: error.message,
      payload: { ingestionId, step },
    });
  }
}
