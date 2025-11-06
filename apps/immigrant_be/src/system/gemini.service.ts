import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CountryService } from '../countries/country.service';
import { buildCountriesMatchPrompt } from './helpers/prompts';
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

@Injectable()
export class GeminiService {
  private client: GoogleGenAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly countryService: CountryService,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    this.client = new GoogleGenAI({
      apiKey,
    });
  }

  async generateSuggestions(userInformation: string, language: string) {
    console.log(language);

    const countriesList = await this.countryService.findAllNames();

    const availableCountries = countriesList.map((country) => country.name);

    const prompt = buildCountriesMatchPrompt(
      userInformation,
      availableCountries,
    );

    const response = await this.client.models.generateContent({
      contents: [prompt],
      model: 'gemini-2.0-flash',
    });

    const parsedResponse = this.parseSuggestionsResponse(response?.text);

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
      throw new Error('String não é um JSON válido: ' + err.message);
    }
  }

  extractJson(text: string): string | null {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? match[0] : null;
  }
}
