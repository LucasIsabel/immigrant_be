import {
  PERSONA_GUARDRAILS,
  buildPersonaPromptSection,
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
});
