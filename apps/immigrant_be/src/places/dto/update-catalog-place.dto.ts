import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { PlaceCategory } from '../../../../../generated/prisma';
import { UpdatePlaceTranslationDto } from './update-ingested-place.dto';

/**
 * Wider than the ingestion PATCH on purpose: the catalogue is where an admin
 * fixes any live record — curated ones included — so address, website and
 * category are editable here, not only the prose.
 */
export class UpdateCatalogPlaceDto {
  @ApiPropertyOptional({ description: 'Display name of the place' })
  @IsOptional()
  @IsString()
  @Length(1, 200)
  name?: string;

  @ApiPropertyOptional({ enum: PlaceCategory })
  @IsOptional()
  @IsEnum(PlaceCategory)
  category?: PlaceCategory;

  @ApiPropertyOptional({ description: 'Entry is free' })
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @ApiPropertyOptional({ minimum: 0, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  popularityScore?: number;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(0, 300)
  address?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(0, 300)
  website?: string;

  @ApiPropertyOptional({ type: [UpdatePlaceTranslationDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdatePlaceTranslationDto)
  translations?: UpdatePlaceTranslationDto[];
}
