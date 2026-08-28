import { z } from 'zod';

/**
 * One translated name per locale, keyed by locale.
 *
 * A record rather than a fixed shape because the set of target languages
 * depends on which language the category was written in — Portuguese for
 * categories, English for posts — and hard-coding the pair here is how the two
 * lists in `constants.ts` came to disagree in the first place.
 */
export const blogCategoryTranslationSchema = z.record(
  z.string(),
  z.string().min(1).max(120),
);

export type BlogCategoryTranslationResult = z.infer<
  typeof blogCategoryTranslationSchema
>;
