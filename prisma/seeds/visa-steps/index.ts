import { PrismaClient } from '../../../generated/prisma';
import { REGISTRY } from './registry';
import {
  type CountryVisaSteps,
  LANGUAGES,
  slugifyStepKey,
  STEP_GROUPS,
  toStoredSteps,
} from './types';

const prisma = new PrismaClient();

/**
 * Rejects a visa type whose step keys are not unique across its groups.
 *
 * `plans.completed_step_keys` is a flat list of keys for the whole visa type,
 * so two steps sharing a key tick and untick together — in different sections
 * of the page, with no visible cause. The database cannot express this
 * constraint (the keys live inside a JSON blob), so it is enforced here.
 *
 * The check runs once, not per language: the key derives from `en` alone, so
 * it is the same in all three blobs by construction.
 */
function assertUniqueKeys(
  country: string,
  category: string,
  steps: CountryVisaSteps[string],
): void {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const group of STEP_GROUPS) {
    for (const spec of steps[group] ?? []) {
      const key = spec.key ?? slugifyStepKey(spec.en[0]);
      if (seen.has(key)) {
        duplicates.add(key);
      }
      seen.add(key);
    }
  }

  if (duplicates.size) {
    throw new Error(
      `[seed] ${country} / "${category}": step keys must be unique across groups, but these repeat: ${[
        ...duplicates,
      ].join(
        ', ',
      )}. Completion is tracked by key, so duplicates would toggle together. Set an explicit \`key\` on one of them.`,
    );
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

      assertUniqueKeys(countryName, category, steps);

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
