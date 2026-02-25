import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { BlogController } from './blog.controller';
import { BlogAdminController } from './blog-admin.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from './blog.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogController, BlogAdminController],
  providers: [BlogService, BlogRepository],
  exports: [BlogService],
})
export class BlogModule {}
