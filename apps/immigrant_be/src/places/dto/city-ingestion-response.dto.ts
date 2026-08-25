import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CityIngestionStatus,
  PlaceCategory,
  PlaceReviewStatus,
} from '../../../../../generated/prisma';
import { PlaceTranslationDto } from './place-translation.dto';

/**
 * Um lugar que a ingestão encontrou mas não tocou, porque já existia curado.
 *
 * Não é erro: é a métrica de redescoberta. Quantos dos lugares escolhidos à mão
 * o pipeline reencontra sozinho é o que diz se ele funciona.
 */
export class IngestionConflictDto {
  @ApiProperty({ example: 'torre-de-belem' })
  slug: string;

  @ApiProperty({ example: 'Q215003' })
  wikidataId: string;

  @ApiProperty({ description: 'Posição no ranking gerado', example: 1 })
  rank: number;

  @ApiProperty({ example: 12997 })
  monthlyViews: number;
}

/** Por que um lugar foi recusado na revisão. */
export class PlaceRejectionDto {
  @ApiProperty()
  placeId: string;

  @ApiProperty({
    example: 'Não é um ponto turístico, é um bairro residencial.',
  })
  reason: string;
}

/** O que uma corrida encontrou, guardou e recusou. */
export class IngestionStatsDto {
  @ApiPropertyOptional({ description: 'Elementos crus vindos do Overpass' })
  rawElements?: number;

  @ApiPropertyOptional({
    description: 'Quantos tinham artigo na Wikipédia em inglês',
  })
  withEnwiki?: number;

  @ApiPropertyOptional({
    description: 'Quantos sobreviveram ao corte do top 10',
  })
  kept?: number;

  @ApiPropertyOptional({ description: 'Quantos viraram rascunho de fato' })
  created?: number;

  @ApiPropertyOptional({ type: [IngestionConflictDto] })
  conflicts?: IngestionConflictDto[];

  @ApiPropertyOptional({
    description: 'IDs de lugares cujo texto falhou em definitivo',
    type: [String],
  })
  textFailures?: string[];

  @ApiPropertyOptional({
    description: 'Motivos das recusas individuais de lugares',
    type: [PlaceRejectionDto],
  })
  placeRejections?: PlaceRejectionDto[];
}

export class CityIngestionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'PT' })
  countryCode: string;

  @ApiProperty({ example: 'Lisbon' })
  city: string;

  @ApiProperty({ enum: CityIngestionStatus })
  status: CityIngestionStatus;

  @ApiPropertyOptional({
    description: 'Em que etapa a ingestão está, ou parou',
    example: 'fetch_pois',
    nullable: true,
  })
  step?: string | null;

  @ApiPropertyOptional({ nullable: true })
  errorMessage?: string | null;

  @ApiPropertyOptional({
    description:
      'Área do OSM já resolvida — o retry não precisa procurar de novo',
    nullable: true,
    type: String,
  })
  osmAreaId?: string | null;

  @ApiPropertyOptional({
    description:
      'Como o OSM chama a área — "Lisboa" onde a nossa lista diz "Lisbon"',
    nullable: true,
  })
  osmMatchedName?: string | null;

  @ApiPropertyOptional({ type: IngestionStatsDto, nullable: true })
  stats?: IngestionStatsDto | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PaginatedCityIngestionsResponseDto {
  @ApiProperty({ type: [CityIngestionResponseDto] })
  data: CityIngestionResponseDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;
}

/** Um lugar como o admin o revisa: com proveniência, que o público não vê. */
export class AdminPlaceResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'Torre de Belém' })
  name: string;

  @ApiProperty({ example: 'torre-de-belem' })
  slug: string;

  @ApiProperty({ enum: PlaceCategory })
  category: PlaceCategory;

  @ApiProperty({ enum: PlaceReviewStatus })
  reviewStatus: PlaceReviewStatus;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ example: 38.6916 })
  lat: number;

  @ApiProperty({ example: -9.216 })
  lng: number;

  @ApiProperty()
  isFree: boolean;

  @ApiProperty({ example: 100 })
  popularityScore: number;

  @ApiPropertyOptional({ nullable: true })
  address?: string | null;

  @ApiPropertyOptional({ nullable: true })
  website?: string | null;

  @ApiPropertyOptional({
    description:
      'A URL canônica do elemento no OSM — atribuição por registro, que a ODbL exige',
    nullable: true,
  })
  sourceUrl?: string | null;

  @ApiPropertyOptional({ nullable: true })
  wikidataId?: string | null;

  @ApiPropertyOptional({
    description:
      'Média mensal de visitas ao artigo. É o número cru por trás do popularityScore.',
    nullable: true,
  })
  wikipediaMonthlyViews?: number | null;

  @ApiPropertyOptional({ nullable: true })
  generatedByModel?: string | null;

  @ApiPropertyOptional({ nullable: true, type: Number })
  generationCostUsd?: number | null;

  @ApiProperty({ type: [PlaceTranslationDto] })
  translations: PlaceTranslationDto[];
}

export class CityIngestionDetailResponseDto extends CityIngestionResponseDto {
  @ApiProperty({ type: [AdminPlaceResponseDto] })
  places: AdminPlaceResponseDto[];
}
