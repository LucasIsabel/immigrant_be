import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

/**
 * The whole of what an owner may write.
 *
 * There is no description, and that is the design rather than a gap: with the
 * title as the only free-text field, an itinerary is almost entirely content
 * the platform already curated, which is what makes publishing it without a
 * moderation queue defensible.
 */
export class UpdateItineraryDto {
  @ApiProperty({
    description: 'The name of the itinerary. Renaming never changes the slug.',
    example: 'Tour praia de Portugal',
  })
  @IsString()
  @Length(2, 120)
  title: string;
}
