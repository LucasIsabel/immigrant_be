import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { Redis } from 'ioredis';
import { env } from '@app/config/env';
import { HealthController } from './health.controller';
import { PrismaHealthIndicator } from './prisma-health.indicator';
import {
  REDIS_HEALTH_CLIENT,
  RedisHealthIndicator,
} from './redis-health.indicator';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [TerminusModule, DatabaseModule],
  controllers: [HealthController],
  providers: [
    PrismaHealthIndicator,
    RedisHealthIndicator,
    {
      provide: REDIS_HEALTH_CLIENT,
      /**
       * A connection of its own, deliberately not the one BullMQ uses: the
       * health check must not depend on which queues happen to be registered.
       *
       * The offline queue stays enabled on purpose. With `lazyConnect` the
       * connection is only opened by the first command, and disabling the queue
       * makes that first command fail before the socket exists — which reported
       * Redis as down while it was perfectly healthy. Failing fast is handled
       * where it belongs instead: `maxRetriesPerRequest: 0` stops a command from
       * being retried, and the indicator races the ping against its own timeout.
       */
      useFactory: () => {
        const client = new Redis(env.REDIS_URL, {
          lazyConnect: true,
          maxRetriesPerRequest: 0,
          connectTimeout: 2_000,
          // Keep reconnecting so the check recovers on its own, without letting
          // the delay grow unbounded while Redis is away.
          retryStrategy: (times) => Math.min(times * 200, 2_000),
        });

        /**
         * An ioredis client with no `error` listener turns every failed
         * reconnection attempt into an unhandled error event. Reporting the
         * outage is this client's whole job, so the event itself is noise —
         * `isHealthy` is what surfaces the problem.
         */
        client.on('error', () => undefined);

        return client;
      },
    },
  ],
})
export class HealthModule {}
