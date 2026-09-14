import * as Sentry from '@sentry/nestjs';
import { Job } from 'bullmq';
import { CorrelatedJobData } from '@app/config/job-data';
import { jobCorrelationId, reportJobFailure } from './report-job-failure';

jest.mock('@sentry/nestjs', () => {
  return {
    captureException: jest.fn(),
    withScope: jest.fn((callback: (scope: any) => void) => {
      const scope = {
        setTags: jest.fn(),
        setFingerprint: jest.fn(),
      };
      callback(scope);
      return scope;
    }),
  };
});

describe('report-job-failure', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('jobCorrelationId', () => {
    it('returns correlationId when present in job data', () => {
      const job = {
        id: 'job-123',
        data: { correlationId: 'corr-xyz' },
      } as Job<CorrelatedJobData>;

      expect(jobCorrelationId(job)).toBe('corr-xyz');
    });

    it('falls back to stringified job id when correlationId is absent', () => {
      const jobWithEmptyData = {
        id: 456,
        data: {},
      } as unknown as Job<CorrelatedJobData>;

      expect(jobCorrelationId(jobWithEmptyData)).toBe('456');

      const jobWithNullData = {
        id: '789',
        data: null,
      } as unknown as Job<CorrelatedJobData>;

      expect(jobCorrelationId(jobWithNullData)).toBe('789');
    });
  });

  describe('reportJobFailure', () => {
    function buildJob(
      attemptsMade: number,
      maxAttempts: number,
      overrides: Partial<Job> = {},
    ): Job<CorrelatedJobData> {
      return {
        id: 'job-99',
        name: 'test_task',
        attemptsMade,
        opts: { attempts: maxAttempts },
        data: { correlationId: 'corr-abc' },
        ...overrides,
      } as unknown as Job<CorrelatedJobData>;
    }

    it('does nothing when the attempt is not final', () => {
      const job = buildJob(1, 3);
      const error = new Error('Transient network timeout');

      reportJobFailure('test_queue', job, error);

      expect(Sentry.withScope).not.toHaveBeenCalled();
      expect(Sentry.captureException).not.toHaveBeenCalled();
    });

    it('reports to Sentry when retries are exhausted (final attempt)', () => {
      const job = buildJob(3, 3);
      const error = new Error('Permanent database crash');

      reportJobFailure('ai_blog', job, error);

      expect(Sentry.withScope).toHaveBeenCalledTimes(1);
      const scope = (Sentry.withScope as jest.Mock).mock.results[0].value;

      expect(scope.setTags).toHaveBeenCalledWith({
        queue: 'ai_blog',
        job_name: 'test_task',
        job_id: 'job-99',
        correlation_id: 'corr-abc',
      });
      expect(scope.setFingerprint).toHaveBeenCalledWith([
        'bullmq-job-failure',
        'ai_blog',
        'test_task',
        '{{ default }}',
      ]);
      expect(Sentry.captureException).toHaveBeenCalledWith(error);
    });

    it('clears any existing __sentry_captured__ flag before capturing exception', () => {
      const job = buildJob(2, 2);
      const error = new Error('Error previously marked as captured');
      (error as any).__sentry_captured__ = true;

      reportJobFailure('image_queue', job, error);

      expect((error as any).__sentry_captured__).toBeUndefined();
      expect(Sentry.captureException).toHaveBeenCalledWith(error);
    });
  });
});
