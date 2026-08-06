/**
 * Offline checks over the authored steps. No database.
 *
 * Run with `npx tsx prisma/seeds/visa-steps/validate.ts`. It exists so a
 * mistake surfaces before `prisma db seed` touches production, and so the
 * coverage number against `countries.seed.ts` is a fact rather than a claim.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { REGISTRY } from './registry';
import { LANGUAGES, STEP_GROUPS } from './types';

type Problem = { where: string; what: string };

const problems: Problem[] = [];

/** Categories declared in the country seed, keyed by country. */
function categoriesFromCountrySeed(): Map<string, Set<string>> {
  const source = readFileSync(
    join(__dirname, '..', 'countries.seed.ts'),
    'utf8',
  );
  const lines = source.split('\n');
  const byCountry = new Map<string, Set<string>>();
  let current: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const name = /^ {6}name: '(.+)',$/.exec(lines[i]);
    if (name) {
      current = name[1];
      byCountry.set(current, new Set());
    }

    if (/^\s*category:/.test(lines[i]) && current) {
      const inline = lines[i].replace(/^\s*category:\s*/, '');
      const raw = inline === '' ? lines[i + 1].trim() : inline;

      // Only a quoted literal is data. The file ends with the reconcile loop,
      // which contains `category: visaType.category,` — counting that as a
      // country's category inflates the total by one and attributes a
      // nonexistent category to whichever country happens to be last.
      const literal = /^'(.*)',$/.exec(raw);
      if (literal) {
        byCountry.get(current)?.add(literal[1]);
      }
    }
  }

  return byCountry;
}

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
      const seen = new Set<string>();

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
          if (seen.has(name)) {
            problems.push({
              where: `${at} (${language})`,
              what: `duplicate step name "${name}" — the frontend keys completion by name alone, so the two would toggle together`,
            });
          }
          seen.add(name);
        }
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
