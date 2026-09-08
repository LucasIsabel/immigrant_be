import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommentStatus } from '../../../../../generated/prisma';

export class CommentAuthorDto {
  @ApiProperty({ example: '8c1d84a5-2523-451f-9ad2-e819862ef7c0' })
  id: string;

  @ApiProperty({ example: 'Ana Costa' })
  name: string;

  @ApiProperty({ type: String, nullable: true })
  image: string | null;
}

export class CommentDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: CommentAuthorDto })
  author: CommentAuthorDto;

  @ApiProperty({
    example: 'O bacalhau estava excelente.',
    description:
      'Vazio quando o autor apagou um comentário que já tinha respostas: a ' +
      'linha fica como âncora das respostas, sem o texto.',
  })
  body: string;

  @ApiProperty({ type: String, nullable: true })
  imageUrl: string | null;

  @ApiProperty({
    enum: CommentStatus,
    description:
      'Só o próprio autor vê `PENDING` ou `REJECTED`; para os outros a ' +
      'listagem nem devolve a linha.',
  })
  status: CommentStatus;

  @ApiProperty({
    description:
      'Se o autor apagou o comentário. A linha continua porque as respostas ' +
      'por baixo são de outras pessoas.',
  })
  isDeleted: boolean;

  @ApiProperty({ description: 'Se quem está a ler escreveu este comentário.' })
  isMine: boolean;

  @ApiProperty()
  createdAt: Date;

  /*
   * A thunk, not `type: [CommentDto]`: the decorator runs while the class it
   * names is still being defined, and the direct reference is `undefined` at
   * that moment.
   */
  @ApiPropertyOptional({
    type: () => CommentDto,
    isArray: true,
    description:
      'Só nos comentários de topo. Um nível, nunca dois. Da mais antiga para ' +
      'a mais nova — a ordem em que uma conversa se lê. Na fila do dono vêm ' +
      'todas, seja qual for o estado: é a página dele, e uma resposta que ' +
      'recusou tem de continuar visível ou não há como voltar atrás.',
  })
  replies?: CommentDto[];
}

export class PaginatedCommentsResponseDto {
  @ApiProperty({
    type: [CommentDto],
    description: 'Comentários de topo, cada um com as suas respostas.',
  })
  data: CommentDto[];

  @ApiProperty({ example: 42, description: 'Comentários de topo visíveis.' })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;
}
