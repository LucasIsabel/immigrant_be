import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { StorageService } from '@app/storage';
import { CommentStatus } from '../../../../generated/prisma';
import {
  ALLOWED_COMMENT_IMAGE_MIMES,
  MAX_COMMENT_IMAGE_SIZE,
  PHOTO_TARGETS,
} from './comments.constants';
import { CommentsRepository, type CommentRow } from './comments.repository';
import { CommentTarget } from './dto/comment-target';
import type { CreateCommentDto } from './dto/create-comment.dto';
import type { ListCommentsQueryDto } from './dto/list-comments-query.dto';
import type {
  CommentDto,
  PaginatedCommentsResponseDto,
} from './dto/comment-response.dto';

const FALLBACK_AUTHOR_NAME = 'Utilizador';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);

  constructor(
    private readonly repository: CommentsRepository,
    private readonly storage: StorageService,
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

    const comment = await this.repository.create({
      id,
      authorId,
      body: dto.body,
      imageUrl,
      parentId: dto.parentId ?? null,
      status: file ? CommentStatus.PENDING : CommentStatus.APPROVED,
      ...this.repository.targetColumn(dto.target, dto.targetId),
    });

    return this.toDto(comment, authorId);
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
