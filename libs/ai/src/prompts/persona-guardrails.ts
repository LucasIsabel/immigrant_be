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

export type PersonaPromptBlock = {
  name: string;
  personaPrompt: string;
  styleGuidelines: string;
};

export function buildPersonaPromptSection(persona: PersonaPromptBlock): string {
  return `## Persona
${persona.personaPrompt.trim()}

## Style
${persona.styleGuidelines.trim()}

${PERSONA_GUARDRAILS}`;
}
