import { argentina } from './argentina';
import { australia } from './australia';
import { brazil } from './brazil';
import { canada } from './canada';
import { colombia } from './colombia';
import { chile } from './chile';
import { costaRica } from './costa-rica';
import { dominicanRepublic } from './dominican-republic';
import { ecuador } from './ecuador';
import { france } from './france';
import { ireland } from './ireland';
import { germany } from './germany';
import { italy } from './italy';
import { japan } from './japan';
import { mexico } from './mexico';
import { netherlands } from './netherlands';
import { panama } from './panama';
import { paraguay } from './paraguay';
import { newZealand } from './new-zealand';
import { peru } from './peru';
import { portugal } from './portugal';
import { spain } from './spain';
import { switzerland } from './switzerland';
import type { CountryVisaSteps } from './types';
import { unitedKingdom } from './united-kingdom';
import { unitedStates } from './united-states';
import { uruguay } from './uruguay';

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
  Argentina: argentina,
  Australia: australia,
  Brazil: brazil,
  Canada: canada,
  Chile: chile,
  Colombia: colombia,
  'Costa Rica': costaRica,
  'Dominican Republic': dominicanRepublic,
  Ecuador: ecuador,
  France: france,
  Germany: germany,
  Ireland: ireland,
  Italy: italy,
  Japan: japan,
  Mexico: mexico,
  Netherlands: netherlands,
  'New Zealand': newZealand,
  Panama: panama,
  Paraguay: paraguay,
  Peru: peru,
  Portugal: portugal,
  Spain: spain,
  Switzerland: switzerland,
  'United Kingdom': unitedKingdom,
  'United States': unitedStates,
  Uruguay: uruguay,
};
