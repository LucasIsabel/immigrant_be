import { PrismaService } from '@app/database';
import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';

@Injectable()
export class VisaStepsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.VisaStepsCreateInput) {
    return this.prisma.visaSteps.create({ data });
  }

  findAll(filters: { visa_type_id?: string; language?: string }) {
    return this.prisma.visaSteps.findMany({
      where: {
        visa_type_id: filters.visa_type_id,
        language: filters.language,
      },
      orderBy: { created_at: 'desc' },
      include: {
        visa_type: {
          include: {
            country: true,
          },
        },
      },
    });
  }

  findById(id: string) {
    return this.prisma.visaSteps.findUnique({
      where: { id },
      include: {
        visa_type: {
          include: {
            country: true,
          },
        },
      },
    });
  }

  update(id: string, data: Prisma.VisaStepsUpdateInput) {
    return this.prisma.visaSteps.update({
      where: { id },
      data,
    });
  }
}
