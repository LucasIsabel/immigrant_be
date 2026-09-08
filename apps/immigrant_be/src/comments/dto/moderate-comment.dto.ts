import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
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
    enum: CommentTarget,
    description:
      'Restringe a fila a um tipo de conteúdo. Vai a par com `targetId`.',
  })
  @IsOptional()
  @IsEnum(CommentTarget)
  target?: CommentTarget;

  @ApiPropertyOptional({
    description:
      'Restringe a fila a **uma** página. A fila do dono vive dentro do ' +
      'negócio, e quem tem dois negócios não quer as duas filas misturadas.',
  })
  @IsOptional()
  @IsUUID()
  targetId?: string;

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

/**
 * The admin's filters are the owner's filters. It stayed a subclass with an
 * override of the same field, which said "these differ" while they did not.
 */
export class AdminCommentsQueryDto extends InboxQueryDto {
  @ApiPropertyOptional({
    description:
      'Só os denunciados, ou só os que ninguém denunciou. Ausente devolve os ' +
      'dois — `false` não é "tudo", é o que ninguém sinalizou.',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  reported?: boolean;
}
