import { FeatureKind } from '../../../../../generated/prisma';

/** As três colunas que decidem se algo está em destaque. */
export interface FeatureWindow {
  featureKind: FeatureKind | null;
  featuredFrom: Date | null;
  featuredUntil: Date | null;
}

/**
 * Se isto está em destaque **agora**.
 *
 * Estar marcado não chega: uma promoção sem fim torna-se permanente por
 * esquecimento, e uma marcada para a semana que vem não é destaque hoje. As
 * datas são opcionais dos dois lados — ausentes significam "desde sempre" e
 * "até alguém tirar", que é o caso comum de uma escolha editorial.
 */
export function isFeaturedAt(
  item: FeatureWindow,
  now: Date = new Date(),
): boolean {
  if (!item.featureKind) {
    return false;
  }
  if (item.featuredFrom && item.featuredFrom > now) {
    return false;
  }
  if (item.featuredUntil && item.featuredUntil < now) {
    return false;
  }
  return true;
}

/**
 * A mesma regra como condição de consulta.
 *
 * Existe ao lado da função acima, e não em vez dela, porque a base decide quem
 * volta e o código decide o que dizer sobre cada um. Se as duas divergirem, a
 * lista e o rótulo discordam sobre a mesma linha — e é o tipo de divergência
 * que só aparece em produção.
 */
export function featuredWhere(now: Date = new Date()) {
  return {
    featureKind: { not: null },
    AND: [
      { OR: [{ featuredFrom: null }, { featuredFrom: { lte: now } }] },
      { OR: [{ featuredUntil: null }, { featuredUntil: { gte: now } }] },
    ],
  };
}
