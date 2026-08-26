jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  BlogPipelineStatus: {
    TRANSLATING: 'TRANSLATING',
    GENERATING_IMAGE: 'GENERATING_IMAGE',
    READY: 'READY',
  },
  BlogPersonaTheme: {
    IMMIGRATION: 'IMMIGRATION',
    TOURISM: 'TOURISM',
    CUISINE: 'CUISINE',
    GEOPOLITICS: 'GEOPOLITICS',
  },
}));

import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BlogPersonasRepository } from './blog-personas.repository';
import { BlogPersonasService } from './blog-personas.service';
import { BlogPersonaThemeDto } from './dto/create-blog-persona.dto';

const restrictionist = {
  id: 'persona-1',
  slug: 'helena-vargas',
  name: 'Helena Vargas',
  theme: 'IMMIGRATION',
  editorial_stance: 'RESTRICTIONIST',
  blog_author_id: 'author-1',
  is_active: true,
};

const progressive = {
  id: 'persona-2',
  slug: 'sofia-ribeiro',
  name: 'Sofia Ribeiro',
  theme: 'IMMIGRATION',
  editorial_stance: 'PROGRESSIVE',
  blog_author_id: 'author-2',
  is_active: true,
};

const repository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findBySlug: jest.fn(),
  findByAuthorId: jest.fn(),
  findAuthorById: jest.fn(),
  findCounterpart: jest.fn(),
  countInFlightPosts: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('BlogPersonasService', () => {
  let service: BlogPersonasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogPersonasService,
        { provide: BlogPersonasRepository, useValue: repository },
      ],
    }).compile();

    service = module.get(BlogPersonasService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('recusa slug duplicado', async () => {
      repository.findBySlug.mockResolvedValue(restrictionist);

      await expect(
        service.create({
          slug: 'helena-vargas',
          name: 'Helena Vargas',
          theme: BlogPersonaThemeDto.IMMIGRATION,
          editorial_stance: 'RESTRICTIONIST',
          persona_prompt: 'x'.repeat(40),
          style_guidelines: 'y'.repeat(10),
          blog_author_id: 'author-1',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('hands the tagline through to the repository', async () => {
      repository.findBySlug.mockResolvedValue(null);
      repository.findByAuthorId.mockResolvedValue(null);
      repository.findAuthorById.mockResolvedValue({ id: 'author-9' });

      const dto = {
        slug: 'chef-tomas-andrade',
        name: 'Chef Tomás Andrade',
        tagline: 'Culinária: pratos, ingredientes e onde comer',
        theme: BlogPersonaThemeDto.CUISINE,
        editorial_stance: 'GASTRONOMY',
        persona_prompt: 'x'.repeat(40),
        style_guidelines: 'y'.repeat(10),
        blog_author_id: 'author-9',
      };

      await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('recusa desativar persona com geração em andamento', async () => {
      repository.findById.mockResolvedValue(restrictionist);
      repository.countInFlightPosts.mockResolvedValue(1);

      await expect(
        service.update('persona-1', { is_active: false }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('resolveGenerationSlots', () => {
    it('devolve um slot quando não pede os dois lados', async () => {
      repository.findById.mockResolvedValue(restrictionist);

      const slots = await service.resolveGenerationSlots({
        persona_id: 'persona-1',
      });

      expect(slots).toEqual([
        {
          persona_id: 'persona-1',
          display_author_id: 'author-1',
          debate_group_id: null,
        },
      ]);
    });

    it('devolve dois slots com o mesmo debate_group_id', async () => {
      repository.findById.mockResolvedValue(restrictionist);
      repository.findCounterpart.mockResolvedValue(progressive);

      const slots = await service.resolveGenerationSlots({
        persona_id: 'persona-1',
        generate_both_sides: true,
      });

      expect(slots).toHaveLength(2);
      expect(slots[0].debate_group_id).toBe(slots[1].debate_group_id);
      expect(slots[0].debate_group_id).toEqual(expect.any(String));
      expect(slots.map((s) => s.persona_id).sort()).toEqual([
        'persona-1',
        'persona-2',
      ]);
    });

    it('falha quando não há o outro lado', async () => {
      repository.findById.mockResolvedValue(restrictionist);
      repository.findCounterpart.mockResolvedValue(null);

      await expect(
        service.resolveGenerationSlots({
          persona_id: 'persona-1',
          generate_both_sides: true,
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('falha se a persona não existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(
        service.resolveGenerationSlots({ persona_id: 'missing' }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
