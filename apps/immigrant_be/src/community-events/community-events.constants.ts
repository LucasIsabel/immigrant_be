/**
 * Version of the publishing terms an organizer accepts before creating an
 * event.
 *
 * The acceptance is stored on the row (`termsVersion` + `termsAcceptedAt`), so
 * bumping this constant makes every new submission carry the new version and
 * forces the frontend to show the current text again. Without a version,
 * "the organizer accepted the terms" proves nothing about *which* terms.
 */
export const COMMUNITY_EVENT_TERMS_VERSION = '2026-08-26';

/**
 * How many events one organizer may hold in review at the same time.
 *
 * The queue is reviewed by hand: a single account able to fill it is a single
 * account able to stop moderation for everybody else.
 */
export const MAX_PENDING_EVENTS_PER_ORGANIZER = 5;

/** Images — the cover and the gallery — are the only uploads this module accepts. */
export const ALLOWED_IMAGE_MIMES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * How many photos the gallery holds, on top of the cover.
 *
 * The cap is a product decision before it is a storage one: a page nobody
 * scrolls to the end of sells the event worse than eight good photos do.
 */
export const MAX_EVENT_GALLERY_IMAGES = 8;
