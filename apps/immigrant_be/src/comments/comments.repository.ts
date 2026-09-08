import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { CommentStatus, Prisma } from '../../../../generated/prisma';
import { CommentTarget } from './dto/comment-target';

/** The statuses in which a business page is live for a reader. */
const LIVE_PAGE_STATUSES: Prisma.EnumBusinessPageStatusFilter['in'] = [
  'APPROVED',
  'APPROVED_WITH_PENDING',
];

const commentSelect = {
  id: true,
  body: true,
  imageUrl: true,
  status: true,
  parentId: true,
  deletedAt: true,
  createdAt: true,
  author: { select: { id: true, name: true, image: true } },
} satisfies Prisma.CommentSelect;

export type CommentRow = Prisma.CommentGetPayload<{
  select: typeof commentSelect;
}>;

/**
 * Who owns the thing being commented on, when there is one.
 *
 * `null` for a blog post: the newsroom is the owner, and the newsroom is the
 * admin. The distinction matters at moderation time and nowhere else.
 */
export type CommentTargetOwner = { ownerId: string | null };

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  /** The `where` that pins a comment to exactly one target. */
  private targetWhere(
    target: CommentTarget,
    targetId: string,
  ): Prisma.CommentWhereInput {
    switch (target) {
      case CommentTarget.POST:
        return { postId: targetId };
      case CommentTarget.BUSINESS:
        return { businessId: targetId };
      case CommentTarget.EVENT:
        return { eventId: targetId };
      case CommentTarget.ITINERARY:
        return { itineraryId: targetId };
    }
  }

  /** The column a write fills, given the target it names. */
  targetColumn(
    target: CommentTarget,
    targetId: string,
  ): Pick<
    Prisma.CommentUncheckedCreateInput,
    'postId' | 'businessId' | 'eventId' | 'itineraryId'
  > {
    switch (target) {
      case CommentTarget.POST:
        return { postId: targetId };
      case CommentTarget.BUSINESS:
        return { businessId: targetId };
      case CommentTarget.EVENT:
        return { eventId: targetId };
      case CommentTarget.ITINERARY:
        return { itineraryId: targetId };
    }
  }

  /**
   * The target, only if a reader could have reached it.
   *
   * A draft post, a private business, an event still in review and an
   * unpublished itinerary all answer `null` — commenting on something the
   * public cannot see would be writing into a place nobody can read, and would
   * confirm that a private id exists.
   */
  async findVisibleTarget(
    target: CommentTarget,
    targetId: string,
  ): Promise<CommentTargetOwner | null> {
    switch (target) {
      case CommentTarget.POST: {
        const post = await this.prisma.blogPost.findFirst({
          where: { id: targetId, status: 'PUBLISHED' },
          select: { id: true },
        });
        return post ? { ownerId: null } : null;
      }
      case CommentTarget.BUSINESS: {
        const business = await this.prisma.business.findFirst({
          where: {
            id: targetId,
            OR: [
              { isPublic: true },
              { businessPage: { status: { in: LIVE_PAGE_STATUSES } } },
            ],
          },
          select: { userId: true },
        });
        return business ? { ownerId: business.userId } : null;
      }
      case CommentTarget.EVENT: {
        const event = await this.prisma.communityEvent.findFirst({
          where: { id: targetId, status: 'APPROVED' },
          select: { organizerId: true },
        });
        return event ? { ownerId: event.organizerId } : null;
      }
      case CommentTarget.ITINERARY: {
        const itinerary = await this.prisma.itinerary.findFirst({
          where: { id: targetId, isPublic: true },
          select: { userId: true },
        });
        return itinerary ? { ownerId: itinerary.userId } : null;
      }
    }
  }

  /**
   * A root comment is visible when it is approved and not deleted, when the
   * reader wrote it, or when it is an anchor still holding visible replies.
   *
   * The third case is why an author's deletion does not take the conversation
   * with it: the replies underneath belong to other people.
   */
  private visibleRootWhere(viewerId?: string): Prisma.CommentWhereInput {
    const replyVisible: Prisma.CommentWhereInput = {
      status: CommentStatus.APPROVED,
      deletedAt: null,
    };

    return {
      parentId: null,
      OR: [
        { status: CommentStatus.APPROVED, deletedAt: null },
        ...(viewerId ? [{ authorId: viewerId }] : []),
        { deletedAt: { not: null }, replies: { some: replyVisible } },
      ],
    };
  }

  private visibleReplyWhere(viewerId?: string): Prisma.CommentWhereInput {
    return {
      OR: [
        { status: CommentStatus.APPROVED, deletedAt: null },
        ...(viewerId ? [{ authorId: viewerId }] : []),
      ],
    };
  }

  async listRoots(
    target: CommentTarget,
    targetId: string,
    options: { skip: number; take: number; viewerId?: string },
  ): Promise<{
    data: (CommentRow & { replies: CommentRow[] })[];
    total: number;
  }> {
    const where: Prisma.CommentWhereInput = {
      ...this.targetWhere(target, targetId),
      ...this.visibleRootWhere(options.viewerId),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.comment.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: options.skip,
        take: options.take,
        select: {
          ...commentSelect,
          replies: {
            where: this.visibleReplyWhere(options.viewerId),
            orderBy: { createdAt: 'asc' },
            select: commentSelect,
          },
        },
      }),
      this.prisma.comment.count({ where }),
    ]);

    return { data, total };
  }

  create(data: Prisma.CommentUncheckedCreateInput): Promise<CommentRow> {
    return this.prisma.comment.create({ data, select: commentSelect });
  }

  /**
   * The parent a reply names, with enough of it to refuse the reply: whether
   * it is itself a reply, and which target it hangs off.
   */
  findParent(id: string) {
    return this.prisma.comment.findUnique({
      where: { id },
      select: {
        id: true,
        parentId: true,
        postId: true,
        businessId: true,
        eventId: true,
        itineraryId: true,
        deletedAt: true,
      },
    });
  }

  /**
   * Ownership is in the query, not in a check after it: a comment somebody
   * else wrote is indistinguishable from one that does not exist.
   */
  findOwnedById(id: string, authorId: string) {
    return this.prisma.comment.findFirst({
      where: { id, authorId },
      select: {
        id: true,
        imageUrl: true,
        parentId: true,
        deletedAt: true,
        _count: { select: { replies: true } },
      },
    });
  }

  deleteById(id: string): Promise<void> {
    return this.prisma.comment.delete({ where: { id } }).then(() => undefined);
  }

  /**
   * Strips a comment down to an anchor: the row stays so the replies keep
   * their place, and nothing of what was written stays with it.
   */
  anonymise(id: string): Promise<void> {
    return this.prisma.comment
      .update({
        where: { id },
        data: { deletedAt: new Date(), body: '', imageUrl: null },
      })
      .then(() => undefined);
  }
}
