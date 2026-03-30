# Business Pages Phase 4 — Publisher Qualification

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add automatic publisher qualification (publishers with a good track record bypass manual moderation), admin override panel, and `submitForReview` short-circuit for qualified publishers.

**Architecture:** New `PublisherQualificationModule` (service + repository + admin controller) that hooks into `BusinessPagesService` after every approval/rejection. Qualification is stored in the existing `publisher_qualifications` table (keyed by `businessId`). Admin endpoints live at `/admin/publishers/:businessId`. Frontend adds an admin table at `/admin/publishers` showing qualification status and override controls.

**Tech Stack:** NestJS, Prisma 6, Postgres, React Query v5, shadcn/ui (Badge, Button, Dialog, Textarea, Switch)

**Worktrees:**
- BE: create branch `feature/visibility-phase4` from `main`
- FE: create branch `feat/visibility-phase4` from `main`

---

## File Map

**BE — Create:**
- `apps/immigrant_be/src/publisher-qualification/publisher-qualification.repository.ts`
- `apps/immigrant_be/src/publisher-qualification/publisher-qualification.service.ts`
- `apps/immigrant_be/src/publisher-qualification/publisher-qualification.service.spec.ts`
- `apps/immigrant_be/src/publisher-qualification/publishers-admin.controller.ts`
- `apps/immigrant_be/src/publisher-qualification/publisher-qualification.module.ts`
- `apps/immigrant_be/src/publisher-qualification/dto/apply-override.dto.ts`

**BE — Modify:**
- `prisma/schema.prisma` — add override fields to `PublisherQualification`
- `apps/immigrant_be/src/business-pages/business-pages.service.ts` — inject `PublisherQualificationService`, update `submitForReview`, `approveBusinessPage`, `rejectBusinessPage`
- `apps/immigrant_be/src/business-pages/business-pages.module.ts` — import `PublisherQualificationModule`
- `apps/immigrant_be/src/business-pages/dto/submit-business-page-response.dto.ts` — add `'approved'` modal variant
- `apps/immigrant_be/src/business-pages/business-pages.service.spec.ts` — add qualification integration tests

**FE — Create:**
- `lib/admin/publishers-api.ts`
- `hooks/admin/useAdminPublishers.ts`
- `hooks/admin/usePublisherOverride.ts`
- `components/admin/publishers/OverridePublisherModal.tsx`
- `components/admin/publishers/AdminPublishersTable.tsx`
- `app/(private)/dashboard/admin/publishers/page.tsx`

**FE — Modify:**
- `lib/business-pages/types.ts` — add `AdminPublisherView` type

---

## Task 1: Prisma schema migration

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add override fields to `PublisherQualification` model in schema**

Replace the existing `PublisherQualification` model block with:

```prisma
model PublisherQualification {
  businessId             String    @id @db.Uuid @map("business_id")
  business               Business  @relation(fields: [businessId], references: [id], onDelete: Cascade)
  isQualified            Boolean   @default(false) @map("is_qualified")
  qualifiedAt            DateTime? @map("qualified_at")
  totalApprovals         Int       @default(0) @map("total_approvals")
  lastRejectionAt        DateTime? @map("last_rejection_at")
  disqualifiedAt         DateTime? @map("disqualified_at")
  disqualificationReason String?   @db.Text @map("disqualification_reason")

  // Manual override by admin
  overrideActive  Boolean   @default(false) @map("override_active")
  overrideValue   Boolean?  @map("override_value")
  overrideById    String?   @db.Uuid @map("override_by")
  overrideBy      Users?    @relation("PublisherOverrides", fields: [overrideById], references: [id], onDelete: SetNull)
  overrideReason  String?   @db.Text @map("override_reason")
  overrideAt      DateTime? @map("override_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")

  @@map("publisher_qualifications")
}
```

Also add the back-relation to the `Users` model (after `businessPageReviews` line):

```prisma
  publisherQualificationOverrides PublisherQualification[] @relation("PublisherOverrides")
```

- [ ] **Step 2: Run migration**

```bash
pnpm exec prisma migrate dev --name add_publisher_qualification_overrides
```

Expected: migration applied, no errors.

- [ ] **Step 3: Regenerate Prisma client**

```bash
pnpm exec prisma generate
```

Expected: `Generated Prisma Client` success message.

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma prisma/migrations/
git commit -m "feat(db): add override fields to publisher_qualifications table"
```

---

## Task 2: Repository

**Files:**
- Create: `apps/immigrant_be/src/publisher-qualification/publisher-qualification.repository.ts`

- [ ] **Step 1: Create the repository**

```typescript
// apps/immigrant_be/src/publisher-qualification/publisher-qualification.repository.ts
import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../../generated/prisma';
import { PrismaService } from '@app/database';

