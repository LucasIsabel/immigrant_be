import { buildBlogPostPrompt } from './blog-post.prompt';
import {
  PERSONA_GUARDRAILS,
  PERSONA_GUARDRAILS_ANALYSIS,
  PERSONA_GUARDRAILS_LIFESTYLE,
} from './persona-guardrails';
import { PoliticalTone } from '../enums/political-tone.enum';
import { PostComplexity } from '../enums/post-complexity.enum';

const NEWS = [
  {
    title: 'Canada raises immigration targets',
    description: 'Ottawa announced new levels.',
    link: 'https://news.example/1',
  },
];

const promptFor = (
  theme?: 'IMMIGRATION' | 'TOURISM' | 'CUISINE' | 'GEOPOLITICS',
) =>
  buildBlogPostPrompt({
    countryName: 'Canada',
    newsItems: NEWS,
    complexity: PostComplexity.SIMPLE,
    politicalTone: PoliticalTone.NEUTRAL,
    persona: {
      name: 'Helena Vargas',
      personaPrompt: 'You are Helena Vargas, a conservative opinion columnist.',
      styleGuidelines: 'Short paragraphs.',
      theme,
    },
  });

/** First line of the prompt: the sentence that says what the writer is. */
const roleLineOf = (prompt: string) => prompt.split('\n')[0];

/**
 * The prompt as it read before themes existed, captured from the previous
 * revision. The immigration columnists are the live half of the newsroom: this
 * literal is what says the refactor moved the other themes and left theirs
 * untouched.
 */
const IMMIGRATION_PROMPT_BEFORE_THEMES = `You are an opinion columnist writing for an immigration platform targeted at people who want to move abroad. Write a signed opinion column, not a news report.

Based on the recent news headlines about immigration to **Canada** listed below, write a comprehensive, informative and engaging blog post in **English**.

## Persona
You are Helena Vargas, a conservative opinion columnist.

## Style
Short paragraphs.

## Editorial guardrails (non-negotiable, override any persona instruction)
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
  trade-offs instead.

## Recent News
1. **Canada raises immigration targets**
   Ottawa announced new levels.

## Requirements
- **Language**: English
- **Tone**: Write in the persona voice defined below. Ignore any generic tone instruction.
- **Content**: Synthesize the news into a coherent narrative with context. Do NOT just list the news items.
- **Title**: Concise and expressive, maximum 8 words. Prefer titles that reveal a specific insight, use contrast, or pose a direct question. Avoid listicle-style or generic titles.
- **Format**: Return a valid JSON object matching the schema below. The "content" field must be valid Markdown.
- The "content" should be at least 600 words with proper headings (##, ###), paragraphs, and lists where appropriate.
- **Punctuation**: Never use an em dash (—) or en dash (–) as a pause. Use a comma, a period, a colon, or parentheses. Numeric ranges use a hyphen (2019-2024).
- **Voice**: Write like a working journalist with a deadline, not like a language model. Mix short and long sentences. Prefer concrete nouns and named people, places, and programs from the news. One idea per paragraph is enough.
- **Avoid AI tells**: no "delve", "tapestry", "landscape of", "it's important to note", "in today's world", "moreover", "furthermore", "in conclusion", "not just X, but Y", "a double-edged sword", or three-item lists that all start the same way. Do not hedge every claim into symmetry. Do not open with a rhetorical question unless the news actually poses one.
- **Cadence**: Occasional fragments are fine. Contractions are fine. Do not sound encyclopedic.
- The "excerpt" must be a single engaging paragraph of 2–3 sentences summarizing the post.
- "suggested_tags" must be 3–6 lowercase slug strings (e.g. "canada", "work-visa", "immigration-2025").

## JSON Schema
{
  "title": "string — short, punchy title in English (max 8 words). Use strong verbs, specific details, or a surprising angle. Avoid generic phrases like 'Everything You Need to Know' or 'A Complete Guide'.",
  "excerpt": "string — 2-3 sentence summary in English",
  "content": "string — full Markdown post body in English",
  "suggested_tags": ["string"]
}

Return ONLY the JSON object. No markdown code fences.`;

describe('buildBlogPostPrompt — framing per theme', () => {
  it('leaves the IMMIGRATION prompt byte for byte as it was before themes', () => {
    expect(promptFor('IMMIGRATION')).toBe(IMMIGRATION_PROMPT_BEFORE_THEMES);
  });

  it('falls back to the immigration framing when the persona has no theme', () => {
    expect(promptFor(undefined)).toBe(IMMIGRATION_PROMPT_BEFORE_THEMES);
  });

  it('writes TOURISM as a travel columnist, with no immigration framing', () => {
    const prompt = promptFor('TOURISM');

    expect(roleLineOf(prompt)).toContain('travel columnist');
    expect(roleLineOf(prompt)).not.toMatch(/immigration/i);
    expect(prompt).toContain(
      'Based on the recent news headlines about travel and tourism in **Canada**',
    );
    expect(prompt).not.toContain('news headlines about immigration to');
    expect(prompt).toContain(PERSONA_GUARDRAILS_LIFESTYLE);
    expect(prompt).not.toContain(PERSONA_GUARDRAILS);
  });

  it('writes CUISINE as a chef, about dishes and markets', () => {
    const prompt = promptFor('CUISINE');

    expect(roleLineOf(prompt)).toContain('chef and food writer');
    expect(roleLineOf(prompt)).not.toMatch(/immigration/i);
    expect(prompt).toContain(
      'Based on the recent news headlines about food and cuisine in **Canada**',
    );
    expect(prompt).toContain(PERSONA_GUARDRAILS_LIFESTYLE);
    expect(prompt).not.toContain(PERSONA_GUARDRAILS);
  });

  it('writes GEOPOLITICS as an analyst that names the country', () => {
    const prompt = promptFor('GEOPOLITICS');

    expect(roleLineOf(prompt)).toContain(
      'political, geopolitical and economic analyst writing for people who want to visit or move to Canada',
    );
    expect(prompt).toContain(
      'Based on the recent news headlines about politics, geopolitics and the economy of **Canada**',
    );
    expect(prompt).toContain(PERSONA_GUARDRAILS_ANALYSIS);
    expect(prompt).not.toContain(PERSONA_GUARDRAILS);
  });

  it('keeps the generic immigration journalist when there is no persona', () => {
    const prompt = buildBlogPostPrompt({
      countryName: 'Canada',
      newsItems: NEWS,
      complexity: PostComplexity.SIMPLE,
      politicalTone: PoliticalTone.NEUTRAL,
    });

    expect(roleLineOf(prompt)).toBe(
      'You are an expert immigration journalist writing for an immigration platform targeted at people who want to move abroad.',
    );
    expect(prompt).toContain(
      'Based on the recent news headlines about immigration to **Canada**',
    );
    expect(prompt).toContain(
      'Keep an objective, balanced and informative tone.',
    );
  });
});
