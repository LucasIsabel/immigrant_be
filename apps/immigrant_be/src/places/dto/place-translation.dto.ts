import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PlaceTranslationDto {
  @ApiProperty({ description: 'Idioma da tradução', example: 'pt' })
  language: string;

  @ApiProperty({
    description: 'Uma ou duas frases sobre o lugar',
    example: 'Torre manuelina do século XVI na margem do Tejo.',
  })
  description: string;

  @ApiPropertyOptional({
    description: 'Dica prática de quem já foi',
    example: 'Chegue antes das 10h para evitar a fila.',
    nullable: true,
  })
  tip?: string | null;
}
