import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { BusinessType } from '../../../../generated/prisma';
import { CountriesNowService } from '../countriesnow/countriesnow.service';
import { BusinessRepository } from './business.repository';
import { normalizeCity, normalizeState } from './city-key';
import { BusinessCitiesQueryDto } from './dto/business-cities-query.dto';
import { validateOpeningHours } from './opening-hours.schema';

/**
 * Visibility never travels in a draft.
 *
 * Everything else an owner edits is staged in `draftData` and waits to be
 * published. Being listed is not editorial content — it is a fact about the
 * business, changed live through `PATCH /business/:id/visibility` — and an
 * owner who takes their listing down should not have it restored by publishing
 * an unrelated edit they made earlier.
 *
 * Applied on both sides on purpose: on save so no new draft carries the field,
 * and on publish because drafts written before this rule are still stored and
 * would otherwise revert a switch the owner has since moved.
 */
function stripVisibility<T extends { isPublic?: boolean }>(
  dto: T,
): Omit<T, 'isPublic'> {
  const rest = { ...dto };
  delete rest.isPublic;
  return rest;
}
import { validateTypeData } from './type-data.schemas';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BusinessListQueryDto } from './dto/business-list-query.dto';
import { withFeaturedNow } from '../common/featured/with-featured-now';

/**
 * Whether a write moves the business to another city, state or country — only
 * then is its state asked about.
 *
 * Compared by value, not by presence: the form resends every field on each
 * save, and the owner of a business registered before states were asked for
 * must not be stopped from fixing a phone number over a location nobody moved.
 */
function movesBusiness(
  dto: UpdateBusinessDto,
  current: { city: string; state: string | null; country: string | null },
): boolean {
  return (
    (dto.city !== undefined &&
      normalizeCity(dto.city) !== normalizeCity(current.city)) ||
    (dto.state !== undefined &&
      normalizeState(dto.state) !== normalizeState(current.state)) ||
    (dto.country !== undefined &&
      dto.country.trim().toLowerCase() !==
        (current.country ?? '').trim().toLowerCase())
  );
}

@Injectable()
export class BusinessService {
  private readonly logger = new Logger(BusinessService.name);

  constructor(
    private readonly repository: BusinessRepository,
    private readonly countriesNow: CountriesNowService,
  ) {}

  getMyBusinesses(userId: string) {
    return this.repository.findAllByUserId(userId);
  }

  /**
   * The content checks stay synchronous and run first: they throw before any
   * promise exists, and they cost nothing. Only the state check has to ask a
   * third party, so it is the one that waits.
   */
  create(userId: string, dto: CreateBusinessDto) {
    this.validateTypeData(dto.businessType, dto.typeData);
    validateOpeningHours(dto.openingHours);
    return this.assertStateWhereRequired(dto.country, dto.state).then(() =>
      this.repository.create(userId, {
        ...dto,
        typeData: this.assignItemIds(dto.businessType, dto.typeData),
      }),
    );
  }

  /**
   * Saves changes as `draftData` only; live fields stay unchanged until `publishDraft`.
   *
   * `isPublic` is the exception and never enters the draft — see
   * {@link stripVisibility}.
   */
  async update(id: string, userId: string, dto: UpdateBusinessDto) {
    const existing = await this.repository.findByIdAndUserId(id, userId);
    if (!existing) {
      throw new ForbiddenException('Acesso negado');
    }
    const typeToValidate = dto.businessType ?? existing.businessType;
    if (dto.typeData) {
      this.validateTypeData(typeToValidate, dto.typeData);
    }
    // Validado ao salvar o rascunho e de novo ao publicar: o rascunho é JSON
    // cru na coluna, então nada garante que o que sai é o que entrou.
    validateOpeningHours(dto.openingHours);
    if (movesBusiness(dto, existing)) {
      await this.assertStateWhereRequired(
        dto.country ?? existing.country,
        dto.state !== undefined ? dto.state : existing.state,
      );
    }
    const draft = stripVisibility({
      ...dto,
      ...(dto.typeData
        ? { typeData: this.assignItemIds(typeToValidate, dto.typeData) }
        : {}),
    });
    return this.repository.saveDraft(id, draft as object);
  }

