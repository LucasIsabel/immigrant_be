import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { StorageService } from '@app/storage';
import { AI_IMAGE_QUEUE, GENERATE_AI_IMAGE } from '@app/config/constants';
import { AiImageRepository } from './ai-image.repository';
import { GenerateAiImageDto } from './dto/generate-ai-image.dto';

@Injectable()
export class AiImageService {
  private readonly logger = new Logger(AiImageService.name);

  constructor(
    private readonly repository: AiImageRepository,
    private readonly storageService: StorageService,
    @InjectQueue(AI_IMAGE_QUEUE) private readonly aiImageQueue: Queue,
  ) {}

  async generate(userId: string, dto: GenerateAiImageDto) {
    const folder = dto.folder ?? 'ai-images';
    const isPublic = dto.isPublic ?? true;

    const image = await this.repository.create({
      prompt: dto.prompt,
      folder,
      isPublic,
      userId,
    });

    await this.aiImageQueue.add(GENERATE_AI_IMAGE, {
      imageId: image.id,
      prompt: dto.prompt,
      folder,
      isPublic,
      requestedByUserId: userId,
    });

    this.logger.log(`Enqueued AI image generation job for image ${image.id}`);
    return {
      id: image.id,
      status: image.status,
      message: 'Geração enfileirada. A imagem estará disponível em instantes.',
    };
  }

  async findAll(params: {
    folder?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    return this.repository.findAll(params);
  }

  async findOne(id: string) {
    return this.repository.findOne(id);
  }

  async remove(id: string) {
    const image = await this.repository.findOne(id);
    if (image.key) {
      await this.storageService.deleteFile(image.key);
    }
    await this.repository.delete(id);
  }
}
