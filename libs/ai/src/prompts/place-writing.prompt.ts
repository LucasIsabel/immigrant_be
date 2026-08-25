import {
  HUMAN_CADENCE_RULE,
  NO_AI_TELLS_RULE,
  NO_DASH_RULE,
} from './prose-rules';

/**
 * Os fatos que o modelo recebe. Não há campo livre de propósito: tudo aqui foi
 * colhido do OpenStreetMap ou da Wikipédia, e é o teto do que o texto pode
 * afirmar.
 */
export interface PlaceFacts {
  name: string;
  category: string;
  city: string;
  country: string;
  isFree: boolean;
  address?: string | null;
  website?: string | null;
  /** Primeiro parágrafo do artigo em inglês. É o que ancora o texto em fato. */
  wikipediaExtract?: string | null;
  /** Média mensal de visitas ao artigo — dá ao modelo a escala do lugar. */
  monthlyViews?: number | null;
}

/**
 * Prompt de descrição e dica de um lugar turístico.
 *
 * A regra que governa este prompt: **o modelo escreve, não descobre**. A
 * existência do lugar, o nome, a coordenada e a categoria vêm do OSM; a
 * popularidade vem da Wikipédia. O modelo recebe esses fatos e produz prosa.
 *
 * Por isso a proibição de horário e preço é explícita: são exatamente os campos
 * que um modelo preenche com plausibilidade quando não sabe, e que o leitor
 * levaria a sério ao planejar o dia. Um horário errado manda alguém para uma
 * porta fechada.
 */
export function buildPlaceWritingPrompt(facts: PlaceFacts): string {
  const fatos = [
    `- Name: ${facts.name}`,
    `- Category: ${facts.category}`,
    `- City: ${facts.city}, ${facts.country}`,
    `- Entry: ${facts.isFree ? 'free' : 'paid or unknown'}`,
    facts.address ? `- Address: ${facts.address}` : null,
    facts.website ? `- Website: ${facts.website}` : null,
    facts.monthlyViews
      ? `- Wikipedia article views: ~${facts.monthlyViews}/month`
      : null,
    facts.wikipediaExtract
      ? `- Wikipedia summary: ${facts.wikipediaExtract}`
      : null,
  ]
    .filter(Boolean)
    .join('\n');

  return `You write short entries for a city guide aimed at travellers.

## Facts (the only things you know)
${fatos}

## Task
For each of Portuguese (pt-BR), English and Spanish, write:
- **description**: one or two sentences on what the place is and why someone would go.
- **tip**: one practical line from someone who has been there, or null.

## Rules
- **Never state a fact that is not above.** No opening hours, no ticket prices, no founding dates, no architect names, no visitor numbers, unless they appear in the facts.
- If the facts do not support a genuine tip, return null. A tip you invented is worse than no tip: someone will plan a morning around it.
- Only call the place free if Entry says free.
- Write each language natively. Do not translate the Portuguese into the other two; the same facts, written by someone who speaks each language.
- Use the local name as given. Do not translate the place's name.
${NO_DASH_RULE}
${NO_AI_TELLS_RULE}
${HUMAN_CADENCE_RULE}

Return JSON with keys pt, en and es, each an object with description and tip.`;
}
