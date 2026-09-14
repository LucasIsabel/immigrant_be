// The consumer pulls in the service, which reads `@app/config/env` at module
// load — and that parses `process.env` with zod, so an unset key fails the
// whole suite before a single test runs. CI has no `OPEN_ROUTER`; a developer
// machine does, which is exactly how this passed locally and broke there.
jest.mock('@app/config/env', () => ({
  env: { INGESTION_USER_AGENT: 'aloravia-test/1.0', PLACES_PER_SWEEP: 3 },
}));

// Importing `@app/database` for the type alone would drag better-auth into the
// suite. Same shortcut the other consumer specs take.
jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

// The real export is a read-only binding, so `jest.spyOn` cannot replace it.
// `withScope` runs its callback so `reportJobFailure` behaves as it really does.
jest.mock('@sentry/nestjs', () => ({
  captureException: jest.fn(),
  withScope: jest.fn(
    (
      run: (scope: {
        setTags: jest.Mock;
        setFingerprint: jest.Mock;
      }) => void,
    ) => run({ setTags: jest.fn(), setFingerprint: jest.fn() }),
  ),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bullmq';
import * as Sentry from '@sentry/nestjs';
import {
  INGEST_CITY,
  WRITE_PLACE_IMAGE,
  WRITE_PLACE_TEXTS,
} from '@app/config/constants';
import { PermanentIngestionError } from '@app/ingestion';
import { Prisma } from '../../../../generated/prisma';
import { PlaceIngestionConsumer } from './place-ingestion.consumer';
import { PlaceIngestionService } from './place-ingestion.service';
import { EventsService } from '../events/events.service';
import { EVENT_TYPES } from '../events/event-types';

const INGESTION_ID = 'ingestion-1';

function buildJob(overrides: Partial<Job> = {}): Job {
  return {
    id: 'job-1',
    name: INGEST_CITY,
    data: { ingestionId: INGESTION_ID },
    attemptsMade: 3,
    opts: { attempts: 3 },
    discard: jest.fn(),
    ...overrides,
  } as unknown as Job;
}

/** A Prisma "record not found", shaped the way the driver really throws it. */
function prismaP2025(): Error {
  const error = new Error(
    'An operation failed because it depends on one or more records that were required but not found. No record was found for an update.',
  );
  (error as Error & { code: string }).code = 'P2025';
  return error;
}

describe('PlaceIngestionConsumer', () => {
  let consumer: PlaceIngestionConsumer;
  let ingestion: {
    ingest: jest.Mock;
    recordFailure: jest.Mock;
    abandonPlaceTexts: jest.Mock;
    writePlaceTexts: jest.Mock;
    writePlaceImage: jest.Mock;
    countTextFailures: jest.Mock;
  };
  let events: { emitToAdmins: jest.Mock };
  const captureException = Sentry.captureException as unknown as jest.Mock;
  let logError: jest.SpyInstance;

  beforeEach(async () => {
    ingestion = {
      ingest: jest.fn(),
      recordFailure: jest.fn().mockResolvedValue(undefined),
      abandonPlaceTexts: jest.fn().mockResolvedValue(false),
      writePlaceTexts: jest.fn(),
      writePlaceImage: jest.fn(),
      countTextFailures: jest.fn().mockResolvedValue(0),
    };
    events = { emitToAdmins: jest.fn().mockResolvedValue(undefined) };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaceIngestionConsumer,
        { provide: PlaceIngestionService, useValue: ingestion },
        { provide: EventsService, useValue: events },
      ],
    }).compile();

    consumer = module.get(PlaceIngestionConsumer);
    logError = jest
      .spyOn(consumer['logger'], 'error')
      .mockImplementation(() => undefined);
    jest.spyOn(consumer['logger'], 'log').mockImplementation(() => undefined);
    jest.spyOn(consumer['logger'], 'warn').mockImplementation(() => undefined);
    captureException.mockClear();
  });

  afterEach(() => jest.restoreAllMocks());

  describe('process', () => {
    it('discards the job on attempt 1 when execution throws P2025', async () => {
      const p2025 = prismaP2025();
      ingestion.ingest.mockRejectedValue(p2025);
      const discard = jest.fn();
      const job = buildJob({
        attemptsMade: 1,
        opts: { attempts: 3 },
        discard,
      });

      await expect(consumer.process(job)).rejects.toThrow(p2025);
      expect(discard).toHaveBeenCalledTimes(1);
    });

    it('discards the job on attempt 1 when execution throws a real PrismaClientKnownRequestError with P2025', async () => {
      const realPrismaP2025 = new Prisma.PrismaClientKnownRequestError(
        'No record was found for an update.',
        { code: 'P2025', clientVersion: '6.18.0' },
      );
      ingestion.ingest.mockRejectedValue(realPrismaP2025);
      const discard = jest.fn();
      const job = buildJob({
        attemptsMade: 1,
        opts: { attempts: 3 },
        discard,
      });

      await expect(consumer.process(job)).rejects.toThrow(realPrismaP2025);
      expect(discard).toHaveBeenCalledTimes(1);
    });

    it('discards the job on attempt 1 when execution throws PermanentIngestionError', async () => {
      const permanent = new PermanentIngestionError(
        'Not found',
        'resolve_city',
      );
      ingestion.ingest.mockRejectedValue(permanent);
      const discard = jest.fn();
      const job = buildJob({
        attemptsMade: 1,
        opts: { attempts: 3 },
        discard,
      });

      await expect(consumer.process(job)).rejects.toThrow(permanent);
      expect(discard).toHaveBeenCalledTimes(1);
    });

    it('does not discard the job when execution throws a retryable error', async () => {
      const retryable = new Error('WDQS answered 502');
      ingestion.ingest.mockRejectedValue(retryable);
      const discard = jest.fn();
      const job = buildJob({
        attemptsMade: 1,
        opts: { attempts: 3 },
        discard,
      });

      await expect(consumer.process(job)).rejects.toThrow(retryable);
      expect(discard).not.toHaveBeenCalled();
    });
  });

  describe('onFailed', () => {
    it('treats P2025 on attempt 1 as permanent, recording failure with null step and notifying admins', async () => {
      const p2025 = prismaP2025();
      await consumer.onFailed(
        buildJob({ attemptsMade: 1, opts: { attempts: 3 } }),
        p2025,
      );

      expect(ingestion.recordFailure).toHaveBeenCalledWith(
        INGESTION_ID,
        null,
        p2025.message,
      );
      expect(events.emitToAdmins).toHaveBeenCalledWith(
        expect.objectContaining({
          type: EVENT_TYPES.CITY_INGESTION_FAILED,
          payload: { ingestionId: INGESTION_ID, step: null },
        }),
      );
    });

    it('records the failure and tells the admins once retries are exhausted', async () => {
      await consumer.onFailed(buildJob(), new Error('WDQS answered 502'));

      expect(ingestion.recordFailure).toHaveBeenCalledWith(
        INGESTION_ID,
        null,
        'WDQS answered 502',
      );
      expect(events.emitToAdmins).toHaveBeenCalledWith(
        expect.objectContaining({ type: EVENT_TYPES.CITY_INGESTION_FAILED }),
      );
    });

    it('keeps the row untouched while retries are still pending', async () => {
      await consumer.onFailed(
        buildJob({ attemptsMade: 1, opts: { attempts: 3 } }),
        new Error('WDQS answered 502'),
      );

      expect(ingestion.recordFailure).not.toHaveBeenCalled();
      expect(events.emitToAdmins).not.toHaveBeenCalled();
    });

    it('carries the step of a permanent failure onto the row', async () => {
      // A permanent error knows where it happened; a generic one does not, and
      // the mark the pipeline already wrote says more than a guess would.
      await consumer.onFailed(
        buildJob({ attemptsMade: 1 }),
        new PermanentIngestionError(
          'Lisbon is not on Wikidata',
          'resolve_city',
        ),
      );

      expect(ingestion.recordFailure).toHaveBeenCalledWith(
        INGESTION_ID,
        'resolve_city',
        'Lisbon is not on Wikidata',
      );
    });

    it('survives a P2025 from recording the failure, and reports it', async () => {
      // The row deleted while its job waited in Redis. This used to reject out
      // of a queue event handler nobody awaits, which ends the worker process
      // while the container stays healthy (#344).
      const p2025 = prismaP2025();
      ingestion.recordFailure.mockRejectedValue(p2025);

      await expect(
        consumer.onFailed(buildJob(), new Error('boom')),
      ).resolves.toBeUndefined();

      // Reported, not swallowed.
      expect(captureException).toHaveBeenCalledWith(p2025);
      expect(logError).toHaveBeenCalledWith(
        expect.stringContaining('Could not record the failure of job job-1'),
        expect.anything(),
      );
    });

    it('survives the admin notification failing too', async () => {
      // `emitToAdmins` reads the admin list straight from the database, and is
      // not documented as never throwing the way `notify` is.
      events.emitToAdmins.mockRejectedValue(new Error('database is away'));

      await expect(
        consumer.onFailed(buildJob(), new Error('boom')),
      ).resolves.toBeUndefined();

      expect(captureException).toHaveBeenCalled();
    });

    it('survives a failing text job that can no longer be settled', async () => {
      ingestion.abandonPlaceTexts.mockRejectedValue(prismaP2025());

      await expect(
        consumer.onFailed(
          buildJob({
            name: WRITE_PLACE_TEXTS,
            data: { placeId: 'place-1', ingestionId: INGESTION_ID },
          }),
          new Error('Gemini refused'),
        ),
      ).resolves.toBeUndefined();

      expect(captureException).toHaveBeenCalled();
    });

    it('abandons an image without touching the ingestion', async () => {
      // Images sit outside the convergence: the card falls back to the
      // category tone, so a lost photo is not a failed city.
      await consumer.onFailed(
        buildJob({
          name: WRITE_PLACE_IMAGE,
          data: { placeId: 'place-1', commonsFile: 'Torre.jpg' },
        }),
        new Error('Commons timed out'),
      );

      expect(ingestion.recordFailure).not.toHaveBeenCalled();
      expect(events.emitToAdmins).not.toHaveBeenCalled();
      // Reported once by `reportJobFailure`, as every exhausted job is — but
      // the guard added none of its own, which is what "no failure here" means.
      expect(captureException).toHaveBeenCalledTimes(1);
    });
  });
});
