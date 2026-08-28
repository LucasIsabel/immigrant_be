const LOCALE_LABELS: Record<string, string> = {
  pt: 'Brazilian Portuguese (PT-BR)',
  en: 'English',
  es: 'Spanish (Castilian)',
};

export interface BlogCategoryTranslationPromptOptions {
  /** As the category is written today, and the language it is written in. */
  name: string;
  originalLocale: string;
  targetLocales: readonly string[];
  /**
   * The other categories on the blog, in the original language.
   *
   * A category name is two or three words with no sentence around it, which is
   * exactly where a model guesses. "Política" alone comes back as "Policy"
   * about as often as "Politics"; sitting next to "Vistos e Permissões" and
   * "Mudanças na Lei", it does not. They also keep the set consistent: a blog
   * whose categories were each translated in isolation reads like three
   * different people named them.
   */
  siblings: readonly string[];
}

export function buildBlogCategoryTranslationPrompt(
  opts: BlogCategoryTranslationPromptOptions,
): string {
  const originalLabel =
    LOCALE_LABELS[opts.originalLocale] ?? opts.originalLocale;
  const targets = opts.targetLocales
    .map((locale) => `- "${locale}": ${LOCALE_LABELS[locale] ?? locale}`)
    .join('\n');
  const siblings = opts.siblings
    .filter((name) => name !== opts.name)
    .map((name) => `- ${name}`)
    .join('\n');

  return `
You are translating the navigation of a blog about immigration — people moving country, and what they have to do to get there legally.

Translate this **category name** from ${originalLabel}:

"${opts.name}"

Into each of these languages:

${targets}

## The rest of the blog's categories, for context

${siblings || '(this is the only category)'}

## Rules

- These are **category labels**, not sentences: short, in the register a site's navigation uses, and capitalised the way that language capitalises headings.
- Translate the **meaning in this domain**, not the words. "Política" in a blog about immigration is *Politics*, not *Policy*. "Processos por País" is *Processes by Country*, not *Lawsuits by Country*.
- Keep the terms of art an immigrant already searches for — visa, residence permit, work permit — in the form that language actually uses for them.
- Stay consistent with the sibling categories above: if two of them share a word, the translations should share it too.
- Do not add, remove or explain anything. A three-word category stays about three words.
- Return the name only. The URL is built from it on the server.

## Response format

Return a valid JSON object keyed by locale:

{
${opts.targetLocales.map((locale) => `  "${locale}": "the translated name"`).join(',\n')}
}

Return ONLY the JSON object. No markdown code fences.
`.trim();
}
