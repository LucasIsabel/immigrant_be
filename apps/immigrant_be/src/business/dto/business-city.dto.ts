import { ApiProperty } from '@nestjs/swagger';

/**
 * A city that has at least one business listed on My City.
 *
 * The sibling of `PlaceCityDto`. It answers "is there anything here", which is
 * what the city selector needs to stop hiding cities a third-party catalogue
 * happens not to name — and it carries a centre, so a city with businesses but
 * no ingested places still has a point to search around.
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

  @ApiProperty({
    description:
      'Centre of the listed businesses, averaged. Null when none of them has coordinates.',
    example: 41.15,
    nullable: true,
  })
  lat: number | null;

  @ApiProperty({ example: -8.61, nullable: true })
  lng: number | null;
}
