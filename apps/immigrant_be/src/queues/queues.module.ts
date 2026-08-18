import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ADMIN_VISIBLE_QUEUES } from '@app/config/constants';
import { QueuesController } from './queues.controller';
import { QueuesService } from './queues.service';

@Module({
  imports: [
    BullModule.registerQueue(...ADMIN_VISIBLE_QUEUES.map((name) => ({ name }))),
  ],
  controllers: [QueuesController],
  providers: [QueuesService],
})
export class QueuesModule {}
