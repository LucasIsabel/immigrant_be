import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { buildCommentWaitingEmail } from '@app/email';
import { NotificationsService } from '@app/notifications/notifications.service';
import { USER_NOTIFICATION_TYPES } from '@app/notifications/notification-types';
import { StorageService } from '@app/storage';
import { env } from '@app/config';
import {
  type BusinessPageStatus,
  CommentStatus,
} from '../../../../generated/prisma';
import {
  ALLOWED_COMMENT_IMAGE_MIMES,
  COMMENT_EXCERPT_LENGTH,
  commentQueuePath,
  MAX_COMMENT_IMAGE_SIZE,
  PHOTO_TARGETS,
} from './comments.constants';
import {
  CommentsRepository,
  type CommentRow,
  type InboxCommentRow,
} from './comments.repository';
import { CommentTarget } from './dto/comment-target';
import type { CreateCommentDto } from './dto/create-comment.dto';
import type { ListCommentsQueryDto } from './dto/list-comments-query.dto';
import type {
  CommentDto,
  PaginatedCommentsResponseDto,
} from './dto/comment-response.dto';
import type {
  InboxCommentDto,
  PaginatedInboxResponseDto,
} from './dto/inbox-comment.dto';
import type {
  AdminCommentsQueryDto,
  InboxQueryDto,
} from './dto/moderate-comment.dto';
import type { ReportCommentDto } from './dto/report-comment.dto';

const FALLBACK_AUTHOR_NAME = 'Utilizador';

