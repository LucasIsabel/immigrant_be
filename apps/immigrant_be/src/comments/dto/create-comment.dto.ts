import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MAX_COMMENT_BODY_LENGTH } from '../comments.constants';
import { CommentTarget } from './comment-target';

/**
 * Arrives as multipart, so every field lands as a string and nothing is
 * coerced for us — `parentId` in particular comes through as the empty string
 * when the composer sends the field without a value, and an empty string is
 * not a missing one to `@IsOptional`.
 */
export class CreateCommentDto {
  @ApiProperty({ enum: CommentTarget, example: CommentTarget.BUSINESS })
  @IsEnum(CommentTarget)
  target: CommentTarget;

  @ApiProperty({ example: '8c1d84a5-2523-451f-9ad2-e819862ef7c0' })
  @IsUUID()
  targetId: string;

  @ApiProperty({ example: 'O bacalhau estava excelente.' })
  @Transform(({ value }): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @MinLength(1)
  @MaxLength(MAX_COMMENT_BODY_LENGTH)
  body: string;

  @ApiPropertyOptional({
    description:
      'O comentário de topo a que isto responde. Só um nível: responder a ' +
      'uma resposta é recusado com 400.',
  })
  @Transform(({ value }): unknown => (value === '' ? undefined : value))
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
