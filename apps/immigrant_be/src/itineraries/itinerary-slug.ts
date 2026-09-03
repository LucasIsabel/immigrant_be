/**
 * Slug rules for itineraries.
 *
 * `slugify` is a private copy, and that is a deliberate cost rather than an
 * oversight: this repo already carries five copies that disagree on the length
 * limit, and one of them appends `Date.now()`. Unifying them touches five
 * working modules and belongs to BE#177, not to this feature. Adding a sixth
 * copy with a comment is worse than five only if nobody writes the comment.
 */
export function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 140);
}

/**
 * The base of an itinerary's public URL.
 *
 * Built from the title once, at creation, and never rebuilt on rename — a link
 * somebody shared has to keep resolving, and a title is the one field its owner
 * is free to change at any moment.
 *
 * The fallback matters more than it looks: a title made only of emoji or of a
 * script this slugifier strips would otherwise produce an empty slug, and an
 * empty slug collides with every other empty slug on the unique index.
 */
export function buildItinerarySlugBase(title: string): string {
  return slugify(title) || 'roteiro';
}
