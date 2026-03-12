import { Module } from '@nestjs/common';
import { BullModule as BullModuleNest } from '@nestjs/bullmq';
import { env } from './env';

@Module({
  imports: [
    BullModuleNest.forRoot({
      connection: {
        url: env.REDIS_URL,
      },
    }),
  ],
})
export class BullMQConfigModule {}
