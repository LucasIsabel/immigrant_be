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
 *
 * BullMQ auto-instrumentation is excluded in the worker (`initSentry('microservice')`)
 * so this function is the sole reporter of worker job errors in Sentry.
 * Any previous `__sentry_captured__` tag on the error object is cleared defensibly,
 * and a dedicated fingerprint is attached to avoid deduplication issues.
 */
export function reportJobFailure(
  queue: string,
  job: Job<CorrelatedJobData>,
  error: Error,
): void {
  if (!isFinalAttempt(job)) return;

  if (error && typeof error === 'object') {
    delete (error as unknown as { __sentry_captured__?: boolean })
      .__sentry_captured__;
  }

  Sentry.withScope((scope) => {
    scope.setTags({
      queue,
      job_name: job.name,
      job_id: String(job.id),
      correlation_id: jobCorrelationId(job),
    });
    if (typeof scope.setFingerprint === 'function') {
      scope.setFingerprint([
        'bullmq-job-failure',
        queue,
        job.name,
        '{{ default }}',
      ]);
    }
    Sentry.captureException(error);
  });
}
