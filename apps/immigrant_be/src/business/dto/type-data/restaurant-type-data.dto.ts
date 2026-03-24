import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
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
