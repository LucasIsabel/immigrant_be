import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeminiBaseService } from './gemini-base.service';

@Module({
  imports: [ConfigModule],
  providers: [GeminiBaseService],
  exports: [GeminiBaseService],
})
export class AiModule {}
