/**
 * Flattens a business page's `typeData` into named fields the moderator can
 * read and, crucially, cite back.
 *
 * The moderation input used to carry eleven scalar fields and nothing else,
 * while `typeData` — the tours, the menu, the itinerary stops, the meeting
 * point — went unread. Handing the model a raw JSON dump would have closed
 * half the hole: the model could read the content but could not point at it,
 * and a flag reading `field: "typeData"` is not something an admin can find on
 * screen.
 *
 * So every leaf is named by its own path in the JSON — `tours[2].description`,
 * `menu[7].name`, `itinerary[0].photos[3].url` — and the model is told to cite
 * that key verbatim. The walk is generic rather than one flattener per
 * business type: the paths come out identical, no business-type lookup is
 * needed, and a new type is covered without new code.
 */

/** Per-field cap. Above the schema's own 2000, so valid content is never cut. */
export const MODERATION_FIELD_MAX_CHARS = 2500;

/**
 * Total text budget, roughly 15k tokens — 30 tours at their maximum length.
 * It exists because the schema does not cap everything it should (an itinerary
 * stop's description has no maximum at all), so the input is unbounded by
 * design for anyone willing to abuse it.
 */
export const MODERATION_TOTAL_MAX_CHARS = 60_000;

/** Guards against a deliberately pathological payload. */
const MAX_DEPTH = 6;
const MAX_FIELDS = 500;

const TRUNCATION_SUFFIX = '…[truncated]';
const URL_PATTERN = /^https?:\/\//i;

export interface FlattenedModerationContent {
  /** Path → text, e.g. `tours[2].description`. */
  text: Record<string, string>;
  /** Path → URL, e.g. `itinerary[0].photos[3].url`. */
  links: Record<string, string>;
  /** Something was dropped or cut, so the analysis is incomplete. */
  truncated: boolean;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function flattenModerationContent(
  value: unknown,
): FlattenedModerationContent {
  const text: Record<string, string> = {};
  const links: Record<string, string> = {};
  let totalChars = 0;
  let fieldCount = 0;
  let truncated = false;

  function visit(node: unknown, path: string, depth: number): void {
    if (depth > MAX_DEPTH) {
      truncated = true;
      return;
    }

    if (Array.isArray(node)) {
      node.forEach((item, index) =>
        visit(item, `${path}[${index}]`, depth + 1),
      );
      return;
    }

    if (isPlainObject(node)) {
      for (const [key, child] of Object.entries(node)) {
        // Identifiers carry no meaning for a moderator and only spend budget.
        if (key === 'id') continue;
        visit(child, path ? `${path}.${key}` : key, depth + 1);
      }
      return;
    }

    // Numbers, booleans and null hold nothing to moderate.
    if (typeof node !== 'string') return;

    const value = node.trim();
    if (!value) return;

    if (fieldCount >= MAX_FIELDS) {
      truncated = true;
      return;
    }

    if (URL_PATTERN.test(value)) {
      // Links are short and are what the adult-links rule needs, so they are
      // never dropped for want of text budget.
      links[path] = value;
      fieldCount += 1;
      return;
    }

    if (totalChars >= MODERATION_TOTAL_MAX_CHARS) {
      truncated = true;
      return;
    }

    let field = value;
    if (field.length > MODERATION_FIELD_MAX_CHARS) {
      field = field.slice(0, MODERATION_FIELD_MAX_CHARS) + TRUNCATION_SUFFIX;
      truncated = true;
    }

    text[path] = field;
    totalChars += field.length;
    fieldCount += 1;
  }

  if (isPlainObject(value)) {
    visit(value, '', 0);
  }

  return { text, links, truncated };
}
