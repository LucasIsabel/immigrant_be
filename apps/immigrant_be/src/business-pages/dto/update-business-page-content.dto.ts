import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsObject,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class OpeningHoursDto {
  @ApiPropertyOptional({ example: '09:00–18:00' })
  @IsOptional()
  @IsString()
  weekdays?: string;

  @ApiPropertyOptional({ example: '09:00–14:00' })
  @IsOptional()
  @IsString()
  weekend?: string;
}

class PendingContentDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  coverPhotoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  lng?: number;

  @ApiPropertyOptional({ type: OpeningHoursDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => OpeningHoursDto)
  openingHours?: OpeningHoursDto;

  /** Type-specific JSON (e.g. restaurant `menu` in `typeData`) */
  @ApiPropertyOptional({
    description: 'Dados por tipo de página (ex.: cardápio do restaurante)',
    type: 'object',
    additionalProperties: true,
  })
  @IsOptional()
  @IsObject()
  typeData?: Record<string, unknown>;
}

export class UpdateBusinessPageContentDto {
  @ApiProperty({ type: PendingContentDto })
  @ValidateNested()
  @Type(() => PendingContentDto)
  pendingContent: PendingContentDto;
}
