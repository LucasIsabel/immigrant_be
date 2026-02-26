import { Module } from '@nestjs/common';
import { StorageModule as StorageLibModule } from '@app/storage';
import { AdminStorageController } from './admin-storage.controller';
import { StorageController } from './storage.controller';

@Module({
  imports: [StorageLibModule],
  controllers: [StorageController, AdminStorageController],
})
export class StorageModule {}
