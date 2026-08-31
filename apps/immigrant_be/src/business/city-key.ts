/**
 * The form a city name is compared in.
 *
 * City names arrive from two different CountriesNow catalogues — one flat per
 * country, one scoped to a state — and they disagree. For Portugal the flat
 * list carries no accents at all (0 of 673 names) while the state-scoped list
 * the wizard uses carries 27 accented names in Porto District alone. So the
 * same place is `Póvoa de Varzim` on one screen and `Povoa de Varzim` on
 * another, and an exact comparison finds neither from the other.
 *
 * Names are still **stored and shown** exactly as they were typed. Only the
 * comparison is folded, which is the difference between correcting someone's
 * spelling and merely recognising it.
 *
 * `NFD` splits a letter from its accent so the combining marks can be dropped;
 * the case fold and the whitespace collapse handle the rest.
 */
export function normalizeCity(city: string): string {
  return city
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}
