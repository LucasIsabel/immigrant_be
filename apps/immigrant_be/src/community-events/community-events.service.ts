import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { StorageService } from '@app/storage';
import { CommunityEventStatus } from '../../../../generated/prisma';
import {
  ALLOWED_IMAGE_MIMES,
  COMMUNITY_EVENT_TERMS_VERSION,
  MAX_EVENT_GALLERY_IMAGES,
  MAX_IMAGE_SIZE,
  MAX_PENDING_EVENTS_PER_ORGANIZER,
} from './community-events.constants';
import { buildEventSlugBase, localDateStamp } from './community-event-slug';
import {
  CommunityEventsRepository,
  type CommunityEventWithCounts,
  type CommunityEventWithReports,
  type PublicCommunityEventRow,
} from './community-events.repository';
import { CreateCommunityEventDto } from './dto/create-community-event.dto';
import { UpdateCommunityEventDto } from './dto/update-community-event.dto';
import { RejectCommunityEventDto } from './dto/reject-community-event.dto';
import { ReportCommunityEventDto } from './dto/report-community-event.dto';
import { RemoveEventImageDto } from './dto/remove-event-image.dto';
import { ListCommunityEventsQueryDto } from './dto/list-community-events-query.dto';
import {
  CommunityEventWhen,
  ListPublicCommunityEventsQueryDto,
} from './dto/list-public-community-events-query.dto';
import {
  CommunityEventResponseDto,
  PaginatedCommunityEventsResponseDto,
} from './dto/community-event-response.dto';
import {
  PaginatedPublicCommunityEventsResponseDto,
  PublicCommunityEventDto,
} from './dto/public-community-event.dto';
import {
  UploadEventGalleryImageResponseDto,
  UploadEventImageResponseDto,
} from './dto/upload-event-image-response.dto';
import { ReportCommunityEventResponseDto } from './dto/report-community-event-response.dto';

/** Business page statuses whose approved content is live on the site. */
const LIVE_PAGE_STATUSES = new Set(['APPROVED', 'APPROVED_WITH_PENDING']);

@Injectable()
export class CommunityEventsService {
  private readonly logger = new Logger(CommunityEventsService.name);

  constructor(
    private readonly repository: CommunityEventsRepository,
    private readonly storageService: StorageService,
  ) {}

  // ── Organizer ──────────────────────────────────────────────────────

  async create(
    organizerId: string,
    dto: CreateCommunityEventDto,
  ): Promise<CommunityEventResponseDto> {
    if (dto.termsVersion !== COMMUNITY_EVENT_TERMS_VERSION) {
      throw new BadRequestException('Termos desatualizados');
    }

    const startsAt = new Date(dto.startsAt);
    const endsAt = dto.endsAt ? new Date(dto.endsAt) : null;
    this.assertSchedule(startsAt, endsAt);
    this.assertContact(dto.contactEmail, dto.contactPhone);

    const pending = await this.repository.countPendingByOrganizer(organizerId);
    if (pending >= MAX_PENDING_EVENTS_PER_ORGANIZER) {
      throw new ConflictException(
        'Você já tem eventos demais aguardando análise',
      );
    }

    await this.assertBusinessUsable(dto.businessId, dto.city);

    const slug = await this.buildUniqueSlug(dto.title, startsAt, dto.timezone);

    const created = await this.repository.create({
      organizerId,
      slug,
      title: dto.title,
      description: dto.description,
      category: dto.category,
      startsAt,
      endsAt,
      timezone: dto.timezone,
      countryCode: dto.countryCode,
      city: dto.city,
      venueName: dto.venueName,
      venueAddress: dto.venueAddress,
      lat: dto.lat,
      lng: dto.lng,
      businessId: dto.businessId ?? null,
      contactEmail: dto.contactEmail ?? null,
      contactPhone: dto.contactPhone ?? null,
      isFree: dto.isFree,
      priceNote: dto.isFree ? null : (dto.priceNote ?? null),
      externalUrl: dto.externalUrl ?? null,
      minAge: dto.minAge ?? null,
      termsVersion: dto.termsVersion,
      termsAcceptedAt: new Date(),
      status: 'DRAFT',
    });

    return this.toOwnerResponse(created);
  }

