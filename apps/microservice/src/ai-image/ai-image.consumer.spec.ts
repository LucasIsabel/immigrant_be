jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bullmq';
import { GENERATE_AI_IMAGE } from '@app/config/constants';
import { AiImageConsumer } from './ai-image.consumer';
import {
  AiImageWorkerService,
  GenerateAiImageJobData,
} from './ai-image.service';
import { EventsService } from '../events/events.service';
import { EVENT_TYPES } from '../events/event-types';

const JOB_DATA: GenerateAiImageJobData = {
  imageId: 'image-1',
  prompt: 'a photo of Lisbon',
  folder: 'ai-images',
  isPublic: true,
  requestedByUserId: 'user-1',
};

function buildJob(overrides: Partial<Job> = {}): Job<GenerateAiImageJobData> {
  return {
    id: 'job-1',
    name: GENERATE_AI_IMAGE,
    data: JOB_DATA,
    attemptsMade: 3,
    opts: { attempts: 3 },
    ...overrides,
  } as unknown as Job<GenerateAiImageJobData>;
}

describe('AiImageConsumer', () => {
  let consumer: AiImageConsumer;
  let workerService: { processImage: jest.Mock; markFailed: jest.Mock };
  let eventsService: { emit: jest.Mock };

  beforeEach(async () => {
    workerService = { processImage: jest.fn(), markFailed: jest.fn() };
    eventsService = { emit: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiImageConsumer,
        { provide: AiImageWorkerService, useValue: workerService },
        { provide: EventsService, useValue: eventsService },
      ],
    }).compile();

    consumer = module.get(AiImageConsumer);
    jest.spyOn(consumer['logger'], 'error').mockImplementation(() => undefined);
    jest.spyOn(consumer['logger'], 'log').mockImplementation(() => undefined);
    jest.spyOn(consumer['logger'], 'warn').mockImplementation(() => undefined);
  });

  describe('process', () => {
    it('notifies the requester once the image is generated', async () => {
      await consumer.process(buildJob());

      expect(workerService.processImage).toHaveBeenCalledWith(JOB_DATA);
      expect(eventsService.emit).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          type: EVENT_TYPES.AI_IMAGE_COMPLETED,
        }),
      );
    });

    it('ignores jobs it does not own', async () => {
      await consumer.process(buildJob({ name: 'some_other_job' }));

      expect(workerService.processImage).not.toHaveBeenCalled();
      expect(eventsService.emit).not.toHaveBeenCalled();
    });

    it('does not notify when no requester is attached (cron-triggered)', async () => {
      const job = buildJob({
        data: { ...JOB_DATA, requestedByUserId: undefined },
      } as Partial<Job>);

      await consumer.process(job);

      expect(eventsService.emit).not.toHaveBeenCalled();
    });
  });

  describe('onFailed', () => {
    it('keeps the row untouched while retries are still pending', async () => {
      const job = buildJob({ attemptsMade: 1, opts: { attempts: 3 } });

      await consumer.onFailed(job, new Error('gemini timeout'));

      expect(workerService.markFailed).not.toHaveBeenCalled();
      expect(eventsService.emit).not.toHaveBeenCalled();
    });

    it('persists the failure and notifies once the retries are exhausted', async () => {
      await consumer.onFailed(buildJob(), new Error('gemini timeout'));

      expect(workerService.markFailed).toHaveBeenCalledWith(
        'image-1',
        'gemini timeout',
      );
      expect(eventsService.emit).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          type: EVENT_TYPES.AI_IMAGE_FAILED,
        }),
      );
    });

    it('still persists the failure when nobody is waiting for a toast', async () => {
      const job = buildJob({
        data: { ...JOB_DATA, requestedByUserId: undefined },
      } as Partial<Job>);

      await consumer.onFailed(job, new Error('gemini timeout'));

      expect(workerService.markFailed).toHaveBeenCalled();
      expect(eventsService.emit).not.toHaveBeenCalled();
    });
  });
});
