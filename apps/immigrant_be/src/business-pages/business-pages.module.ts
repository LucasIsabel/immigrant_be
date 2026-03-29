import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { BusinessPagesController } from './business-pages.controller';
import { BusinessPagesService } from './business-pages.service';
import { BusinessPagesRepository } from './business-pages.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [BusinessPagesController],
  providers: [BusinessPagesService, BusinessPagesRepository],
  exports: [BusinessPagesService],
})
export class BusinessPagesModule {}
