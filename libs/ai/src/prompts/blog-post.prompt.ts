import { PostComplexity } from '../enums/post-complexity.enum';
import { PoliticalTone } from '../enums/political-tone.enum';
import {
  type PersonaPromptBlock,
  buildPersonaPromptSection,
} from './persona-guardrails';

export function buildBlogCoverImagePrompt(
  title: string,
  countryName: string,
): string {
  return `Generate a professional editorial blog cover image for an article titled "${title}" about immigration to ${countryName}.

Style: Wide landscape format (16:9), photorealistic documentary style, natural cinematic lighting. Suitable for a professional blog header.

Subject: Show the destination itself — iconic landmarks, architecture, cityscape, or natural landscape of ${countryName}. No human figures. Focus on the place: streets, buildings, flags, skies, public spaces. Capture a real sense of what it feels like to be there.

Text: Absolutely no readable text — no titles, captions, watermarks, logos with words, street signs, storefront lettering, billboards, or flags with written slogans. Empty or abstract signage only if unavoidable.

Quality: Raw, authentic, like travel photography or documentary filmmaking. Slightly imperfect — natural grain, real shadows, uneven lighting. Avoid overly symmetrical compositions, oversaturated colors, or the clean-plastic look of AI-generated imagery.`;
}

export interface RssNewsItem {
  title: string;
  description?: string;
  link: string;
  pubDate?: string;
}

export interface BlogPostPromptOptions {
  countryName: string;
  newsItems: RssNewsItem[];
  complexity?: PostComplexity;
  politicalTone?: PoliticalTone;
  customInstructions?: string;
  authorName?: string;
  /** When set, replaces the legacy PoliticalTone instruction. */
  persona?: PersonaPromptBlock;
}

const TONE_INSTRUCTIONS: Record<PoliticalTone, string> = {
  [PoliticalTone.NEUTRAL]: 'Keep an objective, balanced and informative tone.',
  [PoliticalTone.PRO_IMMIGRATION]:
    'Adopt a pro-immigration perspective, emphasizing opportunities, rights and benefits for immigrants.',
  [PoliticalTone.CONSERVATIVE]:
    'Adopt a cautious tone that emphasizes legal processes, challenges and regulatory procedures.',
  [PoliticalTone.PROGRESSIVE]:
    'Adopt a progressive perspective focused on social justice, inclusion and immigrant rights.',
};

const VISUAL_CALLOUT_INSTRUCTION = `Include visual callouts throughout the text using this format:
  > 📊 **[Visual sugerido]:** [Description]
- Prefer photographic scenes: places, people, objects, workplaces, airports, city streets — documentary or photojournalism style.
- For images with people: describe diverse real humans in candid, authentic moments. Include natural poses, realistic skin tones, everyday settings. Avoid stiff poses, cartoon style, or AI-looking artificial appearance.
- Do NOT request charts, infographics, dashboards, diagrams with axes/labels, screenshots of UI, or any image that needs readable text. Put numbers and comparisons in Markdown tables in the article instead.
- Descriptions must be concrete and visual (what the scene shows). They will be used to generate images shared across all locales, so they must work without any lettering.`;

const HUMAN_WRITING_INSTRUCTION = `- **Punctuation**: Never use an em dash (—) or en dash (–) as a pause. Use a comma, a period, a colon, or parentheses. Numeric ranges use a hyphen (2019-2024).
- **Voice**: Write like a working journalist with a deadline, not like a language model. Mix short and long sentences. Prefer concrete nouns and named people, places, and programs from the news. One idea per paragraph is enough.
- **Avoid AI tells**: no "delve", "tapestry", "landscape of", "it's important to note", "in today's world", "moreover", "furthermore", "in conclusion", "not just X, but Y", "a double-edged sword", or three-item lists that all start the same way. Do not hedge every claim into symmetry. Do not open with a rhetorical question unless the news actually poses one.
- **Cadence**: Occasional fragments are fine. Contractions are fine. Do not sound encyclopedic.`;

