import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { EmailModule } from '@app/email';
import { PublisherQualificationRepository } from './publisher-qualification.repository';
import { PublisherQualificationService } from './publisher-qualification.service';
import { PublishersAdminController } from './publishers-admin.controller';

@Module({
  imports: [DatabaseModule, EmailModule],
  controllers: [PublishersAdminController],
  providers: [PublisherQualificationService, PublisherQualificationRepository],
  exports: [PublisherQualificationService],
})
export class PublisherQualificationModule {}
