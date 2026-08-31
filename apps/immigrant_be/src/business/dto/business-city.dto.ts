import { ApiProperty } from '@nestjs/swagger';

/**
 * A city that has at least one business listed on My City.
 *
 * The sibling of `PlaceCityDto`, and deliberately thinner: the map centre
 * already comes from the places of a city, so this only has to answer "is
 * there anything here", which is what the city selector needs to stop hiding
 * cities that a third-party catalogue happens not to name.
 *
 * Keyed by the country **name** rather than an ISO2, because that is what
 * `Business.country` stores.
 */
export class BusinessCityDto {
  @ApiProperty({ example: 'Portugal' })
  country: string;

  @ApiProperty({ example: 'Matosinhos' })
  city: string;

  @ApiProperty({ description: 'How many listed businesses', example: 3 })
  count: number;
}
