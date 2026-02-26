import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class BlogQueryDto {
  @ApiProperty({
    description: 'Número da página',
    example: 1,
    default: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Quantidade de itens por página',
    example: 10,
    default: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @ApiProperty({
    description: 'Filtrar por slug de categoria',
    example: 'visto',
    required: false,
  })
  @IsOptional()
  @IsString()
  categorySlug?: string;

  @ApiProperty({
    description: 'Filtrar por slug de tag',
    example: 'express-entry',
    required: false,
  })
  @IsOptional()
  @IsString()
  tagSlug?: string;

  @ApiProperty({
    description: 'Idioma do conteúdo retornado',
    enum: ['pt', 'en', 'es'],
    required: false,
  })
  @IsOptional()
  @IsIn(['pt', 'en', 'es'])
  lang?: string;
}

export class AdminBlogQueryDto extends BlogQueryDto {
  @ApiProperty({
    description: 'Filtrar por status do post',
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;
}
