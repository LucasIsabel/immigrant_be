/**
 * The four things a comment can hang off.
 *
 * One union instead of four endpoints: the four surfaces share the whole
 * behaviour, and what differs — who moderates, whether a photo is allowed —
 * is policy the service applies, not shape the API repeats.
 */
export enum CommentTarget {
  POST = 'post',
  BUSINESS = 'business',
  EVENT = 'event',
  ITINERARY = 'itinerary',
}
