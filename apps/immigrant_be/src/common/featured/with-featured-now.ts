import { isFeaturedAt, type FeatureWindow } from './featured';

type Paged<T> = { data: T[]; total: number };

/**
 * Traduz a janela de destaque para o que a tela precisa saber.
 *
 * A tela não decide se um destaque ainda vale — o servidor decide, uma vez, e
 * diz. Mandar as três datas para o cliente seria mandar a regra junto, e duas
 * cópias de uma regra sobre "agora" divergem no primeiro fuso horário.
 *
 * As colunas cruas ficam de fora da resposta: `featureKind` diz **o quê**
 * (curadoria ou espaço pago, que a tela tem de saber para rotular com verdade)
 * e `featuredNow` diz **se**. As datas são assunto de quem administra.
 */
export function withFeaturedNow<T extends FeatureWindow & { id: string }>(
  page: Paged<T>,
  now: Date = new Date(),
): Paged<Omit<T, 'featuredFrom' | 'featuredUntil'> & { featuredNow: boolean }> {
  return {
    ...page,
    data: page.data.map((row) => {
      const rest = { ...row } as Record<string, unknown>;
      delete rest.featuredFrom;
      delete rest.featuredUntil;
      return {
        ...(rest as Omit<T, 'featuredFrom' | 'featuredUntil'>),
        featuredNow: isFeaturedAt(row, now),
      };
    }),
  };
}
