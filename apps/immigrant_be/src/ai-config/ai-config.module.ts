import { AiModule } from '@app/ai';
import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { AiConfigController } from './ai-config.controller';
import { AiConfigRepository } from './ai-config.repository';
import { AiConfigService } from './ai-config.service';
import { AiUsageController } from './ai-usage.controller';

@Module({
  imports: [AiModule, DatabaseModule],
  controllers: [AiConfigController, AiUsageController],
  providers: [AiConfigService, AiConfigRepository],
})
export class AiConfigModule {}
