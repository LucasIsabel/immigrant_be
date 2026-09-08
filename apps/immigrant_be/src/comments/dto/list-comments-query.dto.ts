import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { CommentTarget } from './comment-target';

export class ListCommentsQueryDto {
  @ApiProperty({ enum: CommentTarget, example: CommentTarget.BUSINESS })
  @IsEnum(CommentTarget)
  target: CommentTarget;

  @ApiProperty({ example: '8c1d84a5-2523-451f-9ad2-e819862ef7c0' })
  @IsUUID()
  targetId: string;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 20;
}
