import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MyItinerarySummaryDto {
  @ApiProperty() id: string;
  @ApiProperty() slug: string;
  @ApiProperty() title: string;
  @ApiProperty({ example: 'PT' }) countryCode: string;

  @ApiProperty({
    description: 'The cities its stops are in, in the order they are walked.',
    type: [String],
    example: ['Lagos', 'Cascais'],
  })
  cities: string[];

  @ApiProperty({
    description: 'Stops a visitor would see — the unavailable ones excluded.',
    example: 6,
  })
  stopCount: number;

  @ApiProperty({
    description:
      'Stops pointing at something no longer visible. Surfaced so the owner can see why a public count is lower than their list.',
    example: 1,
  })
  unavailableStopCount: number;

  @ApiProperty() isPublic: boolean;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

export class PaginatedMyItinerariesResponseDto {
  @ApiProperty({ type: [MyItinerarySummaryDto] })
  data: MyItinerarySummaryDto[];

  @ApiProperty({ example: 3 }) total: number;
  @ApiProperty({ example: 1 }) page: number;
  @ApiProperty({ example: 20 }) limit: number;
}

export class MyItineraryStopDto {
  @ApiProperty() id: string;
  @ApiProperty({ description: '1-based, as stored.' }) position: number;

  @ApiProperty({ enum: ['place', 'business'] })
  kind: 'place' | 'business';

  @ApiProperty({ description: 'The id of the place or of the business.' })
  targetId: string;

  @ApiProperty() name: string;

  @ApiPropertyOptional({ nullable: true })
  imageUrl?: string | null;

  @ApiPropertyOptional({ nullable: true })
  lat?: number | null;

  @ApiPropertyOptional({ nullable: true })
  lng?: number | null;

  @ApiProperty() city: string;

  @ApiProperty({
    description:
      'False when the target went out of view — a deactivated place, a business the owner made private. The stop is still listed, because the owner needs to see it to remove it; the public read drops it instead.',
    example: true,
  })
  available: boolean;
}

export class MyItineraryResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() slug: string;
  @ApiProperty() title: string;
  @ApiProperty({ example: 'PT' }) countryCode: string;
  @ApiProperty() isPublic: boolean;

  @ApiProperty({ type: [MyItineraryStopDto] })
  stops: MyItineraryStopDto[];

  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
