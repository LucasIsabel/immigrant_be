import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Matches, Max, Min } from 'class-validator';

export class ListMyItinerariesQueryDto {
  /**
   * Narrow to one country.
   *
   * The picker on My City asks this: it needs the itineraries of the country
   * being explored, and paging through everything the reader owns to find them
   * would make the answer depend on how much they have elsewhere.
   */
  @ApiPropertyOptional({ description: 'ISO 3166-1 alpha-2', example: 'PT' })
  @IsOptional()
  @Matches(/^[A-Za-z]{2}$/, { message: 'countryCode deve ser ISO2' })
  countryCode?: string;

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
