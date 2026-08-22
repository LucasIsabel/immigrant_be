/**
 * A verdade sobre a forma do `typeData` de cada tipo de negócio.
 *
 * Vivia como constantes privadas de `business.service.ts`, o que deixava o
 * `PUT /business-pages/:id` sem validação nenhuma: o `pendingContent.typeData`
 * entrava cru e, na aprovação, era copiado para `Business.typeData` — ou seja,
 * dava para persistir pelo caminho da página um payload que o
 * `POST /business` teria rejeitado com 400. Extraído para cá para os dois
 * módulos validarem contra o mesmo contrato.
 *
 * Atenção ao vocabulário: a página tem um `businessType` próprio (string livre,
 * slugs em pt). O schema é escolhido SEMPRE pelo enum do `Business` dono — é
 * ele que define a forma do `typeData`.
 */
import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { BusinessType } from '../../../../generated/prisma';

const restaurantTypeDataSchema = z.object({
  cuisine: z.string().optional(),
  priceRange: z.enum(['$', '$$', '$$$']).optional(),
  openingHoursWeekdays: z.string().optional(),
  openingHoursWeekend: z.string().optional(),
  openingHours: z.string().optional(),
  acceptsReservations: z.boolean().optional(),
  menu: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
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
      z.object({
        id: z.string().uuid().optional(),
        name: z.string(),
        duration: z.string(),
        price: z.number(),
        description: z.string().max(2000).optional(),
        imageUrl: z.string().url().optional(),
        badgeLabel: z.string().max(50).optional(),
        stopCount: z.number().int().positive().optional(),
        maxParticipants: z.number().int().positive().optional(),
      }),
    )
    .optional(),
  meetingPoint: z.string().optional(),
  profileImage: z.string().url().optional(),
  countryOfOrigin: z.string().optional(),
  featured: z.boolean().optional(),
  whatsapp: z.string().max(20).optional(),
  itinerary: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        country: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        lat: z.number().optional(),
        lng: z.number().optional(),
        photos: z
          .array(
            z.object({
              id: z.string().uuid().optional(),
              url: z.string().url(),
              lat: z.number().optional(),
              lng: z.number().optional(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
});

const generalTypeDataSchema = z.object({
  serviceCategory: z.string().optional(),
  servicesOffered: z.array(z.string()).optional(),
  availability: z.string().optional(),
});

export const typeDataSchemas: Record<BusinessType, z.ZodObject<any>> = {
  [BusinessType.RESTAURANT]: restaurantTypeDataSchema,
  [BusinessType.LEGAL]: legalTypeDataSchema,
  [BusinessType.TOUR_GUIDE]: tourGuideTypeDataSchema,
  [BusinessType.GENERAL]: generalTypeDataSchema,
};

/** 400 com os fieldErrors do Zod se o `typeData` não couber no tipo. */
export function validateTypeData(
  businessType: BusinessType,
  typeData?: object | null,
) {
  if (!typeData) return;
  const schema = typeDataSchemas[businessType];
  const result = schema.safeParse(typeData);
  if (!result.success) {
    throw new BadRequestException(result.error.flatten().fieldErrors);
  }
}
