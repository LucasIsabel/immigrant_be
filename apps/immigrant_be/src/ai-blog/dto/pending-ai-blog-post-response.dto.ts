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

export class PendingAiBlogPostResponseDto extends BlogPostResponseDto {
  @ApiProperty({
    description: 'Indica se o post foi gerado por IA',
    example: true,
  })
  is_ai_generated: boolean;

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