@Injectable()
export class PublisherQualificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Gets businessId for a given businessPageId
  findPageBusinessId(businessPageId: string): Promise<{ businessId: string } | null> {
    return this.prisma.businessPage.findUnique({
      where: { id: businessPageId },
      select: { businessId: true },
    });
  }

  // Find qualification record with business + user for criteria evaluation
  findWithBusinessAndUser(businessId: string) {
    return this.prisma.publisherQualification.findUnique({
      where: { businessId },
      include: {
        business: {
          select: {
            name: true,
            city: true,
            businessPage: {
              select: { id: true, slug: true, businessType: true, status: true },
            },
            user: { select: { emailVerified: true, createdAt: true } },
          },
        },
      },
    });
  }

  // Find bare record by businessId
  findByBusinessId(businessId: string) {
    return this.prisma.publisherQualification.findUnique({
      where: { businessId },
    });
  }

  // Create new qualification record (first time)
  create(businessId: string) {
    return this.prisma.publisherQualification.create({
      data: { businessId },
      include: {
        business: {
          select: {
            name: true,
            city: true,
            businessPage: {
              select: { id: true, slug: true, businessType: true, status: true },
            },
            user: { select: { emailVerified: true, createdAt: true } },
          },
        },
      },
    });
  }

  // Update fields on an existing record
  update(businessId: string, data: Prisma.PublisherQualificationUpdateInput) {
    return this.prisma.publisherQualification.update({
      where: { businessId },
      data,
      include: {
        business: {
          select: {
            name: true,
            city: true,
            businessPage: {
              select: { id: true, slug: true, businessType: true, status: true },
            },
            user: { select: { emailVerified: true, createdAt: true } },
          },
        },
      },
    });
  }

  // List all records for admin table
  findAll() {
    return this.prisma.publisherQualification.findMany({
      include: {
        business: {
          select: {
            name: true,
            city: true,
            businessPage: {
              select: { id: true, slug: true, businessType: true, status: true },
            },
            user: { select: { emailVerified: true, createdAt: true } },
          },
        },
      },
      orderBy: { business: { name: 'asc' } },
    });
  }

  // Approve a pending page directly (used for auto-approval when publisher qualifies)
  // Returns the updated page with business + user data for sending the approval email
  approvePendingPage(businessPageId: string, approvedContent: object) {
    return this.prisma.businessPage.update({
      where: { id: businessPageId, status: 'PENDING_REVIEW' },
      data: {
        status: 'APPROVED',
        approvedContent,
        approvedAt: new Date(),
        pendingContent: Prisma.JsonNull,
      },
      include: {
        business: {
          select: {
            name: true,
            user: { select: { email: true } },
          },
        },
      },
    });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/immigrant_be/src/publisher-qualification/publisher-qualification.repository.ts
git commit -m "feat(publisher-qualification): add repository"
```

---

## Task 3: DTO

**Files:**
- Create: `apps/immigrant_be/src/publisher-qualification/dto/apply-override.dto.ts`

- [ ] **Step 1: Create ApplyOverrideDto**

```typescript
// apps/immigrant_be/src/publisher-qualification/dto/apply-override.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, MinLength } from 'class-validator';

export class ApplyOverrideDto {
  @ApiProperty({
    description: 'true = forçar qualificado, false = bloquear qualificação',
  })
  @IsBoolean()
  value: boolean;

  @ApiProperty({ description: 'Motivo do override (obrigatório, mínimo 10 caracteres)' })
  @IsString()
  @MinLength(10)
  reason: string;
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/immigrant_be/src/publisher-qualification/dto/apply-override.dto.ts
git commit -m "feat(publisher-qualification): add ApplyOverrideDto"
```

---

## Task 4: Service (TDD)

**Files:**
- Create: `apps/immigrant_be/src/publisher-qualification/publisher-qualification.service.spec.ts`
- Create: `apps/immigrant_be/src/publisher-qualification/publisher-qualification.service.ts`

- [ ] **Step 1: Write the failing spec**

```typescript
// apps/immigrant_be/src/publisher-qualification/publisher-qualification.service.spec.ts
jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('@app/config', () => ({
  env: { FRONTEND_URL: 'https://app.test' },
  ConfigModule: jest.fn(),
}));

jest.mock('@app/email', () => ({
  EmailService: jest.fn(),
  buildApprovalEmail: jest.fn().mockReturnValue({ subject: 's', html: 'h' }),
  EmailModule: jest.fn(),
}));

import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EmailService } from '@app/email';
import { PublisherQualificationService } from './publisher-qualification.service';
import { PublisherQualificationRepository } from './publisher-qualification.repository';

// ── Fixtures ─────────────────────────────────────────────────────────────────

const NOW = new Date('2026-03-30T12:00:00Z');
const THIRTY_ONE_DAYS_AGO = new Date(NOW.getTime() - 31 * 24 * 60 * 60 * 1000);
const NINETY_ONE_DAYS_AGO = new Date(NOW.getTime() - 91 * 24 * 60 * 60 * 1000);
const TWENTY_NINE_DAYS_AGO = new Date(NOW.getTime() - 29 * 24 * 60 * 60 * 1000);

const mockBusiness = {
  name: 'Padaria Central',
  city: 'Lisboa',
  businessPage: {
    id: 'page-1',
    slug: 'padaria-central',
    businessType: 'restaurante',
    status: 'APPROVED',
  },
  user: { emailVerified: true, createdAt: THIRTY_ONE_DAYS_AGO },
};

const baseQual = {
  businessId: 'biz-1',
  isQualified: false,
  qualifiedAt: null,
  totalApprovals: 0,
  lastRejectionAt: null,
  disqualifiedAt: null,
  disqualificationReason: null,
  overrideActive: false,
  overrideValue: null,
  overrideById: null,
  overrideReason: null,
  overrideAt: null,
  updatedAt: NOW,
  business: mockBusiness,
};

const qualifiedQual = {
  ...baseQual,
  isQualified: true,
  qualifiedAt: NINETY_ONE_DAYS_AGO,
  totalApprovals: 3,
};

const mockRepo = {
  findPageBusinessId: jest.fn(),
  findWithBusinessAndUser: jest.fn(),
  findByBusinessId: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
  approvePendingPage: jest.fn(),
};

const mockEmail = {
  send: jest.fn(),
};

// ── Test suite ────────────────────────────────────────────────────────────────

describe('PublisherQualificationService', () => {
  let service: PublisherQualificationService;

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(NOW);
    const module = await Test.createTestingModule({
      providers: [
        PublisherQualificationService,
        { provide: PublisherQualificationRepository, useValue: mockRepo },
        { provide: EmailService, useValue: mockEmail },
      ],
    }).compile();
    service = module.get(PublisherQualificationService);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // ── onPageApproved ──────────────────────────────────────────────────────────

  describe('onPageApproved', () => {
    it('creates record if not yet exists and increments totalApprovals', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(null);
      mockRepo.create.mockResolvedValue({ ...baseQual });
      mockRepo.update.mockResolvedValue({ ...baseQual, totalApprovals: 1 });

      await service.onPageApproved('page-1');

      expect(mockRepo.create).toHaveBeenCalledWith('biz-1');
      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({ totalApprovals: 1 }),
      );
    });

    it('increments totalApprovals on existing record', async () => {
      const existing = { ...baseQual, totalApprovals: 2 };
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(existing);
      mockRepo.update.mockResolvedValue({ ...existing, totalApprovals: 3, isQualified: true });

      await service.onPageApproved('page-1');

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({ totalApprovals: 3 }),
      );
    });

    it('qualifies publisher when all criteria met (3rd approval)', async () => {
      const existing = { ...baseQual, totalApprovals: 2 };
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(existing);
      mockRepo.update.mockResolvedValue({ ...existing, isQualified: true });
      mockRepo.approvePendingPage.mockResolvedValue(null);

      await service.onPageApproved('page-1');

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({ isQualified: true, qualifiedAt: NOW }),
      );
    });

    it('does NOT qualify when account is too young (< 30 days)', async () => {
      const youngUser = {
        ...mockBusiness,
        user: { emailVerified: true, createdAt: TWENTY_NINE_DAYS_AGO },
      };
      const existing = { ...baseQual, totalApprovals: 2, business: youngUser };
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(existing);
      mockRepo.update.mockResolvedValue(existing);

      await service.onPageApproved('page-1');

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.not.objectContaining({ isQualified: true }),
      );
    });

    it('does nothing when businessPageId not found', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue(null);
      await service.onPageApproved('not-found');
      expect(mockRepo.update).not.toHaveBeenCalled();
    });
  });

  // ── onPageRejected ──────────────────────────────────────────────────────────

  describe('onPageRejected', () => {
    it('updates lastRejectionAt', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(baseQual);
      mockRepo.update.mockResolvedValue({ ...baseQual, lastRejectionAt: NOW });

      await service.onPageRejected('page-1');

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({ lastRejectionAt: NOW }),
      );
    });

    it('creates record if not yet exists', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(null);
      mockRepo.create.mockResolvedValue({ ...baseQual });
      mockRepo.update.mockResolvedValue({ ...baseQual, lastRejectionAt: NOW });

      await service.onPageRejected('page-1');

      expect(mockRepo.create).toHaveBeenCalledWith('biz-1');
    });

    it('disqualifies a previously qualified publisher', async () => {
      const qual = { ...qualifiedQual };
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(qual);
      mockRepo.update.mockResolvedValue({ ...qual, isQualified: false });

      await service.onPageRejected('page-1');

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({ isQualified: false, disqualifiedAt: NOW }),
      );
    });

    it('does nothing when businessPageId not found', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue(null);
      await service.onPageRejected('not-found');
      expect(mockRepo.update).not.toHaveBeenCalled();
    });
  });

  // ── isQualified ─────────────────────────────────────────────────────────────

  describe('isQualified', () => {
    it('returns true when qualified record exists', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findByBusinessId.mockResolvedValue({ ...qualifiedQual });
      const result = await service.isQualified('page-1');
      expect(result).toBe(true);
    });

    it('returns false when no record exists', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findByBusinessId.mockResolvedValue(null);
      const result = await service.isQualified('page-1');
      expect(result).toBe(false);
    });

    it('returns false when record is not qualified', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findByBusinessId.mockResolvedValue({ ...baseQual });
      const result = await service.isQualified('page-1');
      expect(result).toBe(false);
    });

    it('returns false when businessPageId not found', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue(null);
      const result = await service.isQualified('page-1');
      expect(result).toBe(false);
    });
  });

  // ── applyOverride ───────────────────────────────────────────────────────────

  describe('applyOverride', () => {
    it('sets override and qualifies publisher when value=true', async () => {
      mockRepo.findWithBusinessAndUser.mockResolvedValue(baseQual);
      mockRepo.update.mockResolvedValue({
        ...baseQual,
        overrideActive: true,
        overrideValue: true,
        isQualified: true,
      });
      mockRepo.approvePendingPage.mockResolvedValue(null);

      await service.applyOverride('biz-1', 'admin-1', { value: true, reason: 'Publisher confiável' });

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({
          overrideActive: true,
          overrideValue: true,
          overrideById: 'admin-1',
          overrideReason: 'Publisher confiável',
          overrideAt: NOW,
          isQualified: true,
        }),
      );
    });

    it('blocks publisher when value=false', async () => {
      mockRepo.findWithBusinessAndUser.mockResolvedValue(qualifiedQual);
      mockRepo.update.mockResolvedValue({
        ...qualifiedQual,
        overrideActive: true,
        overrideValue: false,
        isQualified: false,
      });

      await service.applyOverride('biz-1', 'admin-1', { value: false, reason: 'Conteúdo suspeito' });

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({
          isQualified: false,
          overrideValue: false,
        }),
      );
    });

    it('throws NotFoundException when businessId not found', async () => {
      mockRepo.findWithBusinessAndUser.mockResolvedValue(null);
      await expect(
        service.applyOverride('biz-1', 'admin-1', { value: true, reason: 'teste motivo ok' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ── removeOverride ──────────────────────────────────────────────────────────

  describe('removeOverride', () => {
    it('clears override and re-evaluates criteria', async () => {
      const overridden = {
        ...qualifiedQual,
        overrideActive: true,
        overrideValue: true,
        overrideById: 'admin-1',
        overrideReason: 'Force qualified',
        overrideAt: NOW,
        totalApprovals: 0, // would not qualify without override
      };
      mockRepo.findWithBusinessAndUser.mockResolvedValue(overridden);
      mockRepo.update.mockResolvedValue({
        ...overridden,
        overrideActive: false,
        overrideValue: null,
        overrideById: null,
        overrideReason: null,
        overrideAt: null,
        isQualified: false,
      });

      await service.removeOverride('biz-1');

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({
          overrideActive: false,
          overrideValue: null,
          overrideById: null,
          overrideReason: null,
          overrideAt: null,
          isQualified: false, // 0 approvals → not qualified
        }),
      );
    });

    it('throws NotFoundException when businessId not found', async () => {
      mockRepo.findWithBusinessAndUser.mockResolvedValue(null);
      await expect(service.removeOverride('biz-1')).rejects.toThrow(NotFoundException);
    });
  });

  // ── listAll ─────────────────────────────────────────────────────────────────

  describe('listAll', () => {
    it('returns mapped views for all records', async () => {
      mockRepo.findAll.mockResolvedValue([{ ...qualifiedQual }]);
      const result = await service.listAll();
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        businessId: 'biz-1',
        businessName: 'Padaria Central',
        isQualified: true,
        criteria: expect.objectContaining({ approvalsCount: 3, approvalsRequired: 3 }),
      });
    });
  });

  // ── findOne ─────────────────────────────────────────────────────────────────

  describe('findOne', () => {
    it('returns the view for a specific businessId', async () => {
      mockRepo.findWithBusinessAndUser.mockResolvedValue({ ...qualifiedQual });
      const result = await service.findOne('biz-1');
      expect(result.businessId).toBe('biz-1');
    });

    it('throws NotFoundException when not found', async () => {
      mockRepo.findWithBusinessAndUser.mockResolvedValue(null);
      await expect(service.findOne('biz-1')).rejects.toThrow(NotFoundException);
    });
  });
});
```

- [ ] **Step 2: Run the spec to confirm all tests fail**

```bash
pnpm test --testPathPattern=publisher-qualification --no-coverage
```

Expected: test suite fails to run (service not yet created).

- [ ] **Step 3: Create the service implementation**

```typescript
// apps/immigrant_be/src/publisher-qualification/publisher-qualification.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { EmailService, buildApprovalEmail } from '@app/email';
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
  Awaited<ReturnType<PublisherQualificationRepository['findWithBusinessAndUser']>>
