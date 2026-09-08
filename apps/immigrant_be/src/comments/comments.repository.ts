import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import {
  type BusinessPageStatus,
  CommentStatus,
  Prisma,
} from '../../../../generated/prisma';
import { CommentTarget } from './dto/comment-target';

/** The statuses in which a business page is live for a reader. */
const LIVE_PAGE_STATUSES: BusinessPageStatus[] = [
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
 * A queued comment, with enough of its target to name the page it landed on.
 * The queue is about the person, so it has to say *which* of their pages each
 * row belongs to — a bare list of comments would be unreadable.
 */
const inboxSelect = {
  ...commentSelect,
  postId: true,
  businessId: true,
  eventId: true,
  itineraryId: true,
  business: {
    select: {
      name: true,
      businessType: true,
      businessPage: { select: { slug: true, status: true } },
    },
  },
  event: { select: { title: true, slug: true } },
  itinerary: { select: { title: true, slug: true } },
  post: { select: { title: true, slug: true } },
  _count: { select: { reports: true } },
} satisfies Prisma.CommentSelect;

export type InboxCommentRow = Prisma.CommentGetPayload<{
  select: typeof inboxSelect;
}>;

/** The column that holds each target, for a `where` built from a name. */
function targetField(target: CommentTarget): string {
  switch (target) {
    case CommentTarget.POST:
      return 'postId';
    case CommentTarget.BUSINESS:
      return 'businessId';
    case CommentTarget.EVENT:
      return 'eventId';
    case CommentTarget.ITINERARY:
      return 'itineraryId';
  }
}

/**
 * Who owns the thing being commented on, when there is one.
 *
 * `null` for a blog post: the newsroom is the owner, and the newsroom is the
 * admin. The distinction matters at moderation time and nowhere else.
 */
export type CommentTargetOwner = {
  ownerId: string | null;
  /**
   * What the target is called and where it lives, read once at write time.
   * A notification is a photograph of the moment: renaming the target later
   * does not rewrite the notice that announced a comment on it.
   */
  title: string;
  /** `null` when the target has no public page of its own yet. */
  path: string | null;
};

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
          select: { title: true, slug: true },
        });
        // The newsroom owns the blog, and the newsroom is the admin — there is
        // no single person to hand the queue to.
        return post
          ? { ownerId: null, title: post.title, path: `/blog/${post.slug}` }
          : null;
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
          select: {
            userId: true,
            name: true,
            businessType: true,
            businessPage: { select: { slug: true, status: true } },
          },
        });
        if (!business) return null;

        const page = business.businessPage;
        const live =
          page && LIVE_PAGE_STATUSES.includes(page.status) ? page.slug : null;

        return {
          ownerId: business.userId,
          title: business.name,
          path: live
            ? `/my-city/pg/${business.businessType.toLowerCase()}/${live}`
            : null,
        };
      }
      case CommentTarget.EVENT: {
        const event = await this.prisma.communityEvent.findFirst({
          where: { id: targetId, status: 'APPROVED' },
          select: { organizerId: true, title: true, slug: true },
        });
        return event
          ? {
              ownerId: event.organizerId,
              title: event.title,
              path: `/events/${event.slug}`,
            }
          : null;
      }
      case CommentTarget.ITINERARY: {
        const itinerary = await this.prisma.itinerary.findFirst({
          where: { id: targetId, isPublic: true },
          select: { userId: true, title: true, slug: true },
        });
        return itinerary
          ? {
              ownerId: itinerary.userId,
              title: itinerary.title,
              path: `/itineraries/${itinerary.slug}`,
            }
          : null;
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

  /**
   * Everything waiting on anything this person owns, newest last.
   *
   * One query across the four surfaces, because the queue is about the person
   * and not about which of their pages a comment landed on. `PENDING` first:
   * the queue exists to be emptied, and what has already been answered belongs
   * below what has not.
   */
  async listInbox(
    userId: string,
    options: {
      skip: number;
      take: number;
      status?: CommentStatus;
      target?: CommentTarget;
      targetId?: string;
    },
  ): Promise<{ data: InboxCommentRow[]; total: number }> {
    const where: Prisma.CommentWhereInput = {
      deletedAt: null,
      ...(options.status ? { status: options.status } : {}),
      /*
       * Narrowing to one page is a filter on top of ownership, never instead of
       * it: a `targetId` somebody else owns has to answer with nothing rather
       * than with their queue.
       */
      ...(options.target && options.targetId
        ? this.targetWhere(options.target, options.targetId)
        : {}),
      OR: [
        { business: { userId } },
        { event: { organizerId: userId } },
        { itinerary: { userId } },
      ],
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.comment.findMany({
        where,
        orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
        skip: options.skip,
        take: options.take,
        select: inboxSelect,
      }),
      this.prisma.comment.count({ where }),
    ]);

    return { data, total };
  }

  /**
   * A comment plus who is allowed to decide about it.
   *
   * The owner travels with the row rather than being looked up afterwards: a
   * second read is a second chance for the two to disagree about which target
   * the comment is on.
   */
  findForModeration(id: string) {
    return this.prisma.comment.findUnique({
      where: { id },
      select: {
        ...commentSelect,
        postId: true,
        businessId: true,
        eventId: true,
        itineraryId: true,
        business: {
          select: {
            userId: true,
            name: true,
            businessType: true,
            businessPage: { select: { slug: true, status: true } },
          },
        },
        event: { select: { organizerId: true, title: true, slug: true } },
        itinerary: { select: { userId: true, title: true, slug: true } },
        post: { select: { title: true, slug: true } },
      },
    });
  }

  /**
   * Where a business page lives publicly, or `null` while it is not published.
   *
   * Exported so the service can build the same path the listing read builds,
   * from a row it already has, instead of asking for the business again.
   */
  static livePagePath(business: {
    businessType: string;
    businessPage: { slug: string; status: BusinessPageStatus } | null;
  }): string | null {
    const page = business.businessPage;
    if (!page || !LIVE_PAGE_STATUSES.includes(page.status)) return null;
    return `/my-city/pg/${business.businessType.toLowerCase()}/${page.slug}`;
  }

  setStatus(
    id: string,
    status: CommentStatus,
    moderatedById: string,
    moderationReason: string | null,
  ): Promise<CommentRow> {
    return this.prisma.comment.update({
      where: { id },
      data: {
        status,
        moderatedAt: new Date(),
        moderatedById,
        moderationReason,
      },
      select: commentSelect,
    });
  }

  /**
   * How many comments are waiting on this person's pages.
   *
   * Its own query and not the inbox's `total`, because the badge is read on
   * every screen and the list is read on one.
   */
  countPending(
    userId: string,
    scope?: { target: CommentTarget; targetId: string },
  ): Promise<number> {
    return this.prisma.comment.count({
      where: {
        status: CommentStatus.PENDING,
        deletedAt: null,
        ...(scope ? this.targetWhere(scope.target, scope.targetId) : {}),
        OR: [
          { business: { userId } },
          { event: { organizerId: userId } },
          { itinerary: { userId } },
        ],
      },
    });
  }

  /** The admin's view: every surface, filterable, the blog included. */
  async listForAdmin(options: {
    skip: number;
    take: number;
    status?: CommentStatus;
    target?: CommentTarget;
    targetId?: string;
    reported?: boolean;
  }): Promise<{ data: InboxCommentRow[]; total: number }> {
    const where: Prisma.CommentWhereInput = {
      ...(options.status ? { status: options.status } : {}),
      /*
       * `reported=false` is not "everything" — it is what nobody has flagged.
       * Treating it as no filter would make the parameter mean two things
       * depending on which value it carried.
       */
      ...(options.reported === undefined
        ? {}
        : options.reported
          ? { reports: { some: {} } }
          : { reports: { none: {} } }),
      ...(options.target && options.targetId
        ? this.targetWhere(options.target, options.targetId)
        : options.target
          ? { [targetField(options.target)]: { not: null } }
          : {}),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.comment.findMany({
        where,
        orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
        skip: options.skip,
        take: options.take,
        select: inboxSelect,
      }),
      this.prisma.comment.count({ where }),
    ]);

    return { data, total };
  }

  createReport(commentId: string, reason: string): Promise<{ id: string }> {
    return this.prisma.commentReport.create({
      data: { commentId, reason },
      select: { id: true },
    });
  }

  /** Only what is published: reporting a comment nobody can read is nothing. */
  findReportableById(id: string): Promise<{ id: string } | null> {
    return this.prisma.comment.findFirst({
      where: { id, status: CommentStatus.APPROVED, deletedAt: null },
      select: { id: true },
    });
  }

  /** The root a reply hangs off, and who wrote it. */
  findRootAuthor(id: string) {
    return this.prisma.comment.findUnique({
      where: { id },
      select: { id: true, authorId: true, deletedAt: true },
    });
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
