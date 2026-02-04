import { PrismaService } from '@app/database';
import { Injectable } from '@nestjs/common';
import { CreateImmigrationVisaTypeDto } from './dto/create-immigration-visa-type.dto';
import { UpdateImmigrationVisaTypeDto } from './dto/update-immigration-visa-type.dto';

@Injectable()
export class ImmigrationVisaTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateImmigrationVisaTypeDto) {
    return this.prisma.immigrationVisaType.create({
      data: {
        category: data.category,
        description: data.description,
        source: data.source,
        country_id: data.country_id,
      },
      include: {
        country: true,
      },
    });
  }

  async findAll(filters?: { country_id?: string }) {
    return this.prisma.immigrationVisaType.findMany({
      where: filters?.country_id
        ? {
            country_id: filters.country_id,
          }
        : undefined,
      include: {
        country: true,
      },
      orderBy: {
        category: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.immigrationVisaType.findUnique({
      where: { id },
      include: {
        country: true,
      },
    });
  }

  async update(id: string, data: UpdateImmigrationVisaTypeDto) {
    return this.prisma.immigrationVisaType.update({
      where: { id },
      data: {
        ...(data.category && { category: data.category }),
        ...(data.description && { description: data.description }),
        ...(data.source && { source: data.source }),
        ...(data.country_id && { country_id: data.country_id }),
      },
      include: {
        country: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.immigrationVisaType.delete({
      where: { id },
    });
  }
}
