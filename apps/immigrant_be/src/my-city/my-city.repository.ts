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

    const inReach: Prisma.Sql[] = [];
    if (args.lat !== undefined && args.lng !== undefined && args.radius) {
      const box = boundingBox(args.lat, args.lng, args.radius);
      inReach.push(Prisma.sql`b.lat BETWEEN ${box.minLat} AND ${box.maxLat}`);
      if (box.minLng !== undefined && box.maxLng !== undefined) {
        inReach.push(Prisma.sql`b.lng BETWEEN ${box.minLng} AND ${box.maxLng}`);
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

    const reaches: Prisma.Sql[] = [];
    if (inCity.length > 0) {
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

  /** Approved events that have not finished yet, as the strip lists them. */
  async countEvents(args: CountArgs): Promise<number> {
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

  /** Places the public list would show — active ones, in this city. */
  async countPlaces(args: CountArgs): Promise<number> {
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
}
