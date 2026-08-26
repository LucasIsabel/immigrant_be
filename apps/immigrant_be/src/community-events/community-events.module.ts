import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { StorageModule } from '@app/storage';
import { CommunityEventsController } from './community-events.controller';
import { CommunityEventsAdminController } from './community-events-admin.controller';
import { CommunityEventsService } from './community-events.service';
import { CommunityEventsRepository } from './community-events.repository';

@Module({
  imports: [DatabaseModule, StorageModule],
  controllers: [CommunityEventsController, CommunityEventsAdminController],
  providers: [CommunityEventsService, CommunityEventsRepository],
  exports: [CommunityEventsService],
})
export class CommunityEventsModule {}
