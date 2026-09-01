import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { BusinessType } from '../../../../../generated/prisma';

export class BusinessListQueryDto {
  @ApiPropertyOptional({
    example: 'Portugal',
    description:
      'Country name as stored on the business. City names repeat across the world — Córdoba, Santiago, Toledo — so a city filter alone is ambiguous.',
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({ example: 'Lisboa' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ enum: BusinessType, example: BusinessType.RESTAURANT })
  @IsEnum(BusinessType)
  @IsOptional()
  businessType?: BusinessType;

  @ApiPropertyOptional({
    example: 'pizza',
    description: 'Busca por nome do negócio',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ example: 1, default: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ example: 20, default: 20, minimum: 1, maximum: 100 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 20;

  @ApiPropertyOptional({
    example: 38.7169,
    description: 'Latitude do ponto de origem',
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  lat?: number;

  @ApiPropertyOptional({
    example: -9.1399,
    description: 'Longitude do ponto de origem',
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  lng?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Raio de busca em km (máx 200)',
    minimum: 1,
    maximum: 200,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(200)
  @IsOptional()
  radius?: number;

  @ApiPropertyOptional({
    description:
      'Only what is featured right now. Feeds the Destaques row, which has to ask for its own rows: a page of the list can hold no featured row at all, and picking from whatever came back would make the row change as the reader scrolls.',
    example: true,
  })
  @Transform(
    ({ value }: { value: unknown }) =>
      value === true || value === 'true' || value === '1',
  )
  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}
