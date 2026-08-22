import { BadRequestException } from '@nestjs/common';
import { BusinessType } from '../../../../generated/prisma';
import type { BusinessPageType } from './dto/create-business-page.dto';

/**
 * Quais templates de página pública cada tipo de negócio pode usar.
 *
 * Existem dois vocabulários de tipo no sistema: o enum de `Business`
 * (4 valores) e a string livre de `BusinessPage` (8 slugs de template, em
 * pt). Até aqui NADA os relacionava — dava para criar um Business RESTAURANT
 * com página "academia", e o template errado renderizava o typeData errado.
 *
 * RESTAURANT e TOUR_GUIDE têm template próprio; LEGAL usa o genérico de
 * serviços; GENERAL cobre o restante do catálogo de templates.
 */
export const PAGE_TYPES_BY_BUSINESS_TYPE: Record<
  BusinessType,
  readonly BusinessPageType[]
> = {
  [BusinessType.RESTAURANT]: ['restaurante'],
  [BusinessType.TOUR_GUIDE]: ['guia-turistico'],
  [BusinessType.LEGAL]: ['servico'],
  [BusinessType.GENERAL]: [
    'servico',
    'clinica',
    'loja',
    'hotel',
    'academia',
    'salao',
  ],
};

/** 400 quando o template pedido não pertence ao tipo do negócio. */
export function assertPageTypeMatchesBusiness(
  businessType: BusinessType,
  pageType: string,
): void {
  const allowed = PAGE_TYPES_BY_BUSINESS_TYPE[businessType];
  if (!allowed.includes(pageType as BusinessPageType)) {
    throw new BadRequestException(
      `Tipo de página "${pageType}" não é válido para um negócio ${businessType}. ` +
        `Válidos: ${allowed.join(', ')}.`,
    );
  }
}
