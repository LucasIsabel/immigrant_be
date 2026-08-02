/**
 * Applied to every job that does not override it. Each queue talks to Gemini,
 * to R2 or to an external RSS feed, so a transient 5xx/timeout must be retried
 * instead of discarding the work — BullMQ defaults to a single attempt.
 * The retention caps keep completed/failed jobs available for inspection
 * without letting Redis grow unbounded.
 */
export const DEFAULT_JOB_OPTIONS = {
  attempts: 3,
  backoff: { type: 'exponential' as const, delay: 30_000 },
  removeOnComplete: 50,
  removeOnFail: 100,
};

export const AI_BLOG_QUEUE = 'ai_blog_queue';
export const GENERATE_AI_BLOG_POST = 'generate_ai_blog_post';

export const AI_BLOG_IMAGE_QUEUE = 'ai_blog_image_queue';
export const GENERATE_AI_BLOG_IMAGE = 'generate_ai_blog_image';
export const REFINE_AI_BLOG_POST = 'refine_ai_blog_post';

export const BLOG_TRANSLATION_QUEUE = 'blog_translation_queue';
export const TRANSLATE_BLOG_POST = 'translate_blog_post';
export const TRANSLATE_ALL_PENDING = 'translate_all_pending';

export const AI_IMAGE_QUEUE = 'ai_image_queue';
export const GENERATE_AI_IMAGE = 'generate_ai_image';
