import { ApiProperty } from '@nestjs/swagger';

/**
 * A city an itinerary passes through, with its state.
 *
 * It sits beside `cities`, never in its place: that list of names is what the
 * frontend already parses, and changing its type would break it. This one says
 * which Campo Grande a stop is in, which a name alone cannot.
 */
export class ItineraryCityDto {
  @ApiProperty({ example: 'Campo Grande' })
  city: string;

  @ApiProperty({
    description: 'Null when the target of the stop does not know its state.',
    example: 'Mato Grosso do Sul',
    nullable: true,
    type: String,
  })
  state: string | null;
}
