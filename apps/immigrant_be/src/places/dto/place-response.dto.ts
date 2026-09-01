import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlaceCategory } from '../../../../../generated/prisma';
import { PlaceTranslationDto } from './place-translation.dto';
import { FeatureKind } from '../../../../../generated/prisma';

export class PlaceResponseDto {
  @ApiProperty({
    enum: FeatureKind,
    nullable: true,
    description:
      'CURATED é escolha editorial; PAID é espaço vendido. A tela tem de dizer qual dos dois está a mostrar.',
  })
  featureKind: FeatureKind | null;

  @ApiProperty({ description: 'Se conta como destaque neste instante' })
  featuredNow: boolean;

  @ApiProperty({ description: 'Identificador do lugar' })
  id: string;

  @ApiProperty({
    description: 'Nome no idioma local — é o que está na placa e no mapa',
    example: 'Torre de Belém',
  })
  name: string;

  @ApiProperty({ description: 'Slug do lugar', example: 'torre-de-belem' })
  slug: string;

  @ApiProperty({ enum: PlaceCategory, example: PlaceCategory.LANDMARK })
  category: PlaceCategory;

  @ApiProperty({ description: 'ISO2 do país, maiúsculo', example: 'PT' })
  countryCode: string;

  @ApiPropertyOptional({
    description: 'ID do país quando ele existe como destino cadastrado',
    nullable: true,
  })
  countryId?: string | null;

  @ApiProperty({
    description: 'Cidade, no formato do CountriesNow',
    example: 'Lisbon',
  })
  city: string;

  @ApiProperty({ example: 38.6916 })
  lat: number;

  @ApiProperty({ example: -9.216 })
  lng: number;

  @ApiPropertyOptional({ nullable: true })
  imageUrl?: string | null;

  @ApiPropertyOptional({
    description:
      'Licence of the Commons image (e.g. "CC BY-SA 4.0"). CC licences require showing it, with the author, wherever the image appears.',
    nullable: true,
  })
  imageLicense?: string | null;

  @ApiPropertyOptional({ nullable: true })
  imageAuthor?: string | null;

  @ApiProperty({
    description: 'Ordena os "mais visitados"; maior é mais visitado',
    example: 100,
  })
  popularityScore: number;

  @ApiProperty({ description: 'Entrada gratuita', example: false })
  isFree: boolean;

  @ApiPropertyOptional({ nullable: true })
  address?: string | null;

  @ApiPropertyOptional({ nullable: true })
  website?: string | null;

  @ApiPropertyOptional({
    description: 'De onde o dado veio',
    nullable: true,
  })
  sourceUrl?: string | null;

  @ApiProperty({
    description: 'Traduções de description e tip',
    type: [PlaceTranslationDto],
  })
  translations: PlaceTranslationDto[];
}
