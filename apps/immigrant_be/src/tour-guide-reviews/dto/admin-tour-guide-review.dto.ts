import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export enum AdminReviewVisibility {
  ALL = 'all',
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}

export class ListAdminTourGuideReviewsQueryDto {
  @ApiPropertyOptional({ description: 'Only reviews of this business.' })
  @IsOptional()
  @IsUUID()
  businessId?: string;

  @ApiPropertyOptional({
    enum: AdminReviewVisibility,
    default: AdminReviewVisibility.ALL,
  })
  @IsOptional()
  @IsEnum(AdminReviewVisibility)
  visibility?: AdminReviewVisibility = AdminReviewVisibility.ALL;

  @ApiPropertyOptional({
    description: 'Only reviews a reader has flagged.',
    default: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  reported?: boolean;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

/** The reason is required: hiding a review is a call someone has to own. */
export class HideTourGuideReviewDto {
  @ApiProperty({
    example: 'Acusação de crime sem qualquer elemento que a sustente.',
  })
  @IsString()
  @Length(3, 500)
  reason: string;
}

export class DeleteTourGuideReviewDto {
  @ApiProperty({ example: 'Contém o telefone pessoal de um terceiro.' })
  @IsString()
  @Length(3, 500)
  reason: string;
}

export class TourGuideReviewReportDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  reason: string;

  @ApiProperty()
  createdAt: Date;
}

export class AdminTourGuideReviewDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  businessId: string;

  @ApiProperty()
  businessName: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ description: 'Taken from the account, never from the input.' })
  authorName: string;

  @ApiProperty()
  authorEmail: string;

  @ApiProperty({ minimum: 1, maximum: 5 })
  rating: number;

  @ApiPropertyOptional()
  comment?: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional({ description: 'Set while the review is hidden.' })
  hiddenAt?: Date | null;

  @ApiPropertyOptional()
  hiddenReason?: string | null;

  @ApiProperty({ example: 0 })
  reportCount: number;
}

export class AdminTourGuideReviewDetailDto extends AdminTourGuideReviewDto {
  @ApiProperty({ type: [TourGuideReviewReportDto] })
  reports: TourGuideReviewReportDto[];
}

export class PaginatedAdminTourGuideReviewsResponseDto {
  @ApiProperty({ type: [AdminTourGuideReviewDto] })
  data: AdminTourGuideReviewDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;
}
