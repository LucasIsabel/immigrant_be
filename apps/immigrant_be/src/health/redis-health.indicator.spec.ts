import type Redis from 'ioredis';
import {
  REDIS_HEALTH_CLIENT,
  RedisHealthIndicator,
} from './redis-health.indicator';

describe('RedisHealthIndicator', () => {
  const ping = jest.fn();
  const quit = jest.fn();
  let indicator: RedisHealthIndicator;

  beforeEach(() => {
    jest.clearAllMocks();
    indicator = new RedisHealthIndicator({ ping, quit } as unknown as Redis);
  });

  it('reports up when the ping is answered', async () => {
    ping.mockResolvedValue('PONG');

    await expect(indicator.isHealthy('redis')).resolves.toEqual({
      redis: { status: 'up' },
    });
  });

  it('reports down when the ping is refused', async () => {
    ping.mockRejectedValue(new Error('ECONNREFUSED'));

    await expect(indicator.isHealthy('redis')).resolves.toEqual({
      redis: { status: 'down' },
    });
  });

  /**
   * A Redis that accepts the connection but never answers is an outage too —
   * without the timeout the check would hang for as long as ioredis lets it.
   */
  it('reports down when the ping never settles', async () => {
    jest.useFakeTimers();
    ping.mockReturnValue(new Promise(() => undefined));

    const result = indicator.isHealthy('redis');
    await jest.advanceTimersByTimeAsync(2_000);

    await expect(result).resolves.toEqual({ redis: { status: 'down' } });
    jest.useRealTimers();
  });

  it('closes the connection on shutdown', async () => {
    quit.mockResolvedValue('OK');

    await indicator.onModuleDestroy();

    expect(quit).toHaveBeenCalled();
  });

  it('does not throw when the connection is already gone at shutdown', async () => {
    quit.mockRejectedValue(new Error('Connection is closed'));

    await expect(indicator.onModuleDestroy()).resolves.toBeUndefined();
  });

  it('exposes an injection token so the client can be swapped in tests', () => {
    expect(REDIS_HEALTH_CLIENT).toBe('REDIS_HEALTH_CLIENT');
  });
});
