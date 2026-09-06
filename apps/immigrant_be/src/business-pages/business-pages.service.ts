import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildApprovalEmail, buildRejectionEmail } from '@app/email';
import { NotificationsService } from '@app/notifications/notifications.service';
import { USER_NOTIFICATION_TYPES } from '@app/notifications/notification-types';
import { env } from '@app/config';
import { BusinessPageStatus } from '../../../../generated/prisma';
import { BusinessPagesRepository } from './business-pages.repository';
import { assertPageTypeMatchesBusiness } from './business-page-type-map';
import { validateTypeData } from '../business/type-data.schemas';
import { PublisherQualificationService } from '../publisher-qualification/publisher-qualification.service';
import { CreateBusinessPageDto } from './dto/create-business-page.dto';
import { UpdateBusinessPageContentDto } from './dto/update-business-page-content.dto';
import { SubmitBusinessPageResponseDto } from './dto/submit-business-page-response.dto';
import { RejectBusinessPageDto } from './dto/reject-business-page.dto';
import { StorageService } from '@app/storage';
import {
  BusinessPageModerationService,
  toModerationRecord,
  type BusinessPageModerationRecord,
} from './business-page-moderation.service';

@Injectable()
export class BusinessPagesService {
  constructor(
    private readonly repository: BusinessPagesRepository,
    private readonly notifications: NotificationsService,
    private readonly qualificationService: PublisherQualificationService,
    private readonly storageService: StorageService,
    private readonly moderationService: BusinessPageModerationService,
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

  async listPublicPages(page: number, limit: number) {
    const { data, total } = await this.repository.findPublicList(
      (page - 1) * limit,
      limit,
    );
    return { data, total, page, limit };
  }

  async createPage(userId: string, dto: CreateBusinessPageDto) {
    const business = await this.repository.findBusinessByIdAndUserId(
      dto.businessId,
      userId,
    );
    if (!business) throw new ForbiddenException('Acesso negado');

    // O template escolhido precisa pertencer ao tipo do negócio — são dois
    // vocabulários (enum vs slug de template) que nada relacionava até aqui.
    assertPageTypeMatchesBusiness(business.businessType, dto.businessType);

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

    const page = await this.repository.create({
      businessId: dto.businessId,
      slug: dto.slug,
      businessType: dto.businessType,
      pendingContent,
    });

    // Auto-submit for review immediately after creation
    const qualified = await this.qualificationService.isQualified(page.id);
    if (qualified) {
      await this.repository.approvePage(
        page.id,
        pendingContent,
        page.slugLockedAt === null,
        null,
      );
      const typeData = this.extractTypeData(pendingContent);
      if (typeData) {
        await this.repository.updateBusinessTypeData(page.businessId, typeData);
      }
    } else {
      await this.repository.submitPage(page.id, 'PENDING_REVIEW');
    }

    // Return the page in its final state
    return this.repository.findByBusinessId(dto.businessId);
  }

  async updateContent(
    id: string,
    userId: string,
    dto: UpdateBusinessPageContentDto,
  ) {
    const page = await this.repository.findByIdAndUserId(id, userId);
    if (!page) throw new ForbiddenException('Acesso negado');

    // Mesmo contrato do POST /business. Sem isto, o typeData entrava cru em
    // pendingContent e, na aprovação, era copiado para Business.typeData —
    // este era o único caminho de escrita que pulava a validação por tipo.
    // O schema é escolhido pelo enum do negócio dono, não pelo businessType
    // da página (string livre de template).
    validateTypeData(
      page.business.businessType,
      this.extractTypeData(dto.pendingContent),
    );

    return this.repository.updatePendingContent(id, dto.pendingContent);
  }

  private extractTypeData(content: unknown): object | null {
    if (!content || typeof content !== 'object' || Array.isArray(content)) {
      return null;
    }
    const typeData = (content as Record<string, unknown>).typeData;
    if (!typeData || typeof typeData !== 'object' || Array.isArray(typeData)) {
      return null;
    }
    return typeData;
  }

  /**
   * O dono retira a própria submissão.
   *
   * Existe porque a alternativa era pedir ao moderador que reprovasse — e uma
   * reprovação grava `lastRejectionAt`, que custa 90 dias de qualificação a
   * quem já a tinha. Tirar da fila uma edição que já não se quer publicar não é
   * juízo de qualidade nenhum, e não devia ter esse preço.
   *
   * Para onde volta: `APPROVED` quando já havia conteúdo no ar — a versão
   * pública não é tocada, só o pedido de revisão da nova —, e `DRAFT` quando a
   * página nunca chegou a ser aprovada. O `pendingContent` fica onde está: é o
   * rascunho do dono, e retirar a submissão não é descartar o trabalho.
   */
  async withdrawSubmission(id: string, userId: string) {
    const page = await this.repository.findByIdAndUserId(id, userId);
    if (!page) throw new ForbiddenException('Acesso negado');

    if (!['PENDING_REVIEW', 'APPROVED_WITH_PENDING'].includes(page.status)) {
      throw new ConflictException('Página não está em análise');
    }

    return this.repository.withdrawSubmission(
      id,
      page.approvedContent ? 'APPROVED' : 'DRAFT',
    );
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

    // Publishing straight through is the only path with no human reviewer, so
    // it is the one path where the model has to read the content first. A
    // clear violation demotes the page into the normal review queue rather
    // than rejecting it; anything else — including the model being
    // unavailable, which falls back to "medium" — still publishes, because a
    // moderation outage must not strand a publisher who earned the right.
    const qualified = await this.qualificationService.isQualified(id);
    if (qualified) {
      const moderation = await this.moderationService.moderateContent(
        (page.pendingContent ?? {}) as Record<string, unknown>,
        page.businessType,
        id,
      );

      // Gravado sempre, não só no rebaixamento: uma página que passou também
      // tem uma última análise, e guardá-la nos dois casos evita um ramo aqui
      // e uma pergunta sem resposta lá na tela ("passou, mas o que ele viu?").
      await this.repository.saveModerationResult(
        id,
        toModerationRecord(moderation, 'gate'),
      );

      if (moderation.result.riskLevel !== 'high') {
        await this.repository.approvePage(
          id,
          page.pendingContent as object,
          page.slugLockedAt === null,
          null,
        );
        const typeData = this.extractTypeData(page.pendingContent);
        if (typeData) {
          await this.repository.updateBusinessTypeData(
            page.businessId,
            typeData,
          );
        }
        return { modal: 'approved', status: 'APPROVED' };
      }
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

    const isPublisherQualified = await this.qualificationService.isQualified(
      page.id,
    );

    return { ...page, isPublisherQualified };
  }

  // ── Admin methods ──────────────────────────────────────────────────

  listPages(status?: BusinessPageStatus) {
    return this.repository.listPages(status);
  }

  async getPageDetail(id: string) {
    const page = await this.repository.findByIdWithContent(id);
    if (!page) throw new NotFoundException('Página não encontrada');
    return page;
  }

  async moderatePage(id: string): Promise<BusinessPageModerationRecord> {
    const page = await this.repository.findByIdWithContent(id);
    if (!page) throw new NotFoundException('Página não encontrada');

    const content = (page.pendingContent ?? page.approvedContent) as Record<
      string,
      unknown
    > | null;
    if (!content) {
      throw new BadRequestException('Página não possui conteúdo para moderar');
    }

    const outcome = await this.moderationService.moderateContent(
      content,
      page.businessType,
      id,
    );
    const record = toModerationRecord(outcome, 'manual');
    await this.repository.saveModerationResult(id, record);

    // Devolve o registro inteiro, não o veredicto cru: a tela precisa da hora
    // e do modelo para dizer o que está mostrando, e devolvê-los aqui poupa
    // um refetch logo depois de uma chamada que já custou dinheiro.
    return record;
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

    const typeData = this.extractTypeData(page.pendingContent);
    if (typeData) {
      await this.repository.updateBusinessTypeData(page.businessId, typeData);
    }

    // Update qualification record (fire-and-forget errors)
    this.qualificationService.onPageApproved(id).catch(() => undefined);

    // The bell always hears about this; the e-mail only goes to someone who
    // still wants e-mail. `notify` never throws, so approval is never held
    // hostage to either channel.
    await this.notifications.notify({
      userId: page.business.userId,
      type: USER_NOTIFICATION_TYPES.BUSINESS_PAGE_APPROVED,
      payload: {
        businessId: page.businessId,
        businessName: page.business.name,
        businessType: updated.businessType,
        slug: updated.slug,
      },
      // `/my-city/pg/...`, which is where the page actually lives. This link
      // said `/pg/...` for as long as the e-mail has existed, and that route
      // has never existed: every approval so far pointed at a 404, on the one
      // message whose whole purpose is "go and look at it".
      email: buildApprovalEmail(
        page.business.name,
        `${env.FRONTEND_URL}/my-city/pg/${updated.businessType}/${updated.slug}`,
      ),
    });

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

    await this.notifications.notify({
      userId: page.business.userId,
      type: USER_NOTIFICATION_TYPES.BUSINESS_PAGE_REJECTED,
      payload: {
        businessId: page.businessId,
        businessName: page.business.name,
        isUpdate,
        reason: dto.reason ?? null,
      },
      email: buildRejectionEmail(
        page.business.name,
        isUpdate,
        // The canonical route. The Portuguese one still resolves — `next.config.ts`
        // keeps a redirect for saved links — but a link written today has no
        // reason to spend a hop on it.
        `${env.FRONTEND_URL}/dashboard/my-business/${page.businessId}/edit`,
        dto.reason,
      ),
    });

    return updated;
  }

  // ── Upload methods ─────────────────────────────────────────────────

  private static readonly ALLOWED_IMAGE_MIMES = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
  ]);
  private static readonly MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

