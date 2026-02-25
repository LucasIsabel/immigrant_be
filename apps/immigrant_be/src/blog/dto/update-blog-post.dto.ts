import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogPostDto {
  @ApiProperty({
    description: 'Título do post',
    example: 'Como imigrar para o Canadá em 2024',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Resumo do post',
    example: 'Guia completo com todos os passos para imigrar para o Canadá.',
    required: false,
  })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({
    description: 'Conteúdo completo em Markdown',
    example: '## Introdução\n\nImigrar para o Canadá...',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: 'ID da categoria do post',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  category_id?: string;

  @ApiProperty({
    description: 'Status do post',
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    example: 'PUBLISHED',
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    description: 'URL da imagem de capa',
    example: 'https://example.com/images/canada.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  cover_image_url?: string;

  @ApiProperty({
    description: 'ID do país em destaque no post',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  featured_country_id?: string;

  @ApiProperty({
    description: 'IDs das tags do post (substitui todas as tags atuais)',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  tag_ids?: string[];
}
