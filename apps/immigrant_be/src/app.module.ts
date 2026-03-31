import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppConfigModule } from '@app/config';
import { UserModule } from './users/user.module';
import { SystemModule } from './system/system.module';
import { CountryModule } from './countries/country.module';
import { DatabaseModule } from '@app/database';
import { BullMQConfigModule } from '@app/config/bull.module';
import { EmailModule } from '@app/email';
import { VisaStepsModule } from './visa-steps/visa-steps.module';
import { ImmigrationVisaTypeModule } from './immigration-visa-type/immigration-visa-type.module';
import { RolesGuard } from './common/guards/roles.guard';
import { HealthModule } from './health/health.module';
import { RoleModule } from './roles/role.module';
import { BlogModule } from './blog/blog.module';
import { AiBlogModule } from './ai-blog/ai-blog.module';
import { AiImageModule } from './ai-image/ai-image.module';
import { StorageModule } from './storage/storage.module';
import { ProfessionalProfileModule } from './professional-profile/professional-profile.module';
import { BusinessModule } from './business/business.module';
import { BusinessPagesModule } from './business-pages/business-pages.module';
import { CountriesNowModule } from './countriesnow/countriesnow.module';

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
    EmailModule,
    HealthModule,
    RoleModule,
    BlogModule,
    AiBlogModule,
    AiImageModule,
    StorageModule,
    ProfessionalProfileModule,
    BusinessModule,
    BusinessPagesModule,
    CountriesNowModule,
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
