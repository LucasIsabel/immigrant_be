import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { BusinessType } from '../../../../../generated/prisma';

export class BusinessListQueryDto {
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
}
