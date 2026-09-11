import { Redis } from 'ioredis';

/**
 * A Redis connection of its own, for a feature that has to keep working while
 * Redis does not.
 *
 * Deliberately not the BullMQ connection: a cache or a shared flag must not
 * depend on which queues the process happened to register. The options are the
 * ones `AiModule` and `HealthModule` arrived at separately, gathered here so the
 * next caller does not become a third copy.
 *
 * - `lazyConnect`: nothing is opened until the first command, so booting never
 *   waits on Redis.
 * - The offline queue stays enabled. With `lazyConnect` the socket only exists
 *   after the first command, and disabling the queue fails that command before
 *   it gets the chance to connect.
 * - `maxRetriesPerRequest: 0` and `connectTimeout`: a command fails within
 *   seconds instead of waiting out a retry budget, which is what lets every
 *   caller treat Redis being away as a miss.
 * - `retryStrategy`: keep reconnecting so the feature recovers on its own, with
 *   a delay that stops growing at two seconds.
 */
export function createStandaloneRedisClient(url: string): Redis {
  const client = new Redis(url, {
    lazyConnect: true,
    maxRetriesPerRequest: 0,
    connectTimeout: 2_000,
    retryStrategy: (times) => Math.min(times * 200, 2_000),
  });

  /**
   * With no `error` listener every failed reconnection becomes an unhandled
   * event and takes the process down. Each caller already degrades when a
   * command fails, so the event itself is noise.
   */
  client.on('error', () => undefined);

  return client;
}
