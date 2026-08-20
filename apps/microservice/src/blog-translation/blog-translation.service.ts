import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/database';
import {
  AiRouterService,
  buildBlogTranslationPrompt,
  blogTranslationAiSchema,
  stripEmDashesFromPost,
} from '@app/ai';
import { BlogPostStatus } from '../../../../generated/prisma';
import { CorrelatedJobData } from '@app/config/job-data';
import {
  TRANSLATION_LOCALES,
  type TranslationLocale,
} from '@app/config/constants';
import { BlogPipelineStatus } from '../../../../generated/prisma';

/** Reexportado do lugar único para não voltar a existir uma segunda lista. */
export const SUPPORTED_LOCALES = TRANSLATION_LOCALES;
export type SupportedLocale = TranslationLocale;

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
    private readonly aiRouter: AiRouterService,
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

    // Tradução é mecânica e tem schema validando a saída, então usa o cenário
    // barato em vez do modelo de escrita.
    const { data: parsed, result } = await this.aiRouter.generateJson(
      'blog_translation',
      prompt,
      blogTranslationAiSchema,
      { entityType: 'blog_translation', entityId: data.postId },
    );

    if (!parsed) {
      throw new Error(
        `Failed to parse ${result.model} translation response for post ${data.postId} → ${data.targetLocale}`,
      );
    }

    const prose = stripEmDashesFromPost(parsed);

    await this.prisma.blogPostTranslation.upsert({
      where: {
        post_id_locale: { post_id: data.postId, locale: data.targetLocale },
      },
      create: {
        post_id: data.postId,
        locale: data.targetLocale,
        title: prose.title,
        excerpt: prose.excerpt,
        content: prose.content,
        translated_by: 'AI',
        translated_by_model: result.model,
      },
      update: {
        title: prose.title,
        excerpt: prose.excerpt,
        content: prose.content,
        translated_by: 'AI',
        translated_by_model: result.model,
      },
    });

    this.logger.log(
      `Translation saved for post ${data.postId} → ${data.targetLocale}`,
    );
  }

  /**
   * Avança o pipeline para a imagem quando o post tem todas as traduções.
   *
   * Devolve `true` só para quem de fato fez a transição. Os jobs de pt e es
   * rodam em paralelo e podem terminar juntos: se cada um checasse "já tem tudo?"
   * e enfileirasse, o post ganharia duas capas — duas imagens pagas e a segunda
   * sobrescrevendo a primeira.
   *
   * O `updateMany` com `pipeline_status` no `where` é um compare-and-set: o
   * Postgres serializa os dois updates e só um encontra a linha ainda em
   * TRANSLATING. O outro recebe `count: 0` e não faz nada.
   */
  async advanceToImageIfTranslated(postId: string): Promise<boolean> {
    const locales = await this.prisma.blogPostTranslation.findMany({
      where: { post_id: postId },
      select: { locale: true },
    });

    const done = new Set(locales.map((t) => t.locale));
    if (!TRANSLATION_LOCALES.every((locale) => done.has(locale))) return false;

    const { count } = await this.prisma.blogPost.updateMany({
      where: { id: postId, pipeline_status: BlogPipelineStatus.TRANSLATING },
      data: { pipeline_status: BlogPipelineStatus.GENERATING_IMAGE },
    });

    return count === 1;
  }

  /** O que o job da capa precisa saber do post. */
  async getPostForImage(postId: string): Promise<{
    id: string;
    slug: string;
    title: string;
    countryName: string;
  } | null> {
    const post = await this.prisma.blogPost.findUnique({
      where: { id: postId },
      select: {
        id: true,
        slug: true,
        title: true,
        featured_country: { select: { name: true } },
      },
    });

    if (!post) return null;

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      // O prompt da capa cita o país; sem ele a imagem sai genérica.
      countryName: post.featured_country?.name ?? '',
    };
  }

  /** Marca a etapa que falhou, com o motivo, quando o BullMQ esgota as tentativas. */
  async markPipelineFailure(
    postId: string,
    status: BlogPipelineStatus,
    step: string,
    message: string,
  ): Promise<void> {
    await this.prisma.blogPost
      .update({
        where: { id: postId },
        data: {
          pipeline_status: status,
          pipeline_error: { step, message, at: new Date().toISOString() },
        },
      })
      .catch((error: unknown) => {
        // Registrar a falha não pode virar uma segunda falha.
        this.logger.warn(
          `Não foi possível marcar a falha de pipeline do post ${postId}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      });
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
