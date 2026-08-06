import { canada } from './canada';
import { spain } from './spain';
import type { CountryVisaSteps } from './types';
import { unitedStates } from './united-states';

/**
 * One entry per country, keyed by `countries.name` exactly as it appears in
 * `countries.seed.ts`. Splitting by country keeps each file reviewable and each
 * diff scoped to the country that actually changed.
 *
 * A country absent from here simply has no steps seeded. The seed is additive,
 * so filling this in over several rounds leaves no intermediate state that is
 * wrong — only incomplete.
 *
 * Kept apart from `index.ts` so `validate.ts` can read it without constructing
 * a PrismaClient, which is what lets the checks run with no database.
 */
export const REGISTRY: Record<string, CountryVisaSteps> = {
  Canada: canada,
  Spain: spain,
  'United States': unitedStates,
};
