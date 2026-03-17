import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AiImageResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty()
  prompt: string;

  @ApiProperty()
  folder: string;

  @ApiPropertyOptional()
  key?: string;

  @ApiPropertyOptional()
  url?: string;

  @ApiPropertyOptional()
  mimeType?: string;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty({ enum: ['pending', 'processing', 'completed', 'failed'] })
  status: string;

  @ApiPropertyOptional()
  errorMessage?: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
