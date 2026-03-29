import { Injectable } from '@nestjs/common';
import { BusinessPageStatus } from '../../../../generated/prisma';
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
  approvePage(id: string, approvedContent: object, setSlugLock: boolean) {
    return this.prisma.businessPage.update({
      where: { id },
      data: {
        status: 'APPROVED',
        approvedContent,
        approvedAt: new Date(),
        ...(setSlugLock ? { slugLockedAt: new Date() } : {}),
      },
    });
  }

  // Reprova: status determinado pelo service ('REJECTED' ou 'APPROVED' se era APPROVED_WITH_PENDING)
  rejectPage(id: string, newStatus: 'REJECTED' | 'APPROVED', reason?: string) {
    return this.prisma.businessPage.update({
      where: { id },
      data: {
        status: newStatus,
        rejectedAt: new Date(),
        ...(reason !== undefined ? { rejectionReason: reason } : {}),
      },
    });
  }
}