  async publishDraft(id: string, userId: string) {
    const existing = await this.repository.findByIdAndUserId(id, userId);
    if (!existing) {
      throw new ForbiddenException('Acesso negado');
    }
    if (!existing.draftData || typeof existing.draftData !== 'object') {
      throw new BadRequestException('Nenhum rascunho para publicar');
    }
    // Stripped on the way out as well as on the way in: drafts saved before
    // visibility left this flow are still in the database, and publishing one
    // would revert a switch the owner has since moved.
    const dto = stripVisibility(existing.draftData as UpdateBusinessDto);
    const typeToValidate = dto.businessType ?? existing.businessType;
    if (dto.typeData) {
      this.validateTypeData(typeToValidate, dto.typeData);
    }
    validateOpeningHours(dto.openingHours);
    // Asked again on the way out, like the week: drafts saved before the rule
    // are still stored, and publishing one is what moves the live business.
    if (movesBusiness(dto, existing)) {
      await this.assertStateWhereRequired(
        dto.country ?? existing.country,
        dto.state !== undefined ? dto.state : existing.state,
      );
    }
    const shouldClearTypeData =
      Boolean(dto.businessType) &&
      dto.businessType !== existing.businessType &&
      !dto.typeData;
    const updateData = {
      ...dto,
      ...(dto.typeData
        ? { typeData: this.assignItemIds(typeToValidate, dto.typeData) }
        : {}),
      ...(shouldClearTypeData ? { typeData: null as unknown as object } : {}),
    };
    return this.repository.applyDraftAndClearDraft(id, updateData);
  }

  async discardDraft(id: string, userId: string) {
    const existing = await this.repository.findByIdAndUserId(id, userId);
    if (!existing) {
      throw new ForbiddenException('Acesso negado');
    }
    if (existing.draftData == null) {
      throw new BadRequestException('Nenhum rascunho para descartar');
    }
    return this.repository.clearDraft(id);
  }

  async delete(id: string, userId: string) {
    await this.checkOwnership(id, userId);
    return this.repository.delete(id);
  }

  async toggleVisibility(id: string, userId: string, isPublic: boolean) {
    await this.checkOwnership(id, userId);
    return this.repository.toggleVisibility(id, isPublic);
  }

  async getPublicBusinesses(query: BusinessListQueryDto) {
    return withFeaturedNow(await this.repository.findPublic(query));
  }

  getPublicCities(query: BusinessCitiesQueryDto) {
    return this.repository.findPublicCities({ country: query.country });
  }

  async getPublicBusinessById(id: string, viewerId?: string) {
    const business = await this.repository.findVisibleById(id);
    if (!business) {
      throw new NotFoundException('Negócio não encontrado');
    }
    /*
     * The counts are fetched only after the business is known to be visible:
     * asking for them up front would let a private id be probed for a review
     * count, and would pay for the aggregates on every 404.
     *
     * Whether *this* reader likes it is a separate question, and only worth
     * asking when there is a reader to ask about. Anonymous is `false`, not
     * unknown — the heart has to be drawn either way.
     */
    const [rating, likesCount, likedByMe] = await Promise.all([
      this.repository.findRatingSummary(id),
      this.repository.countLikes(id),
      viewerId
        ? this.repository.isLikedBy(id, viewerId)
        : Promise.resolve(false),
    ]);

    return { ...business, ...rating, likesCount, likedByMe };
  }

  /**
   * Liking is not rating. The stars keep coming from `TourGuideReview`; this
   * is the lighter gesture, and it is the only one somebody can make without
   * having anything to say.
   *
   * Only a business a reader can actually see: liking something private would
   * be a way to confirm that a private id exists.
   */
  async setLike(
    id: string,
    userId: string,
    liked: boolean,
  ): Promise<{ liked: boolean; likesCount: number }> {
    const business = await this.repository.findVisibleById(id);
    if (!business) {
      throw new NotFoundException('Negócio não encontrado');
    }

    if (liked) {
      await this.repository.likeBusiness(id, userId);
    } else {
      await this.repository.unlikeBusiness(id, userId);
    }

    return { liked, likesCount: await this.repository.countLikes(id) };
  }

