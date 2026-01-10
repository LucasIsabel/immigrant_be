import { Module } from '@nestjs/common';
import { BullModule as BullModuleNest } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModuleNest.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT ?? '6379'),
        password: process.env.REDIS_PASSWORD,
        username: process.env.REDIS_USER,
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class BullMQConfigModule {}
