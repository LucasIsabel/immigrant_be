import {
  GenerativeModel,
  GoogleGenerativeAI,
  TaskType,
} from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

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

  cleanJsonResponse(raw: string): string {
    return raw
      .replace(/^```json\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();
  }

  parseJsonResponse<T>(
    raw: string | undefined,
    schema: z.ZodType<T>,
  ): T | null {
    try {
      if (!raw) {
        return null;
      }
      const cleaned = this.cleanJsonResponse(raw);
      const parsed = JSON.parse(cleaned);
      return schema.parse(parsed);
    } catch (error) {
      this.logger.error(
        'Error parsing JSON response',
        error instanceof Error ? error.stack : undefined,
      );
      return null;
    }
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

  normalizeEmbedding(vec: number[]): number[] {
    const norm = Math.sqrt(vec.reduce((sum, val) => sum + val ** 2, 0));
    return vec.map((v) => v / norm);
  }
}
