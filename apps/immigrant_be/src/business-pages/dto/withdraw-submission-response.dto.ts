import { ApiProperty } from '@nestjs/swagger';

/**
 * O que sobra depois de o dono retirar a submissão.
 *
 * Declarado como classe, e não `$ref` inline, porque é assim que o tipo chega
 * ao frontend pela geração do contrato.
 */
export class WithdrawSubmissionResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({
    example: 'APPROVED',
    description:
      'Para onde a página voltou: APPROVED quando já havia conteúdo no ar, DRAFT quando nunca chegou a ser aprovada.',
    enum: ['DRAFT', 'APPROVED'],
  })
  status: string;
}
