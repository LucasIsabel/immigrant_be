/**
 * Offline checks over the authored steps. No database.
 *
 * Run with `npx tsx prisma/seeds/visa-steps/validate.ts`. It exists so a
 * mistake surfaces before `prisma db seed` touches production, and so the
 * coverage number against `countries.seed.ts` is a fact rather than a claim.
 */
import { categoriesFromCountrySeed } from './country-categories';
import { REGISTRY } from './registry';
import { LANGUAGES, slugifyStepKey, STEP_GROUPS } from './types';

type Problem = { where: string; what: string };

const problems: Problem[] = [];

const seedCategories = categoriesFromCountrySeed();

let countries = 0;
let visaTypes = 0;
let items = 0;

for (const [country, visaTypeMap] of Object.entries(REGISTRY)) {
  countries += 1;

  const known = seedCategories.get(country);
  if (!known) {
    problems.push({
      where: country,
      what: 'country is not in countries.seed.ts',
    });
    continue;
  }

  for (const [category, steps] of Object.entries(visaTypeMap)) {
    visaTypes += 1;
    const at = `${country} / "${category}"`;

    if (!known.has(category)) {
      problems.push({
        where: at,
        what: 'category does not exist in countries.seed.ts — the seed would skip it silently',
      });
    }

    const groups = STEP_GROUPS.filter((group) => steps[group]?.length);
    if (!groups.length) {
      problems.push({ where: at, what: 'no steps at all' });
      continue;
    }

    if (!steps.core_documents?.length) {
      problems.push({ where: at, what: 'missing the core_documents group' });
    }

    for (const language of LANGUAGES) {
      for (const group of groups) {
        for (const spec of steps[group] ?? []) {
          const [name, notes] = spec[language];

          if (!name.trim()) {
            problems.push({ where: `${at} (${language})`, what: 'empty name' });
          }
          if (!notes.trim()) {
            problems.push({
              where: `${at} (${language})`,
              what: `empty notes on "${name}"`,
            });
          }
        }
      }
    }

    // Keys are checked once, not per language: they derive from `en` alone, so
    // they are identical in all three blobs by construction. A duplicate means
    // two steps of this visa type share one entry in
    // `plans.completed_step_keys`, and they would tick together.
    const seenKeys = new Set<string>();

    for (const group of groups) {
      for (const spec of steps[group] ?? []) {
        const key = spec.key ?? slugifyStepKey(spec.en[0]);

        if (!key) {
          problems.push({
            where: at,
            what: `"${spec.en[0]}" produces an empty key — set an explicit \`key\``,
          });
        }
        if (seenKeys.has(key)) {
          problems.push({
            where: at,
            what: `duplicate step key "${key}" — completion is tracked by key, so the two would toggle together`,
          });
        }
        seenKeys.add(key);
      }
    }

    for (const group of groups) {
      for (const spec of steps[group] ?? []) {
        items += 1;
        const [en] = spec.en;
        const [pt] = spec.pt;
        const [es] = spec.es;

        // Identical copy in all three languages almost always means a
        // translation was skipped. Two things legitimately repeat and must not
        // be flagged: short strings that are mostly a form number ("DS-160"),
        // and the proper name of an official instrument, which carries a
        // parenthesised acronym the user needs in order to find it on the
        // government site — "Educational Credential Assessment (ECA)" stays in
        // English on purpose, in all three languages.
        const isNamedInstrument = /\([A-Z][A-Z0-9/-]{1,}\)/.test(en);

        if (en === pt && pt === es && en.length > 25 && !isNamedInstrument) {
          problems.push({
            where: at,
            what: `"${en}" is identical in all three languages — likely untranslated`,
          });
        }
      }
    }
  }
}

// A category the registry does not cover is the gap that leaves a visa type
// with no steps: `selectVisaType` then 404s for every user who picks it. It is
// invisible to the loop above, which only walks what the registry already has.
for (const [country, categories] of seedCategories) {
  const covered = REGISTRY[country];

  for (const category of categories) {
    if (!covered?.[category]) {
      problems.push({
        where: `${country} / "${category}"`,
        what: 'no step template — selecting this visa type would 404',
      });
    }
  }
}

const totalSeedTypes = [...seedCategories.values()].reduce(
  (sum, set) => sum + set.size,
  0,
);

console.log(
  `${countries}/${seedCategories.size} countries, ${visaTypes}/${totalSeedTypes} visa types, ${items} steps, ${visaTypes * 3} rows`,
);

if (problems.length) {
  for (const problem of problems) {
    console.error(`  ✗ ${problem.where}: ${problem.what}`);
  }
  console.error(`\n${problems.length} problem(s)`);
  process.exit(1);
}

console.log('no problems');
