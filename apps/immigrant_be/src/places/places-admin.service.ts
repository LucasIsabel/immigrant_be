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
  type IngestionStatsDto,
  type PlaceTextsStatus,
  type ReviewPlaceResponseDto,
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
      dto.state,
    );
    if (active) {
      const place = dto.state ? `${dto.city}, ${dto.state}` : dto.city;
      throw new ConflictException(
        `Já existe uma ingestão ${active.status} para ${place} (${dto.countryCode})`,
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
      // The ISO2 is stored upper-cased; a caller can send it in any case, and
      // a `pt` that fails to match `PT` would be an empty list with nothing to
      // explain it. Same treatment the catalogue already applies.
      countryCode: query.countryCode?.toUpperCase(),
      city: query.city,
      state: query.state,
      page,
      limit,
    });
    return { data: data.map(toResponse), total, page, limit };
  }

  async getIngestion(id: string) {
    const ingestion = await this.repository.findDetail(id);
    if (!ingestion) throw new NotFoundException('Ingestão não encontrada');

    /*
     * The worker has been recording abandoned texts in `stats.textFailures`
     * since the pipeline was written, and nothing ever read them. That is the
     * whole of this bug: a city could reach "ready for review" holding a place
     * with no description, and the screen had no way to say so.
     */
    const failures = new Set(
      (ingestion.stats as IngestionStatsDto | null)?.textFailures ?? [],
    );

    return {
      ...toResponse(ingestion),
      places: ingestion.places.map(
        (place): ReviewPlaceResponseDto => ({
          ...toPlaceResponse(place),
          textsStatus: textsStatusOf(place, failures),
        }),
      ),
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

    /*
     * A language this place has no row for can only be written with a
     * description: the column is not nullable, and an empty one would put a
     * blank place in the catalogue while looking answered.
     *
     * Said here rather than left to the database, so the admin reads which
     * language is missing instead of the `Internal server error` that a raw
     * Prisma failure becomes.
     */
    const known = new Set(place.translations.map((t) => t.language));
    const uncreatable = translations
      .filter((t) => !known.has(t.language) && t.description === undefined)
      .map((t) => t.language);
    if (uncreatable.length > 0) {
      throw new UnprocessableEntityException(
        `Este lugar ainda não tem texto em ${uncreatable.join(', ')}; ` +
          'envie a descrição para criar a tradução',
      );
    }

    const updated = await this.repository.updatePlace(
      placeId,
      fields,
      translations,
    );

    // Typing the description by hand is as good a remedy as a retry, so the
    // record of the failure has to go with it. Left behind, the ingestion list
    // would keep counting a place that is finished.
    if (hasEveryLanguage(updated.translations)) {
      await this.repository.clearTextFailure(ingestionId, placeId);
    }

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

    // Cleared before the job is queued, not after: between the two the place
    // reads as `PENDING`, which is true. The other order would show a failure
    // for a job already running, and the worker records a fresh failure of its
    // own if this attempt gives up too.
    await this.repository.clearTextFailure(ingestionId, placeId);
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
   * Errors are cleared, everything else stays: reprocessing must not lose what
   * the previous attempt learned.
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
    state: ingestion.state,
    cityWikidataId: ingestion.cityWikidataId,
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

function hasEveryLanguage(translations: { language: string }[]): boolean {
  const present = new Set(translations.map((t) => t.language));
  return REQUIRED_LANGUAGES.every((language) => present.has(language));
}

/**
 * Where a place's text stands, by the same rule `approve` enforces.
 *
 * Derived from the translation rows and not from `textFailures` alone: the
 * failure list says the job gave up, the rows say whether anything has landed
 * since — by a retry, or by an admin typing it in.
 */
function textsStatusOf(
  place: PlaceFromDatabase,
  failures: Set<string>,
): PlaceTextsStatus {
  if (hasEveryLanguage(place.translations)) return 'WRITTEN';
  if (failures.has(place.id)) return 'FAILED';
  return place.translations.length === 0 ? 'PENDING' : 'INCOMPLETE';
}

function toPlaceResponse(place: PlaceFromDatabase): AdminPlaceResponseDto {
  return {
    ...place,
    // Prisma's `Decimal` serialises as an object; the frontend expects a number.
    generationCostUsd: place.generationCostUsd?.toNumber() ?? null,
  };
}
