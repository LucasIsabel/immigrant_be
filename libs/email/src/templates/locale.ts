/**
 * The languages an e-mail can be written in.
 *
 * Its own module because three templates need it and none of them owns it.
 * `resolveLocale` is where an unrecognised value stops being a problem: the
 * column that feeds it is a plain string, so a row saying `fr` or `` returns
 * the default instead of an undefined lookup and a template full of
 * `undefined`.
 */
export type EmailLocale = 'en' | 'pt' | 'es';

export const DEFAULT_EMAIL_LOCALE: EmailLocale = 'pt';

const KNOWN: readonly string[] = ['en', 'pt', 'es'];

export function resolveLocale(value: string | null | undefined): EmailLocale {
  if (typeof value !== 'string') return DEFAULT_EMAIL_LOCALE;
  const code = value.trim().toLowerCase().slice(0, 2);
  return KNOWN.includes(code) ? (code as EmailLocale) : DEFAULT_EMAIL_LOCALE;
}
