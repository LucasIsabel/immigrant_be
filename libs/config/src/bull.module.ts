import { Module } from '@nestjs/common';
import { BullModule as BullModuleNest } from '@nestjs/bullmq';
import { env } from './env';
import { DEFAULT_JOB_OPTIONS } from './constants';

@Module({
  imports: [
    BullModuleNest.forRoot({
      connection: {
        url: env.REDIS_URL,
      },
      defaultJobOptions: DEFAULT_JOB_OPTIONS,
    }),
  ],
})
export class BullMQConfigModule {}
