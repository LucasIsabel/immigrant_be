import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
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
    description:
      'URL da imagem de capa. `null` limpa a capa — o `@IsOptional()` deixa null passar e o Prisma apaga a coluna, que é o comportamento que a tela de edição já usava. O tipo agora diz isso; antes o contrato negava um `null` que a API aceita.',
    example: 'https://example.com/images/canada.jpg',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  cover_image_url?: string | null;

  @ApiProperty({
    description:
      'ID do país em destaque. `null` remove o destaque — a coluna é anulável e o `@IsOptional()` deixa null passar.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  featured_country_id?: string | null;

  @ApiProperty({
    description: 'Slug do post',
    required: false,
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    description: 'Tempo de leitura em minutos',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  reading_time_min?: number | null;

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
