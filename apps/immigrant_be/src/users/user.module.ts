import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { AdminUserController } from './admin-user.controller';
import { DatabaseModule } from '@app/database';
import { BullModule } from '@nestjs/bullmq';
import { SystemModule } from '../system/system.module';
import { PLAN_QUEUE } from '@app/config/constants';

@Module({
  imports: [
    SystemModule,
    DatabaseModule,
    BullModule.registerQueue({
      name: PLAN_QUEUE,
    }),
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController, AdminUserController],
})
export class UserModule {}
