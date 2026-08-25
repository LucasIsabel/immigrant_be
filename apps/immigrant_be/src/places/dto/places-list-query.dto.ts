import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { PlaceCategory } from '../../../../../generated/prisma';

export class PlacesListQueryDto {
  @ApiProperty({
    description: 'ISO2 do país. Aceita minúsculo — é normalizado.',
    example: 'PT',
    minLength: 2,
    maxLength: 2,
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  @IsString()
  @Length(2, 2)
  countryCode: string;

  @ApiPropertyOptional({
    description: 'Cidade no formato do CountriesNow; comparação ignora caixa',
    example: 'Lisbon',
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ enum: PlaceCategory, example: PlaceCategory.MUSEUM })
  @IsEnum(PlaceCategory)
  @IsOptional()
  category?: PlaceCategory;

  @ApiPropertyOptional({ description: 'Busca por nome', example: 'belem' })
  @IsString()
  @IsOptional()
  q?: string;

  @ApiPropertyOptional({ description: 'Só lugares gratuitos', example: true })
  @Transform(
    ({ value }: { value: unknown }) =>
      value === true || value === 'true' || value === '1',
  )
  @IsBoolean()
  @IsOptional()
  free?: boolean;

  @ApiPropertyOptional({
    description: 'Ordenação',
    enum: ['popular', 'name'],
    default: 'popular',
  })
  @IsEnum(['popular', 'name'])
  @IsOptional()
  sort?: 'popular' | 'name' = 'popular';

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
}

export class PlaceCitiesQueryDto {
  @ApiPropertyOptional({
    description: 'Sem ele, devolve todas as cidades que têm lugares',
    example: 'PT',
    minLength: 2,
    maxLength: 2,
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  @IsString()
  @Length(2, 2)
  @IsOptional()
  countryCode?: string;
}
