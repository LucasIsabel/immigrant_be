import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/config';
import { UserModule } from './users/user.module';
import { SystemModule } from './system/system.module';
import { CountryModule } from './countries/country.module';
import { DatabaseModule } from '@app/database';
import { BullMQConfigModule } from '@app/config/bull.module';
@Module({
  imports: [
    AppConfigModule,
    UserModule,
    SystemModule,
    CountryModule,
    DatabaseModule,
    BullMQConfigModule,
  ],
})
export class AppModule {}
