import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import type Redis from 'ioredis';

export const REDIS_HEALTH_CLIENT = 'REDIS_HEALTH_CLIENT';

/**
 * How long a `PING` may take before Redis is considered down. Short on purpose:
 * a health check that hangs is indistinguishable from an outage to whoever is
 * polling it, and ioredis will happily wait out its own retry budget.
 */
const PING_TIMEOUT_MS = 1_500;

@Injectable()
export class RedisHealthIndicator
  extends HealthIndicator
  implements OnModuleDestroy
{
  constructor(@Inject(REDIS_HEALTH_CLIENT) private readonly redis: Redis) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await Promise.race([
        this.redis.ping(),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error('redis ping timed out')),
            PING_TIMEOUT_MS,
          ).unref(),
        ),
      ]);

      return this.getStatus(key, true);
    } catch {
      return this.getStatus(key, false);
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.redis.quit();
    } catch {
      // Shutting down: a connection that is already gone needs no closing.
    }
  }
}
