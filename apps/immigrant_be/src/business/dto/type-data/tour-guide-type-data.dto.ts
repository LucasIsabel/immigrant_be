import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TourItemDto {
  @ApiPropertyOptional({
    description:
      'Identidade estável do item, gerada pelo servidor na primeira gravação. Enviar de volta ao editar para não perder a identidade.',
    example: '3f2a1c4e-9b7d-4e1a-8c3f-2d5b6a7e8f90',
  })
  @IsUUID()
  @IsOptional()
  id?: string;

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
  @MaxLength(2000)
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/tour.jpg' })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'MAIS PEDIDO' })
  @IsString()
  @MaxLength(50)
  @IsOptional()
  badgeLabel?: string;

  @ApiPropertyOptional({ example: 4 })
  @IsInt()
  @Min(1)
  @IsOptional()
  stopCount?: number;

  @ApiPropertyOptional({ example: 8 })
  @IsInt()
  @Min(1)
  @IsOptional()
  maxParticipants?: number;
}

export class ItineraryPhotoDto {
  @ApiPropertyOptional({
    description:
      'Identidade estável do item, gerada pelo servidor na primeira gravação. Enviar de volta ao editar para não perder a identidade.',
    example: '3f2a1c4e-9b7d-4e1a-8c3f-2d5b6a7e8f90',
  })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: 'https://cdn.example.com/photo.jpg' })
  @IsUrl()
  url: string;

  @ApiPropertyOptional({ example: 38.7169 })
  @IsNumber()
  @IsOptional()
  lat?: number;

  @ApiPropertyOptional({ example: -9.1399 })
  @IsNumber()
  @IsOptional()
  lng?: number;
}

export class ItineraryLocationDto {
  @ApiPropertyOptional({
    description:
      'Identidade estável do item, gerada pelo servidor na primeira gravação. Enviar de volta ao editar para não perder a identidade.',
    example: '3f2a1c4e-9b7d-4e1a-8c3f-2d5b6a7e8f90',
  })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiPropertyOptional({ example: 'Bairro Alto' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Bairro histórico e boémio de Lisboa.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'Portugal' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({ example: 'Lisboa' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: 'Lisboa' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 38.7169 })
  @IsNumber()
  @IsOptional()
  lat?: number;

  @ApiPropertyOptional({ example: -9.1399 })
  @IsNumber()
  @IsOptional()
  lng?: number;

  @ApiPropertyOptional({ type: [ItineraryPhotoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItineraryPhotoDto)
  @IsOptional()
  photos?: ItineraryPhotoDto[];
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
  @MaxLength(20)
  @IsOptional()
  whatsapp?: string;
}
