import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import type { CreateTourGuideReviewDto } from './dto/create-tour-guide-review.dto';
import {
  AdminReviewVisibility,
  type ListAdminTourGuideReviewsQueryDto,
} from './dto/admin-tour-guide-review.dto';

/** The account is what names a review, so every read carries it. */
const WITH_AUTHOR = {
  user: { select: { name: true } },
} as const;

@Injectable()
export class TourGuideReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  /** Public list: a hidden review is gone from here and from the average. */
  async findByBusinessId(businessId: string) {
    return this.prisma.tourGuideReview.findMany({
      where: { businessId, hiddenAt: null },
      orderBy: { createdAt: 'desc' },
      include: WITH_AUTHOR,
    });
  }

  async findByBusinessIdAndUserId(businessId: string, userId: string) {
    return this.prisma.tourGuideReview.findUnique({
      where: { businessId_userId: { businessId, userId } },
    });
  }

  /**
   * Only the owner's id: enough to refuse a self-review without pulling the
   * business module in for a one-column read.
   */
  async findBusinessOwnerId(businessId: string): Promise<string | null> {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
      select: { userId: true },
    });
    return business?.userId ?? null;
  }

  async create(
    businessId: string,
    userId: string,
    dto: CreateTourGuideReviewDto,
  ) {
    return this.prisma.tourGuideReview.create({
      // `authorName` is deliberately not written: the account names the review.
      data: {
        businessId,
        userId,
        rating: dto.rating,
        comment: dto.comment ?? null,
      },
      include: WITH_AUTHOR,
    });
  }

  async getStats(
    businessId: string,
  ): Promise<{ average: number; total: number }> {
    const result = await this.prisma.tourGuideReview.aggregate({
      where: { businessId, hiddenAt: null },
      _avg: { rating: true },
      _count: { id: true },
    });
    return {
      average: result._avg.rating ?? 0,
      total: result._count.id,
    };
  }

  async findIdById(reviewId: string): Promise<{ id: string } | null> {
    return this.prisma.tourGuideReview.findUnique({
      where: { id: reviewId },
      select: { id: true },
    });
  }

  async createReport(reviewId: string, reason: string) {
    return this.prisma.tourGuideReviewReport.create({
      data: { reviewId, reason },
    });
  }

  // ── Admin ──────────────────────────────────────────────────────────

  async listForAdmin(query: ListAdminTourGuideReviewsQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const where = {
      ...(query.businessId ? { businessId: query.businessId } : {}),
      ...(query.visibility === AdminReviewVisibility.VISIBLE
        ? { hiddenAt: null }
        : {}),
      ...(query.visibility === AdminReviewVisibility.HIDDEN
        ? { hiddenAt: { not: null } }
        : {}),
      ...(query.reported ? { reports: { some: {} } } : {}),
    };

    const [rows, total] = await Promise.all([
      this.prisma.tourGuideReview.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: { select: { name: true, email: true } },
          business: { select: { name: true } },
          _count: { select: { reports: true } },
        },
      }),
      this.prisma.tourGuideReview.count({ where }),
    ]);

    return { rows, total, page, limit };
  }

  async findByIdForAdmin(reviewId: string) {
    return this.prisma.tourGuideReview.findUnique({
      where: { id: reviewId },
      include: {
        user: { select: { name: true, email: true } },
        business: { select: { name: true } },
        _count: { select: { reports: true } },
        reports: {
          orderBy: { createdAt: 'desc' },
          select: { id: true, reason: true, createdAt: true },
        },
      },
    });
  }

  async setHidden(
    reviewId: string,
    hidden: { at: Date; byId: string; reason: string } | null,
  ) {
    return this.prisma.tourGuideReview.update({
      where: { id: reviewId },
      data: {
        hiddenAt: hidden?.at ?? null,
        hiddenById: hidden?.byId ?? null,
        hiddenReason: hidden?.reason ?? null,
      },
      include: {
        user: { select: { name: true, email: true } },
        business: { select: { name: true } },
        _count: { select: { reports: true } },
      },
    });
  }

  async delete(reviewId: string) {
    await this.prisma.tourGuideReview.delete({ where: { id: reviewId } });
  }
}
