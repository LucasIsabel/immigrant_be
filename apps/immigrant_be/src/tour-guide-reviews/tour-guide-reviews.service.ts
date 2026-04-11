import { ConflictException, Injectable } from '@nestjs/common';
import { TourGuideReviewsRepository } from './tour-guide-reviews.repository';
import type { CreateTourGuideReviewDto } from './dto/create-tour-guide-review.dto';
import type { TourGuideReviewsListDto } from './dto/tour-guide-review-response.dto';

@Injectable()
export class TourGuideReviewsService {
  constructor(private readonly repository: TourGuideReviewsRepository) {}

  async listReviews(businessId: string): Promise<TourGuideReviewsListDto> {
    const [reviews, stats] = await Promise.all([
      this.repository.findByBusinessId(businessId),
      this.repository.getStats(businessId),
    ]);
    return {
      reviews,
      averageRating: Math.round(stats.average * 10) / 10,
      totalCount: stats.total,
    };
  }

  async createReview(
    businessId: string,
    userId: string,
    dto: CreateTourGuideReviewDto,
  ) {
    const existing = await this.repository.findByBusinessIdAndUserId(
      businessId,
      userId,
    );
    if (existing) {
      throw new ConflictException('Você já avaliou este guia.');
    }
    return this.repository.create(businessId, userId, dto);
  }
}
