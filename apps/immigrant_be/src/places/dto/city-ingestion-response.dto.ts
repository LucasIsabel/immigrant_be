import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CityIngestionScope,
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

  @ApiProperty({
    description:
      'Which city the slug belonged to. A country sweep can collide in two cities at once, and the two rows would otherwise read the same.',
    example: 'Lisbon',
  })
  city: string;

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
  @ApiPropertyOptional({
    description: 'Candidates Wikidata returned for the city',
  })
  rawElements?: number;

  @ApiPropertyOptional({
    description:
      'Candidates whose Wikidata class maps to none of our categories — the honesty line: how much the class table left out',
  })
  droppedAsUnmapped?: number;

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

  /* What only a country sweep produces. */

  @ApiPropertyOptional({
    description:
      'Candidates the class table vetoes — a prison that subclasses a castle',
  })
  droppedAsExcluded?: number;

  @ApiPropertyOptional({
    description: 'Places whose city Wikidata itself declared, through P131',
  })
  citiesFromP131?: number;

  @ApiPropertyOptional({
    description:
      'Places whose city we inferred: the nearest municipality within 30 km',
  })
  citiesFromProximity?: number;

  @ApiPropertyOptional({
    description:
      'Places left out because no city could be written for them — never invented. `unlabelled` is an entity with no English name, whose city would read as its QID.',
  })
  withoutCity?: { notFound: number; lookupFailed: number; unlabelled: number };

  @ApiPropertyOptional({
    description:
      'A sample of those, to take back to Wikidata and fix at source',
    type: [String],
  })
  withoutCitySample?: string[];

  @ApiPropertyOptional({
    description: 'Wikidata classes whose own query never answered',
    type: [String],
  })
  classesFailed?: string[];

  @ApiPropertyOptional({
    description: 'Whole categories that failed; the sweep went on without them',
    type: [String],
  })
  categoriesFailed?: string[];

  @ApiPropertyOptional({
    description: 'A class hit the row limit, so that slice came back cut',
  })
  truncated?: boolean;

  @ApiPropertyOptional({
    description:
      'Items a second category also claimed; the first one asked for kept them',
  })
  claimedTwice?: number;

  @ApiPropertyOptional({
    description: 'How many distinct cities it wrote into',
  })
  cities?: number;

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

  @ApiProperty({ enum: CityIngestionScope })
  scope: CityIngestionScope;

  @ApiProperty({
    enum: PlaceCategory,
    isArray: true,
    description: 'Empty means all of them.',
  })
  categories: PlaceCategory[];

  @ApiPropertyOptional({
    description:
      'The city this covers. Null on a COUNTRY sweep, which has none — each place it finds carries its own city instead.',
    example: 'Lisbon',
    nullable: true,
    type: String,
  })
  city?: string | null;

  @ApiPropertyOptional({
    description:
      'The state that tells this city from its namesakes. Null where the country has none or nobody said.',
    example: 'Mato Grosso do Sul',
    nullable: true,
    type: String,
  })
  state?: string | null;

  @ApiPropertyOptional({
    description:
      'The Wikidata entity the worker resolved the city to. Null until it has, and for ingestions older than the column.',
    example: 'Q210945',
    nullable: true,
    type: String,
  })
  cityWikidataId?: string | null;

  @ApiProperty({ enum: CityIngestionStatus })
  status: CityIngestionStatus;

  @ApiPropertyOptional({
    description: 'Which step the ingestion is on, or stopped at',
    example: 'discover',
    nullable: true,
  })
  step?: string | null;

  @ApiPropertyOptional({ nullable: true })
  errorMessage?: string | null;

  @ApiPropertyOptional({
    description:
      'Legacy: the OSM area resolved by the Overpass-era pipeline. Null for ingestions discovered on Wikidata.',
    nullable: true,
    type: String,
  })
  osmAreaId?: string | null;

  @ApiPropertyOptional({
    description:
      'Legacy: what OSM called the area. Null for ingestions discovered on Wikidata.',
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

  @ApiProperty({ example: 'PT' })
  countryCode: string;

  @ApiProperty({ example: 'Lisbon' })
  city: string;

  @ApiPropertyOptional({
    description: 'State of the city, when the place was ingested with one.',
    example: 'Mato Grosso do Sul',
    nullable: true,
    type: String,
  })
  state?: string | null;

  @ApiPropertyOptional({
    description: 'Card image. Null falls back to the category tone.',
    nullable: true,
  })
  imageUrl?: string | null;

  @ApiPropertyOptional({
    description:
      'Licence of the Commons image; shown with the author wherever the image is.',
    nullable: true,
  })
  imageLicense?: string | null;

  @ApiPropertyOptional({ nullable: true })
  imageAuthor?: string | null;

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
      'Where the record came from: the Wikidata entity (CC0) for discovered places, the OSM element for legacy ones',
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
  @ApiPropertyOptional({
    description:
      "How far the municipality that answered for this place's city was. Present only when the city was inferred by proximity (a country sweep); null when Wikidata declared it or a human named it.",
    example: 3.9,
    nullable: true,
    type: Number,
  })
  nearestMunicipalityKm?: number | null;
}

export const PLACE_TEXTS_STATUS = [
  'WRITTEN',
  'PENDING',
  'FAILED',
  'INCOMPLETE',
] as const;

export type PlaceTextsStatus = (typeof PLACE_TEXTS_STATUS)[number];

/**
 * A place as the review screen judges it: the admin view plus where its text
 * stands.
 *
 * The distinction the screen could not make before is `PENDING` against
 * `FAILED`. Both look like a place with no description, and showing the same
 * warning for a job still running and a job that gave up trains the reviewer to
 * ignore it — which is how a city reached "ready for review" carrying a place
 * nobody could review.
 */
export class ReviewPlaceResponseDto extends AdminPlaceResponseDto {
  @ApiProperty({
    enum: PLACE_TEXTS_STATUS,
    description:
      'WRITTEN: all three languages. FAILED: the writing job gave up. ' +
      'PENDING: no text yet and a job is still due. INCOMPLETE: some ' +
      'languages, not all.',
  })
  textsStatus: PlaceTextsStatus;
}

export class CityIngestionDetailResponseDto extends CityIngestionResponseDto {
  @ApiProperty({ type: [ReviewPlaceResponseDto] })
  places: ReviewPlaceResponseDto[];
}
