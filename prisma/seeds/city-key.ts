/**
 * The fold the application compares cities and states in — `normalizeCity`
 * and `normalizeState` of `apps/immigrant_be/src/business/city-key.ts` — for
 * the seeds, which have to write the keys themselves.
 *
 * Copied rather than imported: the production image ships `prisma/` but not
 * the `apps/` sources, and the seeds are run there by hand. Two copies of a
 * fold drift apart quietly, so `business/city-key-backfill.spec.ts` holds this
 * one to the application's answer.
 */
export function normalizeCity(city: string): string {
  return city
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/** The same fold, and null — never "" — for no state. */
export function normalizeState(state: unknown): string | null {
  return typeof state === 'string' && state.trim()
    ? normalizeCity(state)
    : null;
}
