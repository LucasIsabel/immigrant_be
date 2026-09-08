import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { CommentStatus } from '../../../../../generated/prisma';
import { CommentTarget } from './comment-target';

export class RejectCommentDto {
  @ApiPropertyOptional({
    maxLength: 500,
    description:
      'O motivo, nas palavras do dono. Vai inteiro para quem escreveu — é o ' +
      'único campo desta resposta que o frontend não sabe traduzir.',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  reason?: string;
}

export class InboxQueryDto {
  @ApiPropertyOptional({
    enum: CommentStatus,
    description:
      'Sem filtro devolve a fila inteira, com o que espera à frente.',
  })
  @IsOptional()
  @IsEnum(CommentStatus)
  status?: CommentStatus;

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

export class AdminCommentsQueryDto extends InboxQueryDto {
  @ApiPropertyOptional({ enum: CommentTarget })
  @IsOptional()
  @IsEnum(CommentTarget)
  target?: CommentTarget;
}
