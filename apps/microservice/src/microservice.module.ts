import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { AiBlogWorkerModule } from './ai-blog/ai-blog.module';
import { AiImageWorkerModule } from './ai-image/ai-image.module';
import { BlogTranslationWorkerModule } from './blog-translation/blog-translation.module';

@Module({
  imports: [
    DatabaseModule,
    EventsModule,
    AiBlogWorkerModule,
    AiImageWorkerModule,
    BlogTranslationWorkerModule,
  ],
})
export class MicroserviceModule {}
