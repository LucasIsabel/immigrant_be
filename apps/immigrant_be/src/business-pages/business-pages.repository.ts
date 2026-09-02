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

  /**
   * A página que um visitante anónimo pode ver.
   *
   * O `select` é a rota inteira de segurança desta consulta, e não uma
   * optimização. Sem ele a linha volta completa — e a rota é anónima, o
   * controlador devolve o que o serviço lhe der, e o Nest não retira campos
   * que o DTO não declara. Foi assim que `pendingContent` (conteúdo submetido
   * e **ainda não aprovado**), `moderationResult`, `rejectionReason` e os
   * `approvedById`/`rejectedById` dos moderadores acabaram no HTML público:
   * dava para ler a próxima versão de uma página antes de ela ser aprovada, e
   * para ler o que tinha sido reprovado.
   *
   * Os campos são exactamente os de `BusinessPagePublicResponseDto`. Quando um
   * campo novo for preciso na página pública, entra nos dois sítios — é essa a
   * fricção que se quer.
   *
   * `findPublicList`, aqui ao lado, já fazia isto pela mesma razão.
   */
  findApprovedBySlug(slug: string) {
    return this.prisma.businessPage.findFirst({
      where: { slug, status: { in: ['APPROVED', 'APPROVED_WITH_PENDING'] } },
      select: {
        id: true,
        businessId: true,
        slug: true,
        businessType: true,
        status: true,
        approvedContent: true,
        approvedAt: true,
      },
    });
  }

  /**
   * Listagem anônima para o sitemap. APPROVED_WITH_PENDING entra porque o
   * conteúdo APROVADO dessas páginas continua no ar (mesma regra do
   * findApprovedBySlug); o select enxuto garante que pendingContent não tem
   * como vazar por esta rota.
   */
  async findPublicList(skip: number, take: number) {
    const where = {
      status: {
        in: ['APPROVED', 'APPROVED_WITH_PENDING'] as BusinessPageStatus[],
      },
    };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.businessPage.findMany({
        where,
        select: { slug: true, businessType: true, approvedAt: true },
        orderBy: { approvedAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.businessPage.count({ where }),
    ]);
    return { data, total };
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

  // Busca página pelo id verificando ownership via join com business.
  // O businessType do negócio vem junto porque é ele — o enum, não a string
  // livre da página — que escolhe o schema de validação do typeData.
  findByIdAndUserId(id: string, userId: string) {
    return this.prisma.businessPage.findFirst({
      where: { id, business: { userId } },
      include: {
        business: { select: { businessType: true } },
      },
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

  /**
   * Tira a página da fila de análise, a pedido do dono.
   *
   * `submittedAt` volta a `null` porque deixou de haver submissão: mantê-lo
   * faria a coluna "submetido em" da moderação apontar para um pedido que já
   * não existe.
   *
   * O que **não** se toca é tudo o que pertence à moderação —
   * `rejectedAt`, `rejectedById`, `rejectionReason`, `lastRejectionAt` na
   * qualificação. Retirar não é ser reprovado, e é essa distinção que a issue
   * BE#241 abriu: antes, tirar uma edição da fila custava ao dono os mesmos 90
   * dias de qualificação que uma reprovação por conteúdo.
   */
  withdrawSubmission(id: string, status: 'DRAFT' | 'APPROVED') {
    return this.prisma.businessPage.update({
      where: { id },
      data: { status, submittedAt: null },
    });
  }

  /** Grava a última análise; substitui a anterior de propósito. */
  saveModerationResult(id: string, record: object) {
    return this.prisma.businessPage.update({
      where: { id },
      data: { moderationResult: record },
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
        moderationResult: true,
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
    adminId: string | null,
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
