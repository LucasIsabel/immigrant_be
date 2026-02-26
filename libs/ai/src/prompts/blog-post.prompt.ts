import { PostComplexity } from '../enums/post-complexity.enum';
import { PoliticalTone } from '../enums/political-tone.enum';

export function buildBlogCoverImagePrompt(title: string, countryName: string): string {
  return `Generate a professional, high-quality editorial blog cover image for an article titled "${title}" about immigration to ${countryName}. Wide landscape format (16:9), photorealistic, cinematic lighting, no text overlays, no people's faces visible, suitable for a professional blog header.`;
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
}

const TONE_INSTRUCTIONS: Record<PoliticalTone, string> = {
  [PoliticalTone.NEUTRAL]:
    'Keep an objective, balanced and informative tone.',
  [PoliticalTone.PRO_IMMIGRATION]:
    'Adopt a pro-immigration perspective, emphasizing opportunities, rights and benefits for immigrants.',
  [PoliticalTone.CONSERVATIVE]:
    'Adopt a cautious tone that emphasizes legal processes, challenges and regulatory procedures.',
  [PoliticalTone.PROGRESSIVE]:
    'Adopt a progressive perspective focused on social justice, inclusion and immigrant rights.',
};

function buildComplexityRequirements(complexity: PostComplexity): string {
  switch (complexity) {
    case PostComplexity.DETAILED:
      return `- The "content" should be at least 1000 words with rich structure (multiple ## and ### sections), more contextual explanations and concrete examples.
- Include visual callouts throughout the text using this format:
  > 📊 **[Visual sugerido]:** Detailed description of relevant chart or infographic`;

    case PostComplexity.COMPLEX:
      return `- The "content" should be at least 2000 words with maximum depth.
- Include multiple visual callouts using this format:
  > 📊 **[Visual sugerido]:** Detailed description of relevant chart or infographic
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
  } = options;

  const newsSummary = newsItems
    .slice(0, 5)
    .map(
      (item, i) =>
        `${i + 1}. **${item.title}**\n   ${item.description ?? ''}`.trim(),
    )
    .join('\n\n');

  const toneInstruction = TONE_INSTRUCTIONS[politicalTone];
  const complexityRequirements = buildComplexityRequirements(complexity);

  const customSection = customInstructions?.trim()
    ? `\n## Additional instructions\n${customInstructions.trim()}`
    : '';

  return `
You are an expert immigration journalist writing for an immigration platform targeted at people who want to move abroad.

Based on the recent news headlines about immigration to **${countryName}** listed below, write a comprehensive, informative and engaging blog post in **English**.

## Recent News
${newsSummary}

## Requirements
- **Language**: English
- **Tone**: ${toneInstruction}
- **Content**: Synthesize the news into a coherent narrative with context. Do NOT just list the news items.
- **Format**: Return a valid JSON object matching the schema below. The "content" field must be valid Markdown.
${complexityRequirements}
- The "excerpt" must be a single engaging paragraph of 2–3 sentences summarizing the post.
- "suggested_tags" must be 3–6 lowercase slug strings (e.g. "canada", "work-visa", "immigration-2025").
${customSection}
## JSON Schema
{
  "title": "string — compelling, SEO-friendly title in English",
  "excerpt": "string — 2-3 sentence summary in English",
  "content": "string — full Markdown post body in English",
  "suggested_tags": ["string"]
}

Return ONLY the JSON object. No markdown code fences.
`.trim();
}
