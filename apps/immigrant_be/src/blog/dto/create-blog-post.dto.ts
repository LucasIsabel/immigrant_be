import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogPostDto {
  @ApiProperty({
    description: 'Título do post',
    example: 'Como imigrar para o Canadá em 2024',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Resumo do post (exibido na listagem)',
    example: 'Guia completo com todos os passos para imigrar para o Canadá.',
  })
  @IsString()
  @IsNotEmpty()
  excerpt: string;

  @ApiProperty({
    description: 'Conteúdo completo em Markdown',
    example: '## Introdução\n\nImigrar para o Canadá...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'ID da categoria do post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  category_id: string;

  @ApiProperty({
    description: 'Status do post',
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    example: 'DRAFT',
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
    description: 'IDs das tags do post',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  tag_ids?: string[];
}
