import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { Business, Prisma } from '../../../../generated/prisma';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BusinessListQueryDto } from './dto/business-list-query.dto';
import { BusinessType } from '../../../../generated/prisma';

@Injectable()
export class BusinessRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, data: CreateBusinessDto) {
    return this.prisma.business.create({
      data: { userId, ...data },
    });
  }

  findAllByUserId(userId: string) {
    return this.prisma.business.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findByIdAndUserId(id: string, userId: string) {
    return this.prisma.business.findFirst({
      where: { id, userId },
    });
  }

  update(id: string, data: UpdateBusinessDto) {
    return this.prisma.business.update({
      where: { id },
      data,
    });
  }

  /** Apply validated draft fields to live business and clear `draftData`. */
  applyDraftAndClearDraft(id: string, data: UpdateBusinessDto) {
    return this.prisma.business.update({
      where: { id },
      data: {
        ...data,
        draftData: Prisma.JsonNull,
      },
    });
  }

  saveDraft(id: string, draft: object) {
    return this.prisma.business.update({
      where: { id },
      data: { draftData: draft },
    });
  }

  clearDraft(id: string) {
    return this.prisma.business.update({
      where: { id },
      data: { draftData: Prisma.JsonNull },
    });
  }

  delete(id: string) {
    return this.prisma.business.delete({
      where: { id },
    });
  }

  toggleVisibility(id: string, isPublic: boolean) {
    return this.prisma.business.update({
      where: { id },
      data: { isPublic },
    });
  }

  async findPublic(
    query: BusinessListQueryDto,
  ): Promise<{ data: Business[]; total: number }> {
    const { city, businessType, search, page = 1, limit = 20, lat, lng, radius } = query;

    const useGeo = lat !== undefined && lng !== undefined && radius !== undefined;

    if (useGeo) {
      return this.findPublicByRadius({ city, businessType, search, page, limit, lat: lat!, lng: lng!, radius: radius! });
    }

    const where = {
      isPublic: true,
      ...(city && { city }),
      ...(businessType && { businessType }),
      ...(search && {
        name: { contains: search, mode: 'insensitive' as const },
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.business.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.business.count({ where }),
    ]);

    return { data, total };
  }

  private async findPublicByRadius(params: {
    city?: string;
    businessType?: BusinessType;
    search?: string;
    page: number;
    limit: number;
    lat: number;
    lng: number;
    radius: number;
  }): Promise<{ data: Business[]; total: number }> {
    const { city, businessType, search, page, limit, lat, lng, radius } = params;
    const offset = (page - 1) * limit;

    const conditions: Prisma.Sql[] = [
      Prisma.sql`b.is_public = true`,
      Prisma.sql`b.lat IS NOT NULL`,
      Prisma.sql`b.lng IS NOT NULL`,
      Prisma.sql`(6371 * acos(cos(radians(${lat})) * cos(radians(b.lat)) * cos(radians(b.lng) - radians(${lng})) + sin(radians(${lat})) * sin(radians(b.lat)))) <= ${radius}`,
    ];

    if (city) conditions.push(Prisma.sql`b.city = ${city}`);
    if (businessType) conditions.push(Prisma.sql`b.business_type = ${businessType}::"BusinessType"`);
    if (search) conditions.push(Prisma.sql`b.name ILIKE ${'%' + search + '%'}`);

    const where = Prisma.join(conditions, ' AND ');

    // Raw SQL returns only IDs to avoid snake_case/camelCase mismatch.
    // Prisma ORM then fetches full records with correct field mapping.
    const [idRows, countRows] = await Promise.all([
      this.prisma.$queryRaw<{ id: string }[]>(
        Prisma.sql`SELECT b.id FROM businesses b WHERE ${where} ORDER BY b.created_at DESC LIMIT ${limit} OFFSET ${offset}`,
      ),
      this.prisma.$queryRaw<[{ count: bigint }]>(
        Prisma.sql`SELECT COUNT(*) as count FROM businesses b WHERE ${where}`,
      ),
    ]);

    const ids = idRows.map((r) => r.id);
    const data =
      ids.length > 0
        ? await this.prisma.business.findMany({
            where: { id: { in: ids } },
            orderBy: { createdAt: 'desc' },
          })
        : [];

    return { data, total: Number(countRows[0].count) };
  }

  findPublicById(id: string) {
    return this.prisma.business.findFirst({
      where: { id, isPublic: true },
    });
  }
}
