import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import {
  ADMIN_VISIBLE_QUEUES,
  AI_BLOG_IMAGE_QUEUE,
  AI_BLOG_QUEUE,
  AI_IMAGE_QUEUE,
  BLOG_TRANSLATION_QUEUE,
} from '@app/config/constants';
import { QueueJobState } from './dto/list-queue-jobs-query.dto';
import { PaginatedQueueJobsDto, QueueJobDto } from './dto/queue-job.dto';
import { QueueCountsDto, QueueSummaryDto } from './dto/queue-summary.dto';

const LIVE_STATES: QueueJobState[] = [
  QueueJobState.WAITING,
  QueueJobState.ACTIVE,
  QueueJobState.DELAYED,
  QueueJobState.FAILED,
];

const MAX_PRIMITIVE_LENGTH = 200;
const BLOCKED_DATA_KEY =
  /^(content|markdown|body|html|prompt|text|excerpt|custom_instructions|instruction|image|buffer)/i;

type JobDataPrimitive = string | number | boolean;

@Injectable()
export class QueuesService {
  private readonly queues: Map<string, Queue>;

  constructor(
    @InjectQueue(AI_BLOG_QUEUE) blog: Queue,
    @InjectQueue(AI_BLOG_IMAGE_QUEUE) blogImage: Queue,
    @InjectQueue(BLOG_TRANSLATION_QUEUE) translation: Queue,
    @InjectQueue(AI_IMAGE_QUEUE) image: Queue,
  ) {
    this.queues = new Map<string, Queue>([
      [AI_BLOG_QUEUE, blog],
      [AI_BLOG_IMAGE_QUEUE, blogImage],
      [BLOG_TRANSLATION_QUEUE, translation],
      [AI_IMAGE_QUEUE, image],
    ]);
  }

  async listQueues(): Promise<QueueSummaryDto[]> {
    return Promise.all(
      ADMIN_VISIBLE_QUEUES.map((name) => this.summarize(name)),
    );
  }

  async listJobs(
    name: string,
    query: { state?: QueueJobState; page?: number; limit?: number },
  ): Promise<PaginatedQueueJobsDto> {
    const queue = this.resolve(name);
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const types = query.state ? [query.state] : LIVE_STATES;
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const [jobs, counts] = await Promise.all([
      queue.getJobs(types, start, end, false),
      queue.getJobCounts(...LIVE_STATES, QueueJobState.COMPLETED),
    ]);

    const total = query.state
      ? (counts[query.state] ?? 0)
      : LIVE_STATES.reduce((sum, state) => sum + (counts[state] ?? 0), 0);

    return {
      data: await Promise.all(jobs.map((job) => this.toJobDto(job))),
      total,
      page,
      limit,
      totalPages: total === 0 ? 0 : Math.ceil(total / limit),
    };
  }

  async retryJob(name: string, id: string): Promise<QueueJobDto> {
    const queue = this.resolve(name);
    const job = await this.findJob(queue, id);
    const state = await job.getState();

    try {
      if (state === QueueJobState.FAILED) {
        await job.retry();
      } else if (state === QueueJobState.DELAYED) {
        await job.promote();
      } else {
        throw new BadRequestException(
          `Job cannot be retried from state '${state}'`,
        );
      }
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Failed to retry job',
      );
    }

    const refreshed = await queue.getJob(id);
    return this.toJobDto(refreshed ?? job);
  }

  async removeJob(name: string, id: string): Promise<void> {
    const queue = this.resolve(name);
    const job = await this.findJob(queue, id);

    try {
      await job.remove();
    } catch (error) {
      throw new ConflictException(
        error instanceof Error ? error.message : 'Failed to remove job',
      );
    }
  }

  async pauseQueue(name: string): Promise<QueueSummaryDto> {
    const queue = this.resolve(name);
    await queue.pause();
    return this.summarize(name);
  }

  async resumeQueue(name: string): Promise<QueueSummaryDto> {
    const queue = this.resolve(name);
    await queue.resume();
    return this.summarize(name);
  }

  private async summarize(name: string): Promise<QueueSummaryDto> {
    const queue = this.resolve(name);
    const [rawCounts, paused] = await Promise.all([
      queue.getJobCounts(...LIVE_STATES, QueueJobState.COMPLETED),
      queue.isPaused(),
    ]);

    const counts: QueueCountsDto = {
      waiting: rawCounts.waiting ?? 0,
      active: rawCounts.active ?? 0,
      delayed: rawCounts.delayed ?? 0,
      failed: rawCounts.failed ?? 0,
      completed: rawCounts.completed ?? 0,
    };

    return { name, paused, counts };
  }

  private resolve(name: string): Queue {
    const queue = this.queues.get(name);
    if (!queue) {
      throw new NotFoundException(`Queue '${name}' not found`);
    }
    return queue;
  }

  private async findJob(queue: Queue, id: string): Promise<Job> {
    const job = await queue.getJob(id);
    if (!job) {
      throw new NotFoundException(`Job '${id}' not found`);
    }
    return job;
  }

  private async toJobDto(job: Job): Promise<QueueJobDto> {
    const data = sanitizeJobData(job.data);
    return {
      id: String(job.id ?? ''),
      name: job.name,
      state: await job.getState(),
      attemptsMade: job.attemptsMade,
      attemptsMax: job.opts.attempts ?? 1,
      failedReason: job.failedReason || null,
      target: buildTarget(data),
      timestamp: job.timestamp,
      processedOn: job.processedOn ?? null,
      finishedOn: job.finishedOn ?? null,
      data,
    };
  }
}

export function sanitizeJobData(
  data: unknown,
): Record<string, JobDataPrimitive> {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {};
  }

  const sanitized: Record<string, JobDataPrimitive> = {};
  for (const [key, value] of Object.entries(data)) {
    if (BLOCKED_DATA_KEY.test(key)) {
      continue;
    }
    if (typeof value === 'string') {
      if (value.length > 0 && value.length <= MAX_PRIMITIVE_LENGTH) {
        sanitized[key] = value;
      }
      continue;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

export function buildTarget(
  data: Record<string, JobDataPrimitive>,
): string | null {
  if (typeof data.topic === 'string') {
    return data.topic;
  }
  if (typeof data.title === 'string') {
    return data.title;
  }

  const parts: string[] = [];
  if (typeof data.folder === 'string') {
    parts.push(data.folder);
  }
  if (typeof data.targetLocale === 'string') {
    parts.push(data.targetLocale);
  }
  const postId =
    typeof data.postId === 'string'
      ? data.postId
      : typeof data.post_id === 'string'
        ? data.post_id
        : null;
  if (postId) {
    parts.push(`post ${postId}`);
  }
  return parts.length > 0 ? parts.join(' · ') : null;
}
