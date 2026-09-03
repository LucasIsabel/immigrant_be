import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

/**
 * Country decides, city narrows.
 *
 * The two are not the same kind of filter. `countryCode` reads the itinerary's
 * own column — an itinerary belongs to one country. `city` reaches into the
 * stops instead, and answers "itineraries that pass through here", because a
 * route crosses cities: "Tour praia de Portugal" is in Lagos, Cascais and
 * Almada at once.
 */
export class ListPublicItinerariesQueryDto {
  @ApiPropertyOptional({ description: 'ISO 3166-1 alpha-2', example: 'PT' })
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z]{2}$/, {
    message: 'countryCode must be ISO 3166-1 alpha-2',
  })
  countryCode?: string;

  @ApiPropertyOptional({
    description: 'Keeps only itineraries with at least one stop in this city.',
    example: 'Cascais',
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  city?: string;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
