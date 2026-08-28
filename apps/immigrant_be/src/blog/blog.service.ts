import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  APP_LOCALES,
  type AppLocale,
  BLOG_TRANSLATION_QUEUE,
  TRANSLATE_BLOG_CATEGORY,
} from '@app/config/constants';
import { BlogRepository } from './blog.repository';
import {
  localizeCategory,
  localizeEmbeddedCategory,
  withOriginalTranslation,
} from './localize-category';
import { UpsertBlogCategoryTranslationDto } from './dto/upsert-blog-category-translation.dto';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { CreateBlogTagDto } from './dto/create-blog-tag.dto';
import { UpdateBlogTagDto } from './dto/update-blog-tag.dto';
import { CreateBlogAuthorDto } from './dto/create-blog-author.dto';
import { UpdateBlogAuthorDto } from './dto/update-blog-author.dto';
import { BlogQueryDto, AdminBlogQueryDto } from './dto/blog-query.dto';
import { UpsertBlogTranslationDto } from './dto/upsert-blog-translation.dto';

/**
 * Prisma includes the like count as a `_count` relation aggregate; the API
 * exposes it flattened as `likes_count`.
 */
type PostWithLikeCount = Record<string, unknown> & {
  _count?: { likes?: number };
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);

  constructor(
    private readonly blogRepository: BlogRepository,
    @InjectQueue(BLOG_TRANSLATION_QUEUE)
    private readonly translationQueue: Queue,
  ) {}

  /**
   * Asks for a category to be translated, and never gets in the way.
   *
   * Categories are written in Portuguese while the blog is read in three
   * languages, so a name arrives needing two more. Enqueuing rather than
   * translating inline keeps the admin's save instant, and a queue that is
   * down must not stop somebody creating a category — the nightly sweep picks
   * up whatever was missed.
   */
  private async requestCategoryTranslation(categoryId: string): Promise<void> {
    try {
      await this.translationQueue.add(TRANSLATE_BLOG_CATEGORY, { categoryId });
    } catch (error) {
      this.logger.warn(
        `Could not enqueue the translation of category ${categoryId}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  // ─── Posts ────────────────────────────────────────────────────────────────

  async createPost(authorId: string, dto: CreateBlogPostDto) {
    const category = await this.blogRepository.findCategoryById(
      dto.category_id,
    );
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    const slug = slugify(dto.title);
    const readingTimeMin = calcReadingTime(dto.content);
    const publishedAt = dto.status === 'PUBLISHED' ? new Date() : null;

    return this.blogRepository.createPost(
      authorId,
      dto,
      slug,
      readingTimeMin,
      publishedAt,
    );
  }

  async findPublishedPosts(query: BlogQueryDto, userId?: string) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const { data, total } = await this.blogRepository.findPublishedPosts({
      skip,
      take: limit,
      categorySlug: query.categorySlug,
      tagSlug: query.tagSlug,
      search: query.search,
    });

    const localized = query.lang
      ? await Promise.all(
          data.map(async (post) =>
            localizeEmbeddedCategory(
              await this.applyTranslation(post, query.lang!),
              query.lang,
            ),
          ),
        )
      : data;

    const postIds = localized.map((p) => p.id);
    const likedIds = userId
      ? await this.blogRepository.getLikedPostIdsForUser(postIds, userId)
      : new Set<string>();
    const counterparts = await this.blogRepository.findPublishedSiblingSlugs(
      localized.map((post) => ({
        id: post.id,
        debate_group_id:
          (post as { debate_group_id?: string | null }).debate_group_id ?? null,
      })),
    );

    const enriched = localized.map((post) => {
      const { _count, ...rest } = post as PostWithLikeCount;
      return {
        ...rest,
        likes_count: _count?.likes ?? 0,
        is_liked: likedIds.has(post.id),
        counterpart_slug: counterparts.get(post.id) ?? null,
      };
    });

    return { data: enriched, total, page, limit };
  }

  async findAdminPosts(query: AdminBlogQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const { data, total } = await this.blogRepository.findAllPosts({
      skip,
      take: limit,
      categorySlug: query.categorySlug,
      tagSlug: query.tagSlug,
      status: query.status,
    });

    return { data, total, page, limit };
  }

  async findPostBySlug(slug: string, lang?: string, userId?: string) {
    const post = await this.blogRepository.findPostBySlug(slug);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    void this.blogRepository.incrementViews(post.id);
    const localized = lang
      ? localizeEmbeddedCategory(await this.applyTranslation(post, lang), lang)
      : post;
    const likedIds = userId
      ? await this.blogRepository.getLikedPostIdsForUser([post.id], userId)
      : new Set<string>();
    const counterparts = await this.blogRepository.findPublishedSiblingSlugs([
      {
        id: post.id,
        debate_group_id:
          (post as { debate_group_id?: string | null }).debate_group_id ?? null,
      },
    ]);
    const { _count, ...rest } = localized as PostWithLikeCount;
    return {
      ...rest,
      likes_count: _count?.likes ?? 0,
      is_liked: likedIds.has(post.id),
      counterpart_slug: counterparts.get(post.id) ?? null,
    };
  }

  async togglePostLike(postId: string, userId: string) {
    const post = await this.blogRepository.findPostById(postId);
    if (!post) throw new NotFoundException('Post não encontrado');
    if (post.status !== 'PUBLISHED') {
      throw new NotFoundException('Post não encontrado');
    }
    return this.blogRepository.toggleLike(postId, userId);
  }

  private async applyTranslation<
    T extends {
      id: string;
      title: string;
      excerpt: string;
      content: string;
      original_locale?: string;
    },
  >(post: T, lang: string): Promise<T> {
    const originalLocale = post.original_locale ?? 'en';
    if (!lang || lang === originalLocale) return post;

    const translation = await this.blogRepository.findTranslation(
      post.id,
      lang,
    );
    if (!translation) return post;

    return {
      ...post,
      title: translation.title,
      excerpt: translation.excerpt,
      content: translation.content,
    };
  }

  // ─── Translations (admin) ─────────────────────────────────────────────────

  async getPostTranslations(postId: string) {
    const post = await this.blogRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    return this.blogRepository.findAllTranslationsForPost(postId);
  }

  async upsertPostTranslation(
    postId: string,
    locale: string,
    dto: UpsertBlogTranslationDto,
  ) {
    const post = await this.blogRepository.findPostById(postId);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    return this.blogRepository.upsertTranslation(postId, locale, {
      title: dto.title,
      excerpt: dto.excerpt,
      content: dto.content,
      translated_by: 'HUMAN',
    });
  }

  async updatePost(id: string, dto: UpdateBlogPostDto) {
    const existing = await this.blogRepository.findPostById(id);
    if (!existing) {
      throw new NotFoundException('Post não encontrado');
    }

    if (dto.category_id) {
      const category = await this.blogRepository.findCategoryById(
        dto.category_id,
      );
      if (!category) {
        throw new NotFoundException('Categoria não encontrada');
      }
    }

    const slug = dto.slug ?? (dto.title ? slugify(dto.title) : undefined);
    const readingTimeMin =
      dto.reading_time_min ??
      (dto.content ? calcReadingTime(dto.content) : undefined);

    let publishedAt: Date | null | undefined;
    if (dto.status === 'PUBLISHED' && !existing.published_at) {
      publishedAt = new Date();
    } else if (dto.status && dto.status !== 'PUBLISHED') {
      publishedAt = null;
    }

    return this.blogRepository.updatePost(
      id,
      dto,
      slug,
      readingTimeMin,
      publishedAt,
    );
  }

  async deletePost(id: string) {
    const existing = await this.blogRepository.findPostById(id);
    if (!existing) {
      throw new NotFoundException('Post não encontrado');
    }
    return this.blogRepository.deletePost(id);
  }

  // ─── Categories ───────────────────────────────────────────────────────────

  async createCategory(dto: CreateBlogCategoryDto) {
    const slug = slugify(dto.name);
    const existing = await this.blogRepository.findCategoryBySlug(slug);
    if (existing) {
      throw new ConflictException('Categoria já existe com este nome');
    }
    const created = await this.blogRepository.createCategory(dto.name, slug);
    await this.requestCategoryTranslation(created.id);
    return created;
  }

  async findAllCategories(lang?: string) {
    const categories = await this.blogRepository.findAllCategories();
    return categories.map((category) =>
      localizeCategory(withOriginalTranslation(category), lang),
    );
  }

  /**
   * One category, by the canonical slug or by a translated one.
   *
   * The category page needs a real title and a real 404: today it derives its
   * heading from the slug, so any invented URL renders a page.
   */
  async findCategoryBySlug(slug: string, lang?: string) {
    const category = await this.blogRepository.findCategoryByAnySlug(slug);
    if (!category) throw new NotFoundException('Categoria não encontrada');

    return localizeCategory(withOriginalTranslation(category), lang);
  }

  // ─── Category translations (admin) ────────────────────────────────────────

  async getCategoryTranslations(categoryId: string) {
    const category = await this.blogRepository.findCategoryById(categoryId);
    if (!category) throw new NotFoundException('Categoria não encontrada');

    return this.blogRepository.findCategoryTranslations(categoryId);
  }

  /**
   * An admin correcting a name the AI got wrong.
   *
   * The slug is recomputed here rather than accepted from the client: it is a
   * mechanical transformation with one right answer, and letting the two drift
   * would leave a category reachable at a URL that no longer describes it.
   */
  async upsertCategoryTranslation(
    categoryId: string,
    locale: string,
    dto: UpsertBlogCategoryTranslationDto,
  ) {
    const category = await this.blogRepository.findCategoryById(categoryId);
    if (!category) throw new NotFoundException('Categoria não encontrada');

    // Validated here and not only in the DTO: the unique constraint accepts any
    // string, so a locale mistyped in the path would become a permanent row
    // nobody ever reads. Same guard the country translations use.
    if (!APP_LOCALES.includes(locale as AppLocale)) {
      throw new BadRequestException(
        `Idioma inválido: ${locale}. Use ${APP_LOCALES.join(', ')}.`,
      );
    }

    const slug = await this.availableTranslationSlug(
      locale,
      slugify(dto.name),
      categoryId,
    );

    return this.blogRepository.upsertCategoryTranslation(categoryId, locale, {
      name: dto.name,
      slug,
      translated_by: 'HUMAN',
      // The model no longer wrote this row, and saying it did would make the
      // admin's own correction look like the AI's work.
      translated_by_model: null,
    });
  }

  /**
   * A slug nothing else in that language is already using.
   *
   * Twin of `availableSlug` in the translation worker. They may pick different
   * suffixes for the same collision, which is harmless — both produce a slug
   * the unique constraint accepts, and neither can take one that is in use.
   */
  private async availableTranslationSlug(
    locale: string,
    base: string,
    categoryId: string,
  ): Promise<string> {
    const candidate = base || 'categoria';

    for (let attempt = 0; attempt < 20; attempt += 1) {
      const slug = attempt === 0 ? candidate : `${candidate}-${attempt + 1}`;
      const owner = await this.blogRepository.findCategoryIdByTranslatedSlug(
        locale,
        slug,
      );
      if (!owner || owner === categoryId) return slug;
    }

    return `${candidate}-${categoryId.slice(0, 8)}`;
  }

  /** Hands the category back to the AI, discarding whatever a human corrected. */
  async enqueueCategoryTranslation(categoryId: string) {
    const category = await this.blogRepository.findCategoryById(categoryId);
    if (!category) throw new NotFoundException('Categoria não encontrada');

    await this.translationQueue.add(TRANSLATE_BLOG_CATEGORY, { categoryId });

    return { message: 'Category translation job enqueued', categoryId };
  }

  async updateCategory(id: string, dto: UpdateBlogCategoryDto) {
    const category = await this.blogRepository.findCategoryById(id);
    if (!category) throw new NotFoundException('Categoria não encontrada');
    const slug = dto.name ? slugify(dto.name) : undefined;
    const updated = await this.blogRepository.updateCategory(id, {
      name: dto.name,
      slug,
    });

    // A rename makes the existing translations describe a name that is gone,
    // so they are redone from the new one — including any an admin had
    // corrected by hand, because what they corrected no longer exists.
    if (dto.name && dto.name !== category.name) {
      await this.requestCategoryTranslation(id);
    }

    return updated;
  }

  async deleteCategory(id: string) {
    const category = await this.blogRepository.findCategoryById(id);
    if (!category) throw new NotFoundException('Categoria não encontrada');
    return this.blogRepository.deleteCategory(id);
  }

  // ─── Tags ─────────────────────────────────────────────────────────────────

  async createTag(dto: CreateBlogTagDto) {
    const slug = slugify(dto.name);
    const existing = await this.blogRepository.findTagBySlug(slug);
    if (existing) {
      throw new ConflictException('Tag já existe com este nome');
    }
    return this.blogRepository.createTag(dto.name, slug);
  }

  async findAllTags() {
    return this.blogRepository.findAllTags();
  }

  async updateTag(id: string, dto: UpdateBlogTagDto) {
    const tag = await this.blogRepository.findTagById(id);
    if (!tag) throw new NotFoundException('Tag não encontrada');
    const slug = dto.name ? slugify(dto.name) : undefined;
    return this.blogRepository.updateTag(id, { name: dto.name, slug });
  }

  async deleteTag(id: string) {
    const tag = await this.blogRepository.findTagById(id);
    if (!tag) throw new NotFoundException('Tag não encontrada');
    return this.blogRepository.deleteTag(id);
  }

  // ─── Authors ─────────────────────────────────────────────────────────────────

  async createAuthor(dto: CreateBlogAuthorDto) {
    return this.blogRepository.createAuthor(dto);
  }

  async findAllAuthors() {
    return this.blogRepository.findAllAuthors();
  }

  async findAuthorById(id: string) {
    const author = await this.blogRepository.findAuthorById(id);
    if (!author) {
      throw new NotFoundException('Autor não encontrado');
    }
    return author;
  }

  async updateAuthor(id: string, dto: UpdateBlogAuthorDto) {
    await this.findAuthorById(id);
    return this.blogRepository.updateAuthor(id, dto);
  }

  async deleteAuthor(id: string) {
    await this.findAuthorById(id);
    return this.blogRepository.deleteAuthor(id);
  }
}
