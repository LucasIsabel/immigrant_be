import { ApiProperty } from '@nestjs/swagger';

export class BlogCategoryTranslationResponseDto {
  @ApiProperty({
    description: 'Idioma desta tradução',
    enum: ['pt', 'en', 'es'],
    example: 'en',
  })
  locale: string;

  @ApiProperty({
    description: 'Nome da categoria neste idioma',
    example: 'Visas and Permits',
  })
  name: string;

  @ApiProperty({
    description: 'Slug da categoria neste idioma, usado na URL',
    example: 'visas-and-permits',
  })
  slug: string;

  @ApiProperty({
    description: 'Quem escreveu esta tradução',
    enum: ['AI', 'HUMAN'],
    example: 'AI',
  })
  translated_by: string;

  @ApiProperty({
    description: 'Modelo que escreveu a tradução, quando foi a IA',
    example: 'claude-sonnet-4-5',
    nullable: true,
  })
  translated_by_model: string | null;
}
