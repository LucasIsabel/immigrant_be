import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CityIngestionStatus,
  PlaceCategory,
  PlaceReviewStatus,
} from '../../../../../generated/prisma';
import { PlaceTranslationDto } from './place-translation.dto';

/**
 * A place the ingestion found but did not touch, because a curated one already
 * held that slug.
 *
 * Not an error: it is the rediscovery metric. How many hand-picked places the
 * pipeline finds on its own is what says whether it works.
 */
export class IngestionConflictDto {
  @ApiProperty({ example: 'torre-de-belem' })
  slug: string;

  @ApiProperty({ example: 'Q215003' })
  wikidataId: string;

  @ApiProperty({ description: 'Position in the generated ranking', example: 1 })
  rank: number;

  @ApiProperty({ example: 12997 })
  monthlyViews: number;
}

/** Why a place was turned down during review. */
export class PlaceRejectionDto {
  @ApiProperty()
  placeId: string;

  @ApiProperty({
    example: 'Não é um ponto turístico, é um bairro residencial.',
  })
  reason: string;
}

/** What one run found, kept and refused. */
export class IngestionStatsDto {
  @ApiPropertyOptional({ description: 'Raw elements returned by Overpass' })
  rawElements?: number;

  @ApiPropertyOptional({
    description: 'How many had an article on the English Wikipedia',
  })
  withEnwiki?: number;

  @ApiPropertyOptional({
    description: 'How many survived the top-10 cut',
  })
  kept?: number;

  @ApiPropertyOptional({ description: 'How many actually became drafts' })
  created?: number;

  @ApiPropertyOptional({ type: [IngestionConflictDto] })
  conflicts?: IngestionConflictDto[];

  @ApiPropertyOptional({
    description: 'Ids of places whose text failed for good',
    type: [String],
  })
  textFailures?: string[];

  @ApiPropertyOptional({
    description: 'Reasons given for individual place rejections',
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
    description: 'Which step the ingestion is on, or stopped at',
    example: 'fetch_pois',
    nullable: true,
  })
  step?: string | null;

  @ApiPropertyOptional({ nullable: true })
  errorMessage?: string | null;

  @ApiPropertyOptional({
    description:
      'The already resolved OSM area — a retry does not have to look it up again',
    nullable: true,
    type: String,
  })
  osmAreaId?: string | null;

  @ApiPropertyOptional({
    description:
      'What OSM calls the area — "Lisboa" where our list says "Lisbon"',
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

/** A place as the admin reviews it: with provenance the public never sees. */
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
      'Canonical URL of the OSM element — per-record attribution, which the ODbL requires',
    nullable: true,
  })
  sourceUrl?: string | null;

  @ApiPropertyOptional({ nullable: true })
  wikidataId?: string | null;

  @ApiPropertyOptional({
    description:
      'Mean monthly article views. The raw number behind popularityScore.',
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
