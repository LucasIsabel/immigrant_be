import { PrismaService } from '@app/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../../../generated/prisma';

export interface FindAllAiImagesParams {
  folder?: string;
  status?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class AiImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    prompt: string;
    folder: string;
    isPublic: boolean;
    userId: string;
  }) {
    return this.prisma.aiGeneratedImage.create({
      data: {
        prompt: data.prompt,
        folder: data.folder,
        isPublic: data.isPublic,
        userId: data.userId,
        status: 'pending',
      },
    });
  }

  async updateStatus(
    id: string,
    data: {
      status: string;
      key?: string;
      url?: string;
      mimeType?: string;
      errorMessage?: string;
    },
  ) {
    return this.prisma.aiGeneratedImage.update({
      where: { id },
      data: {
        status: data.status,
        key: data.key,
        url: data.url,
        mimeType: data.mimeType,
        errorMessage: data.errorMessage,
      },
    });
  }

  async findAll(params: FindAllAiImagesParams = {}) {
    const { folder, status, page = 1, limit = 20 } = params;
    const where: Prisma.AiGeneratedImageWhereInput = {};
    if (folder) where.folder = folder;
    if (status) where.status = status;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.aiGeneratedImage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.aiGeneratedImage.count({ where }),
    ]);

    return { data, total };
  }

  async findOne(id: string) {
    const row = await this.prisma.aiGeneratedImage.findUnique({
      where: { id },
    });
    if (!row) throw new NotFoundException('Imagem não encontrada');
    return row;
  }

  async delete(id: string) {
    return this.prisma.aiGeneratedImage.delete({ where: { id } });
  }
}
