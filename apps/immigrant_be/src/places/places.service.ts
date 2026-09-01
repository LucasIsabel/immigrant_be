import { Injectable } from '@nestjs/common';
import { PlacesRepository } from './places.repository';
import { withFeaturedNow } from '../common/featured/with-featured-now';
import {
  PlaceCitiesQueryDto,
  PlacesListQueryDto,
} from './dto/places-list-query.dto';

@Injectable()
export class PlacesService {
  constructor(private readonly repository: PlacesRepository) {}

  async getPublicPlaces(query: PlacesListQueryDto) {
    return withFeaturedNow(await this.repository.findPublic(query));
  }

  getCities(query: PlaceCitiesQueryDto) {
    return this.repository.findCities(query);
  }
}
