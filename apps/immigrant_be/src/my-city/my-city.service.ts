import { Injectable } from '@nestjs/common';
import { MyCitySummaryQueryDto } from './dto/my-city-summary-query.dto';
import { MyCitySummaryResponseDto } from './dto/my-city-summary-response.dto';
import { MyCityRepository } from './my-city.repository';

@Injectable()
export class MyCityService {
  constructor(private readonly repository: MyCityRepository) {}

  /**
   * The four numbers the tabs need, in one round trip.
   *
   * Three queries, run together: a tab strip that arrives in pieces would
   * renumber itself in front of the reader.
   */
  async summary(
    query: MyCitySummaryQueryDto,
  ): Promise<MyCitySummaryResponseDto> {
    const [businesses, events, places] = await Promise.all([
      this.repository.countBusinesses(query),
      this.repository.countEvents(query),
      this.repository.countPlaces(query),
    ]);

    return {
      restaurants: businesses.RESTAURANT ?? 0,
      tourGuides: businesses.TOUR_GUIDE ?? 0,
      events,
      places,
    };
  }
}
