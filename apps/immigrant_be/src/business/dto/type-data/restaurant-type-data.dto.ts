import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
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
  @ApiPropertyOptional({
    description:
      'Identidade estável do item, gerada pelo servidor na primeira gravação. Enviar de volta ao editar para não perder a identidade.',
    example: '3f2a1c4e-9b7d-4e1a-8c3f-2d5b6a7e8f90',
  })
  @IsUUID()
  @IsOptional()
  id?: string;

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

  @ApiPropertyOptional({
    example: '09:00 – 18:00',
    description:
      'Horário de funcionamento nos dias úteis (texto livre ou máscara HH:MM – HH:MM)',
  })
  @IsString()
  @IsOptional()
  openingHoursWeekdays?: string;

  @ApiPropertyOptional({
    example: '10:00 – 23:00',
    description: 'Horário de funcionamento ao fim de semana',
  })
  @IsString()
  @IsOptional()
  openingHoursWeekend?: string;

  /** Legado: preferir openingHoursWeekdays / openingHoursWeekend */
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
