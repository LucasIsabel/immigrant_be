import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import {
  AiImageOptions,
  AiImageProvider,
  AiImageResult,
  AiProviderError,
  AiProviderName,
  AiTextProvider,
  AiTextResult,
} from './ai-provider.types';

/**
 * The last link of every fallback chain.
 *
 * Uses the Gemini key the project already has, so it keeps working when
 * OpenRouter credits run out — a chain made only of OpenRouter models would have
 * nowhere to go, since credits belong to the account rather than to a model.
 *
 * Separate from `GeminiBaseService` on purpose: that class hardcodes one model
 * per task and is what the rest of the app already depends on. This one takes the
 * model as an argument, which is what a chain link needs.
 *
 * Reports no usage: the Gemini SDK does not return a cost, and inventing one
 * would poison `ai_usage_logs` with numbers nobody can reconcile against a bill.
 */
@Injectable()
export class GeminiDirectProvider implements AiTextProvider, AiImageProvider {
  readonly name: AiProviderName = 'gemini-direct';
  private readonly genAI?: GoogleGenerativeAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  private client(): GoogleGenerativeAI {
    if (!this.genAI) {
      throw new AiProviderError(
        this.name,
        undefined,
        'GEMINI_API_KEY is not configured',
      );
    }
    return this.genAI;
  }

  async generateText(model: string, prompt: string): Promise<AiTextResult> {
    const response = await this.client()
      .getGenerativeModel({ model })
      .generateContent(prompt);

    const text = response.response.text();

    if (!text) {
      throw new AiProviderError(
        this.name,
        undefined,
        'Gemini returned an empty response',
      );
    }

    return { text, model, provider: this.name, usage: {} };
  }

  /**
   * `options` is honoured on a best-effort basis, and only for aspect ratio.
   *
   * This SDK has no typed surface for image geometry, so the ratio rides in the
   * same untyped `generationConfig` the response modality already uses — it is
   * applied if this model version reads it and ignored otherwise. Resolution and
   * output format have no equivalent at all here.
   *
   * That asymmetry is acceptable because of where this provider sits: it is the
   * last link of the chain, reached only when OpenRouter is unavailable, where
   * the choice is a possibly mis-framed image or none. Callers that cannot use a
   * differently shaped image should check the result rather than assume it.
   */
  async generateImage(
    model: string,
    prompt: string,
    options: AiImageOptions = {},
  ): Promise<AiImageResult> {
    const response = await this.client()
      .getGenerativeModel({ model })
      .generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          ...(options.aspectRatio
            ? { imageConfig: { aspectRatio: options.aspectRatio } }
            : {}),
        } as never,
      });

    const part = response.response.candidates?.[0]?.content.parts.find((p) =>
      p.inlineData?.mimeType?.startsWith('image/'),
    );

    if (!part?.inlineData) {
      throw new AiProviderError(
        this.name,
        undefined,
        'Gemini returned no image data',
      );
    }

    return {
      image: Buffer.from(part.inlineData.data, 'base64'),
      model,
      provider: this.name,
      usage: {},
    };
  }
}
