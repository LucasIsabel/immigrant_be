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
}
