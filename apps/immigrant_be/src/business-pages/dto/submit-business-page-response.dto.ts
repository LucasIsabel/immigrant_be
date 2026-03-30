import { ApiProperty } from '@nestjs/swagger';

export class SubmitBusinessPageResponseDto {
  @ApiProperty({
    enum: ['first', 'update'],
    description: '"first" se nunca aprovada antes, "update" se já aprovada',
  })
  modal: 'first' | 'update';

  @ApiProperty({ description: 'Novo status da página' })
  status: string;
}
