import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { GeminiBaseService, buildBlogCoverImagePrompt } from '@app/ai';
import { StorageService } from '@app/storage';

export interface GenerateBlogImageJobData {
  postId: string;
  slug: string;
  title: string;
  countryName: string;
  /** User who triggered (for SSE notification) */
  requestedByUserId?: string;
}

@Injectable()
export class AiBlogImageWorkerService {
  private readonly logger = new Logger(AiBlogImageWorkerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly gemini: GeminiBaseService,
    private readonly storage: StorageService,
  ) {}

  async generateAndAttachImage(data: GenerateBlogImageJobData): Promise<void> {
    const prompt = buildBlogCoverImagePrompt(data.title, data.countryName);
    const imageBuffer = await this.gemini.generateImage(prompt);

    if (!imageBuffer) {
      throw new Error(`Nenhuma imagem retornada para post ${data.postId}`);
    }

    const { url } = await this.storage.uploadFile(
      imageBuffer,
      `${data.slug}.jpg`,
      'image/jpeg',
      'blog',
    );

    await this.prisma.blogPost.update({
      where: { id: data.postId },
      data: { cover_image_url: url },
    });

    this.logger.log(`Imagem de capa anexada ao post ${data.postId}: ${url}`);
  }
}
