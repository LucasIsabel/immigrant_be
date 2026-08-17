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

export function parseJsonResponse<T>(
  raw: string | undefined,
  schema: z.ZodType<T>,
  /** Named in the log line so a failure points at the model that produced it. */
  source = 'model',
): T | null {
  if (!raw) {
    logger.error(`${source} returned an empty response`);
    return null;
  }

  const cleaned = cleanJsonResponse(raw);

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    logger.error(
      `${source} response is not valid JSON: ${
        error instanceof Error ? error.message : String(error)
      }. Raw: ${truncateForLog(cleaned)}`,
    );
    return null;
  }

  const result = schema.safeParse(parsed);
  if (!result.success) {
    logger.error(
      `${source} response does not match the expected schema: ${
        result.error.issues
          .map(
            (issue) => `${issue.path.join('.') || '<root>'}: ${issue.message}`,
          )
          .join('; ') || 'unknown issue'
      }. Raw: ${truncateForLog(cleaned)}`,
    );
    return null;
  }

  return result.data;
}
