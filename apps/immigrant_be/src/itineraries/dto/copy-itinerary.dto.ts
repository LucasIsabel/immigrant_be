import { ApiProperty } from '@nestjs/swagger';

/**
 * Where the copy landed.
 *
 * The `id` is what the dashboard needs to open it, and the `slug` is not:
 * a fresh copy is private, so its public address does not resolve yet. It is
 * returned anyway because it is the copy's stable identity from the moment it
 * exists, and the caller should not have to re-read the itinerary to learn it.
 */
export class CopyItineraryResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({
    description:
      'Gerado de novo, nunca reaproveitado do original — dois roteiros não podem partilhar endereço.',
  })
  slug!: string;

  @ApiProperty()
  title!: string;
}
