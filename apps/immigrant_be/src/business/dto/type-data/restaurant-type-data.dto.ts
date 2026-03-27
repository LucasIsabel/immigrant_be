import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum PriceRange {
  LOW = '$',
  MEDIUM = '$$',
  HIGH = '$$$',
}

export class MenuItemDto {
  @ApiProperty({ example: 'Pizza Margherita' })
  @IsString()
  name: string;

  @ApiProperty({ example: 12.5 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 'Prato Principal' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  category?: string;

  @ApiPropertyOptional({
    example: 'Tomate, mozzarella, manjericão fresco.',
    maxLength: 2000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/dish.jpg' })
  @IsUrl()
  @IsOptional()
  @MaxLength(500)
  photo?: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}

export class RestaurantTypeDataDto {
  @ApiPropertyOptional({ example: 'Italiana' })
  @IsString()
  @IsOptional()
  cuisine?: string;

  @ApiPropertyOptional({ enum: PriceRange, example: PriceRange.MEDIUM })
  @IsEnum(PriceRange)
  @IsOptional()
  priceRange?: PriceRange;

  @ApiPropertyOptional({ example: 'Seg-Sex 12h-22h, Sáb-Dom 11h-23h' })
  @IsString()
  @IsOptional()
  openingHours?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  acceptsReservations?: boolean;

  @ApiPropertyOptional({ type: [MenuItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuItemDto)
  @IsOptional()
  menu?: MenuItemDto[];
}