>;

@Injectable()
export class PublisherQualificationService {
  constructor(
    private readonly repository: PublisherQualificationRepository,
    private readonly emailService: EmailService,
  ) {}

  // ── Called by BusinessPagesService ─────────────────────────────────────────

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

    const updates: Record<string, unknown> = { totalApprovals: newTotalApprovals };

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
      await this.autoApprovePendingPage(qual.business.businessPage.id, qual.business.businessPage);
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

  // ── Admin operations ────────────────────────────────────────────────────────

  async applyOverride(
    businessId: string,
    adminId: string,
    dto: ApplyOverrideDto,
  ): Promise<AdminPublisherView> {
    const qual = await this.repository.findWithBusinessAndUser(businessId);
    if (!qual) throw new NotFoundException('Publisher não encontrado');

    const wasQualified = qual.isQualified;

    const updated = await this.repository.update(businessId, {
      overrideActive: true,
      overrideValue: dto.value,
      overrideById: adminId,
      overrideReason: dto.reason,
      overrideAt: new Date(),
      isQualified: dto.value,
      ...(dto.value && !wasQualified ? { qualifiedAt: new Date(), disqualifiedAt: null } : {}),
      ...(!dto.value && wasQualified ? { disqualifiedAt: new Date() } : {}),
    });

    if (!wasQualified && dto.value && qual.business.businessPage) {
      await this.autoApprovePendingPage(qual.business.businessPage.id, qual.business.businessPage);
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
      ...(nowQualified && !qual.isQualified ? { qualifiedAt: new Date(), disqualifiedAt: null } : {}),
      ...(!nowQualified && qual.isQualified ? { disqualifiedAt: new Date() } : {}),
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

  // ── Private helpers ─────────────────────────────────────────────────────────

  private evaluateCriteria(
    qual: QualWithBusiness & { totalApprovals: number; overrideActive: boolean; overrideValue?: boolean | null },
  ): boolean {
    if (qual.overrideActive) return qual.overrideValue ?? false;

    const accountAgeDays = Math.floor(
      (Date.now() - qual.business.user.createdAt.getTime()) / (1000 * 60 * 60 * 24),
    );
    const daysSinceRejection = qual.lastRejectionAt
      ? Math.floor((Date.now() - qual.lastRejectionAt.getTime()) / (1000 * 60 * 60 * 24))
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
      (Date.now() - qual.business.user.createdAt.getTime()) / (1000 * 60 * 60 * 24),
    );
    const daysSinceLastRejection = qual.lastRejectionAt
      ? Math.floor((Date.now() - qual.lastRejectionAt.getTime()) / (1000 * 60 * 60 * 24))
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

    // approvePendingPage returns null (via Prisma P2025) if page is not PENDING_REVIEW
    let approved: Awaited<ReturnType<typeof this.repository.approvePendingPage>>;
    try {
      approved = await this.repository.approvePendingPage(businessPageId, {});
    } catch {
      return; // page was not in PENDING_REVIEW (race condition) — safe to ignore
    }

    try {
      const pageUrl = `${env.FRONTEND_URL}/pg/${page.businessType}/${page.slug}`;
      const { subject, html } = buildApprovalEmail(approved.business.name, pageUrl);
      await this.emailService.send({ to: approved.business.user.email, subject, html });
    } catch {
      // email failure must not block auto-approval
    }
  }
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
pnpm test --testPathPattern=publisher-qualification --no-coverage
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/immigrant_be/src/publisher-qualification/publisher-qualification.service.spec.ts apps/immigrant_be/src/publisher-qualification/publisher-qualification.service.ts
git commit -m "feat(publisher-qualification): add service with TDD (onPageApproved, onPageRejected, isQualified, applyOverride, removeOverride, listAll, findOne)"
```

---

## Task 5: Admin controller + module

**Files:**
- Create: `apps/immigrant_be/src/publisher-qualification/publishers-admin.controller.ts`
- Create: `apps/immigrant_be/src/publisher-qualification/publisher-qualification.module.ts`

- [ ] **Step 1: Create the admin controller**

```typescript
// apps/immigrant_be/src/publisher-qualification/publishers-admin.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { Session } from '../../../generated/prisma';
import { UserSession } from '../business-pages/business-pages-admin.controller';
import { PublisherQualificationService } from './publisher-qualification.service';
import { ApplyOverrideDto } from './dto/apply-override.dto';

@ApiTags('Admin — Publishers')
@Controller('admin/publishers')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
export class PublishersAdminController {
  constructor(private readonly service: PublisherQualificationService) {}

  @Get()
  @ApiOperation({ summary: 'Listar qualificações de publishers' })
  @ApiOkResponse({ description: 'Lista de publishers com critérios' })
  listAll() {
    return this.service.listAll();
  }

  @Get(':businessId')
  @ApiOperation({ summary: 'Detalhe de um publisher' })
  @ApiOkResponse({ description: 'Publisher com critérios' })
  @ApiNotFoundResponse({ description: 'Publisher não encontrado' })
  @ApiParam({ name: 'businessId', description: 'UUID do Business' })
  findOne(@Param('businessId') businessId: string) {
    return this.service.findOne(businessId);
  }

  @Post(':businessId/override')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Aplicar override de qualificação' })
  @ApiOkResponse({ description: 'Override aplicado' })
  @ApiNotFoundResponse({ description: 'Publisher não encontrado' })
  @ApiParam({ name: 'businessId', description: 'UUID do Business' })
  applyOverride(
    @Param('businessId') businessId: string,
    @Body() dto: ApplyOverrideDto,
    @Session() session: UserSession,
  ) {
    return this.service.applyOverride(businessId, session.user.id, dto);
  }

  @Delete(':businessId/override')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remover override de qualificação' })
  @ApiOkResponse({ description: 'Override removido, critérios automáticos restaurados' })
  @ApiNotFoundResponse({ description: 'Publisher não encontrado' })
  @ApiParam({ name: 'businessId', description: 'UUID do Business' })
  removeOverride(@Param('businessId') businessId: string) {
    return this.service.removeOverride(businessId);
  }
}
```

- [ ] **Step 2: Check how `UserSession` is imported in the existing admin controller**

Open `apps/immigrant_be/src/business-pages/business-pages-admin.controller.ts` and confirm the `UserSession` type is exported. If it's not exported, add `export` to its declaration before proceeding.

- [ ] **Step 3: Create the module**

```typescript
// apps/immigrant_be/src/publisher-qualification/publisher-qualification.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { EmailModule } from '@app/email';
import { PublisherQualificationRepository } from './publisher-qualification.repository';
import { PublisherQualificationService } from './publisher-qualification.service';
import { PublishersAdminController } from './publishers-admin.controller';

@Module({
  imports: [DatabaseModule, EmailModule],
  controllers: [PublishersAdminController],
  providers: [PublisherQualificationService, PublisherQualificationRepository],
  exports: [PublisherQualificationService],
})
export class PublisherQualificationModule {}
```

- [ ] **Step 4: Commit**

```bash
git add apps/immigrant_be/src/publisher-qualification/publishers-admin.controller.ts apps/immigrant_be/src/publisher-qualification/publisher-qualification.module.ts
git commit -m "feat(publisher-qualification): add admin controller and module"
```

---

## Task 6: Integrate into BusinessPagesModule + Service

**Files:**
- Modify: `apps/immigrant_be/src/business-pages/business-pages.module.ts`
- Modify: `apps/immigrant_be/src/business-pages/business-pages.service.ts`
- Modify: `apps/immigrant_be/src/business-pages/dto/submit-business-page-response.dto.ts`

- [ ] **Step 1: Update `business-pages.module.ts` to import `PublisherQualificationModule`**

```typescript
// apps/immigrant_be/src/business-pages/business-pages.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { EmailModule } from '@app/email';
import { PublisherQualificationModule } from '../publisher-qualification/publisher-qualification.module';
import { BusinessPagesController } from './business-pages.controller';
import { BusinessPagesAdminController } from './business-pages-admin.controller';
import { BusinessPagesService } from './business-pages.service';
import { BusinessPagesRepository } from './business-pages.repository';

@Module({
  imports: [DatabaseModule, EmailModule, PublisherQualificationModule],
  controllers: [BusinessPagesController, BusinessPagesAdminController],
  providers: [BusinessPagesService, BusinessPagesRepository],
  exports: [BusinessPagesService],
})
export class BusinessPagesModule {}
```

- [ ] **Step 2: Update `SubmitBusinessPageResponseDto` to add the `'approved'` modal variant**

Replace the existing file content with:

```typescript
// apps/immigrant_be/src/business-pages/dto/submit-business-page-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class SubmitBusinessPageResponseDto {
  @ApiProperty({
    enum: ['first', 'update', 'approved'],
    description:
      '"first" — primeira submissão; "update" — atualização de página aprovada; "approved" — publisher qualificado, aprovado diretamente',
  })
  modal: 'first' | 'update' | 'approved';

  @ApiProperty({ description: 'Novo status da página' })
  status: string;
}
```

- [ ] **Step 3: Update `business-pages.service.ts` to inject qualification service and integrate**

Replace the full service file with:

```typescript
// apps/immigrant_be/src/business-pages/business-pages.service.ts
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  EmailService,
  buildApprovalEmail,
  buildRejectionEmail,
} from '@app/email';
import { env } from '@app/config';
import { BusinessPageStatus, Prisma } from '../../../../generated/prisma';
import { BusinessPagesRepository } from './business-pages.repository';
import { PublisherQualificationService } from '../publisher-qualification/publisher-qualification.service';
import { CreateBusinessPageDto } from './dto/create-business-page.dto';
import { UpdateBusinessPageContentDto } from './dto/update-business-page-content.dto';
import { SubmitBusinessPageResponseDto } from './dto/submit-business-page-response.dto';
import { RejectBusinessPageDto } from './dto/reject-business-page.dto';

