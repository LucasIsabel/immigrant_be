/**
 * Every kind of notification the product can write, in one place.
 *
 * There are two families and they are genuinely different, which is why they
 * are two constants rather than one merged list.
 */

/**
 * Emitted by the workers, addressed to admins. The prose is written in the
 * worker and stored in the `title`/`message` columns, so these read the same
 * whatever language the admin is browsing in. Migrating them to the
 * `type` + `payload` shape below is mechanical and deliberately not part of
 * this epic.
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
 * Emitted by the API, addressed to the person who owns the thing that changed.
 *
 * These carry no prose at all: the row holds facts and the frontend writes the
 * sentence. The reader's language is the one they are reading in, not the one
 * the admin happened to click in — a sentence stored in Portuguese would stay
 * Portuguese after someone switches to Spanish, and a key follows them.
 */
export const USER_NOTIFICATION_TYPES = {
  BUSINESS_PAGE_APPROVED: 'business_page_approved',
  BUSINESS_PAGE_REJECTED: 'business_page_rejected',
  COMMUNITY_EVENT_APPROVED: 'community_event_approved',
  COMMUNITY_EVENT_REJECTED: 'community_event_rejected',
  ITINERARY_COPIED: 'itinerary_copied',
} as const;

export type UserNotificationType =
  (typeof USER_NOTIFICATION_TYPES)[keyof typeof USER_NOTIFICATION_TYPES];

/**
 * What each type carries. The contract with the frontend lives here and is
 * mirrored by Zod parsers on the other side, because OpenAPI can only say
 * `payload: Object`.
 *
 * Names are a photograph of the moment: renaming a business later does not
 * rewrite the notification that announced it, exactly like the e-mail that
 * already goes out today.
 */
export interface NotificationPayloads {
  [USER_NOTIFICATION_TYPES.BUSINESS_PAGE_APPROVED]: {
    businessId: string;
    businessName: string;
    businessType: string;
    slug: string;
  };
  [USER_NOTIFICATION_TYPES.BUSINESS_PAGE_REJECTED]: {
    businessId: string;
    businessName: string;
    /** An update that was turned down leaves the previous version live. */
    isUpdate: boolean;
    /** The admin's own words, so it is the one field the frontend cannot translate. */
    reason: string | null;
  };
  [USER_NOTIFICATION_TYPES.COMMUNITY_EVENT_APPROVED]: {
    eventId: string;
    title: string;
    slug: string;
  };
  [USER_NOTIFICATION_TYPES.COMMUNITY_EVENT_REJECTED]: {
    eventId: string;
    title: string;
    reason: string | null;
    /** Distinguishes a refusal from taking a live event down. */
    wasPublished: boolean;
  };
  [USER_NOTIFICATION_TYPES.ITINERARY_COPIED]: {
    /** The source itinerary — never the copy, and never who copied it. */
    itineraryId: string;
    title: string;
    slug: string;
  };
}
