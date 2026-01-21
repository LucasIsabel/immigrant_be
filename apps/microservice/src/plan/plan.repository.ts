import { PrismaService } from '@app/database';
import { Injectable } from '@nestjs/common';
import { ImmigrationVisaType } from 'generated/prisma';

@Injectable()
export class PlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getVisaTypeByRecommendationId(
    visaTypeRecommendationId: string,
  ): Promise<ImmigrationVisaType | null> {
    const visaType = await this.prisma.immigrationVisaType.findUnique({
      where: { id: visaTypeRecommendationId },
    });

    if (!visaType) {
      return null;
    }

    return visaType;
  }
}
