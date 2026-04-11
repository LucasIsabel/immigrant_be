import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TourGuideReviewDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  businessId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ minimum: 1, maximum: 5 })
  rating: number;

  @ApiPropertyOptional()
  comment?: string | null;

  @ApiProperty()
  authorName: string;

  @ApiProperty()
  createdAt: Date;
}

export class TourGuideReviewsListDto {
  @ApiProperty({ type: [TourGuideReviewDto] })
  reviews: TourGuideReviewDto[];

  @ApiProperty({ example: 4.7 })
  averageRating: number;

  @ApiProperty({ example: 12 })
  totalCount: number;
}
