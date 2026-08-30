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
 *
 * ## Por que todo campo tem teto
 *
 * `typeData` vai para uma coluna JSON. Sem limite, uma requisição forjada
 * grava uma descrição de um megabyte e a página renderiza — não é hipótese, é
 * o caminho que existia. Os tetos abaixo não são regra de produto: são o
 * ponto em que o conteúdo deixa de ser conteúdo. Onde o produto tem um número
 * de verdade, ele está anotado; onde não tem, o teto é generoso o bastante
 * para nenhum dono legítimo esbarrar nele.
 */
import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { BusinessType } from '../../../../generated/prisma';

/** Um nome, um título — a linha que cabe num card. */
const SHORT_TEXT = 200;
/** Um rótulo fechado: categoria, cidade, idioma. */
const LABEL = 100;
/** Um parágrafo: descrição de prato, de passeio, de parada. */
const PARAGRAPH = 2000;
/** URL: o suficiente para uma assinada do R2, não para um payload. */
const URL_LENGTH = 500;
/** Uma ou duas frases: onde encontrar o guia, e não muito mais. */
const SENTENCE = 500;

const restaurantTypeDataSchema = z.object({
  cuisine: z.string().max(LABEL).optional(),
  priceRange: z.enum(['$', '$$', '$$$']).optional(),
  openingHoursWeekdays: z.string().max(SHORT_TEXT).optional(),
  openingHoursWeekend: z.string().max(SHORT_TEXT).optional(),
  openingHours: z.string().max(SHORT_TEXT).optional(),
  acceptsReservations: z.boolean().optional(),
  menu: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().max(SHORT_TEXT),
        price: z.number(),
        category: z.string().max(LABEL).optional(),
        description: z.string().max(PARAGRAPH).optional(),
        photo: z.string().url().max(URL_LENGTH).optional(),
        featured: z.boolean().optional(),
      }),
    )
    // Um cardápio grande é normal; mil pratos não são um cardápio.
    .max(200)
    .optional(),
});

const legalTypeDataSchema = z.object({
  specializations: z.array(z.string().max(LABEL)).max(50).optional(),
  languages: z.array(z.string().max(LABEL)).max(30).optional(),
  offersOnlineConsultation: z.boolean().optional(),
});

const tourGuideTypeDataSchema = z.object({
  languages: z.array(z.string().max(LABEL)).max(30).optional(),
  tours: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().max(SHORT_TEXT),
        duration: z.string().max(LABEL),
        price: z.number(),
        description: z.string().max(PARAGRAPH).optional(),
        imageUrl: z.string().url().max(URL_LENGTH).optional(),
        badgeLabel: z.string().max(50).optional(),
        stopCount: z.number().int().positive().optional(),
        maxParticipants: z.number().int().positive().optional(),
      }),
    )
    .max(30)
    .optional(),
  meetingPoint: z.string().max(SENTENCE).optional(),
  profileImage: z.string().url().max(URL_LENGTH).optional(),
  countryOfOrigin: z.string().max(LABEL).optional(),
  featured: z.boolean().optional(),
  whatsapp: z.string().max(20).optional(),
  itinerary: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().max(SHORT_TEXT).optional(),
        description: z.string().max(PARAGRAPH).optional(),
        country: z.string().max(LABEL).optional(),
        state: z.string().max(LABEL).optional(),
        city: z.string().max(LABEL).optional(),
        lat: z.number().optional(),
        lng: z.number().optional(),
        photos: z
          .array(
            z.object({
              id: z.string().uuid().optional(),
              url: z.string().url().max(URL_LENGTH),
              lat: z.number().optional(),
              lng: z.number().optional(),
            }),
          )
          // O número do produto: o formulário para em 6 (`MAX_PHOTOS`).
          .max(6)
          .optional(),
      }),
    )
    .max(50)
    .optional(),
});

const generalTypeDataSchema = z.object({
  serviceCategory: z.string().max(LABEL).optional(),
  servicesOffered: z.array(z.string().max(SHORT_TEXT)).max(50).optional(),
  availability: z.string().max(SHORT_TEXT).optional(),
});

export const typeDataSchemas: Record<BusinessType, z.ZodObject<any>> = {
  [BusinessType.RESTAURANT]: restaurantTypeDataSchema,
  [BusinessType.LEGAL]: legalTypeDataSchema,
  [BusinessType.TOUR_GUIDE]: tourGuideTypeDataSchema,
  [BusinessType.GENERAL]: generalTypeDataSchema,
};

/**
 * O caminho completo de um problema, do jeito que o dono da página lê.
 *
 * `flatten().fieldErrors` guarda só o primeiro segmento do caminho: uma
 * descrição longa demais na terceira parada virava `{ itinerary: [...] }`, sem
 * dizer qual parada nem qual campo. Quem recebe isso não tem como consertar.
 */
function pathOf(issue: z.core.$ZodIssue): string {
  return issue.path
    .map((segment) =>
      typeof segment === 'number' ? `[${segment}]` : `.${String(segment)}`,
    )
    .join('')
    .replace(/^\./, '');
}

/**
 * O limite em português, porque isto vira um toast na tela do dono.
 *
 * A mensagem do Zod sai em inglês e fala de tipos ("expected string to have
 * <=2000 characters"). Quem está editando a própria página não pensa em tipos;
 * pensa em quantos caracteres cabem. Fora do caso do teto, a mensagem original
 * passa direto — inventar tradução para tudo é como uma delas fica errada.
 */
function describe(issue: z.core.$ZodIssue): string {
  if (issue.code === 'too_big') {
    const limit = issue.maximum;
    return issue.origin === 'array'
      ? `no máximo ${limit} itens`
      : `no máximo ${limit} caracteres`;
  }

  return issue.message;
}

/** 400 nomeando o campo e o limite se o `typeData` não couber no tipo. */
export function validateTypeData(
  businessType: BusinessType,
  typeData?: object | null,
) {
  if (!typeData) return;
  const schema = typeDataSchemas[businessType];
  const result = schema.safeParse(typeData);
  if (!result.success) {
    // Uma string, não um array: o `extractApiErrorMessage` do frontend lê
    // `message` e coloca direto no toast.
    const message = result.error.issues
      .map((issue) => {
        const path = pathOf(issue);
        return path ? `${path}: ${describe(issue)}` : describe(issue);
      })
      .join('; ');

    throw new BadRequestException({
      message,
      ...result.error.flatten().fieldErrors,
    });
  }
}
