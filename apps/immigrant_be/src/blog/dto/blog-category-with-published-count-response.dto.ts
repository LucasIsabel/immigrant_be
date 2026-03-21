import { ApiProperty } from '@nestjs/swagger';
import { BlogCategoryResponseDto } from './blog-category-response.dto';

export class BlogCategoryWithPublishedCountResponseDto extends BlogCategoryResponseDto {
  @ApiProperty({
    description:
      'Quantidade de posts PUBLISHED vinculados a esta categoria no blog',
    example: 12,
  })
  published_posts_count: number;
}