@Injectable()
export class BusinessPagesService {
  constructor(
    private readonly repository: BusinessPagesRepository,
    private readonly emailService: EmailService,
    private readonly qualificationService: PublisherQualificationService,
  ) {}

  async checkSlugAvailability(
    slug: string,
  ): Promise<{ available: boolean; slug: string }> {
    const taken = await this.repository.isSlugTaken(slug);
    return { available: !taken, slug };
  }

  async getPublicPage(slug: string) {
    const page = await this.repository.findApprovedBySlug(slug);
    if (!page) {
      throw new NotFoundException('Página não encontrada');
    }
    return page;
  }

  async createPage(userId: string, dto: CreateBusinessPageDto) {
    const business = await this.repository.findBusinessByIdAndUserId(
      dto.businessId,
      userId,
    );
    if (!business) throw new ForbiddenException('Acesso negado');

    const existing = await this.repository.findByBusinessId(dto.businessId);
    if (existing)
      throw new ConflictException('Já existe uma página para este negócio');

    const slugTaken = await this.repository.isSlugTaken(dto.slug);
    if (slugTaken) throw new ConflictException('Slug não disponível');

    const pendingContent = {
      name: business.name,
      city: business.city,
      ...(business.address != null ? { address: business.address } : {}),
      ...(business.phone != null ? { phone: business.phone } : {}),
      ...(business.email != null ? { email: business.email } : {}),
      ...(business.website != null ? { website: business.website } : {}),
      ...(business.lat != null ? { lat: business.lat } : {}),
      ...(business.lng != null ? { lng: business.lng } : {}),
    };

    return this.repository.create({
      businessId: dto.businessId,
      slug: dto.slug,
      businessType: dto.businessType,
      pendingContent,
    });
  }

