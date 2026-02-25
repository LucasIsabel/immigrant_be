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
import { BlogService } from './blog.service';
import { BlogRepository } from './blog.repository';

const mockRepository = {
  createPost: jest.fn(),
  findPublishedPosts: jest.fn(),
  findAllPosts: jest.fn(),
  findPostBySlug: jest.fn(),
  findPostById: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
  incrementViews: jest.fn(),
  createCategory: jest.fn(),
  findAllCategories: jest.fn(),
  findCategoryBySlug: jest.fn(),
  findCategoryById: jest.fn(),
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
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
    jest.clearAllMocks();
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
    it('deve retornar posts paginados', async () => {
      const mockData = [{ id: 'post-1' }];
      mockRepository.findPublishedPosts.mockResolvedValue({ data: mockData, total: 1 });

      const result = await service.findPublishedPosts({ page: 1, limit: 10 });

      expect(mockRepository.findPublishedPosts).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        categorySlug: undefined,
        tagSlug: undefined,
      });
      expect(result).toEqual({ data: mockData, total: 1, page: 1, limit: 10 });
    });

    it('deve calcular skip correto para página 2', async () => {
      mockRepository.findPublishedPosts.mockResolvedValue({ data: [], total: 0 });

      await service.findPublishedPosts({ page: 2, limit: 5 });

      expect(mockRepository.findPublishedPosts).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 5, take: 5 }),
      );
    });
  });

  // ─── findPostBySlug ───────────────────────────────────────────────────────

  describe('findPostBySlug', () => {
    it('deve retornar post e incrementar views', async () => {
      const mockPost = { id: 'post-id', slug: 'meu-post' };
      mockRepository.findPostBySlug.mockResolvedValue(mockPost);
      mockRepository.incrementViews.mockResolvedValue(undefined);

      const result = await service.findPostBySlug('meu-post');

      expect(result).toEqual(mockPost);
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
      mockRepository.findPostById.mockResolvedValue({ id: 'post-id', published_at: null });
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

      await expect(service.createTag({ name: 'Express Entry' })).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
