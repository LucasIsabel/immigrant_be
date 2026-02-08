import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppConfigModule } from '@app/config';
import { UserModule } from './users/user.module';
import { SystemModule } from './system/system.module';
import { CountryModule } from './countries/country.module';
import { DatabaseModule } from '@app/database';
import { BullMQConfigModule } from '@app/config/bull.module';
import { VisaStepsModule } from './visa-steps/visa-steps.module';
import { ImmigrationVisaTypeModule } from './immigration-visa-type/immigration-visa-type.module';
import { RolesGuard } from './common/guards/roles.guard';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    AppConfigModule,
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    UserModule,
    SystemModule,
    CountryModule,
    VisaStepsModule,
    ImmigrationVisaTypeModule,
    DatabaseModule,
    BullMQConfigModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
