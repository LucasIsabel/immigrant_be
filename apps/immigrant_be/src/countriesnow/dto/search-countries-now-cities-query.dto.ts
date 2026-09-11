import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class SearchCountriesNowCitiesQueryDto {
  @ApiProperty({
    description: 'Country name as in CountriesNow',
    example: 'Brazil',
  })
  @IsString()
  @Length(1, 100)
  country: string;

  @ApiProperty({
    description:
      'What was typed. Compared without accents, case or repeated spaces, so "sao" finds "São Paulo".',
    example: 'campo',
  })
  @IsString()
  @Length(1, 100)
  q: string;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 20;
}
