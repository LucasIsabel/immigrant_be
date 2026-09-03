import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Length, Matches } from 'class-validator';

/**
 * One tap on a card, and the itinerary may not exist yet.
 *
 * Asking somebody to create an itinerary before they can save the first place
 * is a form to fill before the thing they wanted; without `itineraryId` the
 * server picks their most recent itinerary **in that country** and creates one
 * if there is none. `defaultTitle` is what that new one is called, and it comes
 * from the client because the title is user-facing text and the client is where
 * the locale lives.
 */
export class AddItineraryStopDto {
  @ApiPropertyOptional({
    description:
      'Which itinerary to add to. Omit to let the server pick or create one.',
  })
  @IsOptional()
  @IsUUID()
  itineraryId?: string;

  @ApiPropertyOptional({ description: 'The place to add. Exactly one target.' })
  @IsOptional()
  @IsUUID()
  placeId?: string;

  @ApiPropertyOptional({
    description: 'The business to add. Exactly one target.',
  })
  @IsOptional()
  @IsUUID()
  businessId?: string;

  @ApiProperty({
    description: 'ISO 3166-1 alpha-2 of the country the itinerary belongs to.',
    example: 'PT',
  })
  @IsString()
  @Matches(/^[A-Za-z]{2}$/, {
    message: 'countryCode must be ISO 3166-1 alpha-2',
  })
  countryCode: string;

  @ApiProperty({
    description:
      'Name for the itinerary when the server has to create one. Localized by the client.',
    example: 'Meu roteiro em Portugal',
  })
  @IsString()
  @Length(2, 120)
  defaultTitle: string;
}

export class AddItineraryStopResponseDto {
  @ApiProperty() itineraryId: string;

  @ApiProperty({
    description:
      'Echoed so the confirmation can name the itinerary without a second request.',
  })
  itineraryTitle: string;

  @ApiProperty({
    description:
      'True when this call created the itinerary. The client says "added to X" either way, but only a fresh one is worth announcing as new.',
  })
  created: boolean;

  @ApiProperty() stopId: string;

  @ApiProperty({ description: '1-based position within the itinerary.' })
  position: number;
}
