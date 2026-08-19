jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bullmq';
import { getQueueToken } from '@nestjs/bullmq';
import {
  AI_BLOG_IMAGE_QUEUE,
  GENERATE_AI_BLOG_IMAGE,
  REFINE_AI_BLOG_POST,
} from '@app/config/constants';
import { AiBlogImageConsumer } from './ai-blog-image.consumer';
import { AiBlogImageWorkerService } from './ai-blog-image.service';
import { AiBlogRefineService } from './ai-blog-refine.service';
import { EventsService } from '../events/events.service';
import { EVENT_TYPES } from '../events/event-types';

const POST_ID = 'post-1';
const USER_ID = 'user-1';

const coverJobData = {
  postId: POST_ID,
  slug: 'como-imigrar',
  title: 'Como imigrar',
  countryName: 'Canadá',
  requestedByUserId: USER_ID,
};

function buildJob(
  name: string,
  data: Record<string, unknown> = coverJobData,
): Job {
  return {
    id: 'job-1',
    name,
    data,
    attemptsMade: 3,
    opts: { attempts: 3 },
  } as unknown as Job;
}

describe('AiBlogImageConsumer', () => {
  let consumer: AiBlogImageConsumer;
  let imageWorker: { generateAndAttachImage: jest.Mock; markCoverFailure: jest.Mock };
  let refineService: {
    refinePost: jest.Mock;
    postNeedsRefinement: jest.Mock;
    markManualFixNeeded: jest.Mock;
  };
  let eventsService: { emit: jest.Mock; emitToAdmins: jest.Mock };
  let imageQueue: { add: jest.Mock };

  beforeEach(async () => {
    imageWorker = {
      generateAndAttachImage: jest.fn(),
      markCoverFailure: jest.fn(),
    };
    refineService = {
      refinePost: jest.fn(),
      postNeedsRefinement: jest.fn().mockResolvedValue(false),
      markManualFixNeeded: jest.fn(),
    };
    eventsService = { emit: jest.fn(), emitToAdmins: jest.fn() };
    imageQueue = { add: jest.fn().mockResolvedValue({ id: 'refine-job' }) };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiBlogImageConsumer,
        { provide: AiBlogImageWorkerService, useValue: imageWorker },
        { provide: AiBlogRefineService, useValue: refineService },
        { provide: EventsService, useValue: eventsService },
        { provide: getQueueToken(AI_BLOG_IMAGE_QUEUE), useValue: imageQueue },
      ],
    }).compile();

    consumer = module.get(AiBlogImageConsumer);
    jest.spyOn(consumer['logger'], 'error').mockImplementation(() => undefined);
    jest.spyOn(consumer['logger'], 'log').mockImplementation(() => undefined);
    jest.spyOn(consumer['logger'], 'warn').mockImplementation(() => undefined);
  });

  describe('cover image', () => {
    it('enfileira refine quando o corpo ainda tem marcadores', async () => {
      refineService.postNeedsRefinement.mockResolvedValue(true);

      await consumer.process(buildJob(GENERATE_AI_BLOG_IMAGE));

      expect(imageWorker.generateAndAttachImage).toHaveBeenCalled();
      expect(imageQueue.add).toHaveBeenCalledWith(
        REFINE_AI_BLOG_POST,
        expect.objectContaining({ postId: POST_ID, requestedByUserId: USER_ID }),
      );
      expect(refineService.markManualFixNeeded).not.toHaveBeenCalled();
    });

    it('não enfileira refine quando não há marcadores', async () => {
      refineService.postNeedsRefinement.mockResolvedValue(false);

      await consumer.process(buildJob(GENERATE_AI_BLOG_IMAGE));

      expect(imageQueue.add).not.toHaveBeenCalled();
    });

    it('marca refine_needs_manual_fix quando o enqueue do refine falha', async () => {
      refineService.postNeedsRefinement.mockResolvedValue(true);
      imageQueue.add.mockRejectedValue(new Error('redis down'));

      await consumer.process(buildJob(GENERATE_AI_BLOG_IMAGE));

      expect(refineService.markManualFixNeeded).toHaveBeenCalledWith(POST_ID);
    });

    it('notifica o requester quando a capa termina', async () => {
      await consumer.process(buildJob(GENERATE_AI_BLOG_IMAGE));

      expect(eventsService.emit).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: USER_ID,
          type: EVENT_TYPES.BLOG_COVER_IMAGE_COMPLETED,
        }),
      );
    });
  });

  describe('refine', () => {
    it('processa refinamento e notifica sucesso', async () => {
      refineService.refinePost.mockResolvedValue({
        allGenerated: true,
        generated: 2,
        total: 2,
      });

      await consumer.process(
        buildJob(REFINE_AI_BLOG_POST, { postId: POST_ID, requestedByUserId: USER_ID }),
      );

      expect(refineService.refinePost).toHaveBeenCalledWith({ postId: POST_ID });
      expect(eventsService.emit).toHaveBeenCalledWith(
        expect.objectContaining({ type: EVENT_TYPES.BLOG_REFINE_COMPLETED }),
      );
    });
  });
});
