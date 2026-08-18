/**
 * Vocabulary shared by every AI provider.
 *
 * The app talks to models through `AiRouterService`, never to a provider
 * directly. This file is the contract between the two: what a caller asks for,
 * what it gets back, and the two failure modes that must be told apart because
 * they lead to different decisions.
 */

/**
 * What the model is being asked to do, not which model does it.
 *
 * The mapping from scenario to model lives in the `ai_model_configs` table, so
 * swapping a model is a row update rather than a deploy. Callers name the job;
 * the router picks the tool.
 */
export const AI_SCENARIOS = [
  /** Routine, news-driven posts. Optimised for cost. */
  'blog_writing_standard',
  /** Signed opinion columns. Optimised for voice and guardrail adherence. */
  'blog_writing_opinion',
  /** Mechanical, schema-validated. The cheapest model that keeps Markdown intact. */
  'blog_translation',
  /** Cover and inline illustrations. */
  'blog_image',
] as const;

export type AiScenario = (typeof AI_SCENARIOS)[number];

/**
 * Marks a model as served by the Gemini API directly instead of OpenRouter.
 *
 * The last link of every fallback chain uses this prefix: when OpenRouter is out
 * of credit the whole account is out, so a chain made only of OpenRouter models
 * would have no way to degrade.
 */
export const GEMINI_DIRECT_PREFIX = 'gemini-direct:';

export function isGeminiDirect(model: string): boolean {
  return model.startsWith(GEMINI_DIRECT_PREFIX);
}

export function stripGeminiDirectPrefix(model: string): string {
  return model.slice(GEMINI_DIRECT_PREFIX.length);
}

export type AiUsage = {
  inputTokens?: number;
  outputTokens?: number;
  /** Reported by the provider when it can; never estimated here. */
  costUsd?: number;
};

export type AiTextResult = {
  text: string;
  /** The model that actually answered, which may differ from the one asked for. */
  model: string;
  provider: AiProviderName;
  usage: AiUsage;
};

export type AiImageResult = {
  image: Buffer;
  model: string;
  provider: AiProviderName;
  usage: AiUsage;
};

/**
 * Shape of the image being asked for, as opposed to its subject.
 *
 * Without this the request carried only a prompt, so the provider picked the
 * geometry — and its default is square. Every consumer we have crops to a wide
 * strip, so a square generation is a silent quality loss: the subject survives,
 * the framing does not.
 *
 * Both fields cost money to get wrong. `resolution` is priced per image token,
 * so a tier up is a bill up, not a rounding difference. `outputFormat` decides
 * whether a photograph ships as PNG, which for this content is several times the
 * bytes of the same image as JPEG.
 */
export type AiImageOptions = {
  /** Documented tiers; the provider's own default is 1:1. */
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '1:4' | '4:1';
  resolution?: '512' | '1K' | '2K' | '4K';
  /** Photographs belong in `jpeg`; `png` only for flat art or transparency. */
  outputFormat?: 'png' | 'jpeg' | 'webp';
  /** 0–100. Ignored by the provider for formats that are already lossless. */
  outputCompression?: number;
};

export type AiProviderName = 'openrouter' | 'gemini-direct';

/**
 * Credits exhausted — HTTP 402.
 *
 * Distinct from a rate limit because retrying is pointless: credits belong to
 * the account, not to a request window, so every model on OpenRouter is equally
 * unavailable until someone tops up. The router treats this as "skip the rest of
 * OpenRouter" rather than "wait and try again".
 */
export class InsufficientCreditsError extends Error {
  constructor(
    readonly provider: AiProviderName,
    message?: string,
  ) {
    super(message ?? `${provider} reported insufficient credits`);
    this.name = 'InsufficientCreditsError';
  }
}

/**
 * Rate limited — HTTP 429. Worth waiting for, unlike a credit failure.
 */
export class RateLimitedError extends Error {
  constructor(
    readonly provider: AiProviderName,
    /** From `Retry-After`, in milliseconds, when the provider sends it. */
    readonly retryAfterMs?: number,
    message?: string,
  ) {
    super(message ?? `${provider} rate limited the request`);
    this.name = 'RateLimitedError';
  }
}

/** Anything else the provider refused to answer. Retryable by the chain. */
export class AiProviderError extends Error {
  constructor(
    readonly provider: AiProviderName,
    readonly status?: number,
    message?: string,
  ) {
    super(message ?? `${provider} request failed`);
    this.name = 'AiProviderError';
  }
}

export interface AiTextProvider {
  readonly name: AiProviderName;
  generateText(model: string, prompt: string): Promise<AiTextResult>;
}

export interface AiImageProvider {
  readonly name: AiProviderName;
  generateImage(
    model: string,
    prompt: string,
    options?: AiImageOptions,
  ): Promise<AiImageResult>;
}
