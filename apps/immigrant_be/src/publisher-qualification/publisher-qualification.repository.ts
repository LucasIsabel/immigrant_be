import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../../generated/prisma';
import { PrismaService } from '@app/database';

@Injectable()
export class PublisherQualificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Gets businessId for a given businessPageId
  findPageBusinessId(
    businessPageId: string,
  ): Promise<{ businessId: string } | null> {
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
              select: {
                id: true,
                slug: true,
                businessType: true,
                status: true,
              },
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
              select: {
                id: true,
                slug: true,
                businessType: true,
                status: true,
              },
            },
            user: { select: { emailVerified: true, createdAt: true } },
          },
        },
      },
    });
  }

  // Update fields on an existing record
  update(
    businessId: string,
    data:
      | Prisma.PublisherQualificationUpdateInput
      | Prisma.PublisherQualificationUncheckedUpdateInput,
  ) {
    return this.prisma.publisherQualification.update({
      where: { businessId },
      data,
      include: {
        business: {
          select: {
            name: true,
            city: true,
            businessPage: {
              select: {
                id: true,
                slug: true,
                businessType: true,
                status: true,
              },
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
              select: {
                id: true,
                slug: true,
                businessType: true,
                status: true,
              },
            },
            user: { select: { emailVerified: true, createdAt: true } },
          },
        },
      },
      orderBy: { business: { name: 'asc' } },
    });
  }

  // Approve a pending page directly (used for auto-approval when publisher qualifies).
  // Fetches pendingContent from DB to avoid data loss, then atomically approves.
  // Returns null if the page is not in PENDING_REVIEW status (already processed).
  async approvePendingPage(businessPageId: string) {
    const page = await this.prisma.businessPage.findUnique({
      where: { id: businessPageId, status: 'PENDING_REVIEW' },
      select: { pendingContent: true },
    });
    if (!page) return null;

    return this.prisma.businessPage.update({
      where: { id: businessPageId, status: 'PENDING_REVIEW' },
      data: {
        status: 'APPROVED',
        approvedContent: page.pendingContent as Prisma.InputJsonValue,
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
