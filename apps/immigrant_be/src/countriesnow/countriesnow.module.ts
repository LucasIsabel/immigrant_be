import { createStandaloneRedisClient } from '@app/config/redis-client';
import { Inject, Module, OnModuleDestroy, Optional } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type Redis from 'ioredis';
import { CountriesNowController } from './countriesnow.controller';
import {
  COUNTRIES_NOW_REDIS,
  CountriesNowService,
} from './countriesnow.service';

/**
 * The Redis client exists to share the city index between processes, so a
 * country's cities are requested from CountriesNow once a day and not once per
 * process. It is optional on the service's side: without it the index is only
 * built per process.
 */
@Module({
  imports: [ConfigModule],
  controllers: [CountriesNowController],
  providers: [
    CountriesNowService,
    {
      provide: COUNTRIES_NOW_REDIS,
      /**
       * `REDIS_URL` through `ConfigService` rather than the imported `env`: that
       * module validates `process.env` when it loads, and `BusinessModule`
       * imports this one — the side effect would travel to every test that
       * touches either.
       */
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('REDIS_URL');
        return url ? createStandaloneRedisClient(url) : undefined;
      },
    },
  ],
  exports: [CountriesNowService],
})
export class CountriesNowModule implements OnModuleDestroy {
  constructor(
    @Optional()
    @Inject(COUNTRIES_NOW_REDIS)
    private readonly redis?: Redis,
  ) {}

  /** The module opened the connection, so the module closes it. */
  async onModuleDestroy(): Promise<void> {
    try {
      await this.redis?.quit();
    } catch {
      // Shutting down: a connection that is already gone needs no closing.
    }
  }
}
