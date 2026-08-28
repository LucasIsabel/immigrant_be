import { ApiProperty } from '@nestjs/swagger';
import { BlogCategoryTranslationResponseDto } from './blog-category-translation-response.dto';

export class BlogCategoryResponseDto {
  @ApiProperty({
    description: 'ID único da categoria',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Visto',
  })
  name: string;

  @ApiProperty({
    description: 'Slug da categoria para URLs',
    example: 'visto',
  })
  slug: string;

  @ApiProperty({
    description: 'Idioma em que a categoria foi escrita originalmente',
    enum: ['pt', 'en', 'es'],
    example: 'pt',
  })
  original_locale: string;

  @ApiProperty({
    description:
      'Traduções do nome desta categoria. O `name` e o `slug` acima já vêm ' +
      'no idioma pedido em `lang`; esta lista existe para quem precisa do ' +
      'mapa inteiro — o hreflang da página da editoria e a tela de admin.',
    type: [BlogCategoryTranslationResponseDto],
  })
  translations: BlogCategoryTranslationResponseDto[];

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
}
