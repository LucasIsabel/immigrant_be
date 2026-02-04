import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/config';
import { UserModule } from './users/user.module';
import { SystemModule } from './system/system.module';
import { CountryModule } from './countries/country.module';
import { DatabaseModule } from '@app/database';
import { BullMQConfigModule } from '@app/config/bull.module';
import { VisaStepsModule } from './visa-steps/visa-steps.module';
import { ImmigrationVisaTypeModule } from './immigration-visa-type/immigration-visa-type.module';
@Module({
  imports: [
    AppConfigModule,
    UserModule,
    SystemModule,
    CountryModule,
    VisaStepsModule,
    ImmigrationVisaTypeModule,
    DatabaseModule,
    BullMQConfigModule,
  ],
})
export class AppModule {}
