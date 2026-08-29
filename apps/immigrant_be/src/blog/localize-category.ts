/**
 * A category's name and slug in the language the reader asked for.
 *
 * Kept out of `applyTranslation`, which is about the post. That one returns
 * early when the requested language is the post's own original — and posts are
 * written in English while categories are written in Portuguese, so a category
 * localized inside it would never reach the English reader, which is the exact
 * case this feature exists for.
 */

export interface LocalizableCategoryTranslation {
  locale: string;
  name: string;
  slug: string;
  /** 'ORIGINAL' for the row the category itself is, 'AI' or 'HUMAN' otherwise. */
  translated_by?: string;
  translated_by_model?: string | null;
}

export interface LocalizableCategory {
  name: string;
  slug: string;
  original_locale?: string;
  translations?: LocalizableCategoryTranslation[];
}

/**
 * The name and slug to show, falling back to the canonical ones.
 *
 * A category whose translation has not been written yet — the window between
 * an admin creating it and the queue answering — keeps its original name. That
 * is deliberate: a Portuguese name in an English rail is a blemish, while a
 * category missing from the navigation is a hole.
 */
export function localizeCategory<T extends LocalizableCategory>(
  category: T,
  lang?: string,
): T {
  if (!lang) return category;
  if (lang === (category.original_locale ?? 'pt')) return category;

  const translation = category.translations?.find((t) => t.locale === lang);
  if (!translation) return category;

  return { ...category, name: translation.name, slug: translation.slug };
}

/**
 * The same, for a record that merely carries a category (a post).
 *
 * Returns the record untouched when there is nothing to localize, so callers
 * can apply it unconditionally.
 */
export function localizeEmbeddedCategory<
  T extends { category?: LocalizableCategory | null },
>(record: T, lang?: string): T {
  if (!lang || !record.category) return record;

  return {
    ...record,
    category: localizeCategory(withOriginalTranslation(record.category), lang),
  };
}

/**
 * The category's own language, added to the list of translations.
 *
 * `translations` holds only the languages a translator wrote, so a response
 * localized into English carried the English and Spanish rows and nothing for
 * Portuguese — while `slug` had already been overwritten with the English one.
 * The original spelling was then unrecoverable, and the category page could not
 * declare an honest `hreflang` for it: the Portuguese alternate pointed at the
 * English URL, which resolves, but by redirect.
 *
 * With this, the contract is whole: the top level is the language you asked
 * for, `translations` is every language there is.
 */
export function withOriginalTranslation<T extends LocalizableCategory>(
  category: T,
): T {
  const locale = category.original_locale ?? 'pt';
  const existing = category.translations ?? [];
  if (existing.some((t) => t.locale === locale)) return category;

  return {
    ...category,
    translations: [
      {
        locale,
        name: category.name,
        slug: category.slug,
        // Not a translation at all: the row every other one was written from.
        translated_by: 'ORIGINAL',
        translated_by_model: null,
      },
      ...existing,
    ],
  };
}
