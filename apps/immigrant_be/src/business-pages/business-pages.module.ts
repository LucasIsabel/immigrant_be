import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { EmailModule } from '@app/email';
import { BusinessPagesController } from './business-pages.controller';
import { BusinessPagesAdminController } from './business-pages-admin.controller';
import { BusinessPagesService } from './business-pages.service';
import { BusinessPagesRepository } from './business-pages.repository';

@Module({
  imports: [DatabaseModule, EmailModule],
  controllers: [BusinessPagesController, BusinessPagesAdminController],
  providers: [BusinessPagesService, BusinessPagesRepository],
  exports: [BusinessPagesService],
})
export class BusinessPagesModule {}
