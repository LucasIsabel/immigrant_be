import { ApiProperty } from '@nestjs/swagger';
import { BlogDisplayAuthorDto } from '../../blog/dto/blog-post-response.dto';
import { BlogPersonaThemeDto } from './create-blog-persona.dto';

export class BlogPersonaResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'helena-vargas' })
  slug: string;

  @ApiProperty({ example: 'Helena Vargas' })
  name: string;

  @ApiProperty({
    example: 'Imigração: política restritiva',
    nullable: true,
  })
  tagline: string | null;

  @ApiProperty({ enum: BlogPersonaThemeDto })
  theme: BlogPersonaThemeDto;

  @ApiProperty({ example: 'RESTRICTIONIST' })
  editorial_stance: string;

  @ApiProperty()
  persona_prompt: string;

  @ApiProperty()
  style_guidelines: string;

  @ApiProperty({ example: 'anthropic/claude-sonnet-5', nullable: true })
  preferred_model: string | null;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  blog_author_id: string;

  @ApiProperty({ type: BlogDisplayAuthorDto })
  blog_author: BlogDisplayAuthorDto;

  @ApiProperty({ example: true })
  is_active: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export { BlogPersonaPublicDto } from '../../blog/dto/blog-post-response.dto';
