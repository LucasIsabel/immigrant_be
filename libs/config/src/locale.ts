/**
 * The languages the product writes to somebody in.
 *
 * It lives here, and is imported by the deep path `@app/config/locale`, for
 * the same reason `send-email.ts` imports `@app/config/env` deeply: barrels
 * pull whatever their neighbours import. Putting it in `@app/email` made
 * `notifications.service.ts` reach that barrel, which reaches
 * `libs/config/env.ts`, which parses the whole environment at import time and
 * throws where there is no `.env` — eight suites stopped starting on CI. The
 * comment in `notifications.service.ts` had warned about exactly this.
 *
 * Nothing here touches the environment, so any module can have it.
 * `resolveLocale` is where an unrecognised value stops being a problem: the
 * column that feeds it is a plain string, so a row saying `fr` or `` returns
 * the default instead of an undefined lookup and a template full of
 * `undefined`.
 */
export type Locale = 'en' | 'pt' | 'es';

export const DEFAULT_LOCALE: Locale = 'pt';

const KNOWN: readonly string[] = ['en', 'pt', 'es'];

export function resolveLocale(value: string | null | undefined): Locale {
  if (typeof value !== 'string') return DEFAULT_LOCALE;
  const code = value.trim().toLowerCase().slice(0, 2);
  return KNOWN.includes(code) ? (code as Locale) : DEFAULT_LOCALE;
}
