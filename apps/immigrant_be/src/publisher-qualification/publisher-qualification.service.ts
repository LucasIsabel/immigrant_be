// apps/immigrant_be/src/publisher-qualification/publisher-qualification.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { buildApprovalEmail } from '@app/email';
import { NotificationsService } from '@app/notifications/notifications.service';
import { USER_NOTIFICATION_TYPES } from '@app/notifications/notification-types';
import { env } from '@app/config';
import { PublisherQualificationRepository } from './publisher-qualification.repository';
import { ApplyOverrideDto } from './dto/apply-override.dto';

export interface AdminPublisherView {
  businessId: string;
  businessName: string;
  slug: string;
  isQualified: boolean;
  overrideActive: boolean;
  overrideValue?: boolean;
  overrideReason?: string;
  overrideAt?: string;
  criteria: {
    approvalsCount: number;
    approvalsRequired: number;
    emailVerified: boolean;
    accountAgeDays: number;
    accountAgeRequired: number;
    daysSinceLastRejection: number | null;
    rejectionFreeDaysRequired: number;
    profileComplete: boolean;
  };
}

type QualWithBusiness = NonNullable<
  Awaited<
    ReturnType<PublisherQualificationRepository['findWithBusinessAndUser']>
  >
>;

@Injectable()
export class PublisherQualificationService {
  private readonly logger = new Logger(PublisherQualificationService.name);

  constructor(
    private readonly repository: PublisherQualificationRepository,
    private readonly notifications: NotificationsService,
  ) {}

  async onPageApproved(businessPageId: string): Promise<void> {
    const ref = await this.repository.findPageBusinessId(businessPageId);
    if (!ref) return;

    const { businessId } = ref;
    let qual = await this.repository.findWithBusinessAndUser(businessId);
    if (!qual) qual = await this.repository.create(businessId);

    const newTotalApprovals = qual.totalApprovals + 1;
    const wasQualified = qual.isQualified;
    const nowQualified = this.evaluateCriteria({
      ...qual,
      totalApprovals: newTotalApprovals,
    });

    const updates: Record<string, unknown> = {
      totalApprovals: newTotalApprovals,
    };

    if (!wasQualified && nowQualified) {
      updates.isQualified = true;
      updates.qualifiedAt = new Date();
      updates.disqualifiedAt = null;
    } else if (wasQualified && !nowQualified) {
      updates.isQualified = false;
      updates.disqualifiedAt = new Date();
    }

    await this.repository.update(businessId, updates);

    if (!wasQualified && nowQualified && qual.business.businessPage) {
      await this.autoApprovePendingPage(
        qual.business.businessPage.id,
        qual.business.businessPage,
      );
    }
  }

  async onPageRejected(businessPageId: string): Promise<void> {
    const ref = await this.repository.findPageBusinessId(businessPageId);
    if (!ref) return;

    const { businessId } = ref;
    let qual = await this.repository.findWithBusinessAndUser(businessId);
    if (!qual) qual = await this.repository.create(businessId);

    const wasQualified = qual.isQualified;
    const updatedQual = { ...qual, lastRejectionAt: new Date() };
    const nowQualified = this.evaluateCriteria(updatedQual);

    const updates: Record<string, unknown> = { lastRejectionAt: new Date() };

    if (wasQualified && !nowQualified) {
      updates.isQualified = false;
      updates.disqualifiedAt = new Date();
    }

    await this.repository.update(businessId, updates);
  }

  async isQualified(businessPageId: string): Promise<boolean> {
    const ref = await this.repository.findPageBusinessId(businessPageId);
    if (!ref) return false;
    const qual = await this.repository.findByBusinessId(ref.businessId);
    return qual?.isQualified ?? false;
  }

  async applyOverride(
    businessId: string,
    adminId: string,
    dto: ApplyOverrideDto,
  ): Promise<AdminPublisherView> {
    let qual = await this.repository.findWithBusinessAndUser(businessId);
    if (!qual) qual = await this.repository.create(businessId);
    if (!qual) throw new NotFoundException('Publisher não encontrado');

    const wasQualified = qual.isQualified;

    const updated = await this.repository.update(businessId, {
      overrideActive: true,
      overrideValue: dto.value,
      overrideById: adminId,
      overrideReason: dto.reason,
      overrideAt: new Date(),
      isQualified: dto.value,
      ...(dto.value && !wasQualified
        ? { qualifiedAt: new Date(), disqualifiedAt: null }
        : {}),
      ...(!dto.value && wasQualified ? { disqualifiedAt: new Date() } : {}),
    });

    if (!wasQualified && dto.value && qual.business.businessPage) {
      await this.autoApprovePendingPage(
        qual.business.businessPage.id,
        qual.business.businessPage,
      );
    }

    return this.buildView(updated);
  }

