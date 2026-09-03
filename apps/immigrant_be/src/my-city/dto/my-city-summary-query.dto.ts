import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

/**
 * Which city to count, and how far around it to look.
 *
 * Two names for one country, because the data has two: a business stores the
 * country's name as the picker wrote it ("Portugal"), while places and events
 * store the ISO2 code. Asking for both here is cheaper and more honest than
 * resolving one into the other in three places.
 */
export class MyCitySummaryQueryDto {
  @ApiPropertyOptional({
    example: 'Portugal',
    description: 'Country name, as a business stores it',
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({
    example: 'PT',
    description: 'ISO2 country code, as places and events store it',
  })
  @IsString()
  @IsOptional()
  countryCode?: string;

  @ApiPropertyOptional({ example: 'Porto' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({
    example: 41.1579,
    description: 'Latitude of the city centre, for the nearby reach',
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  lat?: number;

  @ApiPropertyOptional({ example: -8.6291 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  lng?: number;

  @ApiPropertyOptional({
    example: 60,
    description:
      'Reach in km, max 200. Without it, only the city itself counts',
    minimum: 1,
    maximum: 200,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(200)
  @IsOptional()
  radius?: number;

  /**
   * Whether the origin is the reader, rather than the centre of the city.
   *
   * It changes what the reach *does*. Around a city centre the reach widens:
   * somebody browsing Porto should see the restaurant in Gaia, so the count is
   * the city **or** what is near it. Around the reader it narrows: they asked
   * for what is within N km of themselves, and being inside the chosen city
   * does not make something close to them.
   *
   * The server cannot tell the two apart from a pair of coordinates, and
   * guessing would pick the wrong one half the time, so the client says which.
   */
  @ApiPropertyOptional({
    example: true,
    description:
      "True when lat/lng are the reader's own position. The reach then narrows instead of widening.",
  })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  nearMe?: boolean;
}
