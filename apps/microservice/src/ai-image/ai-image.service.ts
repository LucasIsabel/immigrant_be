import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { GeminiBaseService } from '@app/ai';
import { StorageService } from '@app/storage';

export interface GenerateAiImageJobData {
  imageId: string;
  prompt: string;
  folder: string;
  isPublic: boolean;
}

@Injectable()
export class AiImageWorkerService {
  private readonly logger = new Logger(AiImageWorkerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly gemini: GeminiBaseService,
    private readonly storage: StorageService,
  ) {}

  async processImage(data: GenerateAiImageJobData): Promise<void> {
    const { imageId, prompt, folder } = data;

    await this.prisma.aiGeneratedImage.update({
      where: { id: imageId },
      data: { status: 'processing' },
    });

    const imageBuffer = await this.gemini.generateImage(prompt);

    if (!imageBuffer) {
      await this.prisma.aiGeneratedImage.update({
        where: { id: imageId },
        data: {
          status: 'failed',
          errorMessage: 'Gemini não retornou imagem',
        },
      });
      this.logger.warn(`No image returned for ${imageId}`);
      return;
    }

    try {
      const filename = `ai-${imageId}.png`;
      const { url, key } = await this.storage.uploadFile(
        imageBuffer,
        filename,
        'image/png',
        folder,
      );

      await this.prisma.aiGeneratedImage.update({
        where: { id: imageId },
        data: {
          status: 'completed',
          url,
          key,
          mimeType: 'image/png',
        },
      });

      this.logger.log(`AI image completed: ${imageId} -> ${url}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Upload failed';
      await this.prisma.aiGeneratedImage.update({
        where: { id: imageId },
        data: { status: 'failed', errorMessage: message },
      });
      this.logger.error(`AI image failed ${imageId}: ${message}`);
      throw error;
    }
  }
}
