import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { GeminiBaseService } from '@app/ai';
import { StorageService } from '@app/storage';

export interface RefineBlogPostJobData {
  postId: string;
}

const VISUAL_MARKER_REGEX = />\s*📊\s*\*\*\[Visual sugerido\]:\*\*\s*(.+)/g;

const IMAGE_REALISM_SUFFIX =
  ' Photorealistic, documentary style. Real human beings with natural skin tones and authentic expressions. Candid, lifelike moment. Avoid robotic, cartoon, or AI-generated artificial appearance.';

@Injectable()
export class AiBlogRefineService {
  private readonly logger = new Logger(AiBlogRefineService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly gemini: GeminiBaseService,
    private readonly storage: StorageService,
  ) {}

  async refinePost(data: RefineBlogPostJobData): Promise<void> {
    const post = await this.prisma.blogPost.findUnique({
      where: { id: data.postId },
    });

    if (!post) {
      throw new Error(`Post not found: ${data.postId}`);
    }

    const content = post.content ?? '';
    const matches = [...content.matchAll(new RegExp(VISUAL_MARKER_REGEX.source, 'g'))];

    if (matches.length === 0) {
      this.logger.log(`No [Visual sugerido] markers found in post ${data.postId}`);
      return;
    }

    this.logger.log(`Found ${matches.length} visual marker(s) in post ${data.postId}`);

    const processed: { fullMatch: string; index: number; replacement: string }[] = [];

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      if (!match) continue;
      const fullMatch = match[0];
      const description = (match[1] ?? '').trim();

      const enrichedPrompt = description + IMAGE_REALISM_SUFFIX;
      const imageBuffer = await this.gemini.generateImage(enrichedPrompt);
      if (!imageBuffer) {
        this.logger.warn(
          `Failed to generate image for marker ${i + 1} in post ${data.postId}: "${description.slice(0, 50)}..."`,
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
        replacement,
      });
      this.logger.log(`Generated image ${i + 1}: ${url}`);
    }

    let newContent = content;
    for (const { fullMatch, index, replacement } of processed.sort((a, b) => b.index - a.index)) {
      newContent = newContent.slice(0, index) + replacement + newContent.slice(index + fullMatch.length);
    }

    await this.prisma.blogPost.update({
      where: { id: data.postId },
      data: { content: newContent },
    });

    this.logger.log(`Refinement complete for post ${data.postId}`);
  }

  private escapeMarkdownAlt(text: string): string {
    return text.replace(/\]/g, '\\]');
  }
}
