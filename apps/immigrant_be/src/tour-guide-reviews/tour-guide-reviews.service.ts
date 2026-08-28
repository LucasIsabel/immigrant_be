import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TourGuideReviewsRepository } from './tour-guide-reviews.repository';
import type { CreateTourGuideReviewDto } from './dto/create-tour-guide-review.dto';
import type {
  TourGuideReviewDto,
  TourGuideReviewsListDto,
} from './dto/tour-guide-review-response.dto';
import type {
  ReportTourGuideReviewDto,
  ReportTourGuideReviewResponseDto,
} from './dto/report-tour-guide-review.dto';
import type {
  AdminTourGuideReviewDetailDto,
  AdminTourGuideReviewDto,
  DeleteTourGuideReviewDto,
  HideTourGuideReviewDto,
  ListAdminTourGuideReviewsQueryDto,
  PaginatedAdminTourGuideReviewsResponseDto,
} from './dto/admin-tour-guide-review.dto';

/** Shown when a profile carries no usable name. */
const FALLBACK_AUTHOR_NAME = 'Usuário';

type ReviewWithAuthor = {
  id: string;
  businessId: string;
  userId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user?: { name?: string | null } | null;
};

@Injectable()
export class TourGuideReviewsService {
  private readonly logger = new Logger(TourGuideReviewsService.name);

  constructor(private readonly repository: TourGuideReviewsRepository) {}

  /**
   * The name comes from the account, not from the payload. The old field was
   * typed by whoever wrote the review, so it could carry anyone's name —
   * reading it from the relation also repairs the rows already stored.
   */
  private toPublicDto(review: ReviewWithAuthor): TourGuideReviewDto {
    return {
      id: review.id,
      businessId: review.businessId,
      userId: review.userId,
      rating: review.rating,
      comment: review.comment,
      authorName: review.user?.name?.trim() || FALLBACK_AUTHOR_NAME,
      createdAt: review.createdAt,
    };
  }

  async listReviews(businessId: string): Promise<TourGuideReviewsListDto> {
    const [reviews, stats] = await Promise.all([
      this.repository.findByBusinessId(businessId),
      this.repository.getStats(businessId),
    ]);
    return {
      reviews: reviews.map((review) => this.toPublicDto(review)),
      averageRating: Math.round(stats.average * 10) / 10,
      totalCount: stats.total,
    };
  }

  async createReview(
    businessId: string,
    userId: string,
    dto: CreateTourGuideReviewDto,
  ): Promise<TourGuideReviewDto> {
    const ownerId = await this.repository.findBusinessOwnerId(businessId);
    if (!ownerId) {
      throw new NotFoundException('Guia turístico não encontrado.');
    }
    if (ownerId === userId) {
      throw new ForbiddenException(
        'Você não pode avaliar o seu próprio negócio.',
      );
    }

    const existing = await this.repository.findByBusinessIdAndUserId(
      businessId,
      userId,
    );
    if (existing) {
      throw new ConflictException('Você já avaliou este guia.');
    }

    const created = await this.repository.create(businessId, userId, dto);
    return this.toPublicDto(created);
  }

  /**
   * Anonymous on purpose, like the community event report: the reader of a
   * guide's page is not logged in, and asking them to sign up before they can
   * flag defamation is how the flag never arrives.
   */
  async report(
    reviewId: string,
    dto: ReportTourGuideReviewDto,
  ): Promise<ReportTourGuideReviewResponseDto> {
    if (dto.website) {
      return { received: true };
    }

    const review = await this.repository.findIdById(reviewId);
    if (!review) {
      throw new NotFoundException('Avaliação não encontrada.');
    }

    await this.repository.createReport(review.id, dto.reason);
    return { received: true };
  }

  // ── Admin ──────────────────────────────────────────────────────────

  private toAdminDto(row: {
    id: string;
    businessId: string;
    userId: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    hiddenAt: Date | null;
    hiddenReason: string | null;
    user?: { name?: string | null; email?: string | null } | null;
    business?: { name?: string | null } | null;
    _count?: { reports: number };
  }): AdminTourGuideReviewDto {
    return {
      id: row.id,
      businessId: row.businessId,
      businessName: row.business?.name ?? '',
      userId: row.userId,
      authorName: row.user?.name?.trim() || FALLBACK_AUTHOR_NAME,
      authorEmail: row.user?.email ?? '',
      rating: row.rating,
      comment: row.comment,
      createdAt: row.createdAt,
      hiddenAt: row.hiddenAt,
      hiddenReason: row.hiddenReason,
      reportCount: row._count?.reports ?? 0,
    };
  }

  async listForAdmin(
    query: ListAdminTourGuideReviewsQueryDto,
  ): Promise<PaginatedAdminTourGuideReviewsResponseDto> {
    const { rows, total, page, limit } =
      await this.repository.listForAdmin(query);
    return {
      data: rows.map((row) => this.toAdminDto(row)),
      total,
      page,
      limit,
    };
  }

  async getForAdmin(reviewId: string): Promise<AdminTourGuideReviewDetailDto> {
    const row = await this.repository.findByIdForAdmin(reviewId);
    if (!row) {
      throw new NotFoundException('Avaliação não encontrada.');
    }
    return { ...this.toAdminDto(row), reports: row.reports };
  }

  async hide(
    reviewId: string,
    adminId: string,
    dto: HideTourGuideReviewDto,
  ): Promise<AdminTourGuideReviewDto> {
    const row = await this.repository.findByIdForAdmin(reviewId);
    if (!row) {
      throw new NotFoundException('Avaliação não encontrada.');
    }
    if (row.hiddenAt) {
      throw new ConflictException('Avaliação já está oculta.');
    }

    const updated = await this.repository.setHidden(reviewId, {
      at: new Date(),
      byId: adminId,
      reason: dto.reason,
    });
    return this.toAdminDto(updated);
  }

  async unhide(reviewId: string): Promise<AdminTourGuideReviewDto> {
    const row = await this.repository.findByIdForAdmin(reviewId);
    if (!row) {
      throw new NotFoundException('Avaliação não encontrada.');
    }
    if (!row.hiddenAt) {
      throw new ConflictException('Avaliação não está oculta.');
    }

    const updated = await this.repository.setHidden(reviewId, null);
    return this.toAdminDto(updated);
  }

  /**
   * Hiding is the ordinary tool; this one is for content that cannot stay in
   * the database at all. It is irreversible, so the reason is logged with the
   * admin's id before the row goes.
   */
  async remove(
    reviewId: string,
    adminId: string,
    dto: DeleteTourGuideReviewDto,
  ): Promise<void> {
    const row = await this.repository.findIdById(reviewId);
    if (!row) {
      throw new NotFoundException('Avaliação não encontrada.');
    }

    this.logger.warn(
      `Tour guide review ${reviewId} deleted by admin ${adminId}: ${dto.reason}`,
    );
    await this.repository.delete(reviewId);
  }
}
