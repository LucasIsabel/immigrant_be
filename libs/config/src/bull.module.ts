import { Module } from '@nestjs/common';
import { BullModule as BullModuleNest } from '@nestjs/bullmq';
import { env } from './env';

@Module({
  imports: [
    BullModuleNest.forRoot({
      connection: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        password: env.REDIS_PASSWORD,
        username: env.REDIS_USER,
      },
    }),
  ],
})
export class BullMQConfigModule {}
