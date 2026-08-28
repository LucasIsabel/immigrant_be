import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

/** Roughly 300 words — long for a review, short enough to render and to read. */
export const REVIEW_COMMENT_MAX_LENGTH = 2000;

export class CreateTourGuideReviewDto {
  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ example: 'Excelente guia, muito atencioso!' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() || undefined : value,
  )
  @IsString()
  @MaxLength(REVIEW_COMMENT_MAX_LENGTH, {
    message: `O comentário pode ter no máximo ${REVIEW_COMMENT_MAX_LENGTH} caracteres.`,
  })
  @IsOptional()
  comment?: string;

  /**
   * Ignored. The displayed name comes from the account that wrote the review;
   * a name typed by the reviewer is a name they can borrow from anyone. Still
   * accepted so the published frontend keeps working — `forbidNonWhitelisted`
   * would turn every submission into a 400 the moment this field went away.
   */
  @ApiPropertyOptional({
    deprecated: true,
    description:
      'Ignored. The displayed name is taken from the authenticated account.',
  })
  @IsOptional()
  @IsString()
  authorName?: string;
}
