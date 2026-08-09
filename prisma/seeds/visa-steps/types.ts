/**
 * Authoring types for `visa_steps`.
 *
 * The database stores one JSON blob per (visa type, language). Authoring it in
 * that shape is what let the country translations drift in #28: three parallel
 * structures, nothing tying them together, and a missing item in one language
 * is invisible until a user switches locale.
 *
 * Here a step is authored **once**, carrying its three translations. The pivot
 * into per-language blobs happens in the loader, so "20 items in English, 19 in
 * Portuguese" cannot be expressed.
 */

/**
 * Group keys, in the order they should reach the user.
 *
 * This union is deliberately closed. The frontend maps the key to an icon and a
 * colour in `lib/category-colors.ts`; a key outside the set still renders, but
 * grey with a generic icon, and the label is derived mechanically by
 * `formatCategoryName` — so an invented key degrades silently rather than
 * failing. These six are the ones already in production.
 */
export const STEP_GROUPS = [
  'core_documents',
  'education',
  'financial_requirements',
  'submission_fees',
  'biometrics_health',
  'post_approval_steps',
] as const;

export type StepGroup = (typeof STEP_GROUPS)[number];

/** `[name, notes]`. Order is fixed by the tuple, so the two cannot be swapped. */
export type LocalizedStep = readonly [name: string, notes: string];

export type StepSpec = {
  readonly en: LocalizedStep;
  readonly pt: LocalizedStep;
  readonly es: LocalizedStep;
  /**
   * Language-independent identity. Defaults to `slugifyStepKey(en[0])`, which
   * is collision-free across all 4549 seeded steps today.
   *
   * **Rule when editing a step already in production:** if you change the
   * English name, pin `key` to the old value. The key is what
   * `plans.completed_step_keys` stores, so letting it drift silently unticks
   * the step for every user who had completed it. Fixing `pt`/`es` text is
   * always safe — the key never derives from those.
   */
  readonly key?: string;
  /**
   * Rendering order hint carried over from the rows already in production.
   * Nothing reads it today — the frontend never sorts — but it is part of the
   * stored shape, so dropping it would make seeded rows differ from existing
   * ones for no gain. Stored as a string to match what is in the database.
   */
  readonly priority?: 1 | 2 | 3;
  /**
   * Defaults to `true`. Only `required` items count toward the progress bar
   * (`plan-details.tsx`), so marking something optional genuinely changes what
   * the user sees — it is not just a badge.
   */
  readonly required?: boolean;
};

/** The groups of one visa type. Every group is optional; order follows `STEP_GROUPS`. */
export type VisaTypeSteps = Partial<Record<StepGroup, readonly StepSpec[]>>;

/** Keyed by `immigration_visa_types.category`, which must match `countries.seed.ts` exactly. */
export type CountryVisaSteps = Record<string, VisaTypeSteps>;

export const LANGUAGES = ['pt', 'en', 'es'] as const;
export type Language = (typeof LANGUAGES)[number];

/**
 * Language-independent identity of a step.
 *
 * Derived from the English name, so the *same* value lands in all three
 * language blobs — that is the whole point. `plans.completed_step_keys` stores
 * these, so the user's progress survives a language switch: the key is the
 * identity, the name and notes are a projection of it into one language.
 */
export function slugifyStepKey(name: string): string {
  return name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** The shape actually persisted in `visa_steps.steps`. */
export type StoredStepItem = {
  /** Same across languages. See `slugifyStepKey` and `StepSpec.key`. */
  key: string;
  name: string;
  notes: string;
  checked: boolean;
  priority: string;
  required: boolean;
};

export type StoredSteps = Record<string, StoredStepItem[]>;

/**
 * Pivots one visa type's authored steps into the blob stored for `language`.
 *
 * `checked` is always `false`: it is per-user progress, not part of the
 * template. The user's real state lives in `plans.steps_completed`.
 */
export function toStoredSteps(
  steps: VisaTypeSteps,
  language: Language,
): StoredSteps {
  const stored: StoredSteps = {};

  for (const group of STEP_GROUPS) {
    const specs = steps[group];
    if (!specs?.length) {
      continue;
    }

    stored[group] = specs.map((spec) => {
      const [name, notes] = spec[language];
      return {
        // Always derived from `en`, never from `language` — the key must be
        // byte-identical across the three blobs or a language switch would
        // lose the user's progress.
        key: spec.key ?? slugifyStepKey(spec.en[0]),
        name,
        notes,
        checked: false,
        priority: String(spec.priority ?? 1),
        required: spec.required ?? true,
      };
    });
  }

  return stored;
}
