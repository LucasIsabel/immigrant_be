import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AiImageOptions,
  AiImageProvider,
  AiImageResult,
  AiProviderError,
  AiProviderName,
  AiTextProvider,
  AiTextResult,
  AiUsage,
  InsufficientCreditsError,
  RateLimitedError,
} from './ai-provider.types';

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

/**
 * Talks to OpenRouter over plain HTTP.
 *
 * Deliberately not using `@openrouter/sdk`: it ships ESM only, and this repo is
 * CommonJS with ts-jest. Making the SDK importable means either `allowJs` across
 * the monorepo or a second transformer — both change compilation for every file
 * to buy typed models for a surface we call in exactly two shapes and wrap behind
 * `AiTextProvider`/`AiImageProvider` anyway. `fetch` is native on Node 22 and
 * trivially mockable in tests.
 */
@Injectable()
export class OpenRouterService implements AiTextProvider, AiImageProvider {
  readonly name: AiProviderName = 'openrouter';
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPEN_ROUTER');

    // `envSchema` já barra a ausência no boot; isto é a mesma guarda que o
    // GeminiBaseService tem, para o invariante viver junto de quem depende dele
    // e não só num arquivo de config distante. Nunca logar o valor.
    if (!apiKey) {
      throw new Error('OPEN_ROUTER is not configured');
    }

    this.apiKey = apiKey;
  }

  private headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      // OpenRouter attributes traffic by these; they also appear on the
      // dashboard, which is how spend gets traced back to this app.
      'HTTP-Referer': 'https://aloravia.com',
      'X-Title': 'Aloravia',
    };
  }

  /**
   * Translates transport failures into the two decisions the router can make:
   * wait (429) or give up on OpenRouter entirely (402).
   */
  private async toError(response: Response): Promise<Error> {
    const body = await response.text().catch(() => '');
    const detail = body.slice(0, 300);

    if (response.status === 402) {
      return new InsufficientCreditsError(this.name, `402: ${detail}`);
    }

    if (response.status === 429) {
      const header = response.headers.get('retry-after');
      // `Retry-After` is seconds, sometimes a date. Only the numeric form is
      // useful here; anything else falls through as undefined and the router
      // moves on instead of guessing.
      const seconds = header ? Number(header) : Number.NaN;
      return new RateLimitedError(
        this.name,
        Number.isFinite(seconds) ? seconds * 1000 : undefined,
        `429: ${detail}`,
      );
    }

    return new AiProviderError(
      this.name,
      response.status,
      `${response.status}: ${detail}`,
    );
  }

  private usageFrom(raw: unknown): AiUsage {
    const usage = (raw ?? {}) as {
      prompt_tokens?: number;
      completion_tokens?: number;
      cost?: number;
    };

    return {
      inputTokens: usage.prompt_tokens,
      outputTokens: usage.completion_tokens,
      // OpenRouter reports the real charge, so nothing is estimated here. When
      // it is absent the log row simply has no cost rather than a made-up one.
      costUsd: usage.cost,
    };
  }

  async generateText(model: string, prompt: string): Promise<AiTextResult> {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        // Asks OpenRouter to report what the call actually cost.
        usage: { include: true },
      }),
    });

    if (!response.ok) {
      throw await this.toError(response);
    }

    const payload = (await response.json()) as {
      model?: string;
      choices?: Array<{ message?: { content?: string } }>;
      usage?: unknown;
    };

    const text = payload.choices?.[0]?.message?.content;

    if (!text) {
      throw new AiProviderError(
        this.name,
        response.status,
        'OpenRouter returned no message content',
      );
    }

    return {
      text,
      // The response says which model answered — it can differ from the request
      // when OpenRouter routes internally, and the usage log should record the
      // one that ran.
      model: payload.model ?? model,
      provider: this.name,
      usage: this.usageFrom(payload.usage),
    };
  }

  async generateImage(
    model: string,
    prompt: string,
    options: AiImageOptions = {},
  ): Promise<AiImageResult> {
    const response = await fetch(`${OPENROUTER_BASE_URL}/images`, {
      method: 'POST',
      headers: this.headers(),
      // Only the keys the caller set are sent. Passing `undefined` explicitly
      // would serialise the field away anyway, but building the body this way
      // keeps the request identical to the old one when no options are given —
      // so adding this parameter changed no existing call's behaviour.
      body: JSON.stringify({
        model,
        prompt,
        ...(options.aspectRatio ? { aspect_ratio: options.aspectRatio } : {}),
        ...(options.resolution ? { resolution: options.resolution } : {}),
        ...(options.outputFormat
          ? { output_format: options.outputFormat }
          : {}),
        ...(options.outputCompression === undefined
          ? {}
          : { output_compression: options.outputCompression }),
      }),
    });

    if (!response.ok) {
      throw await this.toError(response);
    }

    const payload = (await response.json()) as {
      model?: string;
      data?: Array<{ b64_json?: string; url?: string }>;
      usage?: unknown;
    };

    const first = payload.data?.[0];

    if (first?.b64_json) {
      return {
        image: Buffer.from(first.b64_json, 'base64'),
        model: payload.model ?? model,
        provider: this.name,
        usage: this.usageFrom(payload.usage),
      };
    }

    // Some providers hand back a URL instead of inline base64. Fetching it here
    // keeps the caller's contract a Buffer either way — callers upload to R2 and
    // have no business knowing which provider inlines and which does not.
    if (first?.url) {
      const image = await fetch(first.url);

      if (!image.ok) {
        throw new AiProviderError(
          this.name,
          image.status,
          `Could not download the generated image from ${first.url}`,
        );
      }

      return {
        image: Buffer.from(await image.arrayBuffer()),
        model: payload.model ?? model,
        provider: this.name,
        usage: this.usageFrom(payload.usage),
      };
    }

    throw new AiProviderError(
      this.name,
      response.status,
      'OpenRouter returned no image data',
    );
  }
}
