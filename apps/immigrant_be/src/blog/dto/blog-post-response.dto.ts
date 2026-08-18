import { ApiProperty } from '@nestjs/swagger';
import { BlogCategoryResponseDto } from './blog-category-response.dto';
import { BlogTagResponseDto } from './blog-tag-response.dto';

export class BlogAuthorDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'João Silva' })
  name: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', nullable: true })
  image: string | null;
}

/**
 * A assinatura editorial do post, que é outra coisa que o usuário dono do
 * registro.
 *
 * Traz `bio` porque é ali que a autoria por IA se declara ao leitor — uma
 * assinatura sem bio some com a única indicação que ele teria.
 */
export class BlogDisplayAuthorDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Marina Costa' })
  name: string;

  @ApiProperty({
    example: 'Coluna de opinião escrita por IA sob curadoria editorial.',
    nullable: true,
  })
  bio: string | null;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', nullable: true })
  avatar_url: string | null;

  @ApiProperty({ example: 'https://example.com', nullable: true })
  website: string | null;

  @ApiProperty({ example: '@marinacosta', nullable: true })
  twitter: string | null;

  @ApiProperty({
    example: 'https://linkedin.com/in/marinacosta',
    nullable: true,
  })
  linkedin: string | null;
}

export class BlogPostResponseDto {
  @ApiProperty({
    description: 'ID único do post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Título do post',
    example: 'Como imigrar para o Canadá em 2024',
  })
  title: string;

  @ApiProperty({
    description: 'Slug para URLs amigáveis',
    example: 'como-imigrar-para-o-canada-em-2024',
  })
  slug: string;

  @ApiProperty({
    description: 'Resumo do post',
    example: 'Guia completo com todos os passos para imigrar para o Canadá.',
  })
  excerpt: string;

  @ApiProperty({
    description: 'Conteúdo completo em Markdown',
    example: '## Introdução\n\nImigrar para o Canadá...',
  })
  content: string;

  @ApiProperty({
    description: 'URL da imagem de capa',
    example: 'https://example.com/images/canada.jpg',
    nullable: true,
  })
  cover_image_url: string | null;

  @ApiProperty({
    description: 'Status do post',
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    example: 'PUBLISHED',
  })
  status: string;

  @ApiProperty({
    description: 'Tempo estimado de leitura em minutos',
    example: 8,
    nullable: true,
  })
  reading_time_min: number | null;

  @ApiProperty({
    description: 'Número de visualizações',
    example: 1234,
  })
  views_count: number;

  @ApiProperty({
    description: 'Data de publicação',
    example: '2024-01-15T10:30:00Z',
    nullable: true,
  })
  published_at: Date | null;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-15T10:30:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2024-01-15T10:30:00Z',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Autor do post',
    type: BlogAuthorDto,
  })
  author: BlogAuthorDto;

  @ApiProperty({
    description: 'Categoria do post',
    type: BlogCategoryResponseDto,
  })
  category: BlogCategoryResponseDto;

  @ApiProperty({
    description: 'Tags do post',
    type: [BlogTagResponseDto],
  })
  tags: BlogTagResponseDto[];

  @ApiProperty({
    description: 'ID do país em destaque',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  featured_country_id: string | null;

  @ApiProperty({
    description: 'Número de likes',
    example: 42,
    required: false,
  })
  likes_count?: number;

  @ApiProperty({
    description: 'Se o usuário atual deu like (requer autenticação)',
    example: false,
    required: false,
  })
  is_liked?: boolean;

  @ApiProperty({
    description:
      'Indica que algumas imagens do refinamento falharam e precisam de correção manual',
    example: false,
  })
  refine_needs_manual_fix: boolean;

  @ApiProperty({
    description:
      'Assinatura editorial do post, quando houver. É esta que o leitor deve ver, não `author` — que é apenas o usuário dono do registro',
    type: BlogDisplayAuthorDto,
    nullable: true,
  })
  display_author: BlogDisplayAuthorDto | null;

  @ApiProperty({
    description:
      'Post escrito por IA. O front depende deste campo para exibir a indicação ao leitor, então ele é parte do contrato público e não um detalhe interno',
    example: false,
  })
  is_ai_generated: boolean;
}
