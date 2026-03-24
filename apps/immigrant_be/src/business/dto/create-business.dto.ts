import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ArrayMaxSize,
} from 'class-validator';
import { BusinessType } from '../../../../../generated/prisma';

export class CreateBusinessDto {
  @ApiProperty({ enum: BusinessType, example: BusinessType.RESTAURANT })
  @IsEnum(BusinessType)
  businessType: BusinessType;

  @ApiProperty({ example: 'Restaurante do João', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'Lisboa', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  city: string;

  @ApiPropertyOptional({
    example: 'Um restaurante aconchegante no centro da cidade.',
    maxLength: 2000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({ example: 'Rua das Flores, 123', maxLength: 200 })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  address?: string;

  @ApiPropertyOptional({ example: 'Portugal', maxLength: 100 })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  country?: string;

  @ApiPropertyOptional({ example: 38.7169 })
  @IsNumber()
  @IsOptional()
  lat?: number;

  @ApiPropertyOptional({ example: -9.1399 })
  @IsNumber()
  @IsOptional()
  lng?: number;

  @ApiPropertyOptional({ example: '+351 912 345 678', maxLength: 20 })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ example: 'contato@restaurante.pt' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'https://restaurante.pt' })
  @IsUrl()
  @IsOptional()
  @MaxLength(200)
  website?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['https://cdn.example.com/photo1.jpg'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ArrayMaxSize(10)
  photos?: string[];

  @ApiPropertyOptional({
    description: 'Dados específicos do tipo de negócio (JSON livre)',
  })
  @IsObject()
  @IsOptional()
  typeData?: object;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
