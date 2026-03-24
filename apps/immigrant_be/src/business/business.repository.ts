import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { Business } from '../../../../generated/prisma';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BusinessListQueryDto } from './dto/business-list-query.dto';

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
    const { city, businessType, search, page = 1, limit = 20 } = query;

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

  findPublicById(id: string) {
    return this.prisma.business.findFirst({
      where: { id, isPublic: true },
    });
  }
}