  async updateContent(
    id: string,
    userId: string,
    dto: UpdateBusinessPageContentDto,
  ) {
    const page = await this.repository.findByIdAndUserId(id, userId);
    if (!page) throw new ForbiddenException('Acesso negado');
    return this.repository.updatePendingContent(id, dto.pendingContent);
  }

  async submitForReview(
    id: string,
    userId: string,
  ): Promise<SubmitBusinessPageResponseDto> {
    const page = await this.repository.findByIdAndUserId(id, userId);
    if (!page) throw new ForbiddenException('Acesso negado');

    const { status, approvedContent } = page;

    if (status === 'PENDING_REVIEW' || status === 'APPROVED_WITH_PENDING') {
      throw new ConflictException('Página já está em análise');
    }

    // Qualified publishers bypass moderation
    const qualified = await this.qualificationService.isQualified(id);
    if (qualified) {
      await this.repository.approvePage(
        id,
        page.pendingContent as object,
        page.slugLockedAt === null,
        'system',
      );
      return { modal: 'approved', status: 'APPROVED' };
    }

    const newStatus =
      status === 'APPROVED' ? 'APPROVED_WITH_PENDING' : 'PENDING_REVIEW';

    await this.repository.submitPage(id, newStatus);

    return {
      modal: approvedContent !== null ? 'update' : 'first',
      status: newStatus,
    };
  }

