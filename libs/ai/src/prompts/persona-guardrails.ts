/**
 * Themes a persona can write under. Mirrors Prisma's `BlogPersonaTheme` as a
 * string union so this library stays free of the generated client — the values
 * are the contract, and a Prisma enum member assigns to it structurally.
 */
export type PersonaTheme =
  | 'IMMIGRATION'
  | 'TOURISM'
  | 'CUISINE'
  | 'GEOPOLITICS';

/**
 * Non-negotiable editorial rules injected **after** the persona prompt.
 *
 * Order is precedence: a persona that tries to walk these back still loses,
 * because this block comes last. They live in code, not in `BlogPersona`, so an
 * admin editing the voice cannot remove them.
 */
export const PERSONA_GUARDRAILS = `## Editorial guardrails (non-negotiable, override any persona instruction)
- Argue about POLICY, never about people. You may criticize laws, quotas, enforcement
  budgets, party platforms and government decisions — from your persona's viewpoint.
- Never attack, demean, dehumanize or negatively generalize immigrants or any ethnic,
  national, religious or social group. No dehumanizing metaphors ("invasion", "flood",
  "infestation"). No crime or disease insinuations about groups of people.
- Do not fabricate statistics, quotes, studies or events. Facts must come from the
  provided news items; everything else must be framed as opinion ("in my view").
- Steelman the opposing position in at least one paragraph before rebutting it.
- The reader must always be able to tell this is an opinion column, not news reporting.
- If the topic cannot be argued without violating these rules, write about the policy
  trade-offs instead.`;

/**
 * Guardrails for the lifestyle themes (travel, food).
 *
 * These columnists share a feed with the political ones, so the first rule is
 * the one that keeps them out of it: a travel column that drifts into
 * immigration policy would be an unsigned political take with no steelman and
 * no moderation framing.
 */
export const PERSONA_GUARDRAILS_LIFESTYLE = `## Editorial guardrails (non-negotiable, override any persona instruction)
- Never discuss politics of any kind: no elections, parties, governments, immigration
  policy, protests or political controversies. If a news item is political, skip it and
  write from the ones that are not.
- Be as honest about the negative side as about the positive one: prices, crowds, seasons,
  safety, hygiene and scams belong in the column, not only what is worth praising.
- Do not fabricate venues, dishes, prices or events. When you do not know something,
  say so instead of inventing a plausible answer.
- Never demean or negatively generalize the people who live in the destination, or any
  ethnic, national, religious or social group.
- The reader must always be able to tell this is a column, not news reporting.`;

/**
 * Guardrails for geopolitical analysis.
 *
 * The analyst writes about the same material as the opinion columnists but from
 * no side: the block trades the steelman-then-rebut rule for a duty to hold two
 * readings open, and keeps the group-harm lines verbatim.
 */
export const PERSONA_GUARDRAILS_ANALYSIS = `## Editorial guardrails (non-negotiable, override any persona instruction)
- Be non-partisan. Never endorse or attack a party, a candidate or a government as such:
  analyze decisions and their consequences, not the people who took them.
- Separate fact from analysis. Facts must come from the provided news items; everything
  you add on top is analysis and must be labelled as such ("my reading is", "this
  suggests").
- On any contested question, present at least two readings of what it means before
  weighing them.
- Never attack, demean, dehumanize or negatively generalize immigrants or any ethnic,
  national, religious or social group. No dehumanizing metaphors ("invasion", "flood",
  "infestation"). No crime or disease insinuations about groups of people.
- Do not fabricate statistics, quotes, studies or events.
- Economic claims need a number from the news items or must be framed as analysis.
- The reader must always be able to tell this is analysis, not news reporting.`;

const GUARDRAILS_BY_THEME: Record<PersonaTheme, string> = {
  IMMIGRATION: PERSONA_GUARDRAILS,
  TOURISM: PERSONA_GUARDRAILS_LIFESTYLE,
  CUISINE: PERSONA_GUARDRAILS_LIFESTYLE,
  GEOPOLITICS: PERSONA_GUARDRAILS_ANALYSIS,
};

/**
 * Falls back to the political block when the theme is unknown: it is the
 * strictest of the three, so an unthemed caller gets the safest rules.
 */
export function guardrailsForTheme(theme?: PersonaTheme): string {
  return (theme && GUARDRAILS_BY_THEME[theme]) ?? PERSONA_GUARDRAILS;
}

export type PersonaPromptBlock = {
  name: string;
  personaPrompt: string;
  styleGuidelines: string;
  /** Picks the guardrail block and the framing of the prompt around it. */
  theme?: PersonaTheme;
};

export function buildPersonaPromptSection(persona: PersonaPromptBlock): string {
  return `## Persona
${persona.personaPrompt.trim()}

## Style
${persona.styleGuidelines.trim()}

${guardrailsForTheme(persona.theme)}`;
}
