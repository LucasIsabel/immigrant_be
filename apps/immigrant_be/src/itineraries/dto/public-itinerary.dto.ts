import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PublicItinerarySummaryDto {
  @ApiProperty() slug: string;
  @ApiProperty() title: string;
  @ApiProperty({ example: 'PT' }) countryCode: string;

  @ApiProperty({
    description: 'The cities it passes through, in the order it is walked.',
    type: [String],
    example: ['Lagos', 'Cascais'],
  })
  cities: string[];

  @ApiProperty({ description: 'Stops a visitor can actually see.', example: 6 })
  stopCount: number;

  @ApiPropertyOptional({
    description: 'The first available stop that has a photo, if any has one.',
    nullable: true,
  })
  coverImageUrl?: string | null;

  @ApiProperty() createdAt: Date;
}

export class PaginatedPublicItinerariesResponseDto {
  @ApiProperty({ type: [PublicItinerarySummaryDto] })
  data: PublicItinerarySummaryDto[];

  @ApiProperty({ example: 12 }) total: number;
  @ApiProperty({ example: 1 }) page: number;
  @ApiProperty({ example: 20 }) limit: number;
}

/** How a visitor reaches the place behind a stop. */
export class PublicItineraryPlaceRefDto {
  @ApiProperty({ example: 'PT' }) countryCode: string;
  @ApiProperty({ example: 'Lisbon' }) city: string;
  @ApiProperty({ example: 'torre-de-belem' }) slug: string;
}

export class PublicItineraryStopDto {
  @ApiProperty() id: string;

  @ApiProperty({
    description:
      'Position as the visitor counts it: 1..n after the unavailable stops are gone, so the list and the map pins cannot disagree.',
    example: 1,
  })
  number: number;

  @ApiProperty({ enum: ['place', 'business'] })
  kind: 'place' | 'business';

  @ApiProperty() name: string;
  @ApiProperty() city: string;

  @ApiPropertyOptional({ nullable: true })
  imageUrl?: string | null;

  @ApiPropertyOptional({
    description:
      'Absent when the stop is a business registered before the form geocoded its address. It still belongs in the list — an address on its own page is a real place to go — but it cannot be a pin.',
    nullable: true,
  })
  lat?: number | null;

  @ApiPropertyOptional({ nullable: true })
  lng?: number | null;

  @ApiPropertyOptional({ type: PublicItineraryPlaceRefDto, nullable: true })
  placeRef?: PublicItineraryPlaceRefDto | null;

  @ApiPropertyOptional({
    description: 'Slug of the business page, when the owner published one.',
    nullable: true,
  })
  businessPageSlug?: string | null;
}

export class PublicItineraryResponseDto {
  @ApiProperty() slug: string;
  @ApiProperty() title: string;
  @ApiProperty({ example: 'PT' }) countryCode: string;

  @ApiProperty({ type: [PublicItineraryStopDto] })
  stops: PublicItineraryStopDto[];

  @ApiProperty() createdAt: Date;
}
