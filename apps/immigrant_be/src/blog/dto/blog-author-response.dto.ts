import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BlogAuthorResponseDto {
  @ApiProperty({
    description: 'ID único do autor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do autor',
    example: 'Maria Silva',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Biografia do autor',
  })
  bio?: string | null;

  @ApiPropertyOptional({
    description: 'URL do avatar do autor',
  })
  avatar_url?: string | null;

  @ApiPropertyOptional({
    description: 'URL do site pessoal',
  })
  website?: string | null;

  @ApiPropertyOptional({
    description: 'Usuário Twitter/X',
  })
  twitter?: string | null;

  @ApiPropertyOptional({
    description: 'URL do perfil LinkedIn',
  })
  linkedin?: string | null;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-15T10:30:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2024-01-15T10:30:00Z',
  })
  updated_at: Date;
}
