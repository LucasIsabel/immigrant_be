export const DEFAULT_LANGUAGE = 'en';

/**
 * Languages a country may be translated into.
 *
 * The unique on `(country_id, language)` accepts any string, so without an
 * explicit vocabulary a typo in the path becomes a permanent row nobody reads —
 * which is what happened to the blog translations, where the locale is never
 * validated.
 */
export const SUPPORTED_LANGUAGES = ['en', 'pt', 'es'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function isSupportedLanguage(
  language: string,
): language is SupportedLanguage {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(language);
}

/**
 * Picks the country copy for `language`.
 *
 * Falls back to English and then to whatever row exists, because a country may
 * legitimately be missing a translation while its copy is being written. Callers
 * get `null` only when the country has no translation row at all.
 */
export function pickTranslation<T extends { language: string }>(
  translations: T[] | null | undefined,
  language: string = DEFAULT_LANGUAGE,
): T | null {
  if (!translations?.length) {
    return null;
  }

  return (
    translations.find((translation) => translation.language === language) ??
    translations.find(
      (translation) => translation.language === DEFAULT_LANGUAGE,
    ) ??
    translations[0]
  );
}
