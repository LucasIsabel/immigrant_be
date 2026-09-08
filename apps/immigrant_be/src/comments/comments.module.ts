import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { StorageModule } from '@app/storage';
import { NotificationsModule } from '@app/notifications';
import { CommentsAdminController } from './comments-admin.controller';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';

@Module({
  imports: [DatabaseModule, StorageModule, NotificationsModule],
  controllers: [CommentsController, CommentsAdminController],
  providers: [CommentsService, CommentsRepository],
  exports: [CommentsService],
})
export class CommentsModule {}
