import {
  GenerativeModel,
  GoogleGenerativeAI,
  TaskType,
} from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';
import {
  cleanJsonResponse,
  parseJsonResponse,
} from './utils/json-response.util';

@Injectable()
export class GeminiBaseService {
  private readonly logger = new Logger(GeminiBaseService.name);
  protected model: GenerativeModel;
  protected embeddingModel: GenerativeModel;
  protected genAI: GoogleGenerativeAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);

    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
    });

    this.embeddingModel = this.genAI.getGenerativeModel({
      model: 'gemini-embedding-001',
    });
  }

  /**
   * Kept as instance methods, delegating to the shared util.
   *
   * `system`, `business-pages` and the blog workers all call these; moving the
   * logic out without keeping the methods would turn a refactor into a
   * cross-module change. The util is where every provider — Gemini or
   * OpenRouter — now parses from.
   */
  cleanJsonResponse(raw: string): string {
    return cleanJsonResponse(raw);
  }

  parseJsonResponse<T>(
    raw: string | undefined,
    schema: z.ZodType<T>,
  ): T | null {
    return parseJsonResponse(raw, schema, 'Gemini');
  }

  async generateEmbeddings(text: string): Promise<number[] | null> {
    try {
      const response = await this.embeddingModel.embedContent({
        content: {
          role: 'user',
          parts: [{ text }],
        },
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        outputDimensionality: 768,
      } as any);

      this.logger.debug('Embedding response received');

      if (!response?.embedding?.values) {
        return null;
      }

      return this.normalizeEmbedding(response.embedding.values);
    } catch (error) {
      this.logger.error(
        'Error generating embeddings',
        error instanceof Error ? error.stack : undefined,
      );
      return null;
    }
  }

  async generateContent(prompt: string) {
    return this.model.generateContent(prompt);
  }

  async generateImage(prompt: string): Promise<Buffer | null> {
    try {
      const imageModel = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash-image',
      });

      const response = await imageModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ['IMAGE'] } as any,
      });

      const imagePart = response.response.candidates?.[0]?.content.parts.find(
        (p) => p.inlineData?.mimeType?.startsWith('image/'),
      );

      if (!imagePart?.inlineData) return null;

      return Buffer.from(imagePart.inlineData.data, 'base64');
    } catch (error) {
      this.logger.error(
        'Error generating image',
        error instanceof Error ? error.stack : undefined,
      );
      return null;
    }
  }

  normalizeEmbedding(vec: number[]): number[] {
    const norm = Math.sqrt(vec.reduce((sum, val) => sum + val ** 2, 0));
    return vec.map((v) => v / norm);
  }
}
