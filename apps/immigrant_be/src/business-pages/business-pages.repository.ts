import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';

@Injectable()
export class BusinessPagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  isSlugTaken(slug: string): Promise<boolean> {
    return this.prisma.businessPage
      .findUnique({ where: { slug }, select: { id: true } })
      .then((r) => r !== null);
  }

  findBySlug(slug: string) {
    return this.prisma.businessPage.findUnique({ where: { slug } });
  }
}
