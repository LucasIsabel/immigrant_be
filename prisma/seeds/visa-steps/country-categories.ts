import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The visa categories declared in `countries.seed.ts`, keyed by country.
 *
 * Read from the source text rather than imported: the country list lives inside
 * `seedCountries()`, and importing that module constructs a `PrismaClient`. The
 * parse is what lets both the offline validator and the coverage test run with
 * no database.
 */
export function categoriesFromCountrySeed(): Map<string, Set<string>> {
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

/**
 * Floor under the parse, so a reformat of `countries.seed.ts` that the regexes
 * stop matching fails loudly instead of leaving every check vacuously true.
 * There were 62 countries and 242 categories when this was written.
 */
export const MINIMUM_PARSED_COUNTRIES = 50;
export const MINIMUM_PARSED_CATEGORIES = 200;
