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

/**
 * Where the owner answers a queued comment, relative to the frontend root.
 *
 * The queue lives inside the thing it belongs to — a tab on the business, not
 * a top-level dashboard entry — because an owner with two businesses would
 * otherwise read the two queues mixed together.
 *
 * The route lives here because the e-mail needs an absolute URL and only this
 * side builds it. The frontend owns the matching page (immigrant_fe#483); if
 * one moves, the other has to move with it, and this comment is the whole
 * warning that they are a pair.
 */
export function commentQueuePath(target: string, targetId: string): string {
  switch (target) {
    case 'business':
      return `/dashboard/my-business/${targetId}/comments`;
    case 'event':
      return `/dashboard/events/${targetId}/comments`;
    case 'itinerary':
      return `/dashboard/itineraries/${targetId}/comments`;
    default:
      return '/dashboard/admin/blog';
  }
}

/** How much of a comment the queue and the e-mail show before it is opened. */
export const COMMENT_EXCERPT_LENGTH = 140;
