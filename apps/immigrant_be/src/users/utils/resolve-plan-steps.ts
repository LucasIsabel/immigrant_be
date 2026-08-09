/**
 * Joins the language-neutral progress stored on a plan with the localized
 * template stored in `visa_steps`.
 *
 * The plan holds only `completed_step_keys`; the text of a step lives in one
 * `visa_steps` row per language. Keeping them apart is what lets a user switch
 * language without losing progress — the key is the identity, the name and
 * notes are a projection of it into one locale.
 *
 * Deliberately pure: no Prisma, no Nest. The progress arithmetic is the part
 * most likely to be wrong, and this shape lets it be tested directly.
 */

/**
 * One item of a `visa_steps.steps` blob.
 *
 * Duplicated from `prisma/seeds/visa-steps/types.ts` on purpose: the seed is
 * authoring tooling, not application code, and importing across that boundary
 * would make the running app depend on the seed's dependency tree. Same
 * treatment the closed language vocabulary gets. If one side changes, the
 * other must follow.
 */
export type StoredStepItem = {
  key: string;
  name: string;
  notes: string;
  checked: boolean;
  priority: string;
  required: boolean;
};

export type StoredSteps = Record<string, StoredStepItem[]>;

export type ResolvedStepItem = {
  key: string;
  name: string;
  notes: string;
  priority: string;
  required: boolean;
  completed: boolean;
};

export type ResolvedPlanSteps = {
  steps: Record<string, ResolvedStepItem[]>;
  progress: number;
  /** Every key in the template — the authority on what a plan may store. */
  allKeys: string[];
};

function isStoredStepItem(value: unknown): value is StoredStepItem {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as StoredStepItem).key === 'string'
  );
}

/**
 * Reads a `visa_steps.steps` JSON blob defensively.
 *
 * The column is `Json`, and the admin can overwrite it through
 * `PUT /admin/visa-steps/:id`. Anything without a `key` is dropped rather than
 * surfaced as an item the user can tick but never persist.
 */
export function parseStoredSteps(raw: unknown): StoredSteps {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return {};
  }

  const parsed: StoredSteps = {};

  for (const [category, items] of Object.entries(
    raw as Record<string, unknown>,
  )) {
    if (!Array.isArray(items)) {
      continue;
    }

    const valid = items.filter(isStoredStepItem);
    if (valid.length) {
      parsed[category] = valid;
    }
  }

  return parsed;
}

/**
 * Progress counts only `required` steps, matching what the dashboard's bar has
 * always displayed. Before this, the backend counted every step while the
 * frontend counted only the required ones, so the number on the plan list and
 * the number on the plan page disagreed.
 *
 * A visa type with no required step at all would otherwise sit at 0% forever,
 * so it falls back to counting everything.
 */
export function resolvePlanSteps(
  template: StoredSteps,
  completedKeys: string[],
): ResolvedPlanSteps {
  const completed = new Set(completedKeys);
  const steps: Record<string, ResolvedStepItem[]> = {};
  const allKeys: string[] = [];

  let requiredTotal = 0;
  let requiredDone = 0;
  let total = 0;
  let done = 0;

  for (const [category, items] of Object.entries(template)) {
    steps[category] = items.map((item) => {
      const isCompleted = completed.has(item.key);

      allKeys.push(item.key);
      total += 1;
      if (isCompleted) done += 1;
      if (item.required) {
        requiredTotal += 1;
        if (isCompleted) requiredDone += 1;
      }

      return {
        key: item.key,
        name: item.name,
        notes: item.notes,
        priority: item.priority,
        required: item.required,
        completed: isCompleted,
      };
    });
  }

  const [numerator, denominator] =
    requiredTotal > 0 ? [requiredDone, requiredTotal] : [done, total];

  return {
    steps,
    progress: denominator > 0 ? numerator / denominator : 0,
    allKeys,
  };
}

/**
 * Keeps only keys the template actually declares.
 *
 * The client sends the full completion set, so a stale tab or a step removed
 * from the seed would otherwise leave a key nobody can ever untick — and it
 * would count toward progress forever.
 */
export function intersectWithTemplate(
  requestedKeys: string[],
  allKeys: string[],
): string[] {
  const known = new Set(allKeys);
  return [...new Set(requestedKeys)].filter((key) => known.has(key));
}
