import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { AppConfigModule } from '@app/config';
import { env } from '@app/config/env';
import { buildPinoOptions } from '@app/config/logger';
import { AppBullBoardModule } from './bull-board/bull-board.module';
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
import { AiConfigModule } from './ai-config/ai-config.module';
import { AiImageModule } from './ai-image/ai-image.module';
import { StorageModule } from './storage/storage.module';
import { ProfessionalProfileModule } from './professional-profile/professional-profile.module';
import { BusinessModule } from './business/business.module';
import { PlacesModule } from './places/places.module';
import { EventInterestModule } from './event-interest/event-interest.module';
import { BusinessPagesModule } from './business-pages/business-pages.module';
import { TourGuideReviewsModule } from './tour-guide-reviews/tour-guide-reviews.module';
import { CountriesNowModule } from './countriesnow/countriesnow.module';
import { QueuesModule } from './queues/queues.module';
import { BlogPersonasModule } from './blog-personas/blog-personas.module';

/**
 * In production the queue dashboard is only mounted once credentials exist, so
 * a missing configuration cannot leave it exposed. Everywhere else it is always
 * available.
 */
const bullBoardEnabled =
  env.NODE_ENV !== 'production' ||
  Boolean(env.BULL_BOARD_USER && env.BULL_BOARD_PASSWORD);

@Module({
  imports: [
    AppConfigModule,
    LoggerModule.forRoot(buildPinoOptions('immigrant_be')),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    ...(bullBoardEnabled ? [AppBullBoardModule] : []),
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
    AiConfigModule,
    AiImageModule,
    StorageModule,
    ProfessionalProfileModule,
    BusinessModule,
    PlacesModule,
    EventInterestModule,
    BusinessPagesModule,
    TourGuideReviewsModule,
    CountriesNowModule,
    QueuesModule,
    BlogPersonasModule,
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
