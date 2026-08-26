import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminPlaceResponseDto } from './dto/city-ingestion-response.dto';
import { ListCatalogPlacesQueryDto } from './dto/list-catalog-places-query.dto';
import { PaginatedCatalogPlacesResponseDto } from './dto/catalog-places-response.dto';
import { UpdateCatalogPlaceDto } from './dto/update-catalog-place.dto';
import { PlacesAdminRepository } from './places-admin.repository';

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
  constructor(private readonly repository: PlacesAdminRepository) {}

  async list(
    query: ListCatalogPlacesQueryDto,
  ): Promise<PaginatedCatalogPlacesResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const { data, total } = await this.repository.listCatalog({
      countryCode: query.countryCode?.toUpperCase(),
      city: query.city,
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
