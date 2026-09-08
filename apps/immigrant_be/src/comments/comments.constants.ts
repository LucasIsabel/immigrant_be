/**
 * What a comment may carry a photo of.
 *
 * `post` is deliberately absent. A dish on a restaurant page is information;
 * an image under an article is mostly a door for spam, and it would hand the
 * newsroom a moderation queue it does not have today.
 */
export const PHOTO_TARGETS = new Set(['business', 'event', 'itinerary']);

/** Photos are the only upload this module accepts. */
export const ALLOWED_COMMENT_IMAGE_MIMES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

export const MAX_COMMENT_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export const MAX_COMMENT_BODY_LENGTH = 2000;
