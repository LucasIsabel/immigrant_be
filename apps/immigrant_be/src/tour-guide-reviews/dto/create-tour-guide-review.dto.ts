import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateTourGuideReviewDto {
  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ example: 'Excelente guia, muito atencioso!' })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ example: 'João Silva' })
  @IsString()
  authorName: string;
}
