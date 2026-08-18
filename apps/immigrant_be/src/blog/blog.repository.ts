import { PrismaService } from '@app/database';
import { Injectable } from '@nestjs/common';
import { BlogPostStatus } from '../../../../generated/prisma';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { CreateBlogAuthorDto } from './dto/create-blog-author.dto';
import { UpdateBlogAuthorDto } from './dto/update-blog-author.dto';

const POST_INCLUDE = {
  author: { select: { id: true, name: true, image: true } },
  // `author` é o usuário que criou o registro; `display_author` é a assinatura
  // editorial. Sem incluir o segundo, a API só sabia contar o primeiro — e como
  // a criação por IA resolve `author_id` para o primeiro admin do sistema, todo
  // post gerado aparecia assinado por uma pessoa real que não o escreveu.
  //
  // Os carimbos de tempo do autor ficam de fora: uma assinatura é identidade,
  // não histórico do cadastro.
  display_author: {
    select: {
      id: true,
      name: true,
      bio: true,
      avatar_url: true,
      website: true,
      twitter: true,
      linkedin: true,
    },
  },
  category: true,
  tags: { include: { tag: true } },
  _count: { select: { likes: true } },
};

@Injectable()
export class BlogRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Posts ────────────────────────────────────────────────────────────────

  async createPost(
    authorId: string,
    dto: CreateBlogPostDto,
    slug: string,
    readingTimeMin: number,
    publishedAt: Date | null,
  ) {
    return this.prisma.blogPost.create({
      data: {
        title: dto.title,
        slug,
        excerpt: dto.excerpt,
        content: dto.content,
        cover_image_url: dto.cover_image_url,
        status: (dto.status as BlogPostStatus) ?? BlogPostStatus.DRAFT,
        reading_time_min: readingTimeMin,
        published_at: publishedAt,
        author_id: authorId,
        category_id: dto.category_id,
        featured_country_id: dto.featured_country_id ?? null,
        tags: dto.tag_ids?.length
          ? { create: dto.tag_ids.map((tag_id) => ({ tag_id })) }
          : undefined,
      },
      include: POST_INCLUDE,
    });
  }

  async findPublishedPosts(opts: {
    skip: number;
    take: number;
    categorySlug?: string;
    tagSlug?: string;
    search?: string;
  }) {
    const searchFilter = opts.search?.trim()
      ? {
          OR: [
            {
              title: {
                contains: opts.search.trim(),
                mode: 'insensitive' as const,
              },
            },
            {
              excerpt: {
                contains: opts.search.trim(),
                mode: 'insensitive' as const,
              },
            },
            {
              content: {
                contains: opts.search.trim(),
                mode: 'insensitive' as const,
              },
            },
          ],
        }
      : {};

    const where = {
      status: BlogPostStatus.PUBLISHED,
      ...searchFilter,
      ...(opts.categorySlug && { category: { slug: opts.categorySlug } }),
      ...(opts.tagSlug && {
        tags: { some: { tag: { slug: opts.tagSlug } } },
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.blogPost.findMany({
        where,
        skip: opts.skip,
        take: opts.take,
        orderBy: { published_at: 'desc' },
        include: POST_INCLUDE,
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return { data, total };
  }

  async findAllPosts(opts: {
    skip: number;
    take: number;
    categorySlug?: string;
    tagSlug?: string;
    status?: string;
  }) {
    const where = {
      ...(opts.status && { status: opts.status as BlogPostStatus }),
      ...(opts.categorySlug && { category: { slug: opts.categorySlug } }),
      ...(opts.tagSlug && {
        tags: { some: { tag: { slug: opts.tagSlug } } },
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.blogPost.findMany({
        where,
        skip: opts.skip,
        take: opts.take,
        orderBy: { created_at: 'desc' },
        include: POST_INCLUDE,
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return { data, total };
  }

  async findPostBySlug(slug: string) {
    return this.prisma.blogPost.findUnique({
      where: { slug },
      include: POST_INCLUDE,
    });
  }

  async findPostById(id: string) {
    return this.prisma.blogPost.findUnique({
      where: { id },
      include: POST_INCLUDE,
    });
  }

  async updatePost(
    id: string,
    dto: UpdateBlogPostDto,
    slug?: string,
    readingTimeMin?: number,
    publishedAt?: Date | null,
  ) {
    return this.prisma.blogPost.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(slug && { slug }),
        ...(dto.excerpt && { excerpt: dto.excerpt }),
        ...(dto.content && { content: dto.content }),
        ...(dto.cover_image_url !== undefined && {
          cover_image_url: dto.cover_image_url,
        }),
        ...(dto.status && { status: dto.status as BlogPostStatus }),
        ...(readingTimeMin !== undefined && {
          reading_time_min: readingTimeMin,
        }),
        ...(publishedAt !== undefined && { published_at: publishedAt }),
        ...(dto.category_id && { category_id: dto.category_id }),
        ...(dto.featured_country_id !== undefined && {
          featured_country_id: dto.featured_country_id,
        }),
        ...(dto.tag_ids !== undefined && {
          tags: {
            deleteMany: {},
            create: dto.tag_ids.map((tag_id) => ({ tag_id })),
          },
        }),
      },
      include: POST_INCLUDE,
    });
  }

  async deletePost(id: string) {
    return this.prisma.blogPost.delete({ where: { id } });
  }

  async incrementViews(id: string) {
    return this.prisma.blogPost.update({
      where: { id },
      data: { views_count: { increment: 1 } },
    });
  }

  // ─── Categories ───────────────────────────────────────────────────────────

  async createCategory(name: string, slug: string) {
    return this.prisma.blogCategory.create({ data: { name, slug } });
  }

  async findAllCategories() {
    const [categories, groupedCounts] = await Promise.all([
      this.prisma.blogCategory.findMany({
        orderBy: { name: 'asc' },
      }),
      this.prisma.blogPost.groupBy({
        by: ['category_id'],
        where: {
          status: BlogPostStatus.PUBLISHED,
        },
        _count: { _all: true },
      }),
    ]);

    const countByCategoryId = new Map<string, number>(
      groupedCounts.map((group) => [group.category_id, group._count._all]),
    );

    return categories.map((category) => ({
      ...category,
      published_posts_count: countByCategoryId.get(category.id) ?? 0,
    }));
  }

  async findCategoryBySlug(slug: string) {
    return this.prisma.blogCategory.findUnique({ where: { slug } });
  }

  async findCategoryById(id: string) {
    return this.prisma.blogCategory.findUnique({ where: { id } });
  }

  async updateCategory(id: string, data: { name?: string; slug?: string }) {
    return this.prisma.blogCategory.update({ where: { id }, data });
  }

  async deleteCategory(id: string) {
    return this.prisma.blogCategory.delete({ where: { id } });
  }

  // ─── Tags ─────────────────────────────────────────────────────────────────

  async createTag(name: string, slug: string) {
    return this.prisma.blogTag.create({ data: { name, slug } });
  }

  async findAllTags() {
    return this.prisma.blogTag.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findTagBySlug(slug: string) {
    return this.prisma.blogTag.findUnique({ where: { slug } });
  }

  async findTagById(id: string) {
    return this.prisma.blogTag.findUnique({ where: { id } });
  }

  async updateTag(id: string, data: { name?: string; slug?: string }) {
    return this.prisma.blogTag.update({ where: { id }, data });
  }

  async deleteTag(id: string) {
    return this.prisma.blogTag.delete({ where: { id } });
  }

  // ─── Authors ─────────────────────────────────────────────────────────────────

  async createAuthor(dto: CreateBlogAuthorDto) {
    return this.prisma.blogAuthor.create({
      data: {
        name: dto.name,
        bio: dto.bio ?? null,
        avatar_url: dto.avatar_url ?? null,
        website: dto.website ?? null,
        twitter: dto.twitter ?? null,
        linkedin: dto.linkedin ?? null,
      },
    });
  }

  async findAllAuthors() {
    return this.prisma.blogAuthor.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findAuthorById(id: string) {
    return this.prisma.blogAuthor.findUnique({ where: { id } });
  }

  async updateAuthor(id: string, dto: UpdateBlogAuthorDto) {
    return this.prisma.blogAuthor.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.bio !== undefined && { bio: dto.bio }),
        ...(dto.avatar_url !== undefined && { avatar_url: dto.avatar_url }),
        ...(dto.website !== undefined && { website: dto.website }),
        ...(dto.twitter !== undefined && { twitter: dto.twitter }),
        ...(dto.linkedin !== undefined && { linkedin: dto.linkedin }),
      },
    });
  }

  async deleteAuthor(id: string) {
    return this.prisma.blogAuthor.delete({ where: { id } });
  }

  // ─── Translations ─────────────────────────────────────────────────────────

  async toggleLike(
    postId: string,
    userId: string,
  ): Promise<{ liked: boolean }> {
    const existing = await this.prisma.blogPostLike.findUnique({
      where: { post_id_user_id: { post_id: postId, user_id: userId } },
    });
    if (existing) {
      await this.prisma.blogPostLike.delete({
        where: { post_id_user_id: { post_id: postId, user_id: userId } },
      });
      return { liked: false };
    }
    await this.prisma.blogPostLike.create({
      data: { post_id: postId, user_id: userId },
    });
    return { liked: true };
  }

  async getLikeCountsForPosts(postIds: string[]): Promise<Map<string, number>> {
    if (postIds.length === 0) return new Map();
    const counts = await this.prisma.blogPostLike.groupBy({
      by: ['post_id'],
      where: { post_id: { in: postIds } },
      _count: { post_id: true },
    });
    const map = new Map<string, number>();
    for (const c of counts) map.set(c.post_id, c._count.post_id);
    return map;
  }

  async getLikedPostIdsForUser(
    postIds: string[],
    userId: string,
  ): Promise<Set<string>> {
    if (postIds.length === 0) return new Set();
    const likes = await this.prisma.blogPostLike.findMany({
      where: { post_id: { in: postIds }, user_id: userId },
      select: { post_id: true },
    });
    return new Set(likes.map((l) => l.post_id));
  }

  async findTranslation(postId: string, locale: string) {
    return this.prisma.blogPostTranslation.findUnique({
      where: { post_id_locale: { post_id: postId, locale } },
    });
  }

  async findAllTranslationsForPost(postId: string) {
    return this.prisma.blogPostTranslation.findMany({
      where: { post_id: postId },
      orderBy: { locale: 'asc' },
    });
  }

  async upsertTranslation(
    postId: string,
    locale: string,
    data: {
      title: string;
      excerpt: string;
      content: string;
      translated_by: string;
    },
  ) {
    return this.prisma.blogPostTranslation.upsert({
      where: { post_id_locale: { post_id: postId, locale } },
      create: {
        post_id: postId,
        locale,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        translated_by: data.translated_by,
      },
      update: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        translated_by: data.translated_by,
      },
    });
  }
}
