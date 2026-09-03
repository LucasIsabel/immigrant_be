import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { Prisma, PlaceReviewStatus } from '../../../../generated/prisma';

/**
 * What a stop needs to be rendered, from whichever side it points at.
 *
 * An explicit `select` rather than an `include`: the stop carries somebody
 * else's aggregate, and an `include` would hand the owner every column a place
 * or a business ever grows — `userId`, `draftData`, moderation fields — the day
 * one is added.
 */
const stopSelect = {
  id: true,
  position: true,
  city: true,
  placeId: true,
  businessId: true,
  place: {
    select: {
      id: true,
      name: true,
      imageUrl: true,
      lat: true,
      lng: true,
      isActive: true,
      reviewStatus: true,
    },
  },
  business: {
    select: { id: true, name: true, lat: true, lng: true, isPublic: true },
  },
} satisfies Prisma.ItineraryStopSelect;

export type StopRow = Prisma.ItineraryStopGetPayload<{
  select: typeof stopSelect;
}>;

const itinerarySelect = {
  id: true,
  slug: true,
  title: true,
  countryCode: true,
  isPublic: true,
  createdAt: true,
  updatedAt: true,
  stops: { select: stopSelect, orderBy: { position: 'asc' } },
} satisfies Prisma.ItinerarySelect;

export type ItineraryRow = Prisma.ItineraryGetPayload<{
  select: typeof itinerarySelect;
}>;

@Injectable()
export class ItinerariesRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Ownership is part of the query, never a check after the read.
   *
   * The mold is `Plans` in `users/user.repository.ts`. Reading first and
   * comparing `userId` afterwards works until somebody forgets the second half,
   * and the failure is silent: a stranger's itinerary rendered as your own.
   * Here there is no read that could return it.
   */
  findOwned(id: string, userId: string): Promise<ItineraryRow | null> {
    return this.prisma.itinerary.findFirst({
      where: { id, userId },
      select: itinerarySelect,
    });
  }

  async listOwned(
    userId: string,
    page: number,
    limit: number,
  ): Promise<[ItineraryRow[], number]> {
    return this.prisma.$transaction([
      this.prisma.itinerary.findMany({
        where: { userId },
        select: itinerarySelect,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.itinerary.count({ where: { userId } }),
    ]);
  }

  /** The one a quick-add lands in when the caller named none. */
  findMostRecentInCountry(
    userId: string,
    countryCode: string,
  ): Promise<ItineraryRow | null> {
    return this.prisma.itinerary.findFirst({
      where: { userId, countryCode },
      select: itinerarySelect,
      orderBy: { updatedAt: 'desc' },
    });
  }

  isSlugTaken(slug: string): Promise<boolean> {
    return this.prisma.itinerary
      .count({ where: { slug } })
      .then((count) => count > 0);
  }

  create(data: {
    userId: string;
    slug: string;
    title: string;
    countryCode: string;
  }): Promise<ItineraryRow> {
    return this.prisma.itinerary.create({ data, select: itinerarySelect });
  }

  update(id: string, data: Prisma.ItineraryUpdateInput): Promise<ItineraryRow> {
    return this.prisma.itinerary.update({
      where: { id },
      data,
      select: itinerarySelect,
    });
  }

  delete(id: string): Promise<void> {
    return this.prisma.itinerary
      .delete({ where: { id } })
      .then(() => undefined);
  }

  /**
   * A place is addable while it is approved and active; a business while its
   * owner keeps it public. Both are read here rather than in the service so the
   * service never holds a row it is not allowed to show.
   */
  findAddablePlace(id: string) {
    return this.prisma.place.findFirst({
      where: { id, isActive: true, reviewStatus: PlaceReviewStatus.APPROVED },
      select: { id: true, city: true },
    });
  }

  findAddableBusiness(id: string) {
    return this.prisma.business.findFirst({
      where: { id, isPublic: true },
      select: { id: true, city: true },
    });
  }

  /**
   * Append at the end.
   *
   * `max(position) + 1` is read inside the same transaction as the insert, so
   * two taps arriving together cannot both read the same maximum. They can
   * still land on the same position — which is allowed, deliberately, and
   * settled by the next reorder.
   */
  addStop(data: {
    itineraryId: string;
    placeId: string | null;
    businessId: string | null;
    city: string;
    cityKey: string;
  }): Promise<StopRow> {
    return this.prisma.$transaction(async (tx) => {
      const last = await tx.itineraryStop.aggregate({
        where: { itineraryId: data.itineraryId },
        _max: { position: true },
      });

      const stop = await tx.itineraryStop.create({
        data: { ...data, position: (last._max.position ?? 0) + 1 },
        select: stopSelect,
      });

      // The list changed, so the itinerary did: `updatedAt` is what orders
      // "my most recent itinerary in this country", and a quick-add is exactly
      // the gesture that should promote one.
      await tx.itinerary.update({
        where: { id: data.itineraryId },
        data: { updatedAt: new Date() },
      });

      return stop;
    });
  }

  deleteStop(id: string): Promise<void> {
    return this.prisma.itineraryStop
      .delete({ where: { id } })
      .then(() => undefined);
  }

  /**
   * Rewrite every position, 1..n, in one transaction.
   *
   * Wholesale rather than a diff because a diff has to pass through states
   * where two stops share a position — which is fine here precisely because
   * there is no unique on `(itineraryId, position)`. That absence is what lets
   * this be a plain sequence of updates instead of a dance around a constraint
   * Postgres checks per statement.
   */
  reorderStops(itineraryId: string, orderedIds: string[]): Promise<void> {
    return this.prisma
      .$transaction(
        orderedIds.map((id, index) =>
          this.prisma.itineraryStop.update({
            where: { id, itineraryId },
            data: { position: index + 1 },
          }),
        ),
      )
      .then(() => undefined);
  }
}