  async getMyPage(businessId: string, userId: string) {
    const business = await this.repository.findBusinessByIdAndUserId(
      businessId,
      userId,
    );
    if (!business) throw new ForbiddenException('Acesso negado');

    const page = await this.repository.findByBusinessId(businessId);
    if (!page) throw new NotFoundException('Página não encontrada');

    return page;
  }

  // ── Admin methods ──────────────────────────────────────────────────

  listPages(status?: BusinessPageStatus) {
    return this.repository.listPages(status);
  }

  async approveBusinessPage(id: string, adminId: string) {
    const page = await this.repository.findById(id);
    if (!page) throw new NotFoundException('Página não encontrada');

    if (!['PENDING_REVIEW', 'APPROVED_WITH_PENDING'].includes(page.status)) {
      throw new ConflictException('Página não está em análise');
    }

    const updated = await this.repository.approvePage(
      id,
      page.pendingContent as object,
      page.slugLockedAt === null,
      adminId,
    );

    // Update qualification record (fire-and-forget errors)
    this.qualificationService.onPageApproved(id).catch(() => undefined);

    try {
      const pageUrl = `${env.FRONTEND_URL}/pg/${updated.businessType}/${updated.slug}`;
      const { subject, html } = buildApprovalEmail(page.business.name, pageUrl);
      await this.emailService.send({
        to: page.business.user.email,
        subject,
        html,
      });
    } catch {
      // email failure must not block approval
    }

    return updated;
  }

  async rejectBusinessPage(
    id: string,
    adminId: string,
    dto: RejectBusinessPageDto,
  ) {
    const page = await this.repository.findById(id);
    if (!page) throw new NotFoundException('Página não encontrada');

    if (!['PENDING_REVIEW', 'APPROVED_WITH_PENDING'].includes(page.status)) {
      throw new ConflictException('Página não está em análise');
    }

    const isUpdate = page.status === 'APPROVED_WITH_PENDING';
    const newStatus = isUpdate ? 'APPROVED' : 'REJECTED';

    const updated = await this.repository.rejectPage(
      id,
      newStatus,
      adminId,
      dto.reason,
    );

    // Update qualification record (fire-and-forget errors)
    this.qualificationService.onPageRejected(id).catch(() => undefined);

    try {
      const dashboardUrl = `${env.FRONTEND_URL}/dashboard/meu-negocio/${page.businessId}/pagina-publica`;
      const { subject, html } = buildRejectionEmail(
        page.business.name,
        isUpdate,
        dashboardUrl,
        dto.reason,
      );
      await this.emailService.send({
        to: page.business.user.email,
        subject,
        html,
      });
    } catch {
      // email failure must not block rejection
    }

    return updated;
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add apps/immigrant_be/src/business-pages/business-pages.module.ts apps/immigrant_be/src/business-pages/business-pages.service.ts apps/immigrant_be/src/business-pages/dto/submit-business-page-response.dto.ts
git commit -m "feat(business-pages): integrate publisher qualification into submitForReview, approveBusinessPage, rejectBusinessPage"
```

---

## Task 7: Update BusinessPagesService tests

**Files:**
- Modify: `apps/immigrant_be/src/business-pages/business-pages.service.spec.ts`

- [ ] **Step 1: Add `PublisherQualificationService` mock and update the module setup**

At the top of `business-pages.service.spec.ts`, after the existing `mockEmail` declaration, add:

```typescript
const mockQualification = {
  isQualified: jest.fn().mockResolvedValue(false),
  onPageApproved: jest.fn().mockResolvedValue(undefined),
  onPageRejected: jest.fn().mockResolvedValue(undefined),
};
```

Add this mock import at the top (with the other jest.mock calls):

```typescript
jest.mock('../publisher-qualification/publisher-qualification.service', () => ({
  PublisherQualificationService: jest.fn(),
}));
```

Update the `beforeEach` providers array:

```typescript
beforeEach(async () => {
  const module = await Test.createTestingModule({
    providers: [
      BusinessPagesService,
      { provide: BusinessPagesRepository, useValue: mockRepo },
      { provide: EmailService, useValue: mockEmail },
      { provide: PublisherQualificationService, useValue: mockQualification },
    ],
  }).compile();
  service = module.get(BusinessPagesService);
  jest.clearAllMocks();
});
```

Add the import at the top (after `EmailService` import):

```typescript
import { PublisherQualificationService } from '../publisher-qualification/publisher-qualification.service';
```

- [ ] **Step 2: Add tests for submitForReview with qualified publisher**

Add inside the existing `describe('submitForReview', ...)` block (after the last `it` in that block):

```typescript
it('approves directly when publisher is qualified (bypasses PENDING_REVIEW)', async () => {
  const draftPage = {
    ...mockPage,
    status: 'DRAFT',
    approvedContent: null,
    pendingContent: { name: 'Padaria' },
    slugLockedAt: null,
  };
  mockRepo.findByIdAndUserId.mockResolvedValue(draftPage);
  mockQualification.isQualified.mockResolvedValue(true);
  mockRepo.approvePage.mockResolvedValue({ ...draftPage, status: 'APPROVED' });

  const result = await service.submitForReview('page-1', 'user-1');

  expect(mockRepo.approvePage).toHaveBeenCalledWith(
    'page-1',
    draftPage.pendingContent,
    true,
    'system',
  );
  expect(mockRepo.submitPage).not.toHaveBeenCalled();
  expect(result).toEqual({ modal: 'approved', status: 'APPROVED' });
});
```

- [ ] **Step 3: Add tests for qualification hooks in approveBusinessPage and rejectBusinessPage**

Add inside `describe('approveBusinessPage', ...)` (after the existing tests):

```typescript
it('calls onPageApproved after successful approval', async () => {
  const page = {
    ...mockPageWithBusiness,
    status: 'PENDING_REVIEW',
    approvedContent: null,
  };
  mockRepo.findById.mockResolvedValue(page);
  mockRepo.approvePage.mockResolvedValue({ ...page, status: 'APPROVED' });
  mockQualification.onPageApproved.mockResolvedValue(undefined);

  await service.approveBusinessPage('page-1', 'admin-1');

  // onPageApproved is fire-and-forget; just verify it was called
  expect(mockQualification.onPageApproved).toHaveBeenCalledWith('page-1');
});
```

Add inside `describe('rejectBusinessPage', ...)` (after the existing tests):

```typescript
it('calls onPageRejected after successful rejection', async () => {
  const page = {
    ...mockPageWithBusiness,
    status: 'PENDING_REVIEW',
    approvedContent: null,
  };
  mockRepo.findById.mockResolvedValue(page);
  mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'REJECTED' });
  mockQualification.onPageRejected.mockResolvedValue(undefined);

  await service.rejectBusinessPage('page-1', 'admin-1', {});

  expect(mockQualification.onPageRejected).toHaveBeenCalledWith('page-1');
});
```

- [ ] **Step 4: Run all business-pages tests**

```bash
pnpm test --testPathPattern=business-pages --no-coverage
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/immigrant_be/src/business-pages/business-pages.service.spec.ts
git commit -m "test(business-pages): add qualification integration tests (submitForReview bypass, onPageApproved/Rejected hooks)"
```

---

## Task 8: Register module in AppModule

**Files:**
- Modify: `apps/immigrant_be/src/app.module.ts`

- [ ] **Step 1: Open `app.module.ts` and add `PublisherQualificationModule` to imports**

Find the `imports` array and add:

```typescript
import { PublisherQualificationModule } from './publisher-qualification/publisher-qualification.module';
```

And add `PublisherQualificationModule` to the `imports` array alongside the other modules.

- [ ] **Step 2: Run full test suite to confirm nothing broke**

```bash
pnpm test --no-coverage 2>&1 | tail -20
```

Expected: all test suites pass.

- [ ] **Step 3: Commit**

```bash
git add apps/immigrant_be/src/app.module.ts
git commit -m "feat(app): register PublisherQualificationModule"
```

---

## Task 9: FE — types + API client

**Files:**
- Modify: `lib/business-pages/types.ts` (in immigrant_fe)
- Create: `lib/admin/publishers-api.ts` (in immigrant_fe)

All paths below are relative to `/Users/lucasisabel/Desktop/Projects/immigrant_fe`.

- [ ] **Step 1: Add `AdminPublisherView` type to `lib/business-pages/types.ts`**

Append to the end of the file:

```typescript
export interface AdminPublisherCriteria {
  approvalsCount: number;
  approvalsRequired: number;
  emailVerified: boolean;
  accountAgeDays: number;
  accountAgeRequired: number;
  daysSinceLastRejection: number | null;
  rejectionFreeDaysRequired: number;
  profileComplete: boolean;
}

