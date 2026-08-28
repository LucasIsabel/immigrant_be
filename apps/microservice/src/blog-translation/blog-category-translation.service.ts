import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/database';
import {
  AiRouterService,
  blogCategoryTranslationSchema,
  buildBlogCategoryTranslationPrompt,
} from '@app/ai';
import { translationTargetsFor } from '@app/config/constants';

/**
 * Turning a category's name into the languages the blog is read in.
 *
 * The post beside it was already translated in full — title, excerpt, body —
 * while the category above it stayed in Portuguese, because the category had
 * nowhere to keep another language.
 *
 * One call does every missing language at once. A category name is three words;
 * asking three times would cost three round trips for less consistency, since
 * the model would not see its own other answers.
 */
@Injectable()
export class BlogCategoryTranslationService {
  private readonly logger = new Logger(BlogCategoryTranslationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiRouter: AiRouterService,
  ) {}

  /**
   * A URL segment built from a translated name.
   *
   * Built here rather than asked of the model: a slug is a mechanical
   * transformation with one right answer, and a model that returns
   * "Diploma Recognition" for the name will cheerfully return
   * "diploma_recognition" or "/diploma-recognition" for the slug.
   */
  static slugify(value: string): string {
    return value
      .normalize('NFD')
      .replace(/\p{Mn}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * A slug nothing else in that language is already using.
   *
   * Two categories can translate to the same words — and a collision would
   * make one of them unreachable, which is worse than a suffix nobody reads.
   */
  private async availableSlug(
    locale: string,
    base: string,
    categoryId: string,
  ): Promise<string> {
    const candidate = base || 'categoria';

    for (let attempt = 0; attempt < 20; attempt += 1) {
      const slug = attempt === 0 ? candidate : `${candidate}-${attempt + 1}`;
      const taken = await this.prisma.blogCategoryTranslation.findUnique({
        where: { locale_slug: { locale, slug } },
        select: { category_id: true },
      });
      if (!taken || taken.category_id === categoryId) return slug;
    }

    // Twenty categories translating to the same words is not a real blog; the
    // id keeps the page reachable rather than failing the whole translation.
    return `${candidate}-${categoryId.slice(0, 8)}`;
  }

  async translateCategory(categoryId: string): Promise<void> {
    const category = await this.prisma.blogCategory.findUnique({
      where: { id: categoryId },
      select: { id: true, name: true, original_locale: true },
    });

    if (!category) {
      this.logger.warn(`Category ${categoryId} is gone; nothing to translate`);
      return;
    }

    const targets = translationTargetsFor(category.original_locale);
    if (targets.length === 0) return;

    // The siblings are what stop "Política" coming back as "Policy".
    const siblings = await this.prisma.blogCategory.findMany({
      where: { id: { not: categoryId } },
      select: { name: true },
      orderBy: { name: 'asc' },
    });

    const prompt = buildBlogCategoryTranslationPrompt({
      name: category.name,
      originalLocale: category.original_locale,
      targetLocales: targets,
      siblings: siblings.map((s) => s.name),
    });

    const { data, result } = await this.aiRouter.generateJson(
      'blog_translation',
      prompt,
      blogCategoryTranslationSchema,
      { entityType: 'blog_category', entityId: categoryId },
    );

    if (!data) {
      throw new Error(
        `Category ${categoryId}: the model returned nothing usable`,
      );
    }

    for (const locale of targets) {
      const name = data[locale]?.trim();
      if (!name) {
        // One missing language does not spoil the others; the reader falls
        // back to the original name until the next run fills it in.
        this.logger.warn(
          `Category ${categoryId}: no ${locale} in the model's answer`,
        );
        continue;
      }

      const slug = await this.availableSlug(
        locale,
        BlogCategoryTranslationService.slugify(name),
        categoryId,
      );

      await this.prisma.blogCategoryTranslation.upsert({
        where: { category_id_locale: { category_id: categoryId, locale } },
        create: {
          category_id: categoryId,
          locale,
          name,
          slug,
          translated_by: 'AI',
          translated_by_model: result?.model ?? null,
        },
        update: {
          name,
          slug,
          translated_by: 'AI',
          translated_by_model: result?.model ?? null,
        },
      });
    }

    this.logger.log(
      `Category ${categoryId} translated into ${targets.join(', ')}`,
    );
  }

  /** Every category still missing a language, for the nightly sweep. */
  async findCategoriesNeedingTranslation(): Promise<string[]> {
    const categories = await this.prisma.blogCategory.findMany({
      select: {
        id: true,
        original_locale: true,
        translations: { select: { locale: true } },
      },
    });

    return categories
      .filter((category) => {
        const have = new Set(category.translations.map((t) => t.locale));
        return translationTargetsFor(category.original_locale).some(
          (locale) => !have.has(locale),
        );
      })
      .map((category) => category.id);
  }
}
