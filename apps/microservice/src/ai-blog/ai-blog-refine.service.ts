import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { AiRouterService } from '@app/ai';
import { StorageService } from '@app/storage';
import { CorrelatedJobData } from '@app/config/job-data';
import { contentHasVisualMarkers, VISUAL_MARKER_REGEX } from '@app/ai';

export interface RefineBlogPostJobData extends CorrelatedJobData {
  postId: string;
}

const IMAGE_REALISM_SUFFIX =
  ' Photorealistic, documentary or editorial style. Natural imperfections — film grain, uneven lighting, real textures. If people are present: candid, unstaged moments with genuine expressions and natural skin tones. Avoid plastic skin, overly clean lighting, symmetrical poses, or any visual cues typical of AI-generated imagery.';

@Injectable()
export class AiBlogRefineService {
  private readonly logger = new Logger(AiBlogRefineService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiRouter: AiRouterService,
    private readonly storage: StorageService,
  ) {}

  async postNeedsRefinement(postId: string): Promise<boolean> {
    const post = await this.prisma.blogPost.findUnique({
      where: { id: postId },
      select: { content: true },
    });
    if (!post?.content) return false;
    return contentHasVisualMarkers(post.content);
  }

  async markManualFixNeeded(postId: string): Promise<void> {
    await this.prisma.blogPost.update({
      where: { id: postId },
      data: { refine_needs_manual_fix: true },
    });
  }

  async refinePost(
    data: RefineBlogPostJobData,
  ): Promise<{ allGenerated: boolean; generated: number; total: number }> {
    const post = await this.prisma.blogPost.findUnique({
      where: { id: data.postId },
    });

    if (!post) {
      throw new Error(`Post not found: ${data.postId}`);
    }

    const content = post.content ?? '';
    const matches = [
      ...content.matchAll(new RegExp(VISUAL_MARKER_REGEX.source, 'g')),
    ];

    if (matches.length === 0) {
      this.logger.log(
        `No [Visual sugerido] markers found in post ${data.postId}`,
      );
      return { allGenerated: true, generated: 0, total: 0 };
    }

    this.logger.log(
      `Found ${matches.length} visual marker(s) in post ${data.postId}`,
    );

    const processed: {
      fullMatch: string;
      index: number;
      matchOrdinal: number;
      url: string;
      replacement: string;
    }[] = [];

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      if (!match) continue;
      const fullMatch = match[0];
      const description = (match[1] ?? '').trim();

      const enrichedPrompt = description + IMAGE_REALISM_SUFFIX;

      // O laço manual de 3 tentativas saiu daqui: o roteador já percorre a
      // cadeia de modelos, e manter os dois daria até nove imagens pagas por
      // marcador. Tentar modelos diferentes também cobre mais falha do que
      // insistir no mesmo.
      let imageBuffer: Buffer;
      try {
        ({ image: imageBuffer } = await this.aiRouter.generateImage(
          'blog_image',
          enrichedPrompt,
          { entityType: 'blog_post', entityId: data.postId },
          // O upload abaixo sempre declarou `image/jpeg` num arquivo `.jpg`, mas
          // até aqui os bytes vinham no padrão do provider — PNG. O navegador
          // farejava o conteúdo e renderizava, então nunca quebrou; ficava só um
          // Content-Type mentiroso num arquivo maior do que precisava ser.
          //
          // A proporção acompanha a capa: sem pedir, o padrão do provider é
          // quadrado, e uma ilustração quadrada no meio de um artigo destoa das
          // demais — cada marcador sairia com o formato que o modelo escolhesse.
          { aspectRatio: '16:9', outputFormat: 'jpeg' },
        ));
      } catch (error) {
        // Marcador que falha é pulado, não derruba o refinamento inteiro — o
        // post fica marcado para revisão manual mais abaixo.
        this.logger.warn(
          `Todos os modelos falharam no marcador ${i + 1} do post ${data.postId}: "${description.slice(0, 50)}..." (${
            error instanceof Error ? error.message : String(error)
          })`,
        );
        continue;
      }

      const filename = `refine-${data.postId}-${i}-${Date.now()}.jpg`;
      const { url } = await this.storage.uploadFile(
        imageBuffer,
        filename,
        'image/jpeg',
        'blog',
      );

      const replacement = `![${this.escapeMarkdownAlt(description)}](${url})`;
      processed.push({
        fullMatch,
        index: match.index ?? 0,
        matchOrdinal: i,
        url,
        replacement,
      });
      this.logger.log(`Generated image ${i + 1}: ${url}`);
    }

    let newContent = content;
    for (const { fullMatch, index, replacement } of processed.sort(
      (a, b) => b.index - a.index,
    )) {
      newContent =
        newContent.slice(0, index) +
        replacement +
        newContent.slice(index + fullMatch.length);
    }

    await this.prisma.blogPost.update({
      where: { id: data.postId },
      data: {
        content: newContent,
        refine_needs_manual_fix: processed.length < matches.length,
      },
    });

    // Propagate generated images to translations by ordinal position
    const imageByOrdinal = new Map<number, string>();
    for (const { matchOrdinal, url } of processed) {
      imageByOrdinal.set(matchOrdinal, url);
    }

    if (imageByOrdinal.size > 0) {
      const translations = await this.prisma.blogPostTranslation.findMany({
        where: { post_id: data.postId },
      });

      for (const translation of translations) {
        const tContent = translation.content ?? '';
        const tMatches = [
          ...tContent.matchAll(new RegExp(VISUAL_MARKER_REGEX.source, 'g')),
        ];

        const tProcessed: {
          fullMatch: string;
          matchIndex: number;
          replacement: string;
        }[] = [];
        for (let i = 0; i < tMatches.length; i++) {
          const url = imageByOrdinal.get(i);
          if (!url || !tMatches[i]) continue;
          const fullMatch = tMatches[i][0];
          const desc = (tMatches[i][1] ?? '').trim();
          tProcessed.push({
            fullMatch,
            matchIndex: tMatches[i].index ?? 0,
            replacement: `![${this.escapeMarkdownAlt(desc)}](${url})`,
          });
        }

        if (tProcessed.length === 0) continue;

        let newTContent = tContent;
        for (const { fullMatch, matchIndex, replacement } of tProcessed.sort(
          (a, b) => b.matchIndex - a.matchIndex,
        )) {
          newTContent =
            newTContent.slice(0, matchIndex) +
            replacement +
            newTContent.slice(matchIndex + fullMatch.length);
        }

        await this.prisma.blogPostTranslation.update({
          where: { id: translation.id },
          data: { content: newTContent },
        });
        this.logger.log(
          `Propagated images to translation ${translation.locale} for post ${data.postId}`,
        );
      }
    }

    this.logger.log(`Refinement complete for post ${data.postId}`);
    return {
      allGenerated: processed.length === matches.length,
      generated: processed.length,
      total: matches.length,
    };
  }

  private escapeMarkdownAlt(text: string): string {
    return text.replace(/\]/g, '\\]');
  }
}
