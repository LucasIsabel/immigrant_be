import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CityIngestionScope } from '../../../../generated/prisma';
import { AdminPlaceResponseDto } from './dto/city-ingestion-response.dto';
import { CreateCityIngestionDto } from './dto/create-city-ingestion.dto';
import {
  ResetCityPlacesDto,
  ResetCityPlacesResponseDto,
} from './dto/reset-city-places.dto';
import { ListCatalogPlacesQueryDto } from './dto/list-catalog-places-query.dto';
import { PaginatedCatalogPlacesResponseDto } from './dto/catalog-places-response.dto';
import { UpdateCatalogPlaceDto } from './dto/update-catalog-place.dto';
import { PlacesAdminRepository } from './places-admin.repository';
import { PlacesAdminService } from './places-admin.service';

/**
 * The live catalogue: every place, curated or ingested, whatever its status.
 *
 * The ingestion flow deliberately refuses to touch anything past DRAFT — its
 * PATCH answers 409, because editing production through a review screen would
 * leave no trail of what was reviewed. This service is that other flow: the
 * place an admin edits here is already public, and the 30 curated places,
 * which belong to no ingestion, are reachable at all only through it.
 */
@Injectable()
export class PlacesCatalogAdminService {
  constructor(
    private readonly repository: PlacesAdminRepository,
    private readonly placesAdminService: PlacesAdminService,
  ) {}

  async list(
    query: ListCatalogPlacesQueryDto,
  ): Promise<PaginatedCatalogPlacesResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const { data, total } = await this.repository.listCatalog({
      countryCode: query.countryCode?.toUpperCase(),
      city: query.city,
      state: query.state,
      category: query.category,
      reviewStatus: query.reviewStatus,
      isActive:
        query.isActive === undefined ? undefined : query.isActive === 'true',
      search: query.search,
      page,
      limit,
    });

    return { data: data.map(toResponse), total, page, limit };
  }

  async update(
    placeId: string,
    dto: UpdateCatalogPlaceDto,
  ): Promise<AdminPlaceResponseDto> {
    await this.require(placeId);

    const { translations = [], ...fields } = dto;
    const updated = await this.repository.updateCatalogPlace(
      placeId,
      fields,
      translations,
    );
    return toResponse(updated);
  }

  /**
   * Deactivation is the safe "remove from the site": the public queries
   * already filter on isActive, so the place vanishes from the explorer while
   * its data, translations and provenance stay recoverable.
   */
  async setActive(
    placeId: string,
    isActive: boolean,
  ): Promise<AdminPlaceResponseDto> {
    await this.require(placeId);
    return toResponse(await this.repository.setPlaceActive(placeId, isActive));
  }

  /** Hard delete, for records that should never have existed. */
  async remove(placeId: string): Promise<void> {
    await this.require(placeId);
    await this.repository.deletePlace(placeId);
  }

  /** Hard delete of several places; ids that no longer exist are ignored. */
  async removeMany(ids: string[]): Promise<number> {
    return this.repository.deletePlaces(ids);
  }

  /**
   * Delete a city's places and, optionally, ingest it again.
   *
   * The city is matched exactly as the catalogue list matches it — country,
   * folded city, and the state only when one is given — so what the admin sees
   * filtered is what gets deleted. With no state, every namesake of the city
   * name in that country goes.
   *
   * REJECTED places stay: they are the memory that keeps a re-ingestion from
   * recreating a place somebody refused.
   *
   * With `reingest`, the in-flight check runs BEFORE anything is deleted, so a
   * 409 leaves the catalogue untouched. The new ingestion reuses the categories,
   * OSM area and spelling of the city's latest one, when there is one.
   */
  async resetCity(
    dto: ResetCityPlacesDto,
    adminId: string,
  ): Promise<ResetCityPlacesResponseDto> {
    if (!dto.reingest) {
      const result = await this.repository.deleteCityPlaces(dto);
      return { ...result, ingestion: null };
    }

    const latest = await this.repository.findLatestCityIngestion(dto);
    const input: CreateCityIngestionDto = {
      countryCode: dto.countryCode,
      scope: CityIngestionScope.CITY,
      city: latest?.city ?? dto.city,
      state: latest?.state ?? dto.state,
      categories: latest?.categories ?? [],
      // BigInt column; OSM area ids stay far below 2^53, and the DTO is a number.
      osmAreaId:
        latest?.osmAreaId == null ? undefined : Number(latest.osmAreaId),
    };

    const active = await this.repository.findActiveOverlapping({
      countryCode: input.countryCode,
      scope: CityIngestionScope.CITY,
      city: input.city,
      state: input.state,
      categories: input.categories ?? [],
    });
    if (active) {
      throw new ConflictException(
        `Já existe uma ingestão ${active.status} para esta cidade; nada foi apagado`,
      );
    }

    const result = await this.repository.deleteCityPlaces(dto);
    const ingestion = await this.placesAdminService.createIngestion(
      input,
      adminId,
    );
    return { ...result, ingestion };
  }

  private async require(placeId: string) {
    const place = await this.repository.findCatalogPlace(placeId);
    if (!place) throw new NotFoundException('Lugar não encontrado');
    return place;
  }
}

type PlaceFromDatabase = Omit<AdminPlaceResponseDto, 'generationCostUsd'> & {
  generationCostUsd: { toNumber(): number } | null;
};

/** Prisma's Decimal serialises as an object; the frontend expects a number. */
function toResponse(place: PlaceFromDatabase): AdminPlaceResponseDto {
  return {
    ...place,
    generationCostUsd: place.generationCostUsd?.toNumber() ?? null,
  };
}
