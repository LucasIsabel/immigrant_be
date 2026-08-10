import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/database';
import {
  GeminiBaseService,
  buildBlogTranslationPrompt,
  blogTranslationAiSchema,
} from '@app/ai';
import { BlogPostStatus } from '../../../../generated/prisma';
import { CorrelatedJobData } from '@app/config/job-data';

export const SUPPORTED_LOCALES = ['pt', 'es'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export interface TranslatePostJobData extends CorrelatedJobData {
  postId: string;
  targetLocale: SupportedLocale;
  requestedByUserId?: string;
}

export interface PendingTranslation {
  postId: string;
  targetLocale: SupportedLocale;
}

@Injectable()
export class BlogTranslationWorkerService {
  private readonly logger = new Logger(BlogTranslationWorkerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly gemini: GeminiBaseService,
  ) {}

  async translatePost(data: TranslatePostJobData): Promise<void> {
    const post = await this.prisma.blogPost.findUnique({
      where: { id: data.postId },
    });

    if (!post) {
      throw new Error(`BlogPost not found: ${data.postId}`);
    }

    this.logger.log(`Translating post "${post.title}" to ${data.targetLocale}`);

    const prompt = buildBlogTranslationPrompt({
      targetLocale: data.targetLocale,
      originalLocale: post.original_locale,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
    });

    const response = await this.gemini.generateContent(prompt);
    const rawText = response.response.text();
    const parsed = this.gemini.parseJsonResponse(
      rawText,
      blogTranslationAiSchema,
    );

    if (!parsed) {
      throw new Error(
        `Failed to parse Gemini translation response for post ${data.postId} → ${data.targetLocale}`,
      );
    }

    await this.prisma.blogPostTranslation.upsert({
      where: {
        post_id_locale: { post_id: data.postId, locale: data.targetLocale },
      },
      create: {
        post_id: data.postId,
        locale: data.targetLocale,
        title: parsed.title,
        excerpt: parsed.excerpt,
        content: parsed.content,
        translated_by: 'AI',
      },
      update: {
        title: parsed.title,
        excerpt: parsed.excerpt,
        content: parsed.content,
        translated_by: 'AI',
      },
    });

    this.logger.log(
      `Translation saved for post ${data.postId} → ${data.targetLocale}`,
    );
  }

  async getPendingTranslations(): Promise<PendingTranslation[]> {
    const publishedPosts = await this.prisma.blogPost.findMany({
      where: { status: BlogPostStatus.PUBLISHED },
      select: {
        id: true,
        translations: { select: { locale: true } },
      },
    });

    const pending: PendingTranslation[] = [];

    for (const post of publishedPosts) {
      const existingLocales = new Set(post.translations.map((t) => t.locale));

      for (const locale of SUPPORTED_LOCALES) {
        if (!existingLocales.has(locale)) {
          pending.push({ postId: post.id, targetLocale: locale });
        }
      }
    }

    return pending;
  }
}
