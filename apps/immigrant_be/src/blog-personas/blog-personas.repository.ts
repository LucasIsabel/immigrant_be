import { PrismaService } from '@app/database';
import { Injectable } from '@nestjs/common';
import {
  BlogPersonaTheme,
  BlogPipelineStatus,
} from '../../../../generated/prisma';
import { CreateBlogPersonaDto } from './dto/create-blog-persona.dto';
import { UpdateBlogPersonaDto } from './dto/update-blog-persona.dto';

const PERSONA_INCLUDE = {
  blog_author: {
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
} as const;

const IN_FLIGHT: BlogPipelineStatus[] = [
  BlogPipelineStatus.TRANSLATING,
  BlogPipelineStatus.GENERATING_IMAGE,
];

@Injectable()
export class BlogPersonasRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.blogPersona.findMany({
      include: PERSONA_INCLUDE,
      orderBy: [{ theme: 'asc' }, { name: 'asc' }],
    });
  }

  findById(id: string) {
    return this.prisma.blogPersona.findUnique({
      where: { id },
      include: PERSONA_INCLUDE,
    });
  }

  findBySlug(slug: string) {
    return this.prisma.blogPersona.findUnique({ where: { slug } });
  }

  findByAuthorId(blogAuthorId: string) {
    return this.prisma.blogPersona.findUnique({
      where: { blog_author_id: blogAuthorId },
    });
  }

  findAuthorById(id: string) {
    return this.prisma.blogAuthor.findUnique({ where: { id } });
  }

  findCounterpart(theme: BlogPersonaTheme, stance: string, excludeId: string) {
    return this.prisma.blogPersona.findFirst({
      where: {
        theme,
        is_active: true,
        id: { not: excludeId },
        NOT: { editorial_stance: stance },
      },
      include: PERSONA_INCLUDE,
    });
  }

  countInFlightPosts(personaId: string) {
    return this.prisma.blogPost.count({
      where: {
        persona_id: personaId,
        pipeline_status: { in: IN_FLIGHT },
      },
    });
  }

  create(dto: CreateBlogPersonaDto) {
    return this.prisma.blogPersona.create({
      data: {
        slug: dto.slug,
        name: dto.name,
        theme: dto.theme,
        editorial_stance: dto.editorial_stance,
        persona_prompt: dto.persona_prompt,
        style_guidelines: dto.style_guidelines,
        preferred_model: dto.preferred_model ?? null,
        blog_author_id: dto.blog_author_id,
        is_active: dto.is_active ?? true,
      },
      include: PERSONA_INCLUDE,
    });
  }

  update(id: string, dto: UpdateBlogPersonaDto) {
    return this.prisma.blogPersona.update({
      where: { id },
      data: {
        ...(dto.slug !== undefined && { slug: dto.slug }),
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.theme !== undefined && { theme: dto.theme }),
        ...(dto.editorial_stance !== undefined && {
          editorial_stance: dto.editorial_stance,
        }),
        ...(dto.persona_prompt !== undefined && {
          persona_prompt: dto.persona_prompt,
        }),
        ...(dto.style_guidelines !== undefined && {
          style_guidelines: dto.style_guidelines,
        }),
        ...(dto.preferred_model !== undefined && {
          preferred_model: dto.preferred_model,
        }),
        ...(dto.blog_author_id !== undefined && {
          blog_author_id: dto.blog_author_id,
        }),
        ...(dto.is_active !== undefined && { is_active: dto.is_active }),
      },
      include: PERSONA_INCLUDE,
    });
  }

  delete(id: string) {
    return this.prisma.blogPersona.delete({ where: { id } });
  }
}
