const LOCALE_LABELS: Record<string, string> = {
  pt: 'Brazilian Portuguese (PT-BR)',
  en: 'English',
  es: 'Spanish (Castilian)',
};

export interface BlogTranslationPromptOptions {
  targetLocale: string;
  originalLocale: string;
  title: string;
  excerpt: string;
  content: string;
}

export function buildBlogTranslationPrompt(
  opts: BlogTranslationPromptOptions,
): string {
  const targetLabel = LOCALE_LABELS[opts.targetLocale] ?? opts.targetLocale;
  const originalLabel = LOCALE_LABELS[opts.originalLocale] ?? opts.originalLocale;

  return `
You are a professional translator specializing in immigration and visa content.

Translate the following blog post from **${originalLabel}** to **${targetLabel}**.

## Rules
- Preserve all Markdown formatting (headings, bold, lists, blockquotes, tables, etc.)
- Do NOT translate proper nouns or program names (e.g. "Express Entry", "IRCC", "Schengen", "USCIS")
- Do NOT add, remove, or summarize content — translate faithfully
- The "content" field contains Markdown; keep all Markdown syntax intact
- Return a valid JSON object with exactly the three fields below

## Source Content

**Title:** ${opts.title}

**Excerpt:** ${opts.excerpt}

**Content:**
${opts.content}

## JSON Schema
{
  "title": "string — translated title in ${targetLabel}",
  "excerpt": "string — translated excerpt in ${targetLabel}",
  "content": "string — full translated Markdown body in ${targetLabel}"
}

Return ONLY the JSON object. No markdown code fences.
`.trim();
}
