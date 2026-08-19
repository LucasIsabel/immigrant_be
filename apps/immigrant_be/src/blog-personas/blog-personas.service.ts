import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BlogPersonasRepository } from './blog-personas.repository';
import { CreateBlogPersonaDto } from './dto/create-blog-persona.dto';
import { UpdateBlogPersonaDto } from './dto/update-blog-persona.dto';

export type PersonaGenerationSlot = {
  persona_id: string;
  display_author_id: string;
  debate_group_id: string | null;
};

@Injectable()
export class BlogPersonasService {
  constructor(private readonly repository: BlogPersonasRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const persona = await this.repository.findById(id);
    if (!persona) {
      throw new NotFoundException('Persona não encontrada');
    }
    return persona;
  }

  async create(dto: CreateBlogPersonaDto) {
    await this.assertSlugFree(dto.slug);
    await this.assertAuthorFree(dto.blog_author_id);
    await this.assertAuthorExists(dto.blog_author_id);
    return this.repository.create(dto);
  }

  async update(id: string, dto: UpdateBlogPersonaDto) {
    const existing = await this.findById(id);

    if (dto.slug && dto.slug !== existing.slug) {
      await this.assertSlugFree(dto.slug);
    }

    if (dto.blog_author_id && dto.blog_author_id !== existing.blog_author_id) {
      await this.assertAuthorFree(dto.blog_author_id);
      await this.assertAuthorExists(dto.blog_author_id);
    }

    if (dto.is_active === false && existing.is_active) {
      const inFlight = await this.repository.countInFlightPosts(id);
      if (inFlight > 0) {
        throw new ConflictException(
          'Não dá para desativar uma persona com geração em andamento',
        );
      }
    }

    return this.repository.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);
    const inFlight = await this.repository.countInFlightPosts(id);
    if (inFlight > 0) {
      throw new ConflictException(
        'Não dá para apagar uma persona com geração em andamento',
      );
    }
    return this.repository.delete(id);
  }

  /**
   * Turns a generate request into one or two worker payloads.
   *
   * "Both sides" is two independent jobs that share a `debate_group_id`, so a
   * retry on one column does not rerun the other — and the two personas can
   * use different models.
   */
  async resolveGenerationSlots(input: {
    persona_id?: string;
    generate_both_sides?: boolean;
  }): Promise<PersonaGenerationSlot[]> {
    if (!input.persona_id) {
      return [];
    }

    const persona = await this.findById(input.persona_id);
    if (!persona.is_active) {
      throw new ConflictException('Persona inativa');
    }

    if (!input.generate_both_sides) {
      return [
        {
          persona_id: persona.id,
          display_author_id: persona.blog_author_id,
          debate_group_id: null,
        },
      ];
    }

    const counterpart = await this.repository.findCounterpart(
      persona.theme,
      persona.editorial_stance,
      persona.id,
    );
    if (!counterpart) {
      throw new ConflictException(
        'Não há uma persona ativa do outro lado para este tema',
      );
    }

    const debateGroupId = randomUUID();
    return [
      {
        persona_id: persona.id,
        display_author_id: persona.blog_author_id,
        debate_group_id: debateGroupId,
      },
      {
        persona_id: counterpart.id,
        display_author_id: counterpart.blog_author_id,
        debate_group_id: debateGroupId,
      },
    ];
  }

  private async assertSlugFree(slug: string) {
    const existing = await this.repository.findBySlug(slug);
    if (existing) {
      throw new ConflictException(`Slug "${slug}" já está em uso`);
    }
  }

  private async assertAuthorFree(blogAuthorId: string) {
    const existing = await this.repository.findByAuthorId(blogAuthorId);
    if (existing) {
      throw new ConflictException(
        'Este autor já está vinculado a outra persona',
      );
    }
  }

  private async assertAuthorExists(blogAuthorId: string) {
    const author = await this.repository.findAuthorById(blogAuthorId);
    if (!author) {
      throw new NotFoundException('Autor do blog não encontrado');
    }
  }
}
