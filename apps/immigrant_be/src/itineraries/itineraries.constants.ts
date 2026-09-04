/**
 * How many itineraries one person may **create** in one country.
 *
 * A ceiling on authored content, not a storage quota: three routes per country
 * is what somebody keeps with care, and thirty is what nobody opens again.
 *
 * It is a guard-rail against mistake, **not** a control against abuse, and the
 * difference was measured rather than assumed. Two tabs submitting from an
 * already-full country both get 422 — the count is read after the third row
 * exists, so it holds. Six requests fired together from zero all succeed: they
 * all read zero before any of them commits. Anyone who wants more than three
 * can have them.
 *
 * That is accepted deliberately. Closing it means an advisory lock, the first
 * concurrency primitive in this repo, carried by every future maintainer — too
 * much machinery for a person ending up with a fourth itinerary. What keeps
 * the public listing honest is the anonymous report, not this number.
 *
 * Copies do not count. Somebody who copied three Portuguese itineraries would
 * otherwise be unable to write one of their own — and recopying to refresh a
 * copy would hit a wall they never built. The limit is about what a person
 * writes, and a copy is not their writing.
 */
export const MAX_CREATED_ITINERARIES_PER_COUNTRY = 3;
