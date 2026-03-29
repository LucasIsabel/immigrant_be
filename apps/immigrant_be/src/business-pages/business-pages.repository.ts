import { Injectable } from '@nestjs/common';
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
      where: { slug, status: 'APPROVED' },
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
}
