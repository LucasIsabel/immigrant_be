import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BlogRepository } from './blog.repository';
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
  constructor(private readonly blogRepository: BlogRepository) {}

  // ─── Posts ────────────────────────────────────────────────────────────────

  async createPost(authorId: string, dto: CreateBlogPostDto) {
    const category = await this.blogRepository.findCategoryById(dto.category_id);
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    const slug = slugify(dto.title);
    const readingTimeMin = calcReadingTime(dto.content);
    const publishedAt =
      dto.status === 'PUBLISHED' ? new Date() : null;

    return this.blogRepository.createPost(
      authorId,
      dto,
      slug,
      readingTimeMin,
      publishedAt,
    );
  }

  async findPublishedPosts(query: BlogQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const { data, total } = await this.blogRepository.findPublishedPosts({
      skip,
      take: limit,
      categorySlug: query.categorySlug,
      tagSlug: query.tagSlug,
    });

    const localized = query.lang
      ? await Promise.all(data.map((post) => this.applyTranslation(post, query.lang!)))
      : data;

    return { data: localized, total, page, limit };
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

  async findPostBySlug(slug: string, lang?: string) {
    const post = await this.blogRepository.findPostBySlug(slug);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    // Incrementa views de forma assíncrona sem bloquear a resposta
    void this.blogRepository.incrementViews(post.id);
    return lang ? this.applyTranslation(post, lang) : post;
  }

  private async applyTranslation<T extends { id: string; title: string; excerpt: string; content: string }>(
    post: T,
    lang: string,
  ): Promise<T> {
    if (!lang || lang === 'pt') return post;

    const translation = await this.blogRepository.findTranslation(post.id, lang);
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
      const category = await this.blogRepository.findCategoryById(dto.category_id);
      if (!category) {
        throw new NotFoundException('Categoria não encontrada');
      }
    }

    const slug = dto.title ? slugify(dto.title) : undefined;
    const readingTimeMin = dto.content ? calcReadingTime(dto.content) : undefined;

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
    return this.blogRepository.createCategory(dto.name, slug);
  }

  async findAllCategories() {
    return this.blogRepository.findAllCategories();
  }

  async updateCategory(id: string, dto: UpdateBlogCategoryDto) {
    const category = await this.blogRepository.findCategoryById(id);
    if (!category) throw new NotFoundException('Categoria não encontrada');
    const slug = dto.name ? slugify(dto.name) : undefined;
    return this.blogRepository.updateCategory(id, { name: dto.name, slug });
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
