import * as Sentry from '@sentry/nestjs';
import { Job } from 'bullmq';
import { CorrelatedJobData } from '@app/config/job-data';
import { isFinalAttempt } from '../events/event-types';

/**
 * The correlation ID a job should run under: the one inherited from the request
 * that enqueued it, or the job id for work that had no request behind it (cron
 * ticks, and jobs enqueued before the field existed).
 */
export function jobCorrelationId(job: Job<CorrelatedJobData>): string {
  return job.data?.correlationId ?? String(job.id);
}

/**
 * Reports a failed job to Sentry, but only once the retries are exhausted —
 * `@OnWorkerEvent('failed')` fires on every attempt, so reporting eagerly would
 * turn one failure into three alerts.
 */
export function reportJobFailure(
  queue: string,
  job: Job<CorrelatedJobData>,
  error: Error,
): void {
  if (!isFinalAttempt(job)) return;

  Sentry.withScope((scope) => {
    scope.setTags({
      queue,
      job_name: job.name,
      job_id: String(job.id),
      correlation_id: jobCorrelationId(job),
    });
    Sentry.captureException(error);
  });
}
