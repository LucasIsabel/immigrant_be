export const DEFAULT_LANGUAGE = 'en';

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
