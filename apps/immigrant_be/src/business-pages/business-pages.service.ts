import {
  BadRequestException,
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
import { BusinessPageStatus } from '../../../../generated/prisma';
import { BusinessPagesRepository } from './business-pages.repository';
import { PublisherQualificationService } from '../publisher-qualification/publisher-qualification.service';
import { CreateBusinessPageDto } from './dto/create-business-page.dto';
import { UpdateBusinessPageContentDto } from './dto/update-business-page-content.dto';
import { SubmitBusinessPageResponseDto } from './dto/submit-business-page-response.dto';
import { RejectBusinessPageDto } from './dto/reject-business-page.dto';
import { StorageService } from '@app/storage';

@Injectable()
export class BusinessPagesService {
  constructor(
    private readonly repository: BusinessPagesRepository,
    private readonly emailService: EmailService,
    private readonly qualificationService: PublisherQualificationService,
    private readonly storageService: StorageService,
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
