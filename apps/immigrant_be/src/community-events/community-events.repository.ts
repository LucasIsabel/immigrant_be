import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { CommunityEventStatus, Prisma } from '../../../../generated/prisma';
import { boundingBox } from '../business/bounding-box';
import { CommunityEventWhen } from './dto/list-public-community-events-query.dto';

/** What the owner and the admin see: every column plus the report tally. */
const ownerInclude = {
  _count: { select: { reports: true } },
} satisfies Prisma.CommunityEventInclude;

/** The admin detail adds the reports themselves. */
const adminDetailInclude = {
  _count: { select: { reports: true } },
  reports: {
    select: { id: true, reason: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  },
} satisfies Prisma.CommunityEventInclude;

/**
 * Explicit `select`, not `include`: the public payload is a contract, and an
 * `include` would quietly leak `status`, `rejectionReason` and `termsVersion`
 * the day somebody adds a column.
 */
const publicSelect = {
  id: true,
  slug: true,
  title: true,
  description: true,
  imageUrl: true,
  images: true,
  category: true,
  startsAt: true,
  endsAt: true,
  timezone: true,
  countryCode: true,
  city: true,
  venueName: true,
  venueAddress: true,
  lat: true,
  lng: true,
  contactEmail: true,
  contactPhone: true,
  isFree: true,
  priceNote: true,
  externalUrl: true,
  minAge: true,
  organizer: { select: { name: true } },
  business: {
    select: {
      id: true,
      name: true,
      businessPage: { select: { slug: true, status: true } },
    },
  },
} satisfies Prisma.CommunityEventSelect;

export type CommunityEventWithCounts = Prisma.CommunityEventGetPayload<{
  include: typeof ownerInclude;
}>;

export type CommunityEventWithReports = Prisma.CommunityEventGetPayload<{
  include: typeof adminDetailInclude;
}>;

export type PublicCommunityEventRow = Prisma.CommunityEventGetPayload<{
  select: typeof publicSelect;
}>;

/**
 * The public shape plus the status, for the favourites list.
 *
 * The agenda never needs it — everything it lists is approved. A favourite
 * outlives approval, so the reader has to be told when the thing they saved is
 * off.
 */
const favouriteSelect = {
  ...publicSelect,
  status: true,
} satisfies Prisma.CommunityEventSelect;

export type FavouriteEventRow = Prisma.CommunityEventGetPayload<{
  select: typeof favouriteSelect;
}>;

export interface PublicEventFilters {
  countryCode?: string;
  city?: string;
  when: CommunityEventWhen;
  /** Origin and reach of a distance filter. All three, or none. */
  lat?: number;
  lng?: number;
  radius?: number;
}

@Injectable()
export class CommunityEventsRepository {
  constructor(private readonly prisma: PrismaService) {}

  isSlugTaken(slug: string, exceptId?: string): Promise<boolean> {
    return this.prisma.communityEvent
      .findFirst({
        where: { slug, ...(exceptId ? { id: { not: exceptId } } : {}) },
        select: { id: true },
      })
      .then((row) => row !== null);
  }

  countPendingByOrganizer(organizerId: string): Promise<number> {
    return this.prisma.communityEvent.count({
      where: { organizerId, status: 'PENDING_REVIEW' },
    });
  }

  create(
    data: Prisma.CommunityEventUncheckedCreateInput,
  ): Promise<CommunityEventWithCounts> {
    return this.prisma.communityEvent.create({ data, include: ownerInclude });
  }

  findByIdAndOrganizer(
    id: string,
    organizerId: string,
  ): Promise<CommunityEventWithCounts | null> {
    return this.prisma.communityEvent.findFirst({
      where: { id, organizerId },
      include: ownerInclude,
    });
  }

  findById(id: string): Promise<CommunityEventWithCounts | null> {
    return this.prisma.communityEvent.findUnique({
      where: { id },
      include: ownerInclude,
    });
  }

  findByIdWithReports(id: string): Promise<CommunityEventWithReports | null> {
    return this.prisma.communityEvent.findUnique({
      where: { id },
      include: adminDetailInclude,
    });
  }

  update(
    id: string,
    data: Prisma.CommunityEventUncheckedUpdateInput,
  ): Promise<CommunityEventWithCounts> {
    return this.prisma.communityEvent.update({
      where: { id },
      data,
      include: ownerInclude,
    });
  }

  async listByOrganizer(
    organizerId: string,
    status: CommunityEventStatus | undefined,
    skip: number,
    take: number,
  ): Promise<{ data: CommunityEventWithCounts[]; total: number }> {
    const where: Prisma.CommunityEventWhereInput = {
      organizerId,
      ...(status ? { status } : {}),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.communityEvent.findMany({
        where,
        include: ownerInclude,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.communityEvent.count({ where }),
    ]);

    return { data, total };
  }

  /**
   * The moderation queue: whatever is waiting comes first, oldest submission
   * at the top, so nobody's event rots behind a newer one.
   *
   * "Pending first" is a boolean over an enum, which Prisma's `orderBy` cannot
   * express — enum ordering follows the declaration order, where `DRAFT` sits
   * ahead of `PENDING_REVIEW`. So the ordering runs in SQL and returns ids
   * only; the rows are hydrated through the ORM, which is the same shape the
   * radius filter in `BusinessRepository` uses.
   */
  async listForAdmin(
    status: CommunityEventStatus | undefined,
    skip: number,
    take: number,
  ): Promise<{ data: CommunityEventWithCounts[]; total: number }> {
    const filter = status
      ? Prisma.sql`WHERE status::text = ${status}`
      : Prisma.empty;

    const rows = await this.prisma.$queryRaw<{ id: string }[]>`
      SELECT id
      FROM community_events
      ${filter}
      ORDER BY (status::text = 'PENDING_REVIEW') DESC,
               submitted_at ASC NULLS LAST,
               created_at DESC
      LIMIT ${take}::int OFFSET ${skip}::int
    `;

    const [counted] = await this.prisma.$queryRaw<{ total: bigint }[]>`
      SELECT COUNT(*)::bigint AS total FROM community_events ${filter}
    `;

    return {
      data: await this.hydrateOwner(rows.map((row) => row.id)),
      total: Number(counted?.total ?? 0),
    };
  }

  findApprovedBySlug(slug: string): Promise<PublicCommunityEventRow | null> {
    return this.prisma.communityEvent.findFirst({
      where: { slug, status: 'APPROVED' },
      select: publicSelect,
    });
  }

  findApprovedIdBySlug(slug: string): Promise<{ id: string } | null> {
    return this.prisma.communityEvent.findFirst({
      where: { slug, status: 'APPROVED' },
      select: { id: true },
    });
  }

  /**
   * The default agenda: approved and not over yet. `coalesce(endsAt, startsAt)`
   * is what keeps a festival that started yesterday and ends tomorrow on the
   * list.
   */
  async listPublicUpcoming(
    filters: PublicEventFilters,
    skip: number,
    take: number,
  ): Promise<{ data: PublicCommunityEventRow[]; total: number }> {
    const now = new Date();
    const where: Prisma.CommunityEventWhereInput = {
      status: 'APPROVED',
      ...(filters.countryCode ? { countryCode: filters.countryCode } : {}),
      ...(filters.city
        ? { city: { equals: filters.city, mode: 'insensitive' } }
        : {}),
      OR: [{ endsAt: { gte: now } }, { endsAt: null, startsAt: { gte: now } }],
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.communityEvent.findMany({
        where,
        select: publicSelect,
        orderBy: { startsAt: 'asc' },
        skip,
        take,
      }),
      this.prisma.communityEvent.count({ where }),
    ]);

    return { data, total };
  }

  /**
   * `today` and `weekend` in the timezone of each row.
   *
   * The window cannot be computed once in Node: two events in the same list can
   * sit in different zones, and "today" for a 23h concert in Lisbon is a
   * different UTC interval than "today" for a 01h one in São Paulo. Postgres
   * knows every row's zone because the row carries it.
   */
  async listPublicByWhen(
    filters: PublicEventFilters,
    skip: number,
    take: number,
  ): Promise<{ data: PublicCommunityEventRow[]; total: number }> {
    const where = this.buildPublicSql(filters);

    const rows = await this.prisma.$queryRaw<{ id: string }[]>`
      SELECT e.id
      FROM community_events e
      WHERE ${where}
      ORDER BY e.starts_at ASC
      LIMIT ${take}::int OFFSET ${skip}::int
    `;

    const [counted] = await this.prisma.$queryRaw<{ total: bigint }[]>`
      SELECT COUNT(*)::bigint AS total FROM community_events e WHERE ${where}
    `;

    return {
      data: await this.hydratePublic(rows.map((row) => row.id)),
      total: Number(counted?.total ?? 0),
    };
  }

  /**
   * Favouriting twice is the same gesture, not an error.
   *
   * `upsert` on the unique pair rather than a check-then-insert: two taps
   * arriving together would both pass a check and one would hit the
   * constraint. The `update` is empty on purpose — there is nothing to change,
   * the row's existence *is* the state.
   */
  /**
   * An event a reader is allowed to favourite.
   *
   * Approved only, because that is exactly what they can see: favouriting a
   * draft or a rejected event through a guessed id would let somebody hold a
   * handle on something that was never published.
   */
  findApprovedById(id: string): Promise<{ id: string } | null> {
    return this.prisma.communityEvent.findFirst({
      where: { id, status: CommunityEventStatus.APPROVED },
      select: { id: true },
    });
  }

  favourite(userId: string, eventId: string): Promise<void> {
    return this.prisma.eventFavourite
      .upsert({
        where: { userId_eventId: { userId, eventId } },
        create: { userId, eventId },
        update: {},
      })
      .then(() => undefined);
  }

  /** `deleteMany` and not `delete`: removing what is not there is not a fault. */
  unfavourite(userId: string, eventId: string): Promise<void> {
    return this.prisma.eventFavourite
      .deleteMany({ where: { userId, eventId } })
      .then(() => undefined);
  }

  isFavourite(userId: string, eventId: string): Promise<boolean> {
    return this.prisma.eventFavourite
      .count({ where: { userId, eventId } })
      .then((count) => count > 0);
  }

  /**
   * The reader's favourites, split by whether the date has passed.
   *
   * Ordered through the relation — ascending for what is coming, so the next
   * thing is first, and descending for what is past, so the most recent is.
   * Ordering both the same way would bury either the next event or the last
   * one at the bottom of a list nobody scrolls.
   *
   * The status is not filtered. A cancelled event a person saved is still
   * their favourite, and hearing that it is off is the whole reason to keep
   * showing it.
   */
  async listFavourites(
    userId: string,
    upcoming: boolean,
    now: Date,
    skip: number,
    take: number,
  ): Promise<{ data: FavouriteEventRow[]; total: number }> {
    const where = {
      userId,
      event: upcoming ? { startsAt: { gte: now } } : { startsAt: { lt: now } },
    } satisfies Prisma.EventFavouriteWhereInput;

    const [rows, total] = await this.prisma.$transaction([
      this.prisma.eventFavourite.findMany({
        where,
        orderBy: { event: { startsAt: upcoming ? 'asc' : 'desc' } },
        skip,
        take,
        select: { event: { select: favouriteSelect } },
      }),
      this.prisma.eventFavourite.count({ where }),
    ]);

    return { data: rows.map((row) => row.event), total };
  }

  createReport(eventId: string, reason: string): Promise<{ id: string }> {
    return this.prisma.communityEventReport.create({
      data: { eventId, reason },
      select: { id: true },
    });
  }

  findBusinessForEvent(
    businessId: string,
  ): Promise<{ id: string; isPublic: boolean; city: string } | null> {
    return this.prisma.business.findUnique({
      where: { id: businessId },
      select: { id: true, isPublic: true, city: true },
    });
  }

  private buildPublicSql(filters: PublicEventFilters): Prisma.Sql {
    const localStart = Prisma.sql`((e.starts_at AT TIME ZONE 'UTC') AT TIME ZONE e.timezone)`;
    const localToday = Prisma.sql`(NOW() AT TIME ZONE e.timezone)::date`;

    const window =
      filters.when === CommunityEventWhen.TODAY
        ? Prisma.sql`AND ${localStart}::date = ${localToday}`
        : filters.when === CommunityEventWhen.WEEKEND
          ? Prisma.sql`AND EXTRACT(ISODOW FROM ${localStart}) IN (6, 7)
                       AND ${localStart}::date <= ${localToday} + 7`
          : Prisma.empty;

    return Prisma.sql`
      e.status::text = 'APPROVED'
      AND COALESCE(e.ends_at, e.starts_at) >= (NOW() AT TIME ZONE 'UTC')
      ${
        filters.countryCode
          ? Prisma.sql`AND e.country_code = ${filters.countryCode}`
          : Prisma.empty
      }
      ${filters.city ? Prisma.sql`AND lower(e.city) = lower(${filters.city})` : Prisma.empty}
      ${this.withinRadius(filters)}
      ${window}
    `;
  }

  /**
   * The reader's reach, when they shared where they are.
   *
   * Box first, Haversine after — the box is a pre-filter the `(lat, lng)`
   * index can answer, and it is wider than the circle it contains, so the
   * Haversine stays and still decides. Getting that order backwards would
   * quietly return events outside the radius somebody asked for. The geometry
   * and the reasons behind the constant live in `business/bounding-box.ts`.
   *
   * `lat` and `lng` are required columns on `CommunityEvent` — at the database,
   * in Prisma and in the create DTO — so there is no branch here for an event
   * without coordinates. That is not luck: the field was made mandatory
   * because the organizer points at the map rather than having an address
   * geocoded for them.
   */
  private withinRadius(filters: PublicEventFilters): Prisma.Sql {
    const { lat, lng, radius } = filters;
    if (lat === undefined || lng === undefined || !radius) {
      return Prisma.empty;
    }

    const box = boundingBox(lat, lng, radius);
    const bounds: Prisma.Sql[] = [
      Prisma.sql`e.lat BETWEEN ${box.minLat} AND ${box.maxLat}`,
    ];
    if (box.minLng !== undefined && box.maxLng !== undefined) {
      bounds.push(Prisma.sql`e.lng BETWEEN ${box.minLng} AND ${box.maxLng}`);
    }

    return Prisma.sql`AND ${Prisma.join(bounds, ' AND ')}
      AND (6371 * acos(
            cos(radians(${lat})) * cos(radians(e.lat))
              * cos(radians(e.lng) - radians(${lng}))
            + sin(radians(${lat})) * sin(radians(e.lat))
          )) <= ${radius}`;
  }

  /** Re-reads the rows through the ORM, preserving the order the SQL decided. */
  private async hydrateOwner(
    ids: string[],
  ): Promise<CommunityEventWithCounts[]> {
    if (ids.length === 0) return [];

    const events = await this.prisma.communityEvent.findMany({
      where: { id: { in: ids } },
      include: ownerInclude,
    });
    const byId = new Map(events.map((event) => [event.id, event]));

    return ids
      .map((id) => byId.get(id))
      .filter(
        (event): event is CommunityEventWithCounts => event !== undefined,
      );
  }

  private async hydratePublic(
    ids: string[],
  ): Promise<PublicCommunityEventRow[]> {
    if (ids.length === 0) return [];

    const events = await this.prisma.communityEvent.findMany({
      where: { id: { in: ids } },
      select: publicSelect,
    });
    const byId = new Map(events.map((event) => [event.id, event]));

    return ids
      .map((id) => byId.get(id))
      .filter((event): event is PublicCommunityEventRow => event !== undefined);
  }
}
