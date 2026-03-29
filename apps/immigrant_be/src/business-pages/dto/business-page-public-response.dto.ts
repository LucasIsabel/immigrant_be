import { ApiProperty } from '@nestjs/swagger';

export class BusinessPagePublicResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'meu-restaurante-centro' })
  slug: string;

  @ApiProperty({ example: 'restaurante' })
  businessType: string;

  @ApiProperty({ example: 'APPROVED' })
  status: string;

  @ApiProperty({ description: 'Conteúdo aprovado da página (JSON livre)' })
  approvedContent: Record<string, unknown>;

  @ApiProperty({ example: '2026-01-15T10:30:00.000Z' })
  approvedAt: string;
}
