import { PrismaClient } from '../../../generated/prisma';
import { REGISTRY } from './registry';
import {
  type CountryVisaSteps,
  LANGUAGES,
  STEP_GROUPS,
  toStoredSteps,
} from './types';

const prisma = new PrismaClient();

/**
 * Rejects a visa type whose step names are not unique across its groups.
 *
 * The frontend tracks completion in a `Set<string>` of names and its
 * `toggleStep(name, _category)` ignores the category argument
 * (`store/plan.store.ts`), so two items sharing a name tick and untick
 * together — in different sections of the page, with no visible cause. The
 * database cannot express this constraint, so it is enforced here.
 */
function assertUniqueNames(
  country: string,
  category: string,
  steps: CountryVisaSteps[string],
): void {
  for (const language of LANGUAGES) {
    const seen = new Set<string>();
    const duplicates = new Set<string>();

    for (const group of STEP_GROUPS) {
      for (const spec of steps[group] ?? []) {
        const [name] = spec[language];
        if (seen.has(name)) {
          duplicates.add(name);
        }
        seen.add(name);
      }
    }

    if (duplicates.size) {
      throw new Error(
        `[seed] ${country} / "${category}" (${language}): step names must be unique across groups, but these repeat: ${[
          ...duplicates,
        ].join(
          ', ',
        )}. The frontend keys completion by name alone, so duplicates would toggle together.`,
      );
    }
  }
}

export async function seedVisaSteps() {
  let written = 0;

  for (const [countryName, visaTypes] of Object.entries(REGISTRY)) {
    const country = await prisma.country.findUnique({
      where: { name: countryName },
      include: { immigration_visa_types: true },
    });

    if (!country) {
      console.warn(
        `[seed] visa steps: country "${countryName}" is not in the database. Run the country seed first.`,
      );
      continue;
    }

    for (const [category, steps] of Object.entries(visaTypes)) {
      const visaType = country.immigration_visa_types.find(
        (existing) => existing.category === category,
      );

      // A category typo here would otherwise create nothing and fail silently,
      // leaving the visa type without steps and `selectVisaType` throwing 404
      // for every user who picks it.
      if (!visaType) {
        console.warn(
          `[seed] ${countryName}: no visa type with category "${category}". Steps skipped — check the spelling against countries.seed.ts.`,
        );
        continue;
      }

      assertUniqueNames(countryName, category, steps);

      for (const language of LANGUAGES) {
        const stored = toStoredSteps(steps, language);

        // Upsert on the unique added in 20260805120000_unique_visa_steps_locale.
        // Re-running replaces the template in place, so a correction reaches
        // production without touching any user's saved progress — that lives in
        // `plans.steps_completed`, a separate copy.
        await prisma.visaSteps.upsert({
          where: {
            visa_type_id_language: { visa_type_id: visaType.id, language },
          },
          update: { steps: stored },
          create: { visa_type_id: visaType.id, language, steps: stored },
        });

        written += 1;
      }
    }
  }

  console.log(`[seed] visa steps: ${written} rows written`);
}
