import { Injectable } from '@nestjs/common';
import { BusinessPageStatus, Prisma } from '../../../../generated/prisma';
import { PrismaService } from '@app/database';

@Injectable()
export class BusinessPagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  isSlugTaken(slug: string): Promise<boolean> {
    return this.prisma.businessPage
      .findUnique({ where: { slug }, select: { id: true } })
      .then((r) => r !== null);
  }

  findBySlug(slug: string) {
    return this.prisma.businessPage.findUnique({ where: { slug } });
  }

  findApprovedBySlug(slug: string) {
    return this.prisma.businessPage.findFirst({
      where: { slug, status: { in: ['APPROVED', 'APPROVED_WITH_PENDING'] } },
    });
  }

  // Verifica ownership via negócio (para createPage e getMyPage)
  findBusinessByIdAndUserId(businessId: string, userId: string) {
    return this.prisma.business.findFirst({
      where: { id: businessId, userId },
    });
  }

  // Busca página pelo businessId
  findByBusinessId(businessId: string) {
    return this.prisma.businessPage.findFirst({ where: { businessId } });
  }

  // Busca página pelo id verificando ownership via join com business
  findByIdAndUserId(id: string, userId: string) {
    return this.prisma.businessPage.findFirst({
      where: { id, business: { userId } },
    });
  }

  // Cria nova BusinessPage em DRAFT
  create(data: {
    businessId: string;
    slug: string;
    businessType: string;
    pendingContent: object;
  }) {
    return this.prisma.businessPage.create({
      data: { ...data, status: 'DRAFT' },
    });
  }

  // Atualiza pending_content sem alterar status
  updatePendingContent(id: string, pendingContent: object) {
    return this.prisma.businessPage.update({
      where: { id },
      data: { pendingContent },
    });
  }

  // Transiciona status e registra submittedAt
  submitPage(id: string, status: 'PENDING_REVIEW' | 'APPROVED_WITH_PENDING') {
    return this.prisma.businessPage.update({
      where: { id },
      data: { status, submittedAt: new Date() },
    });
  }

  findByIdWithContent(id: string) {
    return this.prisma.businessPage.findUnique({
      where: { id },
      select: {
        id: true,
        businessId: true,
        slug: true,
        businessType: true,
        status: true,
        pendingContent: true,
        approvedContent: true,
        submittedAt: true,
        approvedAt: true,
        rejectedAt: true,
        rejectionReason: true,
        createdAt: true,
        updatedAt: true,
        business: {
          select: {
            name: true,
            city: true,
            user: { select: { email: true, name: true } },
          },
        },
      },
    });
  }

  // Busca página por id (sem verificação de ownership — uso admin)
  findById(id: string) {
    return this.prisma.businessPage.findUnique({
      where: { id },
      include: {
        business: {
          select: {
            name: true,
            userId: true,
            user: { select: { email: true, name: true } },
          },
        },
      },
    });
  }

  // Lista páginas com filtro opcional por status; inclui business.name e city para a tabela
  listPages(status?: BusinessPageStatus) {
    return this.prisma.businessPage.findMany({
      where: status ? { status } : undefined,
      include: { business: { select: { name: true, city: true } } },
      orderBy: { submittedAt: 'desc' },
    });
  }

  // Aprova: copia pendingContent → approvedContent, seta slugLockedAt se indicado
  approvePage(
    id: string,
    approvedContent: object,
    setSlugLock: boolean,
    adminId: string,
  ) {
    return this.prisma.businessPage.update({
      where: { id },
      data: {
        status: 'APPROVED',
        approvedContent,
        approvedAt: new Date(),
        approvedById: adminId,
        pendingContent: Prisma.JsonNull,
        ...(setSlugLock ? { slugLockedAt: new Date() } : {}),
      },
    });
  }

  // Sincroniza typeData do approvedContent para o Business (so /my-city page reflects approved dishes)
  updateBusinessTypeData(businessId: string, typeData: object) {
    return this.prisma.business.update({
      where: { id: businessId },
      data: { typeData },
    });
  }

  // Reprova: status determinado pelo service ('REJECTED' ou 'APPROVED' se era APPROVED_WITH_PENDING)
  rejectPage(
    id: string,
    newStatus: 'REJECTED' | 'APPROVED',
    adminId: string,
    reason?: string,
  ) {
    return this.prisma.businessPage.update({
      where: { id },
      data: {
        status: newStatus,
        rejectedAt: new Date(),
        rejectedById: adminId,
        ...(reason !== undefined ? { rejectionReason: reason } : {}),
      },
    });
  }
}
