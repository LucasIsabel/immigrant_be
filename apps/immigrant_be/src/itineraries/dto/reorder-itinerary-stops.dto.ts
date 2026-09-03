import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

/**
 * A full permutation, never a partial one.
 *
 * The server compares the set against the itinerary's actual stops and refuses
 * anything else. A partial list would leave the positions it omitted to be
 * guessed at, and two clients guessing differently is how an order drifts.
 */
export class ReorderItineraryStopsDto {
  @ApiProperty({
    description:
      'Every stop of the itinerary, in the order they should be walked.',
    type: [String],
    example: [
      '0b9c1a2e-1111-4444-8888-aaaaaaaaaaaa',
      '0b9c1a2e-2222-4444-8888-bbbbbbbbbbbb',
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(200)
  @IsUUID('4', { each: true })
  stopIds: string[];
}
