import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { getQueueToken } from '@nestjs/bullmq';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ADMIN_VISIBLE_QUEUES,
  AI_BLOG_IMAGE_QUEUE,
  AI_BLOG_QUEUE,
  AI_IMAGE_QUEUE,
  BLOG_TRANSLATION_QUEUE,
  PLACE_INGESTION_QUEUE,
} from '@app/config/constants';
import { QueueJobState } from './dto/list-queue-jobs-query.dto';
import { buildTarget, QueuesService, sanitizeJobData } from './queues.service';

function jobMock(overrides: Record<string, unknown> = {}) {
  return {
    id: '4812',
    name: 'generate_ai_blog_image',
    data: {
      postId: 'post-1',
      title: 'Vistos de nômade digital no Japão',
      prompt: 'A wide photograph of Tokyo at dusk with a visa stamp',
    },
    opts: { attempts: 3 },
    attemptsMade: 3,
    failedReason: 'Every model failed for "blog_image"',
    timestamp: 1_755_538_123_456,
    processedOn: 1_755_538_128_000,
    finishedOn: 1_755_538_132_000,
    getState: jest.fn().mockResolvedValue(QueueJobState.FAILED),
    retry: jest.fn().mockResolvedValue(undefined),
    promote: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

function queueMock() {
  return {
    getJobCounts: jest.fn().mockResolvedValue({
      waiting: 2,
      active: 1,
      delayed: 0,
      failed: 3,
      completed: 148,
    }),
    isPaused: jest.fn().mockResolvedValue(false),
    getJobs: jest.fn().mockResolvedValue([]),
    getJob: jest.fn(),
    pause: jest.fn().mockResolvedValue(undefined),
    resume: jest.fn().mockResolvedValue(undefined),
  };
}

describe('QueuesService', () => {
  let service: QueuesService;
  const blog = queueMock();
  const blogImage = queueMock();
  const translation = queueMock();
  const image = queueMock();
  const placeIngestion = queueMock();

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueuesService,
        { provide: getQueueToken(AI_BLOG_QUEUE), useValue: blog },
        { provide: getQueueToken(AI_BLOG_IMAGE_QUEUE), useValue: blogImage },
        {
          provide: getQueueToken(BLOG_TRANSLATION_QUEUE),
          useValue: translation,
        },
        { provide: getQueueToken(AI_IMAGE_QUEUE), useValue: image },
        {
          provide: getQueueToken(PLACE_INGESTION_QUEUE),
          useValue: placeIngestion,
        },
      ],
    }).compile();

    service = module.get(QueuesService);
  });

  describe('listQueues', () => {
    it('returns counts and paused for every visible queue', async () => {
      image.isPaused.mockResolvedValue(true);

      const result = await service.listQueues();

      expect(result.map((q) => q.name)).toEqual([...ADMIN_VISIBLE_QUEUES]);
      expect(result[0].counts).toEqual({
        waiting: 2,
        active: 1,
        delayed: 0,
        failed: 3,
        completed: 148,
      });
      expect(result[0].paused).toBe(false);
      expect(result.find((q) => q.name === AI_IMAGE_QUEUE)?.paused).toBe(true);
    });
  });

  describe('listJobs', () => {
    it('throws when the queue is not in the admin allowlist', async () => {
      await expect(service.listJobs('plan_queue', {})).rejects.toThrow(
        NotFoundException,
      );
    });

    it('drops prompts and keeps the title as the target', async () => {
      const job = jobMock();
      blogImage.getJobs.mockResolvedValue([job]);

      const result = await service.listJobs(AI_BLOG_IMAGE_QUEUE, {
        state: QueueJobState.FAILED,
      });

      expect(blogImage.getJobs).toHaveBeenCalledWith(
        [QueueJobState.FAILED],
        0,
        19,
        false,
      );
      expect(result.total).toBe(3);
      expect(result.data[0]).toMatchObject({
        id: '4812',
        name: 'generate_ai_blog_image',
        state: QueueJobState.FAILED,
        attemptsMade: 3,
        attemptsMax: 3,
        failedReason: 'Every model failed for "blog_image"',
        target: 'Vistos de nômade digital no Japão',
        data: {
          postId: 'post-1',
          title: 'Vistos de nômade digital no Japão',
        },
      });
      expect(result.data[0].data).not.toHaveProperty('prompt');
    });

    it('lists the live states when no filter is given', async () => {
      await service.listJobs(AI_BLOG_QUEUE, { page: 2, limit: 10 });

      expect(blog.getJobs).toHaveBeenCalledWith(
        [
          QueueJobState.WAITING,
          QueueJobState.ACTIVE,
          QueueJobState.DELAYED,
          QueueJobState.FAILED,
        ],
        10,
        19,
        false,
      );
    });
  });

  describe('retryJob', () => {
    it('retries a failed job', async () => {
      const job = jobMock();
      blogImage.getJob.mockResolvedValue(job);

      const result = await service.retryJob(AI_BLOG_IMAGE_QUEUE, '4812');

      expect(job.retry).toHaveBeenCalled();
      expect(job.promote).not.toHaveBeenCalled();
      expect(result.id).toBe('4812');
    });

    it('promotes a delayed job', async () => {
      const job = jobMock({
        getState: jest.fn().mockResolvedValue(QueueJobState.DELAYED),
      });
      blogImage.getJob.mockResolvedValue(job);

      await service.retryJob(AI_BLOG_IMAGE_QUEUE, '4812');

      expect(job.promote).toHaveBeenCalled();
      expect(job.retry).not.toHaveBeenCalled();
    });

    it('rejects retry from a waiting job', async () => {
      const job = jobMock({
        getState: jest.fn().mockResolvedValue(QueueJobState.WAITING),
      });
      blogImage.getJob.mockResolvedValue(job);

      await expect(
        service.retryJob(AI_BLOG_IMAGE_QUEUE, '4812'),
      ).rejects.toThrow(BadRequestException);
      expect(job.retry).not.toHaveBeenCalled();
    });

    it('throws when the job does not exist', async () => {
      blogImage.getJob.mockResolvedValue(undefined);

      await expect(
        service.retryJob(AI_BLOG_IMAGE_QUEUE, 'missing'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeJob', () => {
    it('removes the job', async () => {
      const job = jobMock();
      blogImage.getJob.mockResolvedValue(job);

      await service.removeJob(AI_BLOG_IMAGE_QUEUE, '4812');

      expect(job.remove).toHaveBeenCalled();
    });

    it('maps a locked job to ConflictException', async () => {
      const job = jobMock({
        remove: jest.fn().mockRejectedValue(new Error('locked')),
      });
      blogImage.getJob.mockResolvedValue(job);

      await expect(
        service.removeJob(AI_BLOG_IMAGE_QUEUE, '4812'),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('pause and resume', () => {
    it('pauses a queue and returns the updated summary', async () => {
      blogImage.isPaused.mockResolvedValue(true);

      const result = await service.pauseQueue(AI_BLOG_IMAGE_QUEUE);

      expect(blogImage.pause).toHaveBeenCalled();
      expect(result).toMatchObject({
        name: AI_BLOG_IMAGE_QUEUE,
        paused: true,
      });
    });

    it('resumes a queue', async () => {
      await service.resumeQueue(AI_IMAGE_QUEUE);

      expect(image.resume).toHaveBeenCalled();
    });

    it('throws for an unknown queue', async () => {
      await expect(service.pauseQueue('nope')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

describe('sanitizeJobData', () => {
  it('keeps short primitives and drops blocked or oversized fields', () => {
    expect(
      sanitizeJobData({
        postId: 'post-1',
        isPublic: true,
        attempts: 2,
        prompt: 'secret prompt',
        custom_instructions: 'write like a lawyer',
        topic: 'a'.repeat(201),
        folder: 'blog',
        nested: { ignored: true },
      }),
    ).toEqual({
      postId: 'post-1',
      isPublic: true,
      attempts: 2,
      folder: 'blog',
    });
  });

  it('returns an empty object for non-objects', () => {
    expect(sanitizeJobData(null)).toEqual({});
    expect(sanitizeJobData(['x'])).toEqual({});
  });
});

describe('buildTarget', () => {
  it('prefers topic, then title, then folder/locale/post', () => {
    expect(buildTarget({ topic: 'Metas de 2027', title: 'ignored' })).toBe(
      'Metas de 2027',
    );
    expect(buildTarget({ title: 'Capa do Japão' })).toBe('Capa do Japão');
    expect(
      buildTarget({ folder: 'blog', targetLocale: 'es', postId: 'p1' }),
    ).toBe('blog · es · post p1');
    expect(buildTarget({})).toBeNull();
  });
});
