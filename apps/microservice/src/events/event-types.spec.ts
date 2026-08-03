import { Job } from 'bullmq';
import { EVENT_TYPES, isFinalAttempt } from './event-types';

function jobWith(attemptsMade: number, attempts?: number): Job {
  return { attemptsMade, opts: { attempts } } as unknown as Job;
}

describe('isFinalAttempt', () => {
  it('is false while BullMQ still has retries left', () => {
    expect(isFinalAttempt(jobWith(1, 3))).toBe(false);
    expect(isFinalAttempt(jobWith(2, 3))).toBe(false);
  });

  it('is true once the configured attempts are exhausted', () => {
    expect(isFinalAttempt(jobWith(3, 3))).toBe(true);
  });

  it('is true beyond the configured attempts', () => {
    expect(isFinalAttempt(jobWith(4, 3))).toBe(true);
  });

  it('treats a job without explicit attempts as single-attempt', () => {
    expect(isFinalAttempt(jobWith(1))).toBe(true);
  });
});

describe('EVENT_TYPES', () => {
  it('suffixes every failure event with _failed so the frontend can style it', () => {
    const failureTypes = Object.entries(EVENT_TYPES)
      .filter(([key]) => key.endsWith('_FAILED'))
      .map(([, value]) => value);

    expect(failureTypes.length).toBeGreaterThan(0);
    for (const type of failureTypes) {
      expect(type.endsWith('_failed')).toBe(true);
    }
  });

  it('never suffixes a success event with _failed', () => {
    const successTypes = Object.entries(EVENT_TYPES)
      .filter(([key]) => !key.endsWith('_FAILED'))
      .map(([, value]) => value);

    for (const type of successTypes) {
      expect(type.endsWith('_failed')).toBe(false);
    }
  });
});
