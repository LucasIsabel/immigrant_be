import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BusinessType } from '../../../../../generated/prisma';

export class BusinessResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  userId: string;

  @ApiProperty({ enum: BusinessType, example: BusinessType.RESTAURANT })
  businessType: BusinessType;

  @ApiProperty({ example: 'Restaurante do João' })
  name: string;

  @ApiPropertyOptional({
    example: 'Um restaurante aconchegante no centro da cidade.',
  })
  description: string | null;

  @ApiPropertyOptional({ example: 'Rua das Flores, 123' })
  address: string | null;

  @ApiProperty({ example: 'Lisboa' })
  city: string;

  @ApiPropertyOptional({ example: 'Portugal' })
  country: string | null;

  @ApiPropertyOptional({ example: 38.7169 })
  lat: number | null;

  @ApiPropertyOptional({ example: -9.1399 })
  lng: number | null;

  @ApiPropertyOptional({ example: '+351 912 345 678' })
  phone: string | null;

  @ApiPropertyOptional({ example: 'contato@restaurante.pt' })
  email: string | null;

  @ApiPropertyOptional({ example: 'https://restaurante.pt' })
  website: string | null;

  @ApiProperty({ type: [String], example: [] })
  photos: string[];

  @ApiPropertyOptional({
    description: 'Dados específicos do tipo de negócio (JSON livre)',
  })
  typeData: object | null;

  @ApiProperty({ example: false })
  isPublic: boolean;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: Date;
}
