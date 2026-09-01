import { ApiProperty } from '@nestjs/swagger';

/**
 * What each tab of the My City screen would list, without listing it.
 *
 * The counts exist so a tab can say how much it holds before anyone opens it —
 * otherwise an empty tab only announces itself after the click, which is the
 * price of hiding content behind tabs. They have to agree with what the tab
 * then shows: the business counts therefore include the nearby reach, because
 * the list does.
 */
export class MyCitySummaryResponseDto {
  @ApiProperty({
    example: 6,
    description: 'Restaurants in the city and within the reach',
  })
  restaurants: number;

  @ApiProperty({
    example: 5,
    description: 'Tour guides in the city and within the reach',
  })
  tourGuides: number;

  @ApiProperty({ example: 3, description: 'Approved events still to come' })
  events: number;

  @ApiProperty({ example: 30, description: 'Active places in the catalogue' })
  places: number;
}
