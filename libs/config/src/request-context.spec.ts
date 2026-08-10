import { getCorrelationId, runWithCorrelationId } from './request-context';

describe('request-context', () => {
  it('returns undefined outside of any context', () => {
    expect(getCorrelationId()).toBeUndefined();
  });

  it('exposes the id to everything running inside the context', () => {
    const seen = runWithCorrelationId('abc-123', () => getCorrelationId());

    expect(seen).toBe('abc-123');
  });

  it('survives async continuations started inside the context', async () => {
    const seen = await runWithCorrelationId('async-1', async () => {
      await new Promise((resolve) => setTimeout(resolve, 1));
      return getCorrelationId();
    });

    expect(seen).toBe('async-1');
  });

  it('lets a nested context shadow the outer one without leaking back', () => {
    runWithCorrelationId('outer', () => {
      runWithCorrelationId('inner', () => {
        expect(getCorrelationId()).toBe('inner');
      });

      expect(getCorrelationId()).toBe('outer');
    });
  });

  /**
   * The isolation guarantee that makes this safe under concurrent requests:
   * two overlapping executions must never observe each other's id.
   */
  it('keeps concurrent executions isolated from each other', async () => {
    const slow = runWithCorrelationId('slow', async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      return getCorrelationId();
    });

    const fast = runWithCorrelationId('fast', () =>
      Promise.resolve(getCorrelationId()),
    );

    await expect(Promise.all([slow, fast])).resolves.toEqual(['slow', 'fast']);
  });

  it('restores the previous state after the context ends', () => {
    runWithCorrelationId('temporary', () => getCorrelationId());

    expect(getCorrelationId()).toBeUndefined();
  });
});
