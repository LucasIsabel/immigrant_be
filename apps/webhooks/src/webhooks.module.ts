import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class WebhooksModule {}
