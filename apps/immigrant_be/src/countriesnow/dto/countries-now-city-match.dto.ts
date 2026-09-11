import { ApiProperty } from '@nestjs/swagger';

/**
 * One city of the catalogue the business wizard registers in, found by name.
 *
 * An object and not a string because the name alone does not identify the
 * city: Campo Grande is the capital of Mato Grosso do Sul and also a town in
 * Alagoas, and the only way to offer the empty one next to the one with
 * content is to say which state each is in.
 */
export class CountriesNowCityMatchDto {
  @ApiProperty({ example: 'Campo Grande' })
  city: string;

  @ApiProperty({
    description:
      'The state exactly as CountriesNow names it — accents included, since it only answers to that spelling — or null when the country has no subdivisions.',
    example: 'Mato Grosso do Sul',
    nullable: true,
    type: String,
  })
  state: string | null;
}
