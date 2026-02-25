import { ApiProperty } from '@nestjs/swagger';
import { BlogPostResponseDto } from './blog-post-response.dto';

export class BlogPostListResponseDto {
  @ApiProperty({
    description: 'Lista de posts',
    type: [BlogPostResponseDto],
  })
  data: BlogPostResponseDto[];

  @ApiProperty({
    description: 'Total de posts encontrados',
    example: 42,
  })
  total: number;

  @ApiProperty({
    description: 'Página atual',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Limite de itens por página',
    example: 10,
  })
  limit: number;
}
