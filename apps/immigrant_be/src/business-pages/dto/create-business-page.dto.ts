import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, Matches } from 'class-validator';

export const BUSINESS_PAGE_TYPES = [
  'restaurante',
  'clinica',
  'loja',
  'servico',
  'hotel',
  'academia',
  'salao',
  'guia-turistico',
] as const;

export type BusinessPageType = (typeof BUSINESS_PAGE_TYPES)[number];

export class CreateBusinessPageDto {
  @ApiProperty({ description: 'UUID do Business' })
  @IsString()
  businessId: string;

  @ApiProperty({
    description: 'Slug único (3-48 chars, lowercase alphanumeric + hyphens)',
    example: 'padaria-central',
  })
  @IsString()
  @Matches(/^[a-z0-9][a-z0-9-]{1,46}[a-z0-9]$/)
  slug: string;

  @ApiProperty({ description: 'Tipo da página', enum: BUSINESS_PAGE_TYPES })
  @IsIn(BUSINESS_PAGE_TYPES)
  businessType: string;
}
