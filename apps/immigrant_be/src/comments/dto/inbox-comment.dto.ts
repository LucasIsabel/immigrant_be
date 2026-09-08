import { ApiProperty } from '@nestjs/swagger';
import { CommentDto } from './comment-response.dto';
import { CommentTarget } from './comment-target';

export class InboxCommentDto extends CommentDto {
  @ApiProperty({ enum: CommentTarget })
  target: CommentTarget;

  @ApiProperty()
  targetId: string;

  @ApiProperty({
    example: 'Tasca do Bairro',
    description:
      'Em que página o comentário caiu. A fila é da pessoa e não de uma ' +
      'página, então sem isto seria uma lista de comentários sem contexto.',
  })
  targetTitle: string;

  @ApiProperty({
    type: Boolean,
    description: 'Se é uma resposta a outro comentário.',
  })
  isReply: boolean;

  @ApiProperty({
    example: 0,
    description:
      'Quantas denúncias este comentário acumulou. Zero é o caso comum; é o ' +
      'número que distingue uma queixa de um padrão.',
  })
  reportCount: number;
}

export class PaginatedInboxResponseDto {
  @ApiProperty({ type: [InboxCommentDto] })
  data: InboxCommentDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 3, description: 'Quantos ainda esperam decisão.' })
  pendingCount: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;
}
