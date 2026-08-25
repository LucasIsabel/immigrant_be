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

/** Um lugar só é publicado com descrição nos três idiomas do produto. */
const IDIOMAS_OBRIGATORIOS = ['pt', 'en', 'es'];

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
    const ativa = await this.repository.findActiveForCity(
      dto.countryCode,
      dto.city,
    );
    if (ativa) {
      throw new ConflictException(
        `Já existe uma ingestão ${ativa.status} para ${dto.city} (${dto.countryCode})`,
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
    const lugar = await this.findDraft(ingestionId, placeId);

    // Editar um lugar já publicado por esta tela seria editar produção sem
    // trilha: o fluxo dele é outro.
    if (lugar.reviewStatus !== PlaceReviewStatus.DRAFT) {
      throw new ConflictException(
        `Só rascunhos podem ser editados aqui; este lugar está ${lugar.reviewStatus}`,
      );
    }

    const { translations = [], ...campos } = dto;
    const atualizado = await this.repository.updatePlace(
      placeId,
      campos,
      translations,
    );
    return toPlaceResponse(atualizado);
  }

  async rejectPlace(
    ingestionId: string,
    placeId: string,
    reason?: string,
  ): Promise<AdminPlaceResponseDto> {
    await this.findDraft(ingestionId, placeId);
    if (reason) {
      await this.repository.recordPlaceRejection(ingestionId, placeId, reason);
    }
    return toPlaceResponse(await this.repository.rejectPlace(placeId));
  }

  async retryPlaceTexts(ingestionId: string, placeId: string): Promise<void> {
    await this.findDraft(ingestionId, placeId);
    await this.dispatcher.dispatchPlaceTexts([{ placeId, ingestionId }]);
  }

  /**
   * Aprovar publica todos os rascunhos da cidade de uma vez.
   *
   * O 422 com a lista de lugares incompletos existe porque a alternativa é pior:
   * aprovar em silêncio publicaria um lugar sem descrição em espanhol, e ninguém
   * descobriria até um usuário espanhol abrir o card vazio.
   */
  async approve(id: string, adminId: string) {
    const ingestion = await this.exigirRevisavel(id);

    const incompletos = await this.repository.findDraftsMissingTexts(
      ingestion.id,
      IDIOMAS_OBRIGATORIOS,
    );
    if (incompletos.length) {
      throw new UnprocessableEntityException({
        message: `${incompletos.length} lugar(es) sem tradução completa`,
        places: incompletos,
      });
    }

    const { ingestion: aprovada, published } = await this.repository.approve(
      id,
      adminId,
    );
    return { ...toResponse(aprovada), published };
  }

  async reject(id: string, adminId: string, reason: string) {
    await this.exigirRevisavel(id);
    return toResponse(await this.repository.reject(id, adminId, reason));
  }

  /**
   * Re-enfileira uma ingestão que falhou.
   *
   * A `osmAreaId` já resolvida fica onde está: reprocessar não devia pagar de
   * novo por até quatro consultas ao Overpass mais uma sonda.
   */
  async retry(id: string): Promise<CityIngestionResponseDto> {
    const ingestion = await this.repository.findById(id);
    if (!ingestion) throw new NotFoundException('Ingestão não encontrada');
    if (ingestion.status !== CityIngestionStatus.FAILED) {
      throw new ConflictException(
        `Só ingestão FAILED pode ser reprocessada; esta está ${ingestion.status}`,
      );
    }

    const reaberta = await this.repository.reopen(id);
    await this.dispatcher.dispatchCity(id);
    return toResponse(reaberta);
  }

  private async findDraft(ingestionId: string, placeId: string) {
    const lugar = await this.repository.findPlaceInIngestion(
      ingestionId,
      placeId,
    );
    if (!lugar) {
      throw new NotFoundException('Lugar não encontrado nesta ingestão');
    }
    return lugar;
  }

  private async exigirRevisavel(id: string): Promise<CityIngestion> {
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
 * `osmAreaId` é `BigInt` no banco e vira string no JSON.
 *
 * Não é preciosismo: `JSON.stringify` lança em BigInt, então sem esta conversão
 * a rota devolveria 500 assim que a primeira cidade resolvesse a área.
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

type LugarDoBanco = Omit<AdminPlaceResponseDto, 'generationCostUsd'> & {
  generationCostUsd: { toNumber(): number } | null;
};

function toPlaceResponse(place: LugarDoBanco): AdminPlaceResponseDto {
  return {
    ...place,
    // `Decimal` do Prisma serializa como objeto; o FE espera número.
    generationCostUsd: place.generationCostUsd?.toNumber() ?? null,
  };
}