  async removeOverride(businessId: string): Promise<AdminPublisherView> {
    const qual = await this.repository.findWithBusinessAndUser(businessId);
    if (!qual) throw new NotFoundException('Publisher não encontrado');

    const nowQualified = this.evaluateCriteria({
      ...qual,
      overrideActive: false,
    });

    const updated = await this.repository.update(businessId, {
      overrideActive: false,
      overrideValue: null,
      overrideById: null,
      overrideReason: null,
      overrideAt: null,
      isQualified: nowQualified,
      ...(nowQualified && !qual.isQualified
        ? { qualifiedAt: new Date(), disqualifiedAt: null }
        : {}),
      ...(!nowQualified && qual.isQualified
        ? { disqualifiedAt: new Date() }
        : {}),
    });

    return this.buildView(updated);
  }

  async listAll(): Promise<AdminPublisherView[]> {
    const records = await this.repository.findAll();
    return records.map((r) => this.buildView(r));
  }

  async findOne(businessId: string): Promise<AdminPublisherView> {
    const qual = await this.repository.findWithBusinessAndUser(businessId);
    if (!qual) throw new NotFoundException('Publisher não encontrado');
    return this.buildView(qual);
  }

  private evaluateCriteria(
    qual: QualWithBusiness & {
      totalApprovals: number;
      overrideActive: boolean;
      overrideValue?: boolean | null;
    },
  ): boolean {
    if (qual.overrideActive) return qual.overrideValue ?? false;

    const accountAgeDays = Math.floor(
      (Date.now() - qual.business.user.createdAt.getTime()) /
        (1000 * 60 * 60 * 24),
    );
    const daysSinceRejection = qual.lastRejectionAt
      ? Math.floor(
          (Date.now() - qual.lastRejectionAt.getTime()) / (1000 * 60 * 60 * 24),
        )
      : null;

    return (
      qual.totalApprovals >= 3 &&
      qual.business.user.emailVerified &&
      accountAgeDays >= 30 &&
      (daysSinceRejection === null || daysSinceRejection >= 90) &&
      Boolean(qual.business.name && qual.business.city)
    );
  }

  private buildView(qual: QualWithBusiness): AdminPublisherView {
    const accountAgeDays = Math.floor(
      (Date.now() - qual.business.user.createdAt.getTime()) /
        (1000 * 60 * 60 * 24),
    );
    const daysSinceLastRejection = qual.lastRejectionAt
      ? Math.floor(
          (Date.now() - qual.lastRejectionAt.getTime()) / (1000 * 60 * 60 * 24),
        )
      : null;

    return {
      businessId: qual.businessId,
      businessName: qual.business.name,
      slug: qual.business.businessPage?.slug ?? '',
      isQualified: qual.isQualified,
      overrideActive: qual.overrideActive,
      overrideValue: qual.overrideValue ?? undefined,
      overrideReason: qual.overrideReason ?? undefined,
      overrideAt: qual.overrideAt?.toISOString(),
      criteria: {
        approvalsCount: qual.totalApprovals,
        approvalsRequired: 3,
        emailVerified: qual.business.user.emailVerified,
        accountAgeDays,
        accountAgeRequired: 30,
        daysSinceLastRejection,
        rejectionFreeDaysRequired: 90,
        profileComplete: Boolean(qual.business.name && qual.business.city),
      },
    };
  }

  private async autoApprovePendingPage(
    businessPageId: string,
    page: { slug: string; businessType: string; status: string },
  ): Promise<void> {
    if (page.status !== 'PENDING_REVIEW') return;

    let approved: Awaited<
      ReturnType<typeof this.repository.approvePendingPage>
    >;
    try {
      approved = await this.repository.approvePendingPage(businessPageId);
    } catch (error) {
      this.logger.error(
        `Auto-approval failed for business page ${businessPageId}; it stays in PENDING_REVIEW for manual moderation`,
        error instanceof Error ? error.stack : undefined,
      );
      return;
    }
    if (!approved) return; // page was already processed (race condition)

    // The same type a manual approval emits: to the person receiving it,
    // automatic and manual approval are the same news, and a second type would
    // only mean two sentences to translate for one event.
    await this.notifications.notify({
      userId: approved.business.userId,
      type: USER_NOTIFICATION_TYPES.BUSINESS_PAGE_APPROVED,
      payload: {
        businessId: approved.businessId,
        businessName: approved.business.name,
        businessType: page.businessType,
        slug: page.slug,
      },
      email: buildApprovalEmail(
        approved.business.name,
        `${env.FRONTEND_URL}/pg/${page.businessType}/${page.slug}`,
      ),
    });
  }
}
