import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/config';
import { UserModule } from './users/user.module';
import { SystemModule } from './system/system.module';
import { CountryModule } from './countries/country.module';
@Module({
  imports: [AppConfigModule, UserModule, SystemModule, CountryModule],
})
export class AppModule {}
