import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { Prisma, PlaceReviewStatus } from '../../../../generated/prisma';
import { normalizeCity } from '../business/city-key';

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
      // A place has no page of ours; the public card links to it by the triple
      // that identifies it, since `slug` alone is not unique across cities.
      slug: true,
      countryCode: true,
      city: true,
    },
  },
  business: {
    select: {
      id: true,
      name: true,
      lat: true,
      lng: true,
      isPublic: true,
      // A stop is a stop: to whoever reads the itinerary a restaurant is a
      // place with a photo, and a business one was the only kind that had
      // none. The owner's own photos are what the business card already
      // shows, so there is nothing new to moderate here.
      photos: true,
      // Only an approved page is reachable, and only then is the slug worth
      // handing out — `businessPublicPageHref` on the client says the same.
      businessPage: { select: { slug: true, status: true } },
    },
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
  sourceItineraryId: true,
  copiedAt: true,
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
    countryCode?: string,
  ): Promise<[ItineraryRow[], number]> {
    const where = { userId, ...(countryCode ? { countryCode } : {}) };

    return this.prisma.$transaction([
      this.prisma.itinerary.findMany({
        where,
        select: itinerarySelect,
        // Most recently touched first, which is also what makes the picker's
        // pre-selected option right without any state of its own.
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.itinerary.count({ where }),
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

  /**
   * How many itineraries this person wrote in this country.
   *
   * `sourceItineraryId: null` is the whole of "created rather than copied" —
   * see the column's comment in the schema for why that stays true even after
   * the source is deleted.
   */
  countCreatedInCountry(userId: string, countryCode: string): Promise<number> {
    return this.prisma.itinerary.count({
      where: { userId, countryCode, sourceItineraryId: null },
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

  /**
   * A whole itinerary and its stops, in one write.
   *
   * The nested `create` is deliberate: Prisma runs it as a single transaction,
   * so there is no window in which the copy exists with none of its stops —
   * and a reader who lands on the dashboard mid-copy would otherwise find an
   * empty itinerary and no way to tell it from a broken one.
   *
   * Positions are assigned here from the array order, so the caller decides
   * the order by the order it passes and never by writing numbers.
   */
  /** The reader's copy of one source, if they have one. */
  findCopyOf(
    userId: string,
    sourceItineraryId: string,
  ): Promise<ItineraryRow | null> {
    return this.prisma.itinerary.findUnique({
      where: { userId_sourceItineraryId: { userId, sourceItineraryId } },
      select: itinerarySelect,
    });
  }

  copy(data: {
    userId: string;
    slug: string;
    title: string;
    countryCode: string;
    sourceItineraryId: string;
    stops: {
      placeId: string | null;
      businessId: string | null;
      city: string;
      cityKey: string;
    }[];
  }): Promise<ItineraryRow> {
    const { stops, ...itinerary } = data;

    return this.prisma.$transaction(async (tx) => {
      const created = await tx.itinerary.create({
        data: {
          ...itinerary,
          stops: {
            create: stops.map((stop, index) => ({
              ...stop,
              position: index + 1,
            })),
          },
        },
        select: { id: true },
      });

      await this.stampCopiedAt(tx, created.id);

      return tx.itinerary.findUniqueOrThrow({
        where: { id: created.id },
        select: itinerarySelect,
      });
    });
  }

  /**
   * Replace a copy's stops with the source's, keeping the copy itself.
   *
   * One transaction, because a copy seen between the delete and the insert is
   * an itinerary that lost its stops — indistinguishable, to whoever is
   * looking, from the destruction the confirmation was warning about.
   *
   * `id`, `slug` and `isPublic` are untouched on purpose: the copy belongs to
   * the person who made it, and if they published it, the link they shared has
   * to keep resolving and start showing the new version — which is what
   * "update" means.
   */
  /**
   * Make `copied_at` exactly `updated_at`, so "edited since" needs no window.
   *
   * The two are written by different hands — the service names one, Prisma
   * names the other — and comparing them across that gap forces a tolerance,
   * which then has to be wrong in one of two directions: too tight and a fresh
   * copy claims its owner already edited it; too loose and a real edit made
   * seconds after copying is swallowed, so the dialog promises nothing will be
   * lost while something is. Measured at 149 ms on a real copy-then-rename.
   *
   * Raw, because Prisma's `@updatedAt` would bump the very column being read.
   */
  private stampCopiedAt(
    tx: Prisma.TransactionClient,
    id: string,
  ): Promise<number> {
    return tx.$executeRaw`
      UPDATE "itineraries" SET "copied_at" = "updated_at" WHERE "id" = ${id}::uuid
    `;
  }

  overwriteCopy(
    id: string,
    data: {
      title: string;
      stops: {
        placeId: string | null;
        businessId: string | null;
        city: string;
        cityKey: string;
      }[];
    },
  ): Promise<ItineraryRow> {
    return this.prisma.$transaction(async (tx) => {
      await tx.itineraryStop.deleteMany({ where: { itineraryId: id } });

      await tx.itinerary.update({
        where: { id },
        data: {
          title: data.title,
          stops: {
            create: data.stops.map((stop, index) => ({
              ...stop,
              position: index + 1,
            })),
          },
        },
        select: { id: true },
      });

      await this.stampCopiedAt(tx, id);

      return tx.itinerary.findUniqueOrThrow({
        where: { id },
        select: itinerarySelect,
      });
    });
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

  /**
   * Removing a stop changes the itinerary, so the itinerary says so.
   *
   * `updatedAt` is read by two things that were quietly wrong without this:
   * the order of "my most recent itinerary in this country", which decides
   * where a quick-add lands, and `copiedAt` against `updatedAt`, which is how
   * a copy knows it has been edited since it was taken.
   */
  deleteStop(id: string, itineraryId: string): Promise<void> {
    return this.prisma
      .$transaction([
        this.prisma.itineraryStop.delete({ where: { id } }),
        this.prisma.itinerary.update({
          where: { id: itineraryId },
          data: { updatedAt: new Date() },
        }),
      ])
      .then(() => undefined);
  }

  /**
   * A stop somebody can actually reach.
   *
   * An itinerary whose stops all went out of view still exists for its owner —
   * they need to see it to fix it — but has nothing to show a visitor, so it
   * leaves the public listing entirely rather than opening onto an empty page.
   */
  private readonly availableStop = {
    OR: [
      {
        place: {
          isActive: true,
          reviewStatus: PlaceReviewStatus.APPROVED,
        },
      },
      { business: { isPublic: true } },
    ],
  } satisfies Prisma.ItineraryStopWhereInput;

  private publicWhere(filters: {
    countryCode?: string;
    city?: string;
  }): Prisma.ItineraryWhereInput {
    return {
      isPublic: true,
      ...(filters.countryCode
        ? { countryCode: filters.countryCode.toUpperCase() }
        : {}),
      /*
       * One `some`, not two.
       *
       * The city and the availability have to be satisfied by the **same**
       * stop: an itinerary that passes through Cascais by way of a business
       * its owner made private does not pass through Cascais any more, as far
       * as a visitor is concerned. Two separate `some` clauses would let one
       * stop answer for the city and another for the availability.
       */
      stops: {
        some: {
          ...this.availableStop,
          ...(filters.city ? { cityKey: normalizeCity(filters.city) } : {}),
        },
      },
    };
  }

  async listPublic(
    filters: { countryCode?: string; city?: string },
    skip: number,
    take: number,
  ): Promise<[ItineraryRow[], number]> {
    const where = this.publicWhere(filters);

    return this.prisma.$transaction([
      this.prisma.itinerary.findMany({
        where,
        select: itinerarySelect,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.itinerary.count({ where }),
    ]);
  }

  findPublicBySlug(slug: string): Promise<ItineraryRow | null> {
    return this.prisma.itinerary.findFirst({
      where: { slug, isPublic: true },
      select: itinerarySelect,
    });
  }

  createReport(itineraryId: string, reason: string): Promise<{ id: string }> {
    return this.prisma.itineraryReport.create({
      data: { itineraryId, reason },
      select: { id: true },
    });
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
      .$transaction([
        ...orderedIds.map((id, index) =>
          this.prisma.itineraryStop.update({
            where: { id, itineraryId },
            data: { position: index + 1 },
          }),
        ),
        // In the same transaction as the positions: a reorder that bumped the
        // timestamp without settling the order, or the other way round, would
        // be a lie in one of the two directions.
        this.prisma.itinerary.update({
          where: { id: itineraryId },
          data: { updatedAt: new Date() },
        }),
      ])
      .then(() => undefined);
  }
}
