import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { INGESTION_DISPATCHER, type IngestionDispatcher } from '@app/ingestion';
import {
  CityIngestion,
  CityIngestionStatus,
  PlaceReviewStatus,
} from '../../../../generated/prisma';
import {
  AdminPlaceResponseDto,
  CityIngestionResponseDto,
} from './dto/city-ingestion-response.dto';
import { CreateCityIngestionDto } from './dto/create-city-ingestion.dto';
import { ListCityIngestionsQueryDto } from './dto/list-city-ingestions-query.dto';
import { UpdateIngestedPlaceDto } from './dto/update-ingested-place.dto';
import { PlacesAdminRepository } from './places-admin.repository';

/** A place is only published with a description in all three product languages. */
const REQUIRED_LANGUAGES = ['pt', 'en', 'es'];

@Injectable()
export class PlacesAdminService {
  constructor(
    private readonly repository: PlacesAdminRepository,
    @Inject(INGESTION_DISPATCHER)
    private readonly dispatcher: IngestionDispatcher,
  ) {}

  async createIngestion(
    dto: CreateCityIngestionDto,
    adminId: string,
  ): Promise<CityIngestionResponseDto> {
    const active = await this.repository.findActiveForCity(
      dto.countryCode,
      dto.city,
    );
    if (active) {
      throw new ConflictException(
        `Já existe uma ingestão ${active.status} para ${dto.city} (${dto.countryCode})`,
      );
    }

    const ingestion = await this.repository.create({
      ...dto,
      requestedById: adminId,
    });
    await this.dispatcher.dispatchCity(ingestion.id);
    return toResponse(ingestion);
  }

  async listIngestions(query: ListCityIngestionsQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { data, total } = await this.repository.list({
      status: query.status,
      page,
      limit,
    });
    return { data: data.map(toResponse), total, page, limit };
  }

  async getIngestion(id: string) {
    const ingestion = await this.repository.findDetail(id);
    if (!ingestion) throw new NotFoundException('Ingestão não encontrada');

    return {
      ...toResponse(ingestion),
      places: ingestion.places.map(toPlaceResponse),
    };
  }

  async updatePlace(
    ingestionId: string,
    placeId: string,
    dto: UpdateIngestedPlaceDto,
  ): Promise<AdminPlaceResponseDto> {
    const place = await this.findInIngestion(ingestionId, placeId);

    // Editing an already published place from this screen would be editing
    // production with no trail: its flow is a different one.
    if (place.reviewStatus !== PlaceReviewStatus.DRAFT) {
      throw new ConflictException(
        `Só rascunhos podem ser editados aqui; este lugar está ${place.reviewStatus}`,
      );
    }

    const { translations = [], ...fields } = dto;
    const updated = await this.repository.updatePlace(
      placeId,
      fields,
      translations,
    );
    return toPlaceResponse(updated);
  }

  async rejectPlace(
    ingestionId: string,
    placeId: string,
    reason?: string,
  ): Promise<AdminPlaceResponseDto> {
    await this.findInIngestion(ingestionId, placeId);
    if (reason) {
      await this.repository.recordPlaceRejection(ingestionId, placeId, reason);
    }
    return toPlaceResponse(await this.repository.rejectPlace(placeId));
  }

  async retryPlaceTexts(ingestionId: string, placeId: string): Promise<void> {
    await this.findInIngestion(ingestionId, placeId);
    await this.dispatcher.dispatchPlaceTexts([{ placeId, ingestionId }]);
  }

  /**
   * Approving publishes every draft of the city at once.
   *
   * The 422 carrying the incomplete places exists because the alternative is
   * worse: approving silently would publish a place with no Spanish
   * description, and nobody would find out until a Spanish reader opened the
   * empty card.
   */
  async approve(id: string, adminId: string) {
    const ingestion = await this.requireReviewable(id);

    const incomplete = await this.repository.findDraftsMissingTexts(
      ingestion.id,
      REQUIRED_LANGUAGES,
    );
    if (incomplete.length) {
      throw new UnprocessableEntityException({
        message: `${incomplete.length} lugar(es) sem tradução completa`,
        places: incomplete,
      });
    }

    const { ingestion: approved, published } = await this.repository.approve(
      id,
      adminId,
    );
    return { ...toResponse(approved), published };
  }

  async reject(id: string, adminId: string, reason: string) {
    await this.requireReviewable(id);
    return toResponse(await this.repository.reject(id, adminId, reason));
  }

  /**
   * Re-queue an ingestion that failed.
   *
   * The already resolved `osmAreaId` stays where it is: reprocessing should not
   * pay again for up to four Overpass queries plus a probe.
   */
  async retry(id: string): Promise<CityIngestionResponseDto> {
    const ingestion = await this.repository.findById(id);
    if (!ingestion) throw new NotFoundException('Ingestão não encontrada');
    if (ingestion.status !== CityIngestionStatus.FAILED) {
      throw new ConflictException(
        `Só ingestão FAILED pode ser reprocessada; esta está ${ingestion.status}`,
      );
    }

    const reopened = await this.repository.reopen(id);
    await this.dispatcher.dispatchCity(id);
    return toResponse(reopened);
  }

  private async findInIngestion(ingestionId: string, placeId: string) {
    const place = await this.repository.findPlaceInIngestion(
      ingestionId,
      placeId,
    );
    if (!place) {
      throw new NotFoundException('Lugar não encontrado nesta ingestão');
    }
    return place;
  }

  private async requireReviewable(id: string): Promise<CityIngestion> {
    const ingestion = await this.repository.findById(id);
    if (!ingestion) throw new NotFoundException('Ingestão não encontrada');
    if (ingestion.status !== CityIngestionStatus.READY_FOR_REVIEW) {
      throw new ConflictException(
        `Só cidade READY_FOR_REVIEW pode ser decidida; esta está ${ingestion.status}`,
      );
    }
    return ingestion;
  }
}

/**
 * `osmAreaId` is a `BigInt` in the database and a string in JSON.
 *
 * Not fussiness: `JSON.stringify` throws on BigInt, so without this conversion
 * the route would answer 500 as soon as the first city resolved its area.
 */
function toResponse(ingestion: CityIngestion): CityIngestionResponseDto {
  return {
    id: ingestion.id,
    countryCode: ingestion.countryCode,
    city: ingestion.city,
    status: ingestion.status,
    step: ingestion.step,
    errorMessage: ingestion.errorMessage,
    osmAreaId: ingestion.osmAreaId?.toString() ?? null,
    osmMatchedName: ingestion.osmMatchedName,
    stats: ingestion.stats as CityIngestionResponseDto['stats'],
    createdAt: ingestion.createdAt,
    updatedAt: ingestion.updatedAt,
  };
}

type PlaceFromDatabase = Omit<AdminPlaceResponseDto, 'generationCostUsd'> & {
  generationCostUsd: { toNumber(): number } | null;
};

function toPlaceResponse(place: PlaceFromDatabase): AdminPlaceResponseDto {
  return {
    ...place,
    // Prisma's `Decimal` serialises as an object; the frontend expects a number.
    generationCostUsd: place.generationCostUsd?.toNumber() ?? null,
  };
}
