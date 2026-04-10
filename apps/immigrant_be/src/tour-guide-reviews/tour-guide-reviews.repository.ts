import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import type { CreateTourGuideReviewDto } from './dto/create-tour-guide-review.dto';

@Injectable()
export class TourGuideReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByBusinessId(businessId: string) {
    return this.prisma.tourGuideReview.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByBusinessIdAndUserId(businessId: string, userId: string) {
    return this.prisma.tourGuideReview.findUnique({
      where: { businessId_userId: { businessId, userId } },
    });
  }

  async create(
    businessId: string,
    userId: string,
    dto: CreateTourGuideReviewDto,
  ) {
    return this.prisma.tourGuideReview.create({
      data: {
        businessId,
        userId,
        rating: dto.rating,
        comment: dto.comment ?? null,
        authorName: dto.authorName,
      },
    });
  }

  async getStats(
    businessId: string,
  ): Promise<{ average: number; total: number }> {
    const result = await this.prisma.tourGuideReview.aggregate({
      where: { businessId },
      _avg: { rating: true },
      _count: { id: true },
    });
    return {
      average: result._avg.rating ?? 0,
      total: result._count.id,
    };
  }
}
