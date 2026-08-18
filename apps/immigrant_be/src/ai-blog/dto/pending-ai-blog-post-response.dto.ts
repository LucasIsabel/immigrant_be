import { ApiProperty } from '@nestjs/swagger';
import { BlogPostResponseDto } from '../../blog/dto/blog-post-response.dto';

export class FeaturedCountryDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Canada' })
  name: string;

  @ApiProperty({ example: '🇨🇦', nullable: true })
  flag: string | null;
}

/**
 * `is_ai_generated` não é redeclarado aqui de propósito: ele passou a viver em
 * `BlogPostResponseDto`. Estar declarado só neste DTO de admin era justamente o
 * motivo de o contrato público nunca ter exposto o campo.
 */
export class PendingAiBlogPostResponseDto extends BlogPostResponseDto {
  @ApiProperty({
    description: 'País em destaque associado ao post',
    type: FeaturedCountryDto,
    nullable: true,
  })
  featured_country: FeaturedCountryDto | null;

  @ApiProperty({
    description: 'Locales de tradução que ainda estão faltando (en, es, pt)',
    example: ['es'],
    type: [String],
  })
  missing_translations: string[];
}
