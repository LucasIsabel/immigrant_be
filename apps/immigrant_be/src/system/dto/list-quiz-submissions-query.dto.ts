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

/** The country filter that selects the rows with no country at all. */
export const UNKNOWN_COUNTRY_FILTER = 'unknown';

export class ListQuizSubmissionsQueryDto {
  @ApiPropertyOptional({
    example: 'PT',
    description:
      'ISO 3166-1 alpha-2, or `unknown` for the submissions with no country.',
  })
  @IsOptional()
  @Matches(/^([A-Z]{2}|unknown)$/)
  country?: string;

  @ApiPropertyOptional({ example: 'pt' })
  @IsOptional()
  @IsString()
  @Length(2, 5)
  language?: string;

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