  private mimeToExt(mimeType: string): string {
    const map: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
    };
    return map[mimeType] ?? '';
  }

  private async uploadImage(
    pageId: string,
    userId: string,
    file: Express.Multer.File,
    slot: 'logo' | 'cover',
  ): Promise<{ url: string }> {
    if (!file) {
      throw new BadRequestException('Nenhum ficheiro enviado.');
    }
    if (!BusinessPagesService.ALLOWED_IMAGE_MIMES.has(file.mimetype)) {
      throw new BadRequestException(
        'Tipo de ficheiro não permitido. Use JPEG, PNG ou WebP.',
      );
    }
    if (file.size > BusinessPagesService.MAX_IMAGE_SIZE) {
      throw new BadRequestException(
        'Ficheiro excede o tamanho máximo de 5 MB.',
      );
    }

    const page = await this.repository.findByIdAndUserId(pageId, userId);
    if (!page) throw new ForbiddenException('Acesso negado');

    const ext = this.mimeToExt(file.mimetype);
    const key = `business-pages/${page.businessId}/${slot}${ext}`;
    const { url } = await this.storageService.uploadFileAtKey(
      file.buffer,
      key,
      file.mimetype,
    );
    return { url };
  }

  async uploadLogo(
    pageId: string,
    userId: string,
    file: Express.Multer.File,
  ): Promise<{ url: string }> {
    return this.uploadImage(pageId, userId, file, 'logo');
  }

  async uploadCover(
    pageId: string,
    userId: string,
    file: Express.Multer.File,
  ): Promise<{ url: string }> {
    return this.uploadImage(pageId, userId, file, 'cover');
  }
}
