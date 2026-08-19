import { PrismaService } from '@app/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.aiModelConfig.findMany({ orderBy: { scenario: 'asc' } });
  }

  upsert(
    scenario: string,
    data: { primaryModel: string; fallbackModels: string[] },
  ) {
    return this.prisma.aiModelConfig.upsert({
      where: { scenario },
      create: { scenario, ...data },
      update: data,
    });
  }

  aggregateUsage(from: Date) {
    const where = { createdAt: { gte: from } };

    return Promise.all([
      this.prisma.aiUsageLog.aggregate({
        where,
        _count: { _all: true },
        _sum: { costUsd: true },
      }),
      this.prisma.aiUsageLog.count({
        where: { ...where, errorKind: { not: null } },
      }),
      this.prisma.aiUsageLog.groupBy({
        by: ['scenario'],
        where,
        _count: { _all: true },
        _sum: { costUsd: true },
      }),
      this.prisma.aiUsageLog.groupBy({
        by: ['model'],
        where,
        _count: { _all: true },
        _sum: { costUsd: true },
      }),
      this.prisma.aiUsageLog.groupBy({
        by: ['errorKind'],
        where: { ...where, errorKind: { not: null } },
        _count: { _all: true },
      }),
      this.prisma.aiUsageLog.groupBy({
        by: ['scenario'],
        where: { ...where, errorKind: { not: null } },
        _count: { _all: true },
      }),
      this.prisma.aiUsageLog.groupBy({
        by: ['model'],
        where: { ...where, errorKind: { not: null } },
        _count: { _all: true },
      }),
    ]);
  }
}
