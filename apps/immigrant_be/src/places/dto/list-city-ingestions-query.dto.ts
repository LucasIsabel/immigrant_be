import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import {
  CityIngestionScope,
  CityIngestionStatus,
} from '../../../../../generated/prisma';

export class ListCityIngestionsQueryDto {
  @ApiPropertyOptional({ description: 'ISO2 country code', example: 'PT' })
  @IsOptional()
  @IsString()
  @Length(2, 2)
  countryCode?: string;

  @ApiPropertyOptional({ example: 'Lisbon' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  city?: string;

  @ApiPropertyOptional({
    description:
      'State of the city, to tell namesakes apart. Read only together with `city`.',
    example: 'Mato Grosso do Sul',
  })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  state?: string;

  @ApiPropertyOptional({
    enum: CityIngestionScope,
    description:
      'Narrows to city ingestions or to country sweeps. The list mixes both since #220.',
  })
  @IsOptional()
  @IsEnum(CityIngestionScope)
  scope?: CityIngestionScope;

  @ApiPropertyOptional({ enum: CityIngestionStatus })
  @IsOptional()
  @IsEnum(CityIngestionStatus)
  status?: CityIngestionStatus;

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
