import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum BlogPersonaThemeDto {
  IMMIGRATION = 'IMMIGRATION',
  TOURISM = 'TOURISM',
  CUISINE = 'CUISINE',
  GEOPOLITICS = 'GEOPOLITICS',
}

export class CreateBlogPersonaDto {
  @ApiProperty({ example: 'helena-vargas' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  slug: string;

  @ApiProperty({ example: 'Helena Vargas' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @ApiProperty({
    description:
      'Frase curta mostrada entre parênteses no dropdown do newsroom',
    example: 'Imigração: política restritiva',
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @MaxLength(120)
  tagline?: string;

  @ApiProperty({ enum: BlogPersonaThemeDto })
  @IsEnum(BlogPersonaThemeDto)
  theme: BlogPersonaThemeDto;

  @ApiProperty({ example: 'RESTRICTIONIST' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  editorial_stance: string;

  @ApiProperty({ example: 'You are Helena Vargas...' })
  @IsString()
  @IsNotEmpty()
  @MinLength(40)
  persona_prompt: string;

  @ApiProperty({ example: 'Short paragraphs. Cite the news items.' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  style_guidelines: string;

  @ApiProperty({
    example: 'anthropic/claude-sonnet-5',
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  preferred_model?: string;

  @ApiProperty({
    description: 'BlogAuthor whose public bio declares AI authorship',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  blog_author_id: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
