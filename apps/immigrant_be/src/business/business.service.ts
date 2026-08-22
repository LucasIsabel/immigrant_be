import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { BusinessType } from '../../../../generated/prisma';
import { BusinessRepository } from './business.repository';
import { validateTypeData } from './type-data.schemas';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BusinessListQueryDto } from './dto/business-list-query.dto';

@Injectable()
export class BusinessService {
  constructor(private readonly repository: BusinessRepository) {}

  getMyBusinesses(userId: string) {
    return this.repository.findAllByUserId(userId);
  }

  create(userId: string, dto: CreateBusinessDto) {
    this.validateTypeData(dto.businessType, dto.typeData);
    return this.repository.create(userId, {
      ...dto,
      typeData: this.assignItemIds(dto.businessType, dto.typeData),
    });
  }

  /**
   * Saves changes as `draftData` only; live fields stay unchanged until `publishDraft`.
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
    const draft = {
      ...dto,
      ...(dto.typeData
        ? { typeData: this.assignItemIds(typeToValidate, dto.typeData) }
        : {}),
    };
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
    const dto = existing.draftData as UpdateBusinessDto;
    const typeToValidate = dto.businessType ?? existing.businessType;
    if (dto.typeData) {
      this.validateTypeData(typeToValidate, dto.typeData);
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

  getPublicBusinesses(query: BusinessListQueryDto) {
    return this.repository.findPublic(query);
  }

  async getPublicBusinessById(id: string) {
    const business = await this.repository.findPublicById(id);
    if (!business) {
      throw new NotFoundException('Negócio não encontrado');
    }
    return business;
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
