// The step templates live in `prisma/seeds/`, but jest only scans `apps` and
// `libs` — so the test lives here, next to the module that serves them.
import {
  categoriesFromCountrySeed,
  MINIMUM_PARSED_CATEGORIES,
  MINIMUM_PARSED_COUNTRIES,
} from '../../../../prisma/seeds/visa-steps/country-categories';
import { REGISTRY } from '../../../../prisma/seeds/visa-steps/registry';

/**
 * Guards the join between two hand-written files that nothing else ties
 * together: `countries.seed.ts` declares the visa types a user can pick, and
 * `visa-steps/<country>.ts` holds the checklist for each one, keyed by the
 * category string.
 *
 * A category with no template is silent in every direction — the seed logs a
 * warning nobody reads and writes nothing, and the failure only surfaces as
 * `selectVisaType` throwing 404 at whoever picks that visa type. Both
 * directions are checked: a template with no category is skipped by the seed
 * just as quietly.
 */
describe('visa step coverage', () => {
  const seedCategories = categoriesFromCountrySeed();

  // The categories are recovered from source text, so a reformat of
  // countries.seed.ts could stop the regexes matching. Without this the
  // expectations below would pass over an empty map and prove nothing.
  it('parses the country seed', () => {
    expect(seedCategories.size).toBeGreaterThanOrEqual(
      MINIMUM_PARSED_COUNTRIES,
    );
    const total = [...seedCategories.values()].reduce(
      (sum, set) => sum + set.size,
      0,
    );
    expect(total).toBeGreaterThanOrEqual(MINIMUM_PARSED_CATEGORIES);
  });

  it('has a step template for every visa type a user can select', () => {
    const missing: string[] = [];

    for (const [country, categories] of seedCategories) {
      for (const category of categories) {
        if (!REGISTRY[country]?.[category]) {
          missing.push(`${country} / "${category}"`);
        }
      }
    }

    expect(missing).toEqual([]);
  });

  it('has no step template for a visa type that does not exist', () => {
    const orphans: string[] = [];

    for (const [country, visaTypes] of Object.entries(REGISTRY)) {
      const categories = seedCategories.get(country);

      for (const category of Object.keys(visaTypes)) {
        if (!categories?.has(category)) {
          orphans.push(`${country} / "${category}"`);
        }
      }
    }

    expect(orphans).toEqual([]);
  });

  it('gives every template at least one step', () => {
    const empty: string[] = [];

    for (const [country, visaTypes] of Object.entries(REGISTRY)) {
      for (const [category, groups] of Object.entries(visaTypes)) {
        const steps = Object.values(groups).reduce(
          (sum, group) => sum + (group?.length ?? 0),
          0,
        );
        if (!steps) {
          empty.push(`${country} / "${category}"`);
        }
      }
    }

    expect(empty).toEqual([]);
  });
});