export interface AdminPublisherView {
  businessId: string;
  businessName: string;
  slug: string;
  isQualified: boolean;
  overrideActive: boolean;
  overrideValue?: boolean;
  overrideReason?: string;
  overrideAt?: string;
  criteria: AdminPublisherCriteria;
}
```

- [ ] **Step 2: Create API client `lib/admin/publishers-api.ts`**

```typescript
// lib/admin/publishers-api.ts
import { api } from '@/lib/api';
import type { AdminPublisherView } from '@/lib/business-pages/types';

export async function listPublishers(): Promise<AdminPublisherView[]> {
  return api.get('admin/publishers').json<AdminPublisherView[]>();
}

export async function getPublisher(businessId: string): Promise<AdminPublisherView> {
  return api.get(`admin/publishers/${businessId}`).json<AdminPublisherView>();
}

export async function applyOverride(
  businessId: string,
  value: boolean,
  reason: string,
): Promise<AdminPublisherView> {
  return api
    .post(`admin/publishers/${businessId}/override`, { json: { value, reason } })
    .json<AdminPublisherView>();
}

export async function removeOverride(businessId: string): Promise<AdminPublisherView> {
  return api
    .delete(`admin/publishers/${businessId}/override`)
    .json<AdminPublisherView>();
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/business-pages/types.ts lib/admin/publishers-api.ts
git commit -m "feat(admin): add AdminPublisherView type and publishers API client"
```

---

## Task 10: FE — hooks

**Files:**
- Create: `hooks/admin/useAdminPublishers.ts`
- Create: `hooks/admin/usePublisherOverride.ts`

- [ ] **Step 1: Create `useAdminPublishers.ts`**

```typescript
// hooks/admin/useAdminPublishers.ts
import { useQuery } from '@tanstack/react-query';
import { listPublishers } from '@/lib/admin/publishers-api';

export function useAdminPublishers() {
  return useQuery({
    queryKey: ['admin', 'publishers'],
    queryFn: listPublishers,
  });
}
```

- [ ] **Step 2: Create `usePublisherOverride.ts`**

```typescript
// hooks/admin/usePublisherOverride.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyOverride, removeOverride } from '@/lib/admin/publishers-api';

export function useApplyOverride() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      businessId,
      value,
      reason,
    }: {
      businessId: string;
      value: boolean;
      reason: string;
    }) => applyOverride(businessId, value, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'publishers'] });
    },
  });
}

export function useRemoveOverride() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (businessId: string) => removeOverride(businessId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'publishers'] });
    },
  });
}
```

- [ ] **Step 3: Commit**

```bash
git add hooks/admin/useAdminPublishers.ts hooks/admin/usePublisherOverride.ts
git commit -m "feat(admin): add React Query hooks for admin publishers"
```

---

## Task 11: FE — OverridePublisherModal component

**Files:**
- Create: `components/admin/publishers/OverridePublisherModal.tsx`

- [ ] **Step 1: Create the modal**

```typescript
// components/admin/publishers/OverridePublisherModal.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { AdminPublisherView } from '@/lib/business-pages/types';

interface OverridePublisherModalProps {
  open: boolean;
  publisher: AdminPublisherView;
  onApply: (value: boolean, reason: string) => void;
  onRemove: () => void;
  onClose: () => void;
  isPending: boolean;
}

