import { Injectable } from '@nestjs/common';
import { PlacesRepository } from './places.repository';
import {
  PlaceCitiesQueryDto,
  PlacesListQueryDto,
} from './dto/places-list-query.dto';

@Injectable()
export class PlacesService {
  constructor(private readonly repository: PlacesRepository) {}

  getPublicPlaces(query: PlacesListQueryDto) {
    return this.repository.findPublic(query);
  }

  getCities(query: PlaceCitiesQueryDto) {
    return this.repository.findCities(query);
  }
}
