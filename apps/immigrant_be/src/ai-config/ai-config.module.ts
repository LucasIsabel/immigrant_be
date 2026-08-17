import { AiModule } from '@app/ai';
import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { AiConfigController } from './ai-config.controller';
import { AiConfigRepository } from './ai-config.repository';
import { AiConfigService } from './ai-config.service';

@Module({
  imports: [AiModule, DatabaseModule],
  controllers: [AiConfigController],
  providers: [AiConfigService, AiConfigRepository],
})
export class AiConfigModule {}
