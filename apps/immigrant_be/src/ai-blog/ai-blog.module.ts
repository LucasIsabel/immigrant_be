import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DatabaseModule } from '@app/database';
import { AI_BLOG_QUEUE } from '@app/config/constants';
import { AiBlogController } from './ai-blog.controller';
import { AiBlogService } from './ai-blog.service';
import { AiBlogRepository } from './ai-blog.repository';
import { BlogModule } from '../blog/blog.module';

@Module({
  imports: [
    DatabaseModule,
    BlogModule,
    BullModule.registerQueue({ name: AI_BLOG_QUEUE }),
  ],
  controllers: [AiBlogController],
  providers: [AiBlogService, AiBlogRepository],
})
export class AiBlogModule {}
