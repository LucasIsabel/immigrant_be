import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { Prisma } from '../../../../generated/prisma';
import { boundingBox } from '../business/bounding-box';
import { normalizeCity } from '../business/city-key';

interface CountArgs {
  country?: string;
  countryCode?: string;
  city?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  /**
   * Whether the origin is the reader rather than the city centre — see the DTO.
   * Around the reader the reach narrows; around a city centre it widens.
   */
  nearMe?: boolean;
}

@Injectable()
export class MyCityRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Restaurants and tour guides, in one pass over the table.
   *
   * The screen lists a city's own businesses **and** the ones within reach of
   * it, merged. Counting those as two queries and adding them would count
   * twice everything that satisfies both — a business in the city is also
   * inside the box around it. So the two reaches are one `OR` here, and a row
   * that matches both is still one row.
   *
   * The box is the same pre-filter the listing uses, for the same reason: it
   * lets the `(lat, lng)` index answer instead of the whole table being
   * measured. Unlike the listing this stops at the box and skips the
   * Haversine, because a count is allowed to be generous at the corners in a
   * way a list is not — a tab saying seven over a list of six would be the
   * bug, so the reach here must be at least as wide as the list's, never
   * narrower.
   */
  async countBusinesses(args: CountArgs): Promise<Record<string, number>> {
    const inCity: Prisma.Sql[] = [];
    if (args.city) {
      inCity.push(Prisma.sql`b.city_key = ${normalizeCity(args.city)}`);
    }

    /*
     * The reach, now with the Haversine the list runs.
     *
     * This count used to stop at the box, on the argument that a count may be
     * generous at the corners where a list may not. Measured with three tour
     * guides around Lisbon: at a 15km reach the box admitted the one in Sintra,
     * 19.2km out, so the tab read three over a list of two. Generous is fine
     * when the numbers are large; here it is just wrong, and a tab that
     * disagrees with the list it opens is the whole defect.
     */
    const inReach: Prisma.Sql[] = [];
    if (args.lat !== undefined && args.lng !== undefined && args.radius) {
      const reach = this.reachSql(args, 'b');
      if (reach) {
        inReach.push(reach);
      }
    }

    const conditions: Prisma.Sql[] = [Prisma.sql`b.is_public = true`];

    // Without the country, "Córdoba" answers for the Argentine one and the
    // Spanish one; a reach near a border crosses it — Elvas and Badajoz are
    // fifteen kilometres apart.
    if (args.country) {
      conditions.push(
        Prisma.sql`lower(b.country) = ${args.country.toLowerCase()}`,
      );
    }

    /*
     * City **or** reach — unless the reach is measured from the reader.
     *
     * Around a city centre the two are a union, and that is the point: the
     * centre is a place nobody chose, so narrowing around it would hide the
     * supply of the very city that was asked for, while widening brings the
     * restaurant in Gaia to somebody browsing Porto.
     *
     * Around the reader the union would be a contradiction. They asked for what
     * is within N km of themselves; being inside the chosen city does not make
     * something near them, and a guide 7.8km away staying on screen at a 1km
     * reach is what the reader reported as broken.
     */
    const narrowsToReach = Boolean(args.nearMe) && inReach.length > 0;

    const reaches: Prisma.Sql[] = [];
    if (inCity.length > 0 && !narrowsToReach) {
      reaches.push(Prisma.join(inCity, ' AND '));
    }
    if (inReach.length > 0) {
      reaches.push(Prisma.sql`(${Prisma.join(inReach, ' AND ')})`);
    }
    if (reaches.length > 0) {
      conditions.push(Prisma.sql`(${Prisma.join(reaches, ' OR ')})`);
    }

    const rows = await this.prisma.$queryRaw<
      { business_type: string; count: bigint }[]
    >(
      Prisma.sql`SELECT b.business_type, COUNT(*) as count
                 FROM businesses b
                 WHERE ${Prisma.join(conditions, ' AND ')}
                 GROUP BY b.business_type`,
    );

    const counts: Record<string, number> = {};
    for (const row of rows) {
      counts[row.business_type] = Number(row.count);
    }
    return counts;
  }

  /**
   * The reader's reach, as raw SQL: the box, then the Haversine.
   *
   * The box is the pre-filter the `(lat, lng)` index can answer; the Haversine
   * decides. Both, because a box is wider than the circle it contains — at the
   * corners it admits points up to √2 radii away.
   *
   * `countBusinesses` above stops at the box on purpose, reasoning that a count
   * may be generous where a list may not. That holds when the numbers are
   * large. It does not here: measured in Lisbon at a 1km reach, the box counted
   * two places and the Haversine one, so the tab would have read two over a
   * list of one. At small radii "generous" is just wrong, and a tab that
   * disagrees with the list it opens is the defect this whole change set is
   * about.
   *
   * Places and events both carry `lat`/`lng` as required columns, so there is
   * no branch here for a row without coordinates.
   */
  private reachSql(args: CountArgs, alias: string): Prisma.Sql | null {
    if (args.lat === undefined || args.lng === undefined || !args.radius) {
      return null;
    }

    const { lat, lng, radius } = args;
    const box = boundingBox(lat, lng, radius);
    const latCol = Prisma.raw(`${alias}.lat`);
    const lngCol = Prisma.raw(`${alias}.lng`);

    const parts: Prisma.Sql[] = [
      Prisma.sql`${latCol} BETWEEN ${box.minLat} AND ${box.maxLat}`,
    ];
    // Absent near the poles and across the antimeridian — see `boundingBox`.
    if (box.minLng !== undefined && box.maxLng !== undefined) {
      parts.push(Prisma.sql`${lngCol} BETWEEN ${box.minLng} AND ${box.maxLng}`);
    }
    parts.push(
      Prisma.sql`(6371 * acos(
        cos(radians(${lat})) * cos(radians(${latCol}))
          * cos(radians(${lngCol}) - radians(${lng}))
        + sin(radians(${lat})) * sin(radians(${latCol}))
      )) <= ${radius}`,
    );

    return Prisma.join(parts, ' AND ');
  }

  /** Approved events that have not finished yet, as the strip lists them. */
  async countEvents(args: CountArgs): Promise<number> {
    const reach = this.reachSql(args, 'e');

    // No coordinates, no distance to measure: the typed query stays exactly as
    // it was, so a city view without GPS answers byte for byte what it did.
    if (!reach) {
      const now = new Date();
      return this.prisma.communityEvent.count({
        where: {
          status: 'APPROVED',
          ...(args.countryCode ? { countryCode: args.countryCode } : {}),
          ...(args.city
            ? { city: { equals: args.city, mode: 'insensitive' as const } }
            : {}),
          OR: [
            { endsAt: { gte: now } },
            { endsAt: null, startsAt: { gte: now } },
          ],
        },
      });
    }

    const conditions: Prisma.Sql[] = [
      Prisma.sql`e.status::text = 'APPROVED'`,
      Prisma.sql`COALESCE(e.ends_at, e.starts_at) >= (NOW() AT TIME ZONE 'UTC')`,
      reach,
    ];
    if (args.countryCode) {
      conditions.push(Prisma.sql`e.country_code = ${args.countryCode}`);
    }
    if (args.city) {
      conditions.push(Prisma.sql`lower(e.city) = lower(${args.city})`);
    }

    const [row] = await this.prisma.$queryRaw<{ total: bigint }[]>(
      Prisma.sql`SELECT COUNT(*)::bigint AS total
                 FROM community_events e
                 WHERE ${Prisma.join(conditions, ' AND ')}`,
    );
    return Number(row?.total ?? 0);
  }

  /** Places the public list would show — active ones, in this city. */
  async countPlaces(args: CountArgs): Promise<number> {
    const reach = this.reachSql(args, 'p');

    if (!reach) {
      return this.prisma.place.count({
        where: {
          isActive: true,
          ...(args.countryCode ? { countryCode: args.countryCode } : {}),
          ...(args.city
            ? { city: { equals: args.city, mode: 'insensitive' as const } }
            : {}),
        },
      });
    }

    const conditions: Prisma.Sql[] = [Prisma.sql`p.is_active = true`, reach];
    if (args.countryCode) {
      conditions.push(Prisma.sql`p.country_code = ${args.countryCode}`);
    }
    if (args.city) {
      conditions.push(Prisma.sql`lower(p.city) = lower(${args.city})`);
    }

    const [row] = await this.prisma.$queryRaw<{ total: bigint }[]>(
      Prisma.sql`SELECT COUNT(*)::bigint AS total
                 FROM places p
                 WHERE ${Prisma.join(conditions, ' AND ')}`,
    );
    return Number(row?.total ?? 0);
  }
}
