import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import { buildVisaStepsPrompt } from './helpers/prompts';

export const visaStepsSchema = z.object({
  documents: z.array(z.string().min(1)),
  required_funds: z.string().min(1),
  steps: z.array(z.string().min(1)),
});

export type VisaStepsType = z.infer<typeof visaStepsSchema>;

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private model: GenerativeModel;
  private embeddingModel: GenerativeModel;
  private genAI: GoogleGenerativeAI;

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

  async generateVisaSteps(
    visaType: {
      category: string;
      description: string;
      source: string;
    },
    language: string,
  ): Promise<VisaStepsType | null> {
    const prompt = buildVisaStepsPrompt(visaType, language);

    const {
      response: { text },
    } = await this.model.generateContent(prompt);

    const response = text();

    return this.parseVisaStepsResponse(response);
  }

  parseVisaStepsResponse(raw: string | undefined): VisaStepsType | null {
    try {
      if (!raw) {
        return null;
      }
      const cleaned = raw
        .replace(/^```json\s*/i, '')
        .replace(/```$/i, '')
        .trim();

      const parsed = JSON.parse(cleaned);
      return visaStepsSchema.parse(parsed);
    } catch (error) {
      this.logger.error(
        'Error parsing visa steps response',
        error instanceof Error ? error.stack : undefined,
      );
      return null;
    }
  }
}