/** The part of a comment row that says which of the four targets it is on. */
type TargetOfComment = {
  postId: string | null;
  businessId: string | null;
  eventId: string | null;
  itineraryId: string | null;
  post: { title: string; slug: string } | null;
  business: {
    name: string;
    businessType: string;
    businessPage: { slug: string; status: BusinessPageStatus } | null;
  } | null;
  event: { title: string; slug: string } | null;
  itinerary: { title: string; slug: string } | null;
};

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);

  constructor(
    private readonly repository: CommentsRepository,
    private readonly storage: StorageService,
    private readonly notifications: NotificationsService,
  ) {}

  async list(
    query: ListCommentsQueryDto,
    viewerId?: string,
  ): Promise<PaginatedCommentsResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const { data, total } = await this.repository.listRoots(
      query.target,
      query.targetId,
      { skip: (page - 1) * limit, take: limit, viewerId },
    );

    return {
      data: data.map((root) => ({
        ...this.toDto(root, viewerId),
        replies: root.replies.map((reply) => this.toDto(reply, viewerId)),
      })),
      total,
      page,
      limit,
    };
  }

  /**
   * Only a comment carrying a photo waits for the owner.
   *
   * A wrong photo sits on somebody's page looking like it belongs there, which
   * text does not; and a queue that only fills with photos is a queue somebody
   * actually reads. The comment waits whole — the text does not appear first
   * and gain its image later, because that changes a comment under the eyes of
   * somebody who already read it.
   */
  async create(
    authorId: string,
    dto: CreateCommentDto,
    file?: Express.Multer.File,
  ): Promise<CommentDto> {
    const target = await this.repository.findVisibleTarget(
      dto.target,
      dto.targetId,
    );
    if (!target) {
      throw new NotFoundException('Conteúdo não encontrado.');
    }

    if (file && !PHOTO_TARGETS.has(dto.target)) {
      throw new BadRequestException(
        'Comentários de artigos não aceitam fotografia.',
      );
    }
    if (file) {
      this.assertUploadableImage(file);
    }

    if (dto.parentId) {
      await this.assertRepliableParent(dto.parentId, dto);
    }

    /*
     * The id is drawn before the insert so the storage key is known without a
     * second write. An upload that fails then leaves nothing behind — the row
     * is never created — instead of a comment pointing at an object that is
     * not there.
     */
    const id = randomUUID();
    const imageUrl = file ? await this.uploadPhoto(id, file) : null;

    /*
     * A photo posted by the very person who would have to release it has
     * nobody left to wait for. Sending it to their own queue would be asking
     * them to approve themselves.
     */
    const waits = Boolean(file) && target.ownerId !== authorId;

    const comment = await this.repository.create({
      id,
      authorId,
      body: dto.body,
      imageUrl,
      parentId: dto.parentId ?? null,
      status: waits ? CommentStatus.PENDING : CommentStatus.APPROVED,
      ...this.repository.targetColumn(dto.target, dto.targetId),
    });

    if (waits && target.ownerId) {
      await this.notifyOwnerOfWaitingComment(comment, dto, target.ownerId, {
        title: target.title,
      });
    }

    if (!waits && dto.parentId) {
      await this.notifyRootAuthorOfReply(comment, dto, target, authorId);
    }

    return this.toDto(comment, authorId);
  }

  /**
   * Everything waiting on anything this person owns.
   *
   * `pendingCount` travels with the page rather than being counted from it:
   * the badge has to say how many are waiting in total, and the page only
   * knows about the twenty rows it carries.
   */
  async inbox(
    userId: string,
    query: InboxQueryDto,
  ): Promise<PaginatedInboxResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    /*
     * The badge counts the same slice the list shows. A queue that lives inside
     * one business must not carry a number from the owner's other one.
     */
    const scope =
      query.target && query.targetId
        ? { target: query.target, targetId: query.targetId }
        : undefined;

    const [{ data, total }, pendingCount] = await Promise.all([
      this.repository.listInbox(userId, {
        skip: (page - 1) * limit,
        take: limit,
        status: query.status,
        target: query.target,
        targetId: query.targetId,
      }),
      this.repository.countPending(userId, scope),
    ]);

    return {
      data: data.map((row) => this.toInboxDto(row, userId)),
      total,
      pendingCount,
      page,
      limit,
    };
  }

  async adminList(
    query: AdminCommentsQueryDto,
  ): Promise<PaginatedInboxResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const { data, total } = await this.repository.listForAdmin({
      skip: (page - 1) * limit,
      take: limit,
      status: query.status,
      target: query.target,
      targetId: query.targetId,
      reported: query.reported,
    });

    return {
      data: data.map((row) => this.toInboxDto(row)),
      total,
      pendingCount: data.filter((row) => row.status === CommentStatus.PENDING)
        .length,
      page,
      limit,
    };
  }

  async approve(
    id: string,
    moderatorId: string,
    isAdmin: boolean,
  ): Promise<CommentDto> {
    const comment = await this.requireModeratable(id, moderatorId, isAdmin);

    const updated = await this.repository.setStatus(
      id,
      CommentStatus.APPROVED,
      moderatorId,
      null,
    );

    const where = this.describeTarget(comment);
    await this.notifications.notify({
      userId: comment.author.id,
      type: USER_NOTIFICATION_TYPES.COMMENT_APPROVED,
      payload: { commentId: id, ...where },
    });

    /*
     * A reply held back for its photo still owes the person it answers a
     * notice, and it only owes it once it is actually public.
     */
    if (comment.parentId) {
      await this.notifyRootAuthorOfApprovedReply(
        id,
        comment.parentId,
        comment.author,
        updated.body,
        where,
      );
    }

    return this.toDto(updated, comment.author.id);
  }

  async reject(
    id: string,
    moderatorId: string,
    isAdmin: boolean,
    reason: string | null,
  ): Promise<CommentDto> {
    const comment = await this.requireModeratable(id, moderatorId, isAdmin);

    const updated = await this.repository.setStatus(
      id,
      CommentStatus.REJECTED,
      moderatorId,
      reason,
    );

    await this.notifications.notify({
      userId: comment.author.id,
      type: USER_NOTIFICATION_TYPES.COMMENT_REJECTED,
      payload: { commentId: id, ...this.describeTarget(comment), reason },
    });

    return this.toDto(updated, comment.author.id);
  }

  /**
   * Somebody flags a published comment, without signing in.
   *
   * Anonymous by design, in the mould of the review and event reports: whoever
   * is reading a business page is usually not signed in, and asking them to
   * make an account before they can flag defamation is how the flag never
   * arrives. A honeypot and a tight throttle carry the abuse load.
   *
   * A filled honeypot answers exactly like a real report. Telling a bot it was
   * caught is telling it how to try again.
   */
  async report(
    id: string,
    dto: ReportCommentDto,
  ): Promise<{ received: boolean }> {
    if (dto.website) {
      return { received: true };
    }

    // Only what is published: reporting a comment nobody can read is nothing,
    // and answering differently would say whether a hidden one exists.
    const comment = await this.repository.findReportableById(id);
    if (!comment) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    await this.repository.createReport(id, dto.reason);
    return { received: true };
  }

  /** Hard delete, for what cannot stay stored at all. Admin only. */
  async adminRemove(id: string): Promise<void> {
    const comment = await this.repository.findForModeration(id);
    if (!comment) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    if (comment.imageUrl) {
      await this.deletePhoto(id, comment.imageUrl);
    }

    await this.repository.deleteById(id);
  }

  /**
   * Deleting has two shapes, and which one applies is about the replies rather
   * than about the comment.
   *
   * With nothing hanging off it, the row goes. With replies underneath, the row
   * stays as an anchor stripped of body and photo: the replies are other
   * people's, and they should not vanish because the text that prompted them
   * did.
   */
  async remove(id: string, authorId: string): Promise<void> {
    const comment = await this.repository.findOwnedById(id, authorId);
    if (!comment) {
      // A comment somebody else wrote is not a comment this person may know about.
      throw new NotFoundException('Comentário não encontrado.');
    }

    if (comment.imageUrl) {
      await this.deletePhoto(id, comment.imageUrl);
    }

    if (comment._count.replies > 0) {
      await this.repository.anonymise(id);
      return;
    }

    await this.repository.deleteById(id);
  }

  /**
   * Who is allowed to decide about this comment, and 404 for everybody else.
   *
   * The owner travels with the row, so there is no second read for the two to
   * disagree about. A blog comment has no owner — the newsroom is the admin —
   * and that is why `ownerId` can be null here without meaning "anyone".
   */
  private async requireModeratable(
    id: string,
    moderatorId: string,
    isAdmin: boolean,
  ) {
    const comment = await this.repository.findForModeration(id);
    if (!comment) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    const ownerId =
      comment.business?.userId ??
      comment.event?.organizerId ??
      comment.itinerary?.userId ??
      null;

    if (!isAdmin && ownerId !== moderatorId) {
      // 403 and not 404: the id came from the person's own queue, so denying
      // its existence would be a lie they can already disprove.
      throw new ForbiddenException('Este comentário não é seu para moderar.');
    }

    return comment;
  }

  /** Where a comment landed, in the shape every comment notification shares. */
  private describeTarget(comment: TargetOfComment) {
    if (comment.businessId) {
      return {
        target: CommentTarget.BUSINESS,
        targetId: comment.businessId,
        targetTitle: comment.business?.name ?? '',
        targetPath: comment.business
          ? CommentsRepository.livePagePath(comment.business)
          : null,
      };
    }
    if (comment.eventId) {
      return {
        target: CommentTarget.EVENT,
        targetId: comment.eventId,
        targetTitle: comment.event?.title ?? '',
        targetPath: comment.event ? `/events/${comment.event.slug}` : null,
      };
    }
    if (comment.itineraryId) {
      return {
        target: CommentTarget.ITINERARY,
        targetId: comment.itineraryId,
        targetTitle: comment.itinerary?.title ?? '',
        targetPath: comment.itinerary
          ? `/itineraries/${comment.itinerary.slug}`
          : null,
      };
    }
    return {
      target: CommentTarget.POST,
      targetId: comment.postId ?? '',
      targetTitle: comment.post?.title ?? '',
      targetPath: comment.post ? `/blog/${comment.post.slug}` : null,
    };
  }

  /**
   * Tells the owner a photo is waiting, in the bell and by e-mail.
   *
   * By e-mail as well as in the bell because a queue nobody knows about is a
   * queue nobody empties — and this one only ever fills with photos, so the
   * message stays rare enough to be worth opening.
   */
  private async notifyOwnerOfWaitingComment(
    comment: CommentRow,
    dto: CreateCommentDto,
    ownerId: string,
    target: { title: string },
  ): Promise<void> {
    const authorName = comment.author.name?.trim() || FALLBACK_AUTHOR_NAME;
    const excerpt = this.excerpt(comment.body);

    await this.notifications.notify({
      userId: ownerId,
      type: USER_NOTIFICATION_TYPES.COMMENT_RECEIVED,
      payload: {
        commentId: comment.id,
        target: dto.target,
        targetId: dto.targetId,
        targetTitle: target.title,
        targetPath: null,
        authorName,
        excerpt,
      },
      email: buildCommentWaitingEmail(
        target.title,
        authorName,
        excerpt,
        `${env.FRONTEND_URL}${commentQueuePath(dto.target, dto.targetId)}`,
      ),
    });
  }

  /**
   * Tells whoever wrote the root that somebody answered it.
   *
   * Not when they answered themselves: an owner replying to a thread would
   * otherwise notify the person they are replying to *and* nobody would ever
   * be told about their own reply, which is the wrong half of the pair.
   */
  private async notifyRootAuthorOfReply(
    comment: CommentRow,
    dto: CreateCommentDto,
    target: { title: string; path: string | null },
    authorId: string,
  ): Promise<void> {
    if (!dto.parentId) return;

    const root = await this.repository.findRootAuthor(dto.parentId);
    if (!root || root.authorId === authorId) return;

    await this.notifications.notify({
      userId: root.authorId,
      type: USER_NOTIFICATION_TYPES.COMMENT_REPLIED,
      payload: {
        commentId: comment.id,
        parentId: root.id,
        target: dto.target,
        targetId: dto.targetId,
        targetTitle: target.title,
        targetPath: target.path,
        authorName: comment.author.name?.trim() || FALLBACK_AUTHOR_NAME,
        excerpt: this.excerpt(comment.body),
      },
    });
  }

  /** The same notice, owed once a held-back reply finally becomes public. */
  private async notifyRootAuthorOfApprovedReply(
    commentId: string,
    parentId: string,
    author: { id: string; name: string | null },
    body: string,
    where: {
      target: CommentTarget;
      targetId: string;
      targetTitle: string;
      targetPath: string | null;
    },
  ): Promise<void> {
    const root = await this.repository.findRootAuthor(parentId);
    if (!root || root.authorId === author.id) return;

    await this.notifications.notify({
      userId: root.authorId,
      type: USER_NOTIFICATION_TYPES.COMMENT_REPLIED,
      payload: {
        commentId,
        parentId: root.id,
        ...where,
        authorName: author.name?.trim() || FALLBACK_AUTHOR_NAME,
        excerpt: this.excerpt(body),
      },
    });
  }

  private excerpt(body: string): string {
    return body.length > COMMENT_EXCERPT_LENGTH
      ? `${body.slice(0, COMMENT_EXCERPT_LENGTH).trimEnd()}…`
      : body;
  }

  private toInboxDto(
    row: InboxCommentRow & { replies?: CommentRow[] },
    viewerId?: string,
  ): InboxCommentDto {
    const where = this.describeTarget(row);
    return {
      ...this.toDto(row, viewerId),
      target: where.target,
      targetId: where.targetId,
      targetTitle: where.targetTitle,
      isReply: row.parentId !== null,
      reportCount: row._count.reports,
      replies: (row.replies ?? []).map((reply) => this.toDto(reply, viewerId)),
    };
  }

  /**
   * A reply hangs off a top-level comment of the same target, and off nothing
   * else. The trigger in the database refuses the second level too; this is
   * what turns that into an answer somebody can read.
   */
  private async assertRepliableParent(
    parentId: string,
    dto: CreateCommentDto,
  ): Promise<void> {
    const parent = await this.repository.findParent(parentId);
    if (!parent) {
      throw new NotFoundException('Comentário não encontrado.');
    }
    if (parent.parentId) {
      throw new BadRequestException(
        'Só um comentário de topo aceita resposta.',
      );
    }

    const parentTargetId = {
      [CommentTarget.POST]: parent.postId,
      [CommentTarget.BUSINESS]: parent.businessId,
      [CommentTarget.EVENT]: parent.eventId,
      [CommentTarget.ITINERARY]: parent.itineraryId,
    }[dto.target];

    if (parentTargetId !== dto.targetId) {
      throw new BadRequestException(
        'A resposta tem de ser no mesmo conteúdo do comentário.',
      );
    }
  }

  private async uploadPhoto(
    commentId: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const key = `comments/${commentId}/${randomUUID()}${this.mimeToExt(file.mimetype)}`;
    const { url } = await this.storage.uploadFileAtKey(
      file.buffer,
      key,
      file.mimetype,
    );
    return url;
  }

  /**
   * Best-effort, and guarded by prefix: the key is rebuilt from the comment's
   * own folder, so a stored url pointing anywhere else deletes nothing. Losing
   * an object is a stray file; deleting the wrong one is somebody else's photo.
   */
  private async deletePhoto(commentId: string, url: string): Promise<void> {
    const prefix = `comments/${commentId}/`;
    const key = url.slice(url.indexOf(prefix));

    if (!key.startsWith(prefix)) {
      this.logger.warn(
        `Skipped deleting a photo outside the folder of comment ${commentId}`,
      );
      return;
    }

    try {
      await this.storage.deleteFile(key);
    } catch (error) {
      this.logger.error(
        `Could not delete the photo of comment ${commentId}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  private assertUploadableImage(file: Express.Multer.File): void {
    if (!ALLOWED_COMMENT_IMAGE_MIMES.has(file.mimetype)) {
      throw new BadRequestException(
        'Tipo de ficheiro não permitido. Use JPEG, PNG ou WebP.',
      );
    }
    if (file.size > MAX_COMMENT_IMAGE_SIZE) {
      throw new BadRequestException(
        'Ficheiro excede o tamanho máximo de 5 MB.',
      );
    }
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
   * The name comes from the account, never from a stored copy — the same rule
   * the reviews follow, and for the same reason.
   */
  private toDto(comment: CommentRow, viewerId?: string): CommentDto {
    return {
      id: comment.id,
      author: {
        id: comment.author.id,
        name: comment.author.name?.trim() || FALLBACK_AUTHOR_NAME,
        image: comment.author.image,
      },
      body: comment.body,
      imageUrl: comment.imageUrl,
      status: comment.status,
      isDeleted: comment.deletedAt !== null,
      isMine: comment.author.id === viewerId,
      createdAt: comment.createdAt,
    };
  }
}
