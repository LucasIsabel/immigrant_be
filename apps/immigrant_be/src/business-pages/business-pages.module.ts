import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { EmailModule } from '@app/email';
import { StorageModule } from '@app/storage';
import { PublisherQualificationModule } from '../publisher-qualification/publisher-qualification.module';
import { BusinessPagesController } from './business-pages.controller';
import { BusinessPagesAdminController } from './business-pages-admin.controller';
import { BusinessPagesService } from './business-pages.service';
import { BusinessPagesRepository } from './business-pages.repository';

@Module({
  imports: [
    DatabaseModule,
    EmailModule,
    PublisherQualificationModule,
    StorageModule,
  ],
  controllers: [BusinessPagesController, BusinessPagesAdminController],
  providers: [BusinessPagesService, BusinessPagesRepository],
  exports: [BusinessPagesService],
})
export class BusinessPagesModule {}
