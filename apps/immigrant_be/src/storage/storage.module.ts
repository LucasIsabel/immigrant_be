import { Module } from '@nestjs/common';
import { StorageModule as StorageLibModule } from '@app/storage';
import { StorageController } from './storage.controller';

@Module({
  imports: [StorageLibModule],
  controllers: [StorageController],
})
export class StorageModule {}
