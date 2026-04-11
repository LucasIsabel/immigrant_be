import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { TourGuideReviewsController } from './tour-guide-reviews.controller';
import { TourGuideReviewsService } from './tour-guide-reviews.service';
import { TourGuideReviewsRepository } from './tour-guide-reviews.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [TourGuideReviewsController],
  providers: [TourGuideReviewsService, TourGuideReviewsRepository],
  exports: [TourGuideReviewsService],
})
export class TourGuideReviewsModule {}
