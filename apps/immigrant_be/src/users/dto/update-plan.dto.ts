import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

/**
 * Partial update of a plan's own fields.
 *
 * Only `name` today. `notes` and `description` exist as columns but nothing
 * writes or reads them yet, and opening an editable surface for dormant fields
 * would be inventing a contract nobody asked for. Adding them later is
 * backward-compatible.
 */
export class UpdatePlanDto {
  @ApiProperty({
    description:
      'Nome do plano. Trimado no servidor — nome só de espaços é recusado, porque a lista de ' +
      'planos usa `name` antes do nome do país e um valor em branco deixaria o card sem rótulo algum.',
    example: 'Mudança para Portugal em 2027',
    minLength: 1,
    maxLength: 120,
    type: String,
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name: string;
}
