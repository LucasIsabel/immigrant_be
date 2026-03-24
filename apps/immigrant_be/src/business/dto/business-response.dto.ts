import { ApiProperty } from '@nestjs/swagger';
import { BusinessType } from '../../../../generated/prisma';

export class BusinessResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  userId: string;

  @ApiProperty({ enum: BusinessType, example: BusinessType.RESTAURANT })
  businessType: BusinessType;

  @ApiProperty({ example: 'Restaurante do João' })
  name: string;

  @ApiProperty({
    example: 'Um restaurante aconchegante no centro da cidade.',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ example: 'Rua das Flores, 123', nullable: true })
  address: string | null;

  @ApiProperty({ example: 'Lisboa' })
  city: string;

  @ApiProperty({ example: 'Portugal', nullable: true })
  country: string | null;

  @ApiProperty({ example: 38.7169, nullable: true })
  lat: number | null;

  @ApiProperty({ example: -9.1399, nullable: true })
  lng: number | null;

  @ApiProperty({ example: '+351 912 345 678', nullable: true })
  phone: string | null;

  @ApiProperty({ example: 'contato@restaurante.pt', nullable: true })
  email: string | null;

  @ApiProperty({ example: 'https://restaurante.pt', nullable: true })
  website: string | null;

  @ApiProperty({ type: [String], example: [] })
  photos: string[];

  @ApiProperty({
    description: 'Dados específicos do tipo de negócio (JSON livre)',
    nullable: true,
  })
  typeData: object | null;

  @ApiProperty({ example: false })
  isPublic: boolean;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: Date;
}
