import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

/**
 * The agenda windows the public list understands.
 *
 * `today` and `weekend` are relative to the *event's* local day, not to the
 * visitor's — a concert at 23h in Lisbon and one at 01h the next day in São
 * Paulo are each "today" in their own city.
 */
export enum CommunityEventWhen {
  UPCOMING = 'upcoming',
  TODAY = 'today',
  WEEKEND = 'weekend',
}

export class ListPublicCommunityEventsQueryDto {
  @ApiPropertyOptional({ description: 'ISO2 country code', example: 'PT' })
  @IsOptional()
  @IsString()
  @Matches(/^[A-Z]{2}$/, { message: 'countryCode deve ser ISO2 maiúsculo' })
  countryCode?: string;

  @ApiPropertyOptional({ example: 'Lisbon' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  city?: string;

  @ApiPropertyOptional({
    enum: CommunityEventWhen,
    default: CommunityEventWhen.UPCOMING,
  })
  @IsOptional()
  @IsEnum(CommunityEventWhen)
  when?: CommunityEventWhen = CommunityEventWhen.UPCOMING;

  /*
   * Distance filtering, and the three arrive together or not at all.
   *
   * A radius without an origin has nothing to measure from, and an origin
   * without a radius has no reach — the service treats a partial set as
   * absent rather than guessing a default, because a guessed reach silently
   * hides events somebody asked to see.
   */
  @ApiPropertyOptional({
    description: 'Latitude of the reader. Needs `lng` and `radius` to apply.',
    example: 38.7169,
  })
  @IsOptional()
  @Type(() => Number)
  @IsLatitude()
  lat?: number;

  @ApiPropertyOptional({ example: -9.1662 })
  @IsOptional()
  @Type(() => Number)
  @IsLongitude()
  lng?: number;

  @ApiPropertyOptional({
    description: 'Reach in kilometres from `lat`/`lng`.',
    minimum: 1,
    maximum: 500,
    example: 15,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  radius?: number;

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
