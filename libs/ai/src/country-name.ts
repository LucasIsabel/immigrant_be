/**
 * Normalização do nome de país para casar com o cadastro.
 *
 * A busca era `findUnique({ where: { name } })` — igualdade exata sobre texto
 * que vem da IA. Qualquer diferença de caixa, acento, espaço duplo ou
 * pontuação derrubava o casamento, e o resultado chegava ao usuário sem foto,
 * sem bandeira e sem `country_id` — este último fazendo o plano nascer sem
 * tipos de visto.
 *
 * Isto não resolve nome traduzido ("Nova Zelândia" não vira "New Zealand");
 * para isso existe a instrução explícita no prompt. É a segunda camada, para
 * quando o modelo obedece a instrução mas erra a grafia.
 */
export function normalizeCountryName(name: string): string {
  return (
    name
      .normalize('NFD')
      // Tira os diacríticos: "Perú" e "Peru" viram a mesma chave.
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      // Pontuação e conectores não distinguem país: "Cote d'Ivoire" e
      // "Cote dIvoire" são o mesmo lugar.
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
  );
}
