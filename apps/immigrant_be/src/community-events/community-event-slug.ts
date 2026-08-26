/**
 * Slug rules for community events.
 *
 * `slugify` is a private copy of the one in the places ingestion, on purpose:
 * the three existing copies in this repo disagree on the length limit and one
 * appends `Date.now()`, so unifying them is a refactor of three working modules
 * and not part of this feature. The unification is tracked as maintenance.
 */
export function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

/**
 * The calendar date of an instant *in the event's own timezone*.
 *
 * `en-CA` is used because it formats as `YYYY-MM-DD`, which is both the stamp
 * we want and a stable key to compare two dates by.
 */
export function localDateStamp(instant: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(instant);
}

/**
 * `titulo-do-evento-20260912`: the date disambiguates a recurring event whose
 * title never changes, and it is the local date because that is the date the
 * organizer and the visitor both read on the page.
 */
export function buildEventSlugBase(
  title: string,
  startsAt: Date,
  timeZone: string,
): string {
  const base = slugify(title) || 'evento';
  return `${base}-${localDateStamp(startsAt, timeZone).replace(/-/g, '')}`;
}
