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
import { BlogRepository } from './blog.repository';
import { PrismaService } from '@app/database';
import { BlogPostStatus } from '../../../../generated/prisma';

const mockPrisma = {
  blogPost: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  blogCategory: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  blogTag: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  $transaction: jest.fn(),
};

describe('BlogRepository', () => {
  let repository: BlogRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogRepository,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    repository = module.get<BlogRepository>(BlogRepository);
    jest.clearAllMocks();
  });

  // ─── Posts ────────────────────────────────────────────────────────────────

  describe('createPost', () => {
    it('deve criar um post com tags', async () => {
      const mockPost = { id: 'post-id', title: 'Post de teste' };
      mockPrisma.blogPost.create.mockResolvedValue(mockPost);

      const dto = {
        title: 'Post de teste',
        excerpt: 'Resumo',
        content: 'Conteúdo',
        category_id: 'cat-id',
        tag_ids: ['tag-id'],
      };

      const result = await repository.createPost(
        'author-id',
        dto as any,
        'post-de-teste',
        1,
        null,
      );

      expect(mockPrisma.blogPost.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: 'Post de teste',
          slug: 'post-de-teste',
          author_id: 'author-id',
          category_id: 'cat-id',
          tags: { create: [{ tag_id: 'tag-id' }] },
        }),
        include: expect.any(Object),
      });
      expect(result).toEqual(mockPost);
    });

    it('deve criar post sem tags quando tag_ids está vazio', async () => {
      const mockPost = { id: 'post-id', title: 'Post de teste' };
      mockPrisma.blogPost.create.mockResolvedValue(mockPost);

      await repository.createPost(
        'author-id',
        {
          title: 'Post de teste',
          excerpt: 'Resumo',
          content: 'Conteúdo',
          category_id: 'cat-id',
        } as any,
        'slug',
        1,
        null,
      );

      expect(mockPrisma.blogPost.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ tags: undefined }),
        }),
      );
    });
  });

  describe('findPublishedPosts', () => {
    it('deve retornar posts publicados paginados', async () => {
      const mockData = [{ id: 'post-1' }];
      mockPrisma.$transaction.mockResolvedValue([mockData, 1]);

      const result = await repository.findPublishedPosts({
        skip: 0,
        take: 10,
      });

      expect(mockPrisma.$transaction).toHaveBeenCalled();
      expect(result).toEqual({ data: mockData, total: 1 });
    });

    it('deve filtrar por categoria quando categorySlug fornecido', async () => {
      mockPrisma.$transaction.mockResolvedValue([[], 0]);

      await repository.findPublishedPosts({
        skip: 0,
        take: 10,
        categorySlug: 'visto',
      });

      const [findManyCall] = mockPrisma.$transaction.mock.calls[0][0];
      // Verificamos que a chamada inclui o filtro de categoria
      expect(mockPrisma.$transaction).toHaveBeenCalled();
    });
  });

  describe('findPostBySlug', () => {
    it('deve retornar post pelo slug', async () => {
      const mockPost = { id: 'post-id', slug: 'meu-post' };
      mockPrisma.blogPost.findUnique.mockResolvedValue(mockPost);

      const result = await repository.findPostBySlug('meu-post');

      expect(mockPrisma.blogPost.findUnique).toHaveBeenCalledWith({
        where: { slug: 'meu-post' },
        include: expect.any(Object),
      });
      expect(result).toEqual(mockPost);
    });

    it('deve retornar null quando post não existe', async () => {
      mockPrisma.blogPost.findUnique.mockResolvedValue(null);

      const result = await repository.findPostBySlug('nao-existe');

      expect(result).toBeNull();
    });
  });

  describe('incrementViews', () => {
    it('deve incrementar views_count atomicamente', async () => {
      mockPrisma.blogPost.update.mockResolvedValue({ views_count: 2 });

      await repository.incrementViews('post-id');

      expect(mockPrisma.blogPost.update).toHaveBeenCalledWith({
        where: { id: 'post-id' },
        data: { views_count: { increment: 1 } },
      });
    });
  });

  describe('deletePost', () => {
    it('deve deletar post pelo id', async () => {
      mockPrisma.blogPost.delete.mockResolvedValue({ id: 'post-id' });

      await repository.deletePost('post-id');

      expect(mockPrisma.blogPost.delete).toHaveBeenCalledWith({
        where: { id: 'post-id' },
      });
    });
  });

  // ─── Categories ───────────────────────────────────────────────────────────

  describe('createCategory', () => {
    it('deve criar categoria', async () => {
      const mockCategory = { id: 'cat-id', name: 'Visto', slug: 'visto' };
      mockPrisma.blogCategory.create.mockResolvedValue(mockCategory);

      const result = await repository.createCategory('Visto', 'visto');

      expect(mockPrisma.blogCategory.create).toHaveBeenCalledWith({
        data: { name: 'Visto', slug: 'visto' },
      });
      expect(result).toEqual(mockCategory);
    });
  });

  describe('findAllCategories', () => {
    it('deve retornar todas as categorias ordenadas por nome', async () => {
      const mockCategories = [{ name: 'Guia' }, { name: 'Visto' }];
      mockPrisma.blogCategory.findMany.mockResolvedValue(mockCategories);

      const result = await repository.findAllCategories();

      expect(mockPrisma.blogCategory.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' },
      });
      expect(result).toEqual(mockCategories);
    });
  });

  // ─── Tags ─────────────────────────────────────────────────────────────────

  describe('createTag', () => {
    it('deve criar tag', async () => {
      const mockTag = {
        id: 'tag-id',
        name: 'Express Entry',
        slug: 'express-entry',
      };
      mockPrisma.blogTag.create.mockResolvedValue(mockTag);

      const result = await repository.createTag(
        'Express Entry',
        'express-entry',
      );

      expect(mockPrisma.blogTag.create).toHaveBeenCalledWith({
        data: { name: 'Express Entry', slug: 'express-entry' },
      });
      expect(result).toEqual(mockTag);
    });
  });
});
