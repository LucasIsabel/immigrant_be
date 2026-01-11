import {
  GenerativeModel,
  GoogleGenerativeAI,
  TaskType,
} from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CountryService } from '../countries/country.service';
import {
  buildBestVisaTypePrompt,
  buildCountriesMatchPrompt,
} from './helpers/prompts';
import { z } from 'zod';

export const suggestionsSchema = z.object({
  suggestions: z.array(
    z.object({
      country: z.string(),
      compatibility: z.number(),
      reasons: z.array(z.string()),
      cities: z.array(z.string()),
      visa_options: z.array(z.string()),
      country_background: z.string(),
      country_flag: z.string(),
      investment_required: z.string(),
      average_visa_processing_time: z.string(),
      job_market: z.string(),
      education_quality: z.string(),
      difficulty: z.string(),
      health_care: z.string(),
      languages: z.array(z.string()),
    }),
  ),
});

export type SuggestionsType = z.infer<typeof suggestionsSchema>;

export const visaRecommendationSchema = z.object({
  recommended_visa_type_id: z.string().uuid(),
  explanations: z.string(),
});

export type VisaRecommendationType = z.infer<typeof visaRecommendationSchema>;

@Injectable()
export class GeminiService {
  private model: GenerativeModel;
  private embeddingModel: GenerativeModel;
  private genAI: GoogleGenerativeAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly countryService: CountryService,
  ) {
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

  async generateSuggestions(userInformation: string, language: string) {
    const countriesList = await this.countryService.findAllNames();

    const availableCountries = countriesList.map((country) => country.name);

    const prompt = buildCountriesMatchPrompt(
      userInformation,
      availableCountries,
      language,
    );

    const {
      response: { text },
    } = await this.model.generateContent(prompt);

    const response = text();

    const parsedResponse = this.parseSuggestionsResponse(response);

    return parsedResponse;
  }

  async generateVisaSuggestion(
    userDetails: {
      profession?: string;
      country_origin?: string;
      plan_period?: string;
    },
    immigrationVisaTypes: Array<{
      id: string;
      category: string;
      description: string;
      source: string;
      steps: unknown;
    }>,
  ) {
    const prompt = buildBestVisaTypePrompt(userDetails, immigrationVisaTypes);

    const {
      response: { text },
    } = await this.model.generateContent(prompt);

    const response = text();

    const parsedResponse = this.parseVisaRecommendationResponse(response);

    return parsedResponse;
  }

  parseSuggestionsResponse(raw: string | undefined): SuggestionsType | null {
    try {
      if (!raw) {
        return null;
      }
      return this.formatToValidJson(raw);
    } catch (error) {
      console.error('Error parsing model response:', error);
      return null;
    }
  }

  formatToValidJson(input: string) {
    const cleaned = input
      .replace(/^```json\s*/i, '')
      .replace(/```$/i, '')
      .trim();

    try {
      return JSON.parse(cleaned) as SuggestionsType;
    } catch (err) {
      throw new Error('String não é um JSON válido: ' + err);
    }
  }

  parseVisaRecommendationResponse(
    raw: string | undefined,
  ): VisaRecommendationType | null {
    try {
      if (!raw) {
        return null;
      }
      const cleaned = raw
        .replace(/^```json\s*/i, '')
        .replace(/```$/i, '')
        .trim();

      const parsed = JSON.parse(cleaned);
      return visaRecommendationSchema.parse(parsed);
    } catch (error) {
      console.error('Error parsing visa recommendation response:', error);
      return null;
    }
  }

  extractJson(text: string): string | null {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? match[0] : null;
  }

  async generateEmbeddings(text: string) {
    try {
      const response = await this.embeddingModel.embedContent({
        content: {
          role: 'user',
          parts: [{ text }],
        },
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        outputDimensionality: 768,
      } as any);

      console.log('response', response);

      if (!response?.embedding?.values) {
        return null;
      }

      const normalizedEmbedding = this.normalizeEmbedding(
        response.embedding.values,
      );

      return normalizedEmbedding;
    } catch (error) {
      console.error('Error generating embeddings:', error);
      return null;
    }
  }

  normalizeEmbedding(vec: number[]): number[] {
    const norm = Math.sqrt(vec.reduce((sum, val) => sum + val ** 2, 0));
    return vec.map((v) => v / norm);
  }
}
