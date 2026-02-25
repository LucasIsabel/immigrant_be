import { ApiProperty } from '@nestjs/swagger';

export class BlogCategoryResponseDto {
  @ApiProperty({
    description: 'ID único da categoria',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Visto',
  })
  name: string;

  @ApiProperty({
    description: 'Slug da categoria para URLs',
    example: 'visto',
  })
  slug: string;

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
