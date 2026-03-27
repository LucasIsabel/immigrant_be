import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';
import { BusinessType } from '../../../../generated/prisma';
import { BusinessRepository } from './business.repository';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BusinessListQueryDto } from './dto/business-list-query.dto';

const restaurantTypeDataSchema = z.object({
  cuisine: z.string().optional(),
  priceRange: z.enum(['$', '$$', '$$$']).optional(),
  openingHours: z.string().optional(),
  acceptsReservations: z.boolean().optional(),
  menu: z
    .array(
      z.object({
        name: z.string(),
        price: z.number(),
        category: z.string().max(100).optional(),
        description: z.string().max(2000).optional(),
        photo: z.string().url().max(500).optional(),
        featured: z.boolean().optional(),
      }),
    )
    .optional(),
});

const legalTypeDataSchema = z.object({
  specializations: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  offersOnlineConsultation: z.boolean().optional(),
});

const tourGuideTypeDataSchema = z.object({
  languages: z.array(z.string()).optional(),
  tours: z
    .array(
      z.object({ name: z.string(), duration: z.string(), price: z.number() }),
    )
    .optional(),
  meetingPoint: z.string().optional(),
});

const generalTypeDataSchema = z.object({
  serviceCategory: z.string().optional(),
  servicesOffered: z.array(z.string()).optional(),
  availability: z.string().optional(),
});

const typeDataSchemas: Record<BusinessType, z.ZodObject<any>> = {
  [BusinessType.RESTAURANT]: restaurantTypeDataSchema,
  [BusinessType.LEGAL]: legalTypeDataSchema,
  [BusinessType.TOUR_GUIDE]: tourGuideTypeDataSchema,
  [BusinessType.GENERAL]: generalTypeDataSchema,
};

@Injectable()
export class BusinessService {
  constructor(private readonly repository: BusinessRepository) {}

  getMyBusinesses(userId: string) {
    return this.repository.findAllByUserId(userId);
  }

  create(userId: string, dto: CreateBusinessDto) {
    this.validateTypeData(dto.businessType, dto.typeData);
    return this.repository.create(userId, dto);
  }

  async update(id: string, userId: string, dto: UpdateBusinessDto) {
    const existing = await this.repository.findByIdAndUserId(id, userId);
    if (!existing) {
      throw new ForbiddenException('Acesso negado');
    }
    const typeToValidate = dto.businessType ?? existing.businessType;
    if (dto.typeData) {
      this.validateTypeData(typeToValidate, dto.typeData);
    }
    // Clear typeData when businessType changes without new typeData
    const shouldClearTypeData =
      dto.businessType &&
      dto.businessType !== existing.businessType &&
      !dto.typeData;
    const updateData = {
      ...dto,
      ...(shouldClearTypeData ? { typeData: null as unknown as object } : {}),
    };
    return this.repository.update(id, updateData);
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

  private validateTypeData(businessType: BusinessType, typeData?: object) {
    if (!typeData) return;
    const schema = typeDataSchemas[businessType];
    const result = schema.safeParse(typeData);
    if (!result.success) {
      throw new BadRequestException(result.error.flatten().fieldErrors);
    }
  }

  private async checkOwnership(id: string, userId: string): Promise<void> {
    const business = await this.repository.findByIdAndUserId(id, userId);
    if (!business) {
      throw new ForbiddenException('Acesso negado');
    }
  }
}
