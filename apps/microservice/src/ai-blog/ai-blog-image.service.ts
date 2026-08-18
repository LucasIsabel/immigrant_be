import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { AiRouterService, buildBlogCoverImagePrompt } from '@app/ai';
import { StorageService } from '@app/storage';
import { CorrelatedJobData } from '@app/config/job-data';

export interface GenerateBlogImageJobData extends CorrelatedJobData {
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
    private readonly aiRouter: AiRouterService,
    private readonly storage: StorageService,
  ) {}

  async generateAndAttachImage(data: GenerateBlogImageJobData): Promise<void> {
    const prompt = buildBlogCoverImagePrompt(data.title, data.countryName);

    // O roteador percorre a cadeia de modelos e só lança quando todos falham —
    // é isso que dá à capa a resiliência que antes só o refinamento tinha, com
    // as tentativas indo para modelos diferentes em vez de insistir no mesmo.
    // Se a cadeia inteira cair, o job volta para a fila do BullMQ.
    // O formato é pedido, não presumido: o upload abaixo sempre declarou
    // `image/jpeg`, mas até aqui os bytes vinham no padrão do provider — PNG.
    // O navegador farejava o conteúdo e renderizava, então nunca quebrou; ficava
    // só um Content-Type mentiroso num arquivo maior do que precisava ser.
    const { image, model } = await this.aiRouter.generateImage(
      'blog_image',
      prompt,
      { entityType: 'blog_post', entityId: data.postId },
      { aspectRatio: '16:9', outputFormat: 'jpeg' },
    );

    const { url } = await this.storage.uploadFile(
      image,
      `${data.slug}.jpg`,
      'image/jpeg',
      'blog',
    );

    await this.prisma.blogPost.update({
      where: { id: data.postId },
      data: { cover_image_url: url },
    });

    this.logger.log(
      `Imagem de capa anexada ao post ${data.postId} por ${model}: ${url}`,
    );
  }
}
