import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DatabaseModule } from '@app/database';
import { BullMQConfigModule } from '@app/config/bull.module';
import { BLOG_TRANSLATION_QUEUE } from '@app/config/constants';
import { BlogController } from './blog.controller';
import { BlogAdminController } from './blog-admin.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from './blog.repository';

@Module({
  imports: [
    DatabaseModule,
    BullMQConfigModule,
    BullModule.registerQueue({ name: BLOG_TRANSLATION_QUEUE }),
  ],
  controllers: [BlogController, BlogAdminController],
  providers: [BlogService, BlogRepository],
  exports: [BlogService],
})
export class BlogModule {}
