export function buildBlogCoverImagePrompt(title: string, countryName: string): string {
  return `Generate a professional, high-quality editorial blog cover image for an article titled "${title}" about immigration to ${countryName}. Wide landscape format (16:9), photorealistic, cinematic lighting, no text overlays, no people's faces visible, suitable for a professional blog header.`;
}

export interface RssNewsItem {
  title: string;
  description?: string;
  link: string;
  pubDate?: string;
}

export function buildBlogPostPrompt(
  countryName: string,
  newsItems: RssNewsItem[],
): string {
  const newsSummary = newsItems
    .slice(0, 5)
    .map(
      (item, i) =>
        `${i + 1}. **${item.title}**\n   ${item.description ?? ''}`.trim(),
    )
    .join('\n\n');

  return `
You are an expert immigration journalist writing for an immigration platform targeted at people who want to move abroad.

Based on the recent news headlines about immigration to **${countryName}** listed below, write a comprehensive, informative and engaging blog post in **Brazilian Portuguese (pt-BR)**.

## Recent News
${newsSummary}

## Requirements
- **Language**: Brazilian Portuguese (pt-BR)
- **Tone**: Professional, informative, helpful — written for someone considering immigrating
- **Content**: Synthesize the news into a coherent narrative with context. Do NOT just list the news items.
- **Format**: Return a valid JSON object matching the schema below. The "content" field must be valid Markdown.
- The "content" should be at least 600 words with proper headings (##, ###), paragraphs, and lists where appropriate.
- The "excerpt" must be a single engaging paragraph of 2–3 sentences summarizing the post.
- "suggested_tags" must be 3–6 lowercase slug strings (e.g. "canada", "visto-trabalho", "imigração-2025").

## JSON Schema
{
  "title": "string — compelling, SEO-friendly title in pt-BR",
  "excerpt": "string — 2-3 sentence summary in pt-BR",
  "content": "string — full Markdown post body in pt-BR",
  "suggested_tags": ["string"]
}

Return ONLY the JSON object. No markdown code fences.
`.trim();
}
