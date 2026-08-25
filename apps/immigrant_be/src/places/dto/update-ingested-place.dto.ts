import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class UpdatePlaceTranslationDto {
  @ApiPropertyOptional({ example: 'pt' })
  @IsString()
  @Length(2, 5)
  language: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(20, 2000)
  description?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(0, 300)
  tip?: string;
}

export class UpdateIngestedPlaceDto {
  @ApiPropertyOptional({ description: 'Nome exibido do lugar' })
  @IsOptional()
  @IsString()
  @Length(1, 200)
  name?: string;

  @ApiPropertyOptional({ description: 'Entrada gratuita' })
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

  @ApiPropertyOptional({ type: [UpdatePlaceTranslationDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdatePlaceTranslationDto)
  translations?: UpdatePlaceTranslationDto[];
}