export function OverridePublisherModal({
  open,
  publisher,
  onApply,
  onRemove,
  onClose,
  isPending,
}: OverridePublisherModalProps) {
  const [value, setValue] = useState<boolean>(publisher.overrideValue ?? true);
  const [reason, setReason] = useState('');

  const isReasonValid = reason.trim().length >= 10;

  function handleApply() {
    if (!isReasonValid) return;
    onApply(value, reason.trim());
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Override de qualificação — {publisher.businessName}</DialogTitle>
        </DialogHeader>

        {publisher.overrideActive ? (
          <div className="flex flex-col gap-4">
            <div className="rounded-md bg-muted px-4 py-3 text-sm">
              <p className="font-semibold mb-1">Override ativo</p>
              <p className="text-muted-foreground">{publisher.overrideReason}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose} disabled={isPending}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={onRemove} disabled={isPending}>
                {isPending ? 'Removendo...' : 'Remover override'}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Switch
                id="override-value"
                checked={value}
                onCheckedChange={setValue}
                disabled={isPending}
              />
              <Label htmlFor="override-value">
                {value ? 'Forçar qualificado' : 'Bloquear qualificação'}
              </Label>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="override-reason">
                Motivo <span className="text-muted-foreground text-xs">(mínimo 10 caracteres)</span>
              </Label>
              <Textarea
                id="override-reason"
                placeholder="Descreva o motivo do override..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={isPending}
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose} disabled={isPending}>
                Cancelar
              </Button>
              <Button
                onClick={handleApply}
                disabled={isPending || !isReasonValid}
              >
                {isPending ? 'Aplicando...' : 'Aplicar override'}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/publishers/OverridePublisherModal.tsx
git commit -m "feat(admin): add OverridePublisherModal component"
```

---

## Task 12: FE — AdminPublishersTable + page

**Files:**
- Create: `components/admin/publishers/AdminPublishersTable.tsx`
- Create: `app/(private)/dashboard/admin/publishers/page.tsx`

- [ ] **Step 1: Create `AdminPublishersTable.tsx`**

```typescript
// components/admin/publishers/AdminPublishersTable.tsx
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAdminPublishers } from '@/hooks/admin/useAdminPublishers';
import { useApplyOverride, useRemoveOverride } from '@/hooks/admin/usePublisherOverride';
import { OverridePublisherModal } from './OverridePublisherModal';
import type { AdminPublisherView } from '@/lib/business-pages/types';

function qualificationBadge(p: AdminPublisherView) {
  if (p.overrideActive && p.overrideValue) {
    return { label: 'Forçado (override)', variant: 'default' as const };
  }
  if (p.overrideActive && !p.overrideValue) {
    return { label: 'Bloqueado (override)', variant: 'destructive' as const };
  }
  if (p.isQualified) {
    return { label: 'Qualificado', variant: 'default' as const };
  }
  return { label: 'Em progresso', variant: 'secondary' as const };
}

export function AdminPublishersTable() {
  const { data: publishers = [], isLoading, isError } = useAdminPublishers();
  const applyOverride = useApplyOverride();
  const removeOverride = useRemoveOverride();
  const [target, setTarget] = useState<AdminPublisherView | null>(null);

  function handleApply(value: boolean, reason: string) {
    if (!target) return;
    applyOverride.mutate(
      { businessId: target.businessId, value, reason },
      { onSuccess: () => setTarget(null) },
    );
  }

  function handleRemove() {
    if (!target) return;
    removeOverride.mutate(target.businessId, { onSuccess: () => setTarget(null) });
  }

  const isPending = applyOverride.isPending || removeOverride.isPending;

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <p className="text-sm text-muted-foreground py-8 text-center">Carregando...</p>
      ) : isError ? (
        <p className="text-sm text-destructive py-8 text-center">
          Erro ao carregar publishers. Tente novamente.
        </p>
      ) : publishers.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">Nenhum publisher encontrado.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted text-muted-foreground text-left">
              <th className="px-4 py-2 font-semibold">Negócio</th>
              <th className="px-2 py-2 font-semibold">Status</th>
              <th className="px-2 py-2 font-semibold">Aprovações</th>
              <th className="px-2 py-2 font-semibold">Última rejeição</th>
              <th className="px-2 py-2 font-semibold">Email verificado</th>
              <th className="px-2 py-2 font-semibold">Conta (dias)</th>
              <th className="px-2 py-2 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {publishers.map((p) => {
              const badge = qualificationBadge(p);
              const { criteria } = p;
              const lastRejection =
                criteria.daysSinceLastRejection !== null
                  ? `${criteria.daysSinceLastRejection} dias atrás`
                  : 'Nunca';

              return (
                <tr key={p.businessId} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="font-semibold">{p.businessName}</div>
                    <div className="text-xs text-muted-foreground">{p.slug}</div>
                  </td>
                  <td className="px-2 py-3">
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </td>
                  <td className="px-2 py-3 tabular-nums">
                    {criteria.approvalsCount}/{criteria.approvalsRequired}
                  </td>
                  <td className="px-2 py-3 text-muted-foreground">{lastRejection}</td>
                  <td className="px-2 py-3">
                    {criteria.emailVerified ? '✅' : '❌'}
                  </td>
                  <td className="px-2 py-3 tabular-nums">
                    {criteria.accountAgeDays}
                    {criteria.accountAgeDays < criteria.accountAgeRequired && (
                      <span className="text-xs text-muted-foreground ml-1">
                        (mín. {criteria.accountAgeRequired})
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-3">
                    <Button size="sm" variant="outline" onClick={() => setTarget(p)}>
                      Override
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {target && (
        <OverridePublisherModal
          open
          publisher={target}
          onApply={handleApply}
          onRemove={handleRemove}
          onClose={() => setTarget(null)}
          isPending={isPending}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create the admin page**

```typescript
// app/(private)/dashboard/admin/publishers/page.tsx
import DashboardLayout from '@/layouts/dashboardLayout';
import { AdminPublishersTable } from '@/components/admin/publishers/AdminPublishersTable';

export default function AdminPublishersPage() {
  return (
    <DashboardLayout title="Administração — Publishers">
      <AdminPublishersTable />
    </DashboardLayout>
  );
}
```

- [ ] **Step 3: Verify no TypeScript errors in new files**

```bash
cd /Users/lucasisabel/Desktop/Projects/immigrant_fe
pnpm tsc --noEmit 2>&1 | grep -E "publishers|publisher"
```

Expected: no errors referencing the new files.

- [ ] **Step 4: Commit**

```bash
git add components/admin/publishers/AdminPublishersTable.tsx app/(private)/dashboard/admin/publishers/page.tsx
git commit -m "feat(admin): add AdminPublishersTable and admin publishers page"
```

---

## Self-Review Checklist

Run before marking the plan complete:

- [ ] `pnpm test --no-coverage` — all suites pass (BE)
- [ ] `pnpm tsc --noEmit` — no new errors in new files (FE)
- [ ] `GET /admin/publishers` returns list with criteria
- [ ] `POST /admin/publishers/:businessId/override` with `value=true` and a PENDING_REVIEW page → page auto-approved
- [ ] `DELETE /admin/publishers/:businessId/override` re-evaluates criteria
- [ ] `submitForReview` with qualified publisher → returns `{ modal: 'approved', status: 'APPROVED' }` without creating PENDING_REVIEW
- [ ] `approveBusinessPage` increments `totalApprovals` via `onPageApproved`
- [ ] `rejectBusinessPage` updates `lastRejectionAt` via `onPageRejected`
- [ ] FE: table shows qualification badge, criteria columns, and Override button
- [ ] FE: modal shows current override reason when override is active; shows form with Switch + textarea otherwise
- [ ] FE: admin page at `/admin/publishers` is protected by existing admin layout
