// The catalogue lives in `prisma/seeds/`, but jest only scans `apps` and
// `libs` — so the test sits beside the coverage guard it complements.
import {
  isInstruction,
  mainRequirementsFor,
  VISA_CATALOGUE_FACTS,
} from '../../../../prisma/seeds/visa-catalogue';
import {
  categoriesFromCountrySeed,
  MINIMUM_PARSED_CATEGORIES,
} from '../../../../prisma/seeds/visa-steps/country-categories';
import { REGISTRY } from '../../../../prisma/seeds/visa-steps/registry';

/**
 * Guards the processing time, cost and requirements the recommendation prompt
 * reasons over.
 *
 * These are the figures a person plans a move around, so the invariant this
 * file protects is narrow and absolute: a value exists only where something in
 * the repository states it, and it reaches the row keyed to the right visa
 * type. A fact keyed to a category that does not exist is written nowhere and
 * fails silently — that is what the first test is for.
 */
describe('visa catalogue', () => {
  const seedCategories = categoriesFromCountrySeed();

  it('keys every curated fact to a visa type that exists', () => {
    const orphans: string[] = [];

    for (const [country, byCategory] of Object.entries(VISA_CATALOGUE_FACTS)) {
      for (const category of Object.keys(byCategory)) {
        if (!seedCategories.get(country)?.has(category)) {
          orphans.push(`${country} / "${category}"`);
        }
      }
    }

    expect(orphans).toEqual([]);
  });

  it('leaves the great majority of the catalogue empty', () => {
    // Not a target, a fact about the source material: `countries.seed.ts`
    // states one processing time per *country*, and a country-level "2-4
    // months" describes none of its four visa categories in particular. The
    // floor is here so nobody later fills the gap by asking a model to guess —
    // if these counts jump, the provenance comments in `visa-catalogue.ts`
    // have to say where the numbers came from.
    const counts = [...seedCategories].flatMap(([country, categories]) =>
      [...categories].map(
        (category) => VISA_CATALOGUE_FACTS[country]?.[category],
      ),
    );

    expect(counts.length).toBeGreaterThanOrEqual(MINIMUM_PARSED_CATEGORIES);
    expect(counts.filter((fact) => fact?.processing_time).length).toBe(8);
    expect(counts.filter((fact) => fact?.estimated_cost).length).toBe(38);
  });

  it('derives a requirement list for every visa type a user can select', () => {
    const empty: string[] = [];

    for (const [country, categories] of seedCategories) {
      for (const category of categories) {
        const steps = REGISTRY[country]?.[category];
        if (!steps || !mainRequirementsFor(steps).length) {
          empty.push(`${country} / "${category}"`);
        }
      }
    }

    expect(empty).toEqual([]);
  });

  it('keeps instructions out of the requirement list', () => {
    // `core_documents` holds the occasional imperative — "Check the Mercosur
    // nationality route first" is a step to take, not a document to hold, and
    // listing it under "Main requirements" would tell the model the applicant
    // must produce one.
    const argentinaWork =
      REGISTRY['Argentina']['Working Visa / Labour Contract Visa'];

    expect(argentinaWork.core_documents?.[0]?.en[0]).toBe(
      'Check the Mercosur nationality route first',
    );
    expect(mainRequirementsFor(argentinaWork)).not.toContain(
      'Check the Mercosur nationality route first',
    );
    expect(mainRequirementsFor(argentinaWork)).toContain(
      'Criminal record certificates',
    );
  });

  it('fails when a new template introduces an imperative nobody classified', () => {
    // The blocklist was read off the full first-word inventory of the 242
    // templates as they stood. A template added later can bring a verb it does
    // not cover, and the only symptom would be an instruction quietly
    // presented to the model as a requirement. This catches the shapes an
    // instruction takes: an unlisted leading verb ending in a bare infinitive
    // form is rare, so the check is a spot list of the verbs most likely to
    // recur.
    const LIKELY_VERBS = [
      'Arrange',
      'Attend',
      'Bring',
      'Collect',
      'Ensure',
      'Gather',
      'Lodge',
      'Renew',
      'Schedule',
      'Send',
      'Upload',
    ];
    const missed: string[] = [];

    for (const [country, visaTypes] of Object.entries(REGISTRY)) {
      for (const [category, steps] of Object.entries(visaTypes)) {
        for (const requirement of mainRequirementsFor(steps)) {
          const first = requirement.split(/[\s,]/)[0];
          if (LIKELY_VERBS.includes(first)) {
            missed.push(`${country} / "${category}": ${requirement}`);
          }
        }
      }
    }

    expect(missed).toEqual([]);
  });

  it('reads a leading imperative, not a participle', () => {
    // "Completed Schengen application form" is a document; "Complete the
    // investment" is not. The distinction is the whole reason the blocklist
    // matches the first word exactly rather than a stem.
    expect(isInstruction('Complete the investment inside the deadline')).toBe(
      true,
    );
    expect(isInstruction('Completed Schengen application form')).toBe(false);
    expect(
      isInstruction('Register for tax, social security and health cover'),
    ).toBe(true);
    expect(
      isInstruction('Registered address throughout the qualifying period'),
    ).toBe(false);
  });
});