  /**
   * Campos de `typeData` cujos itens carregam identidade própria.
   *
   * São arrays dentro de um JSON, não tabelas — então o id não vem do banco e
   * precisa ser atribuído aqui, na escrita.
   */
  private static readonly ITEM_COLLECTIONS: Partial<
    Record<BusinessType, string[]>
  > = {
    [BusinessType.RESTAURANT]: ['menu'],
    [BusinessType.TOUR_GUIDE]: ['tours', 'itinerary'],
  };

  /**
   * Preenche `id` nos itens de `typeData` que ainda não têm.
   *
   * Idempotente de propósito: item que já tem id mantém o mesmo. Se
   * regerássemos a cada gravação, editar o preço de um prato trocaria a
   * identidade de todos os itens da lista, que é justamente o que o id existe
   * para evitar.
   */
  private assignItemIds(
    businessType: BusinessType,
    typeData?: object,
  ): object | undefined {
    if (!typeData) return typeData;

    const collections = BusinessService.ITEM_COLLECTIONS[businessType];
    if (!collections) return typeData;

    const data = { ...(typeData as Record<string, unknown>) };

    for (const field of collections) {
      const items = data[field];
      if (!Array.isArray(items)) continue;

      data[field] = items.map((item: unknown) => {
        if (typeof item !== 'object' || item === null) return item;

        const withId = { ...(item as Record<string, unknown>) };
        if (typeof withId.id !== 'string') {
          withId.id = randomUUID();
        }

        // As fotos de uma parada de itinerário são a única coleção aninhada.
        if (Array.isArray(withId.photos)) {
          withId.photos = withId.photos.map((photo: unknown) => {
            if (typeof photo !== 'object' || photo === null) return photo;
            const p = { ...(photo as Record<string, unknown>) };
            if (typeof p.id !== 'string') p.id = randomUUID();
            return p;
          });
        }

        return withId;
      });
    }

    return data;
  }

  /**
   * A business in a country that has states has to name its state.
   *
   * The name of a city does not identify it: Campo Grande is in Mato Grosso do
   * Sul and in Alagoas, and a business filed under the name alone answers for
   * both — or, once somebody picks one of the two, for neither.
   *
   * Whether the country has states is CountriesNow's answer, cached for a day,
   * and the check fails **open**. When the catalogue cannot be reached the
   * write goes through with a warning: refusing to list a restaurant because a
   * third party is down would turn their outage into ours, and a business with
   * no state is still found by its city, exactly as every business was before.
   *
   * Only asked when the state is missing, so a complete form never waits on it.
   */
  private async assertStateWhereRequired(
    country: string | null | undefined,
    state: string | null | undefined,
  ): Promise<void> {
    if (!country?.trim() || state?.trim()) return;

    let states: unknown[];
    try {
      states = await this.countriesNow.getStates(country);
    } catch (error) {
      this.logger.warn(
        `Could not ask CountriesNow whether ${country} has states; accepting the business without one: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      return;
    }

    if (states.length > 0) {
      throw new BadRequestException(
        'Informe o estado do negócio: neste país há cidades com o mesmo nome em estados diferentes',
      );
    }
  }

  private validateTypeData(businessType: BusinessType, typeData?: object) {
    // Delegação: o contrato mora em type-data.schemas.ts, compartilhado com o
    // business-pages (PUT /business-pages/:id valida contra o mesmo schema).
    validateTypeData(businessType, typeData);
  }

  private async checkOwnership(id: string, userId: string): Promise<void> {
    const business = await this.repository.findByIdAndUserId(id, userId);
    if (!business) {
      throw new ForbiddenException('Acesso negado');
    }
  }
}
