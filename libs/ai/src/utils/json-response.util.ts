import { Logger } from '@nestjs/common';
import { z } from 'zod';

/**
 * Turns a model's text answer into a validated object, or `null`.
 *
 * Extracted from `GeminiBaseService` so every provider shares one parser: the
 * failure modes are the model's, not the vendor's. A model wrapping JSON in a
 * fence, or drifting from the schema, happens on OpenRouter exactly as it did on
 * Gemini — and the caller's contract is the same either way, which is why this
 * returns `null` instead of throwing. Callers already treat `null` as "the model
 * did not answer usefully" and decide what to do.
 *
 * `GeminiBaseService` keeps its methods, delegating here, so the modules that
 * already depend on it (`system`, `business-pages`) are untouched.
 */

const logger = new Logger('AiJsonResponse');

export function cleanJsonResponse(raw: string): string {
  return raw
    .replace(/^```json\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
}

/** Keeps a failing payload readable in the logs without flooding them. */
function truncateForLog(text: string, max = 500): string {
  return text.length > max ? `${text.slice(0, max)}… (truncated)` : text;
}

/** Why an answer could not be used, for the caller that has to report it. */
export type ParseFailure = {
  reason: 'empty' | 'invalid_json' | 'schema_mismatch';
  detail: string;
};

/**
 * Discriminated on `ok` rather than on `data` being null: `T` is generic, so a
 * caller whose schema legitimately parses to `null` would otherwise make the
 * union impossible to narrow.
 */
export type ParseOutcome<T> =
  | { ok: true; data: T }
  | ({ ok: false } & ParseFailure);

/**
 * The same parsing, with the reason kept instead of thrown away.
 *
 * `parseJsonResponse` below answers `null` and puts the reason in a log line
 * that nobody reads afterwards — which is why 31 Sentry events could say a
 * place had no usable JSON without ever saying what was wrong with it. This
 * hands the reason back so the router can fail the link with it and the error
 * can carry it all the way to the screen.
 */
export function parseJsonResponseDetailed<T>(
  raw: string | undefined,
  schema: z.ZodType<T>,
  source = 'model',
): ParseOutcome<T> {
  if (!raw) {
    logger.error(`${source} returned an empty response`);
    return { ok: false, reason: 'empty', detail: 'empty response' };
  }

  const cleaned = cleanJsonResponse(raw);

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    logger.error(
      `${source} response is not valid JSON: ${detail}. Raw: ${truncateForLog(cleaned)}`,
    );
    return { ok: false, reason: 'invalid_json', detail };
  }

  const result = schema.safeParse(parsed);
  if (!result.success) {
    const detail =
      result.error.issues
        .map((issue) => `${issue.path.join('.') || '<root>'}: ${issue.message}`)
        .join('; ') || 'unknown issue';
    logger.error(
      `${source} response does not match the expected schema: ${detail}. Raw: ${truncateForLog(cleaned)}`,
    );
    return { ok: false, reason: 'schema_mismatch', detail };
  }

  return { ok: true, data: result.data };
}

export function parseJsonResponse<T>(
  raw: string | undefined,
  schema: z.ZodType<T>,
  /** Named in the log line so a failure points at the model that produced it. */
  source = 'model',
): T | null {
  // Kept for `GeminiBaseService` and the callers that only ever wanted "did it
  // work". One parser, two shapes of answer.
  const outcome = parseJsonResponseDetailed(raw, schema, source);
  return outcome.ok ? outcome.data : null;
}
