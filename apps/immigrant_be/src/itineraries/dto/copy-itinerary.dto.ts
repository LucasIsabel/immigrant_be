import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

/**
 * Copying again, when a copy already exists.
 *
 * The flag is the second half of a two-step: the first request asks, gets a
 * 409 describing the copy that is in the way, and writes nothing. The reader
 * decides, and the flag carries that decision back. Doing it in one request
 * would mean overwriting before anybody was asked.
 */
export class CopyItineraryDto {
  @ApiPropertyOptional({
    description:
      'Substituir a cópia existente pela versão atual da origem. Sem isto, uma cópia existente responde 409 e nada é escrito.',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  overwrite?: boolean;
}

/**
 * Where the copy landed.
 *
 * The `id` is what the dashboard needs to open it, and the `slug` is not: a
 * fresh copy is private, so its public address does not resolve yet. It is
 * returned anyway because it is the copy's stable identity from the moment it
 * exists, and the caller should not have to re-read the itinerary to learn it.
 */
export class CopyItineraryResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({
    description:
      'Gerado de novo, nunca reaproveitado do original — dois roteiros não podem partilhar endereço. Numa sobrescrita é o da cópia, que não muda.',
  })
  slug!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty({
    description:
      'Verdadeiro quando isto substituiu uma cópia que já existia, em vez de criar uma.',
  })
  overwritten!: boolean;
}

/** The copy that is in the way, described well enough to decide about it. */
export class ExistingCopyDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty({ description: 'Quando as paradas foram tiradas da origem.' })
  copiedAt!: Date;

  @ApiProperty({
    description:
      'O dono mexeu na cópia depois de a tirar — renomeou, reordenou ou removeu paradas. É o que a sobrescrita vai apagar, e por isso a pergunta muda de texto.',
  })
  editedSinceCopy!: boolean;
}

/**
 * The 409 that is a question rather than a failure.
 *
 * A named class because the frontend generates its types from this document:
 * an inline schema compiles and answers correctly and produces `any` on the
 * other side, which is exactly where a confirmation dialog would start
 * guessing at fields.
 */
export class CopyItineraryConflictDto {
  @ApiProperty({ example: 'Já tens uma cópia deste roteiro' })
  message!: string;

  @ApiProperty({ type: ExistingCopyDto })
  existingCopy!: ExistingCopyDto;
}
