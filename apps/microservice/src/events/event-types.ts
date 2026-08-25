import { Job } from 'bullmq';

/**
 * SSE event types emitted by the workers. The frontend renders every event from
 * its title/message, and picks the toast variant from the `_failed` suffix.
 */
export const EVENT_TYPES = {
  BLOG_POST_GENERATED: 'blog_post_generated',
  BLOG_POST_FAILED: 'blog_post_failed',
  BLOG_COVER_IMAGE_COMPLETED: 'blog_cover_image_completed',
  BLOG_COVER_IMAGE_STARTED: 'blog_cover_image_started',
  BLOG_COVER_IMAGE_FAILED: 'blog_cover_image_failed',
  BLOG_REFINE_COMPLETED: 'blog_refine_completed',
  BLOG_REFINE_PARTIAL: 'blog_refine_partial',
  BLOG_REFINE_FAILED: 'blog_refine_failed',
  BLOG_TRANSLATION_COMPLETED: 'blog_translation_completed',
  BLOG_TRANSLATION_FAILED: 'blog_translation_failed',
  AI_IMAGE_COMPLETED: 'ai_image_completed',
  AI_IMAGE_FAILED: 'ai_image_failed',
  /** Crédito do OpenRouter esgotou: a geração segue pelo fallback, calada. */
  AI_CREDITS_EXHAUSTED: 'ai_credits_exhausted',
  CITY_INGESTION_READY: 'city_ingestion_ready',
  CITY_INGESTION_FAILED: 'city_ingestion_failed',
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];

/**
 * True once BullMQ has exhausted the configured attempts. The `failed` worker
 * event fires on every attempt, so notifying the user without this check would
 * send one error toast per retry.
 */
export function isFinalAttempt(job: Job): boolean {
  return job.attemptsMade >= (job.opts?.attempts ?? 1);
}
