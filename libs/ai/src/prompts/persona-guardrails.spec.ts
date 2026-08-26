import {
  PERSONA_GUARDRAILS,
  PERSONA_GUARDRAILS_ANALYSIS,
  PERSONA_GUARDRAILS_LIFESTYLE,
  buildPersonaPromptSection,
  guardrailsForTheme,
} from './persona-guardrails';
import { buildBlogPostPrompt } from './blog-post.prompt';
import { PoliticalTone } from '../enums/political-tone.enum';
import { PostComplexity } from '../enums/post-complexity.enum';

describe('persona guardrails', () => {
  const persona = {
    name: 'Helena Vargas',
    personaPrompt: 'You are Helena Vargas, a conservative opinion columnist.',
    styleGuidelines: 'Short paragraphs.',
  };

  it('injects the guardrails block after the persona prompt', () => {
    const section = buildPersonaPromptSection(persona);
    const personaAt = section.indexOf(persona.personaPrompt);
    const guardrailsAt = section.indexOf(PERSONA_GUARDRAILS);

    expect(personaAt).toBeGreaterThanOrEqual(0);
    expect(guardrailsAt).toBeGreaterThan(personaAt);
  });

  it('keeps the guardrails after the persona prompt in the full blog prompt', () => {
    const prompt = buildBlogPostPrompt({
      countryName: 'Canada',
      newsItems: [{ title: 'Headline', link: 'https://example.com' }],
      complexity: PostComplexity.SIMPLE,
      politicalTone: PoliticalTone.NEUTRAL,
      persona,
    });

    expect(prompt.indexOf(PERSONA_GUARDRAILS)).toBeGreaterThan(
      prompt.indexOf(persona.personaPrompt),
    );
    expect(prompt).toContain(PERSONA_GUARDRAILS);
    expect(prompt).not.toContain(
      'Keep an objective, balanced and informative tone.',
    );
    expect(prompt).toContain('Never use an em dash');
    expect(prompt).toContain('Avoid AI tells');
  });

  it('picks the guardrail block by theme', () => {
    expect(guardrailsForTheme('IMMIGRATION')).toBe(PERSONA_GUARDRAILS);
    expect(guardrailsForTheme('TOURISM')).toBe(PERSONA_GUARDRAILS_LIFESTYLE);
    expect(guardrailsForTheme('CUISINE')).toBe(PERSONA_GUARDRAILS_LIFESTYLE);
    expect(guardrailsForTheme('GEOPOLITICS')).toBe(PERSONA_GUARDRAILS_ANALYSIS);
  });

  it('falls back to the strictest block when the theme is missing', () => {
    // An unthemed caller must not end up with the block that allows politics.
    expect(guardrailsForTheme(undefined)).toBe(PERSONA_GUARDRAILS);
  });

  it('injects the lifestyle block for a travel persona', () => {
    const section = buildPersonaPromptSection({ ...persona, theme: 'TOURISM' });

    expect(section).toContain(PERSONA_GUARDRAILS_LIFESTYLE);
    expect(section).not.toContain(PERSONA_GUARDRAILS);
    expect(section.indexOf(PERSONA_GUARDRAILS_LIFESTYLE)).toBeGreaterThan(
      section.indexOf(persona.personaPrompt),
    );
  });

  it('forbids politics in the lifestyle block and keeps the honest downside', () => {
    expect(PERSONA_GUARDRAILS_LIFESTYLE).toContain(
      'Never discuss politics of any kind',
    );
    expect(PERSONA_GUARDRAILS_LIFESTYLE).toContain('prices, crowds, seasons');
    expect(PERSONA_GUARDRAILS_LIFESTYLE).toContain('Do not fabricate venues');
  });

  it('keeps the analysis block non-partisan and fact-separated', () => {
    expect(PERSONA_GUARDRAILS_ANALYSIS).toContain('Be non-partisan');
    expect(PERSONA_GUARDRAILS_ANALYSIS).toContain(
      'Separate fact from analysis',
    );
    expect(PERSONA_GUARDRAILS_ANALYSIS).toContain('at least two readings');
    expect(PERSONA_GUARDRAILS_ANALYSIS).toContain(
      'Economic claims need a number',
    );
    // The group-harm lines are the same wording as the political block.
    expect(PERSONA_GUARDRAILS_ANALYSIS).toContain(
      'No dehumanizing metaphors ("invasion", "flood",',
    );
  });
});
