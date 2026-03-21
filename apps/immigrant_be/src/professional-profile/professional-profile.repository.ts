import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { UpsertProfessionalProfileDto } from './dto/upsert-professional-profile.dto';

@Injectable()
export class ProfessionalProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByUserId(userId: string) {
    return this.prisma.userProfessionalProfile.findUnique({
      where: { userId },
    });
  }

  upsert(userId: string, data: UpsertProfessionalProfileDto) {
    return this.prisma.userProfessionalProfile.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });
  }

  findPublicByUserId(userId: string) {
    return this.prisma.userProfessionalProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
    });
  }
}
