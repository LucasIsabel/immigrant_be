import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TourItemDto {
  @ApiProperty({ example: 'Tour Histórico de Lisboa' })
  @IsString()
  name: string;

  @ApiProperty({ example: '3h' })
  @IsString()
  duration: string;

  @ApiProperty({ example: 45 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    example: 'Passeio a pé pelos bairros históricos de Lisboa.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/tour.jpg' })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'MAIS PEDIDO' })
  @IsString()
  @IsOptional()
  badgeLabel?: string;

  @ApiPropertyOptional({ example: 4 })
  @IsNumber()
  @IsOptional()
  stopCount?: number;

  @ApiPropertyOptional({ example: 8 })
  @IsNumber()
  @IsOptional()
  maxParticipants?: number;
}

export class ItineraryLocationDto {
  @ApiProperty({ example: 'Portugal' })
  @IsString()
  country: string;

  @ApiPropertyOptional({ example: 'Lisboa' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ example: 'Lisboa' })
  @IsString()
  city: string;

  @ApiPropertyOptional({ example: 38.7169 })
  @IsNumber()
  @IsOptional()
  lat?: number;

  @ApiPropertyOptional({ example: -9.1399 })
  @IsNumber()
  @IsOptional()
  lng?: number;

  @ApiPropertyOptional({
    type: [String],
    description: 'Up to 3 photo URLs for this location',
    maxItems: 3,
  })
  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayMaxSize(3)
  @IsOptional()
  photos?: string[];
}

export class TourGuideTypeDataDto {
  @ApiPropertyOptional({
    type: [String],
    example: ['Português', 'Inglês', 'Espanhol'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  languages?: string[];

  @ApiPropertyOptional({ type: [TourItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TourItemDto)
  @IsOptional()
  tours?: TourItemDto[];

  @ApiPropertyOptional({ example: 'Praça do Comércio, Lisboa' })
  @IsString()
  @IsOptional()
  meetingPoint?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/guide.jpg' })
  @IsUrl()
  @IsOptional()
  profileImage?: string;

  @ApiPropertyOptional({ example: 'Brasil' })
  @IsString()
  @IsOptional()
  countryOfOrigin?: string;

  @ApiPropertyOptional({ type: [ItineraryLocationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItineraryLocationDto)
  @IsOptional()
  itinerary?: ItineraryLocationDto[];

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiPropertyOptional({ example: '+351912345678' })
  @IsString()
  @IsOptional()
  whatsapp?: string;
}
