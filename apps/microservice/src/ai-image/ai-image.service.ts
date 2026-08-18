import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { AiRouterService } from '@app/ai';
import { StorageService } from '@app/storage';
import { CorrelatedJobData } from '@app/config/job-data';

export interface GenerateAiImageJobData extends CorrelatedJobData {
  imageId: string;
  prompt: string;
  folder: string;
  isPublic: boolean;
  /** User who triggered generation (for SSE notification) */
  requestedByUserId?: string;
}

@Injectable()
export class AiImageWorkerService {
  private readonly logger = new Logger(AiImageWorkerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiRouter: AiRouterService,
    private readonly storage: StorageService,
  ) {}

  async processImage(data: GenerateAiImageJobData): Promise<void> {
    const { imageId, prompt, folder } = data;

    await this.prisma.aiGeneratedImage.update({
      where: { id: imageId },
      data: { status: 'processing' },
    });

    // Mesmo cenário do blog: o Media Generator produz o mesmo tipo de imagem e
    // não tem razão para usar outro modelo nem para ficar fora do log de custo.
    const { image } = await this.aiRouter.generateImage('blog_image', prompt, {
      entityType: 'ai_generated_image',
      entityId: imageId,
    });

    const filename = `ai-${imageId}.png`;
    const { url, key } = await this.storage.uploadFile(
      image,
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
  }

  /**
   * Persists the terminal failure state. Called by the consumer only after
   * BullMQ exhausts the retries, so a row is never shown as failed while an
   * attempt is still pending.
   */
  async markFailed(imageId: string, message: string): Promise<void> {
    await this.prisma.aiGeneratedImage.update({
      where: { id: imageId },
      data: { status: 'failed', errorMessage: message },
    });
  }
}
