import { ApiProperty } from '@nestjs/swagger';

export class SubmitBusinessPageResponseDto {
  @ApiProperty({
    enum: ['first', 'update', 'approved'],
    description:
      '"first" — primeira submissão; "update" — atualização de página aprovada; "approved" — publisher qualificado, aprovado diretamente',
  })
  modal: 'first' | 'update' | 'approved';

  @ApiProperty({ description: 'Novo status da página' })
  status: string;
}