function buildComplexityRequirements(complexity: PostComplexity): string {
  switch (complexity) {
    case PostComplexity.DETAILED:
      return `- The "content" should be at least 1000 words with rich structure (multiple ## and ### sections), more contextual explanations and concrete examples.
- ${VISUAL_CALLOUT_INSTRUCTION}`;

    case PostComplexity.COMPLEX:
      return `- The "content" should be at least 2000 words with maximum depth.
- ${VISUAL_CALLOUT_INSTRUCTION}
- Include Markdown tables with comparative data where applicable.
- Include statistical analysis sections.
- Provide maximum depth on each topic covered.`;

    case PostComplexity.SIMPLE:
    default:
      return `- The "content" should be at least 600 words with proper headings (##, ###), paragraphs, and lists where appropriate.`;
  }
}

export function buildBlogPostPrompt(
  countryNameOrOptions: string | BlogPostPromptOptions,
  newsItemsLegacy?: RssNewsItem[],
): string {
  // Support legacy call signature: buildBlogPostPrompt(countryName, newsItems)
  let options: BlogPostPromptOptions;
  if (typeof countryNameOrOptions === 'string') {
    options = {
      countryName: countryNameOrOptions,
      newsItems: newsItemsLegacy ?? [],
    };
  } else {
    options = countryNameOrOptions;
  }

  const {
    countryName,
    newsItems,
    complexity = PostComplexity.SIMPLE,
    politicalTone = PoliticalTone.NEUTRAL,
    customInstructions,
    persona,
  } = options;

  const newsSummary = newsItems
    .slice(0, 5)
    .map((item, i) =>
      `${i + 1}. **${item.title}**\n   ${item.description ?? ''}`.trim(),
    )
    .join('\n\n');

  const toneInstruction = persona
    ? 'Write in the persona voice defined below. Ignore any generic tone instruction.'
    : TONE_INSTRUCTIONS[politicalTone];
  const complexityRequirements = buildComplexityRequirements(complexity);

  const customSection = customInstructions?.trim()
    ? `\n## Additional instructions\n${customInstructions.trim()}`
    : '';

  const personaSection = persona
    ? `\n${buildPersonaPromptSection(persona)}\n`
    : '';

  const role = persona
    ? `You are an opinion columnist writing for an immigration platform targeted at people who want to move abroad. Write a signed opinion column, not a news report.`
    : `You are an expert immigration journalist writing for an immigration platform targeted at people who want to move abroad.`;

  return `
${role}

Based on the recent news headlines about immigration to **${countryName}** listed below, write a comprehensive, informative and engaging blog post in **English**.
${personaSection}
## Recent News
${newsSummary}

## Requirements
- **Language**: English
- **Tone**: ${toneInstruction}
- **Content**: Synthesize the news into a coherent narrative with context. Do NOT just list the news items.
- **Title**: Concise and expressive, maximum 8 words. Prefer titles that reveal a specific insight, use contrast, or pose a direct question. Avoid listicle-style or generic titles.
- **Format**: Return a valid JSON object matching the schema below. The "content" field must be valid Markdown.
${complexityRequirements}
${HUMAN_WRITING_INSTRUCTION}
- The "excerpt" must be a single engaging paragraph of 2–3 sentences summarizing the post.
- "suggested_tags" must be 3–6 lowercase slug strings (e.g. "canada", "work-visa", "immigration-2025").
${customSection}
## JSON Schema
{
  "title": "string — short, punchy title in English (max 8 words). Use strong verbs, specific details, or a surprising angle. Avoid generic phrases like 'Everything You Need to Know' or 'A Complete Guide'.",
  "excerpt": "string — 2-3 sentence summary in English",
  "content": "string — full Markdown post body in English",
  "suggested_tags": ["string"]
}

Return ONLY the JSON object. No markdown code fences.
`.trim();
}