  async listMine(
    organizerId: string,
    query: ListCommunityEventsQueryDto,
  ): Promise<PaginatedCommunityEventsResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const { data, total } = await this.repository.listByOrganizer(
      organizerId,
      query.status,
      (page - 1) * limit,
      limit,
    );

    return {
      data: data.map((event) => this.toOwnerResponse(event)),
      total,
      page,
      limit,
    };
  }

  async getMine(
    id: string,
    organizerId: string,
  ): Promise<CommunityEventResponseDto> {
    return this.toOwnerResponse(await this.requireOwned(id, organizerId));
  }

  /**
   * Editing an approved event sends it back to review — the decision that keeps
   * the moderation promise honest. A page that was checked and then rewritten
   * was never checked.
   */
  async update(
    id: string,
    organizerId: string,
    dto: UpdateCommunityEventDto,
  ): Promise<CommunityEventResponseDto> {
    const event = await this.requireOwned(id, organizerId);

    if (event.status === 'PENDING_REVIEW') {
      throw new ConflictException('Evento em análise não pode ser editado');
    }
    if (event.status === 'CANCELLED') {
      throw new ConflictException('Evento cancelado não pode ser editado');
    }

    const title = dto.title ?? event.title;
    const timezone = dto.timezone ?? event.timezone;
    const startsAt = dto.startsAt ? new Date(dto.startsAt) : event.startsAt;
    // Three answers, not two: `undefined` leaves the field alone and `null`
    // clears it. Every optional field on the update DTO reads this way.
    const endsAt =
      dto.endsAt === undefined
        ? event.endsAt
        : dto.endsAt === null
          ? null
          : new Date(dto.endsAt);
    const contactEmail =
      dto.contactEmail === undefined ? event.contactEmail : dto.contactEmail;
    const contactPhone =
      dto.contactPhone === undefined ? event.contactPhone : dto.contactPhone;
    const city = dto.city ?? event.city;
    const businessId =
      dto.businessId === undefined ? event.businessId : dto.businessId;
    const isFree = dto.isFree ?? event.isFree;
    const priceNote =
      dto.priceNote === undefined ? event.priceNote : dto.priceNote;

    const images =
      dto.images === undefined
        ? event.images
        : this.assertGalleryRearrangement(dto.images, event.images);

    // Only a *new* start date has to be in the future: forbidding an edit to an
    // event that already began would make a typo in its address unfixable.
    this.assertSchedule(startsAt, endsAt, dto.startsAt !== undefined);
    this.assertContact(contactEmail, contactPhone);
    await this.assertBusinessUsable(businessId, city);

    // The slug is the public URL. It is regenerated while the event has never
    // been public, and frozen once it has been approved — including on the
    // re-review an edit triggers, so a shared link keeps working.
    const draftLike = event.status === 'DRAFT' || event.status === 'REJECTED';
    const identityChanged =
      title !== event.title ||
      localDateStamp(startsAt, timezone) !==
        localDateStamp(event.startsAt, event.timezone);
    const slug =
      draftLike && identityChanged
        ? await this.buildUniqueSlug(title, startsAt, timezone, event.id)
        : event.slug;

    const updated = await this.repository.update(id, {
      slug,
      title,
      description: dto.description ?? event.description,
      images,
      category: dto.category ?? event.category,
      startsAt,
      endsAt,
      timezone,
      countryCode: dto.countryCode ?? event.countryCode,
      city,
      venueName: dto.venueName ?? event.venueName,
      venueAddress: dto.venueAddress ?? event.venueAddress,
      lat: dto.lat ?? event.lat,
      lng: dto.lng ?? event.lng,
      businessId: businessId ?? null,
      contactEmail: contactEmail ?? null,
      contactPhone: contactPhone ?? null,
      isFree,
      priceNote: isFree ? null : (priceNote ?? null),
      externalUrl:
        dto.externalUrl === undefined
          ? event.externalUrl
          : (dto.externalUrl ?? null),
      minAge: dto.minAge === undefined ? event.minAge : (dto.minAge ?? null),
      ...this.backToReviewPatch(event.status),
    });

    return this.toOwnerResponse(updated);
  }

  async uploadImage(
    id: string,
    organizerId: string,
    file: Express.Multer.File,
  ): Promise<UploadEventImageResponseDto> {
    this.assertUploadableImage(file);

    const event = await this.requireOwned(id, organizerId);
    if (event.status === 'CANCELLED') {
      throw new ConflictException('Evento cancelado não pode ser editado');
    }

    const key = `community-events/${event.id}/cover${this.mimeToExt(file.mimetype)}`;
    const { url } = await this.storageService.uploadFileAtKey(
      file.buffer,
      key,
      file.mimetype,
    );

    // Same rule as an edit: a new cover on an approved event is new content,
    // and new content is reviewed before it is public.
    await this.repository.update(id, {
      imageUrl: url,
      ...this.backToReviewPatch(event.status),
    });

    return { url };
  }

  /**
   * A gallery photo, appended to the end. Unlike the cover it gets its own
   * UUID: the cover is replaced, a photo is added, and a deterministic key
   * would make the second upload overwrite the first.
   */
  async uploadGalleryImage(
    id: string,
    organizerId: string,
    file: Express.Multer.File,
  ): Promise<UploadEventGalleryImageResponseDto> {
    this.assertUploadableImage(file);

    const event = await this.requireOwned(id, organizerId);
    if (event.status === 'CANCELLED') {
      throw new ConflictException('Evento cancelado não pode ser editado');
    }
    if (event.images.length >= MAX_EVENT_GALLERY_IMAGES) {
      throw new ConflictException(
        `Limite de ${MAX_EVENT_GALLERY_IMAGES} fotos`,
      );
    }

    const key = `community-events/${event.id}/gallery/${randomUUID()}${this.mimeToExt(file.mimetype)}`;
    const { url } = await this.storageService.uploadFileAtKey(
      file.buffer,
      key,
      file.mimetype,
    );

    const images = [...event.images, url];
    await this.repository.update(id, {
      images,
      ...this.backToReviewPatch(event.status),
    });

    return { url, images };
  }

  async removeGalleryImage(
    id: string,
    organizerId: string,
    dto: RemoveEventImageDto,
  ): Promise<CommunityEventResponseDto> {
    const event = await this.requireOwned(id, organizerId);
    if (event.status === 'CANCELLED') {
      throw new ConflictException('Evento cancelado não pode ser editado');
    }
    if (!event.images.includes(dto.url)) {
      throw new NotFoundException('Foto não encontrada');
    }

    const images = event.images.filter((image) => image !== dto.url);
    const updated = await this.repository.update(id, {
      images,
      ...this.backToReviewPatch(event.status),
    });

    // Best-effort: the row is the source of truth for what the page shows, and
    // a bucket that keeps an unreferenced object is a cheaper failure than an
    // event whose photo cannot be removed because R2 is having a bad minute.
    await this.deleteGalleryObject(event.id, dto.url);

    return this.toOwnerResponse(updated);
  }

  async submit(
    id: string,
    organizerId: string,
  ): Promise<CommunityEventResponseDto> {
    const event = await this.requireOwned(id, organizerId);

    if (event.status === 'PENDING_REVIEW') {
      throw new ConflictException('Evento já está em análise');
    }
    if (event.status !== 'DRAFT' && event.status !== 'REJECTED') {
      throw new ConflictException('Evento não pode ser enviado para análise');
    }
    if (!event.imageUrl) {
      throw new UnprocessableEntityException(
        'Adicione uma imagem antes de enviar o evento para análise',
      );
    }
    this.assertSchedule(event.startsAt, event.endsAt);

    const updated = await this.repository.update(id, {
      status: 'PENDING_REVIEW',
      submittedAt: new Date(),
      rejectedAt: null,
      rejectedById: null,
      rejectionReason: null,
    });

    return this.toOwnerResponse(updated);
  }

  async cancel(
    id: string,
    organizerId: string,
  ): Promise<CommunityEventResponseDto> {
    const event = await this.requireOwned(id, organizerId);

    if (event.status === 'CANCELLED') {
      throw new ConflictException('Evento já está cancelado');
    }

    return this.toOwnerResponse(
      await this.repository.update(id, { status: 'CANCELLED' }),
    );
  }

  // ── Public ─────────────────────────────────────────────────────────

  async listPublic(
    query: ListPublicCommunityEventsQueryDto,
  ): Promise<PaginatedPublicCommunityEventsResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const when = query.when ?? CommunityEventWhen.UPCOMING;
    /*
     * The three travel together or not at all.
     *
     * A radius with no origin has nothing to measure from, and an origin with
     * no radius has no reach. Filling in a default for the missing half would
     * hide events somebody asked to see, and silently — so a partial set is
     * treated as no distance filter at all.
     */
    const hasReach =
      query.lat !== undefined && query.lng !== undefined && !!query.radius;

    const filters = {
      countryCode: query.countryCode,
      city: query.city,
      when,
      ...(hasReach
        ? { lat: query.lat, lng: query.lng, radius: query.radius }
        : {}),
    };
    const skip = (page - 1) * limit;

    /*
     * A reach forces the raw path, even for `upcoming`.
     *
     * `listPublicUpcoming` is the typed Prisma query, and Haversine cannot be
     * written in a Prisma `where`. The raw builder already covers `upcoming`
     * — its window clause is simply empty — so routing there costs nothing and
     * keeps one implementation of the distance condition instead of two.
     */
    const { data, total } =
      when === CommunityEventWhen.UPCOMING && !hasReach
        ? await this.repository.listPublicUpcoming(filters, skip, limit)
        : await this.repository.listPublicByWhen(filters, skip, limit);

    return {
      data: data.map((event) => this.toPublicResponse(event)),
      total,
      page,
      limit,
    };
  }

  async getPublic(slug: string): Promise<PublicCommunityEventDto> {
    const event = await this.repository.findApprovedBySlug(slug);
    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }
    return this.toPublicResponse(event);
  }

  /**
   * Approval holds back what arrives; the report holds back what got through.
   *
   * A filled honeypot answers exactly like a real report — telling the bot it
   * was caught is telling it how to try again.
   */
  async report(
    slug: string,
    dto: ReportCommunityEventDto,
  ): Promise<ReportCommunityEventResponseDto> {
    if (dto.website) {
      return { received: true };
    }

    const event = await this.repository.findApprovedIdBySlug(slug);
    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    await this.repository.createReport(event.id, dto.reason);
    return { received: true };
  }

  // ── Admin ──────────────────────────────────────────────────────────

  async listForAdmin(
    query: ListCommunityEventsQueryDto,
  ): Promise<PaginatedCommunityEventsResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const { data, total } = await this.repository.listForAdmin(
      query.status,
      (page - 1) * limit,
      limit,
    );

    return {
      data: data.map((event) => this.toOwnerResponse(event)),
      total,
      page,
      limit,
    };
  }

  async getForAdmin(id: string): Promise<CommunityEventResponseDto> {
    const event = await this.repository.findByIdWithReports(id);
    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }
    return this.toAdminResponse(event);
  }

  async approve(
    id: string,
    adminId: string,
  ): Promise<CommunityEventResponseDto> {
    const event = await this.repository.findById(id);
    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }
    if (event.status !== 'PENDING_REVIEW') {
      throw new ConflictException('Evento não está em análise');
    }

    return this.toOwnerResponse(
      await this.repository.update(id, {
        status: 'APPROVED',
        approvedAt: new Date(),
        approvedById: adminId,
        rejectedAt: null,
        rejectedById: null,
        rejectionReason: null,
      }),
    );
  }

  /**
   * Rejection and takedown are the same act at different moments, so they are
   * the same route: `PENDING_REVIEW` turns down what never went out, `APPROVED`
   * pulls down what a report caught after the fact.
   */
  async reject(
    id: string,
    adminId: string,
    dto: RejectCommunityEventDto,
  ): Promise<CommunityEventResponseDto> {
    const event = await this.repository.findById(id);
    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }
    if (event.status !== 'PENDING_REVIEW' && event.status !== 'APPROVED') {
      throw new ConflictException('Evento não está em análise nem publicado');
    }

    return this.toOwnerResponse(
      await this.repository.update(id, {
        status: 'REJECTED',
        rejectedAt: new Date(),
        rejectedById: adminId,
        rejectionReason: dto.reason,
        approvedAt: null,
        approvedById: null,
      }),
    );
  }

  // ── Internals ──────────────────────────────────────────────────────

  private async requireOwned(
    id: string,
    organizerId: string,
  ): Promise<CommunityEventWithCounts> {
    const event = await this.repository.findByIdAndOrganizer(id, organizerId);
    if (!event) {
      // Deliberately 403 and not 404: the id space is not a directory to probe.
      throw new ForbiddenException('Acesso negado');
    }
    return event;
  }

  private assertUploadableImage(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('Nenhum ficheiro enviado.');
    }
    if (!ALLOWED_IMAGE_MIMES.has(file.mimetype)) {
      throw new BadRequestException(
        'Tipo de ficheiro não permitido. Use JPEG, PNG ou WebP.',
      );
    }
    if (file.size > MAX_IMAGE_SIZE) {
      throw new BadRequestException(
        'Ficheiro excede o tamanho máximo de 5 MB.',
      );
    }
  }

  /**
   * New content on a published event is content nobody checked, whether it
   * arrived as an edit, a new cover or a new photo. One patch, one rule.
   */
  private backToReviewPatch(
    status: CommunityEventStatus,
  ): Record<string, unknown> {
    if (status !== 'APPROVED') return {};

    return {
      status: 'PENDING_REVIEW' as CommunityEventStatus,
      submittedAt: new Date(),
      approvedAt: null,
      approvedById: null,
    };
  }

  /**
   * `PATCH` may reorder the gallery or drop photos from it, never invent them:
   * every URL has to be one this event already stores, and no URL twice. Adding
   * is what `POST /events/:id/images` is for, and a URL the server never wrote
   * would put an arbitrary origin on the page.
   */
  private assertGalleryRearrangement(
    next: string[],
    stored: string[],
  ): string[] {
    const known = new Set(stored);
    const seen = new Set<string>();

    for (const url of next) {
      if (!known.has(url) || seen.has(url)) {
        throw new BadRequestException('Galeria inválida');
      }
      seen.add(url);
    }

    return next;
  }

  /**
   * The key is the URL's path. The prefix check is what keeps a doctored row
   * from turning a photo removal into a delete of any object in the bucket.
   */
  private async deleteGalleryObject(
    eventId: string,
    url: string,
  ): Promise<void> {
    const prefix = `community-events/${eventId}/gallery/`;

    try {
      const key = new URL(url).pathname.replace(/^\/+/, '');
      if (!key.startsWith(prefix)) return;
      await this.storageService.deleteFile(key);
    } catch (error) {
      this.logger.warn(
        `Failed to delete gallery object for event ${eventId}: ${String(error)}`,
      );
    }
  }

  private assertSchedule(
    startsAt: Date,
    endsAt: Date | null,
    requireFuture = true,
  ): void {
    if (Number.isNaN(startsAt.getTime())) {
      throw new BadRequestException('Data de início inválida');
    }
    if (requireFuture && startsAt.getTime() <= Date.now()) {
      throw new BadRequestException('O evento precisa começar no futuro');
    }
    if (endsAt && endsAt.getTime() < startsAt.getTime()) {
      throw new BadRequestException(
        'O término do evento não pode ser anterior ao início',
      );
    }
  }

  private assertContact(
    contactEmail?: string | null,
    contactPhone?: string | null,
  ): void {
    if (!contactEmail && !contactPhone) {
      throw new BadRequestException(
        'Informe um e-mail ou telefone de contacto do evento',
      );
    }
  }

  private async assertBusinessUsable(
    businessId: string | null | undefined,
    city: string,
  ): Promise<void> {
    if (!businessId) return;

    const business = await this.repository.findBusinessForEvent(businessId);
    if (!business) {
      throw new BadRequestException('Negócio não encontrado');
    }
    if (!business.isPublic) {
      throw new BadRequestException('Negócio não está público');
    }
    if (business.city.trim().toLowerCase() !== city.trim().toLowerCase()) {
      throw new BadRequestException('Negócio não está na cidade do evento');
    }
  }

  private async buildUniqueSlug(
    title: string,
    startsAt: Date,
    timezone: string,
    exceptId?: string,
  ): Promise<string> {
    const base = buildEventSlugBase(title, startsAt, timezone);

    let candidate = base;
    for (let attempt = 2; attempt <= 50; attempt++) {
      if (!(await this.repository.isSlugTaken(candidate, exceptId))) {
        return candidate;
      }
      candidate = `${base}-${attempt}`;
    }

    // Fifty events with the same title on the same day is not a collision, it
    // is a robot; a random suffix keeps the write from looping forever.
    return `${base}-${Math.random().toString(36).slice(2, 8)}`;
  }

  private mimeToExt(mimeType: string): string {
    const map: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
    };
    return map[mimeType] ?? '';
  }

  /**
   * Field by field, and not a spread: `approvedById`/`rejectedById` name the
   * moderator who acted, and the organizer has no business reading that.
   */
  private toOwnerResponse(
    event: CommunityEventWithCounts,
  ): CommunityEventResponseDto {
    return {
      id: event.id,
      slug: event.slug,
      title: event.title,
      description: event.description,
      imageUrl: event.imageUrl,
      images: event.images,
      category: event.category,
      startsAt: event.startsAt,
      endsAt: event.endsAt,
      timezone: event.timezone,
      countryCode: event.countryCode,
      city: event.city,
      venueName: event.venueName,
      venueAddress: event.venueAddress,
      lat: event.lat,
      lng: event.lng,
      businessId: event.businessId,
      contactEmail: event.contactEmail,
      contactPhone: event.contactPhone,
      isFree: event.isFree,
      priceNote: event.priceNote,
      externalUrl: event.externalUrl,
      minAge: event.minAge,
      termsVersion: event.termsVersion,
      termsAcceptedAt: event.termsAcceptedAt,
      status: event.status,
      submittedAt: event.submittedAt,
      approvedAt: event.approvedAt,
      rejectedAt: event.rejectedAt,
      rejectionReason: event.rejectionReason,
      reportCount: event._count.reports,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }

  private toAdminResponse(
    event: CommunityEventWithReports,
  ): CommunityEventResponseDto {
    return { ...this.toOwnerResponse(event), reports: event.reports };
  }

  private toPublicResponse(
    event: PublicCommunityEventRow,
  ): PublicCommunityEventDto {
    const { organizer, business, ...rest } = event;

    return {
      ...rest,
      organizerName: organizer.name,
      venue: business
        ? {
            businessId: business.id,
            name: business.name,
            pageSlug:
              business.businessPage &&
              LIVE_PAGE_STATUSES.has(business.businessPage.status)
                ? business.businessPage.slug
                : null,
          }
        : null,
    };
  }
}
