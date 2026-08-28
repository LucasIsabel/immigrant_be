jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  BlogPostStatus: {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
  },
}));

import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { getQueueToken } from '@nestjs/bullmq';
import {
  BLOG_TRANSLATION_QUEUE,
  TRANSLATE_BLOG_CATEGORY,
} from '@app/config/constants';
import { BlogService } from './blog.service';

const mockTranslationQueue = { add: jest.fn() };
import { BlogRepository } from './blog.repository';

const mockRepository = {
  createPost: jest.fn(),
  findPublishedPosts: jest.fn(),
  findAllPosts: jest.fn(),
  findPostBySlug: jest.fn(),
  findPostById: jest.fn(),
  findPublishedSiblingSlugs: jest.fn(),
  getLikedPostIdsForUser: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
  incrementViews: jest.fn(),
  createCategory: jest.fn(),
  findAllCategories: jest.fn(),
  findCategoryBySlug: jest.fn(),
  findCategoryByAnySlug: jest.fn(),
  findCategoryById: jest.fn(),
  updateCategory: jest.fn(),
  createTag: jest.fn(),
  findAllTags: jest.fn(),
  findTagBySlug: jest.fn(),
  findTagById: jest.fn(),
};

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        { provide: BlogRepository, useValue: mockRepository },
        {
          provide: getQueueToken(BLOG_TRANSLATION_QUEUE),
          useValue: mockTranslationQueue,
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
    jest.clearAllMocks();
    mockRepository.findPublishedSiblingSlugs.mockResolvedValue(new Map());
    mockRepository.getLikedPostIdsForUser.mockResolvedValue(new Set());
  });

  // ─── Slugify ──────────────────────────────────────────────────────────────

  describe('createPost (slug gerado automaticamente)', () => {
    it('deve gerar slug correto a partir do título', async () => {
      mockRepository.findCategoryById.mockResolvedValue({ id: 'cat-id' });
      mockRepository.createPost.mockResolvedValue({ id: 'post-id' });

      await service.createPost('author-id', {
        title: 'Como imigrar para o Canadá',
        excerpt: 'Resumo',
        content: 'Conteúdo',
        category_id: 'cat-id',
      });

      expect(mockRepository.createPost).toHaveBeenCalledWith(
        'author-id',
        expect.any(Object),
        'como-imigrar-para-o-canada',
        expect.any(Number),
        null,
      );
    });

    it('deve lançar NotFoundException quando categoria não existe', async () => {
      mockRepository.findCategoryById.mockResolvedValue(null);

      await expect(
        service.createPost('author-id', {
          title: 'Título',
          excerpt: 'Resumo',
          content: 'Conteúdo',
          category_id: 'cat-inexistente',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('deve setar published_at quando status é PUBLISHED', async () => {
      mockRepository.findCategoryById.mockResolvedValue({ id: 'cat-id' });
      mockRepository.createPost.mockResolvedValue({ id: 'post-id' });

      await service.createPost('author-id', {
        title: 'Título',
        excerpt: 'Resumo',
        content: 'Conteúdo',
        category_id: 'cat-id',
        status: 'PUBLISHED',
      });

      expect(mockRepository.createPost).toHaveBeenCalledWith(
        'author-id',
        expect.any(Object),
        expect.any(String),
        expect.any(Number),
        expect.any(Date),
      );
    });
  });

  // ─── Reading time ─────────────────────────────────────────────────────────

  describe('createPost (reading_time_min)', () => {
    it('deve calcular reading time baseado na contagem de palavras', async () => {
      mockRepository.findCategoryById.mockResolvedValue({ id: 'cat-id' });
      mockRepository.createPost.mockResolvedValue({ id: 'post-id' });

      // 400 palavras = 2 minutos (400 / 200)
      const content = Array(400).fill('palavra').join(' ');

      await service.createPost('author-id', {
        title: 'Título',
        excerpt: 'Resumo',
        content,
        category_id: 'cat-id',
      });

      expect(mockRepository.createPost).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.any(String),
        2,
        null,
      );
    });
  });

  // ─── findPublishedPosts ───────────────────────────────────────────────────

  describe('findPublishedPosts', () => {
    it('deve retornar posts paginados com contagem de likes', async () => {
      mockRepository.findPublishedPosts.mockResolvedValue({
        data: [{ id: 'post-1', _count: { likes: 3 } }],
        total: 1,
      });

      const result = await service.findPublishedPosts({ page: 1, limit: 10 });

      expect(mockRepository.findPublishedPosts).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        categorySlug: undefined,
        tagSlug: undefined,
        search: undefined,
      });
      expect(result).toEqual({
        data: [
          {
            id: 'post-1',
            likes_count: 3,
            is_liked: false,
            counterpart_slug: null,
          },
        ],
        total: 1,
        page: 1,
        limit: 10,
      });
    });

    it('deve calcular skip correto para página 2', async () => {
      mockRepository.findPublishedPosts.mockResolvedValue({
        data: [],
        total: 0,
      });

      await service.findPublishedPosts({ page: 2, limit: 5 });

      expect(mockRepository.findPublishedPosts).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 5, take: 5 }),
      );
    });

    /**
     * Alimenta a seção de notícias do dashboard. Ver docs/DATA_SOURCES.md — uma
     * lista vazia significa "nenhum post publicado"; engolir a falha da fonte
     * transformaria uma queda do banco nessa mesma mensagem.
     */
    it('propaga falha da fonte em vez de devolver lista vazia', async () => {
      mockRepository.findPublishedPosts.mockRejectedValue(
        new Error('connection refused'),
      );

      await expect(
        service.findPublishedPosts({ page: 1, limit: 3 }),
      ).rejects.toThrow('connection refused');
    });
  });

  // ─── findPostBySlug ───────────────────────────────────────────────────────

  describe('findPostBySlug', () => {
    it('deve retornar post e incrementar views', async () => {
      mockRepository.findPostBySlug.mockResolvedValue({
        id: 'post-id',
        slug: 'meu-post',
        _count: { likes: 2 },
      });
      mockRepository.incrementViews.mockResolvedValue(undefined);

      const result = await service.findPostBySlug('meu-post');

      expect(result).toMatchObject({
        id: 'post-id',
        slug: 'meu-post',
        likes_count: 2,
        is_liked: false,
      });
      // incrementViews é chamado de forma assíncrona (void), verificamos após um tick
      await Promise.resolve();
      expect(mockRepository.incrementViews).toHaveBeenCalledWith('post-id');
    });

    it('deve lançar NotFoundException quando post não existe', async () => {
      mockRepository.findPostBySlug.mockResolvedValue(null);

      await expect(service.findPostBySlug('nao-existe')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ─── updatePost ───────────────────────────────────────────────────────────

  describe('updatePost', () => {
    it('deve lançar NotFoundException quando post não existe', async () => {
      mockRepository.findPostById.mockResolvedValue(null);

      await expect(
        service.updatePost('id-inexistente', { title: 'Novo título' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('deve lançar NotFoundException quando nova categoria não existe', async () => {
      mockRepository.findPostById.mockResolvedValue({
        id: 'post-id',
        published_at: null,
      });
      mockRepository.findCategoryById.mockResolvedValue(null);

      await expect(
        service.updatePost('post-id', { category_id: 'cat-inexistente' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('deve setar published_at ao publicar post inédito', async () => {
      mockRepository.findPostById.mockResolvedValue({
        id: 'post-id',
        published_at: null,
      });
      mockRepository.updatePost.mockResolvedValue({ id: 'post-id' });

      await service.updatePost('post-id', { status: 'PUBLISHED' });

      expect(mockRepository.updatePost).toHaveBeenCalledWith(
        'post-id',
        expect.any(Object),
        undefined,
        undefined,
        expect.any(Date),
      );
    });

    it('deve nullar published_at ao arquivar post', async () => {
      mockRepository.findPostById.mockResolvedValue({
        id: 'post-id',
        published_at: new Date(),
      });
      mockRepository.updatePost.mockResolvedValue({ id: 'post-id' });

      await service.updatePost('post-id', { status: 'ARCHIVED' });

      expect(mockRepository.updatePost).toHaveBeenCalledWith(
        'post-id',
        expect.any(Object),
        undefined,
        undefined,
        null,
      );
    });
  });

  // ─── deletePost ───────────────────────────────────────────────────────────

  describe('deletePost', () => {
    it('deve deletar post existente', async () => {
      mockRepository.findPostById.mockResolvedValue({ id: 'post-id' });
      mockRepository.deletePost.mockResolvedValue(undefined);

      await service.deletePost('post-id');

      expect(mockRepository.deletePost).toHaveBeenCalledWith('post-id');
    });

    it('deve lançar NotFoundException quando post não existe', async () => {
      mockRepository.findPostById.mockResolvedValue(null);

      await expect(service.deletePost('id-inexistente')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ─── createCategory ───────────────────────────────────────────────────────

  describe('createCategory', () => {
    it('deve criar categoria com slug gerado automaticamente', async () => {
      mockRepository.findCategoryBySlug.mockResolvedValue(null);
      mockRepository.createCategory.mockResolvedValue({
        id: 'cat-id',
        name: 'Visto',
        slug: 'visto',
      });

      await service.createCategory({ name: 'Visto' });

      expect(mockRepository.createCategory).toHaveBeenCalledWith(
        'Visto',
        'visto',
      );
    });

    it('deve lançar ConflictException quando categoria já existe', async () => {
      mockRepository.findCategoryBySlug.mockResolvedValue({ id: 'cat-id' });

      await expect(service.createCategory({ name: 'Visto' })).rejects.toThrow(
        ConflictException,
      );
    });

    it('deve gerar slug correto para nomes com acentos', async () => {
      mockRepository.findCategoryBySlug.mockResolvedValue(null);
      mockRepository.createCategory.mockResolvedValue({});

      await service.createCategory({ name: 'Imigração e Cidadania' });

      expect(mockRepository.createCategory).toHaveBeenCalledWith(
        'Imigração e Cidadania',
        'imigracao-e-cidadania',
      );
    });
  });

  // ─── createTag ────────────────────────────────────────────────────────────

  describe('createTag', () => {
    it('deve criar tag com slug gerado automaticamente', async () => {
      mockRepository.findTagBySlug.mockResolvedValue(null);
      mockRepository.createTag.mockResolvedValue({
        id: 'tag-id',
        name: 'Express Entry',
        slug: 'express-entry',
      });

      await service.createTag({ name: 'Express Entry' });

      expect(mockRepository.createTag).toHaveBeenCalledWith(
        'Express Entry',
        'express-entry',
      );
    });

    it('deve lançar ConflictException quando tag já existe', async () => {
      mockRepository.findTagBySlug.mockResolvedValue({ id: 'tag-id' });

      await expect(
        service.createTag({ name: 'Express Entry' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('categories in the language the reader asked for', () => {
    const CATEGORY = {
      id: 'category-1',
      name: 'Vistos e Permissões',
      slug: 'vistos-e-permissoes',
      original_locale: 'pt',
      translations: [
        { locale: 'en', name: 'Visas and Permits', slug: 'visas-and-permits' },
      ],
      published_posts_count: 3,
    };

    it('lists them translated when a language is asked for', async () => {
      mockRepository.findAllCategories.mockResolvedValue([CATEGORY]);

      const [category] = await service.findAllCategories('en');

      expect(category.name).toBe('Visas and Permits');
      expect(category.slug).toBe('visas-and-permits');
      expect(category.published_posts_count).toBe(3);
    });

    it('lists them canonically when none is', async () => {
      mockRepository.findAllCategories.mockResolvedValue([CATEGORY]);

      const [category] = await service.findAllCategories();

      expect(category.name).toBe('Vistos e Permissões');
    });

    it('resolves a category by a slug in either language', async () => {
      mockRepository.findCategoryByAnySlug.mockResolvedValue(CATEGORY);

      const category = await service.findCategoryBySlug(
        'vistos-e-permissoes',
        'en',
      );

      expect(mockRepository.findCategoryByAnySlug).toHaveBeenCalledWith(
        'vistos-e-permissoes',
      );
      expect(category.name).toBe('Visas and Permits');
    });

    it('refuses a slug nothing answers to', async () => {
      // The category page derives its heading from the slug today, so an
      // invented URL renders a page instead of a 404.
      mockRepository.findCategoryByAnySlug.mockResolvedValue(null);

      await expect(service.findCategoryBySlug('made-up')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('translates the category of a post already written in that language', async () => {
      // Posts are born in English and categories in Portuguese, so this reader
      // needs no post translation and does need a category one.
      mockRepository.findPostBySlug.mockResolvedValue({
        id: 'post-1',
        slug: 'residence-permit',
        title: 'Residence permit',
        excerpt: 'x',
        content: 'y',
        original_locale: 'en',
        category: CATEGORY,
        _count: { likes: 0 },
      });

      const post = await service.findPostBySlug('residence-permit', 'en');

      expect(post).toMatchObject({
        title: 'Residence permit',
        category: { name: 'Visas and Permits' },
      });
    });
  });

  describe('asking for a category to be translated', () => {
    /**
     * Categories are written in Portuguese while the blog is read in three
     * languages. Until now the reader on /en saw the post's title, excerpt and
     * body translated, and above them a category still in Portuguese.
     */
    it('enqueues a translation for a category that was just created', async () => {
      mockRepository.findCategoryBySlug.mockResolvedValue(null);
      mockRepository.createCategory.mockResolvedValue({ id: 'cat-1' });

      await service.createCategory({ name: 'Vistos e Permissões' });

      expect(mockTranslationQueue.add).toHaveBeenCalledWith(
        TRANSLATE_BLOG_CATEGORY,
        { categoryId: 'cat-1' },
      );
    });

    it('redoes the translation when the name changes', async () => {
      // The existing translations describe a name that no longer exists.
      mockRepository.findCategoryById.mockResolvedValue({
        id: 'cat-1',
        name: 'Política',
      });
      mockRepository.updateCategory.mockResolvedValue({ id: 'cat-1' });

      await service.updateCategory('cat-1', { name: 'Política e Sociedade' });

      expect(mockTranslationQueue.add).toHaveBeenCalledWith(
        TRANSLATE_BLOG_CATEGORY,
        { categoryId: 'cat-1' },
      );
    });

    it('does not redo it when the name is unchanged', async () => {
      mockRepository.findCategoryById.mockResolvedValue({
        id: 'cat-1',
        name: 'Política',
      });
      mockRepository.updateCategory.mockResolvedValue({ id: 'cat-1' });

      await service.updateCategory('cat-1', { name: 'Política' });

      expect(mockTranslationQueue.add).not.toHaveBeenCalled();
    });

    it('still creates the category when the queue is down', async () => {
      // A queue nobody can reach must not stop an admin creating a category;
      // the nightly sweep picks up whatever was missed.
      mockRepository.findCategoryBySlug.mockResolvedValue(null);
      mockRepository.createCategory.mockResolvedValue({ id: 'cat-2' });
      mockTranslationQueue.add.mockRejectedValueOnce(
        new Error('redis is not answering'),
      );

      await expect(
        service.createCategory({ name: 'Nova' }),
      ).resolves.toMatchObject({ id: 'cat-2' });
    });
  });
});
