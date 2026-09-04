import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

/**
 * Asking for an itinerary before there is anything in it.
 *
 * The first itinerary in a country is still born from saving the first place —
 * a form standing in front of the thing somebody wanted is a form they abandon.
 * This is for the second one, where "save" no longer has an obvious answer
 * about *where*, and so the question has to be asked somewhere.
 */
export class CreateItineraryDto {
  @ApiProperty({
    minLength: 2,
    maxLength: 120,
    example: 'Porto num fim de semana',
  })
  @IsString()
  @Length(2, 120)
  title: string;

  @ApiProperty({ description: 'ISO 3166-1 alpha-2', example: 'PT' })
  @IsString()
  @Matches(/^[A-Za-z]{2}$/, { message: 'countryCode deve ser ISO2' })
  countryCode: string;
}
