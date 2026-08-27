import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CountryService } from '../countries/country.service';
import {
  AiRouterService,
  GeminiBaseService,
  suggestionsSchema,
  SuggestionsType,
  visaRecommendationSchema,
  VisaRecommendationType,
  buildCountriesMatchPrompt,
  buildBestVisaTypePrompt,
  stripEmDashes,
  type BestVisaTypePromptOptions,
} from '@app/ai';

/**
 * Still extends `GeminiBaseService`, but only for embeddings now.
 *
 * The two text generations go through `AiRouterService`: when Gemini's prepaid
 * credit ran out, these were the calls that died with no second option while
 * the whole worker kept answering through its fallback chains. Embeddings stay
 * direct because OpenRouter has no embeddings endpoint — and they already
 * degrade to null instead of throwing, so they were never the outage.
 */
@Injectable()
export class GeminiService extends GeminiBaseService {
  constructor(
    configService: ConfigService,
    private readonly countryService: CountryService,
    private readonly aiRouter: AiRouterService,
  ) {
    super(configService);
  }

  async generateSuggestions(
    userInformation: string,
    language: string,
  ): Promise<SuggestionsType | null> {
    const countriesList = await this.countryService.findAllNames();
    const availableCountries = countriesList.map((country) => country.name);
    const prompt = buildCountriesMatchPrompt(
      userInformation,
      availableCountries,
      language,
    );

    const { data } = await this.aiRouter.generateJson(
      'quiz_suggestions',
      prompt,
      suggestionsSchema,
      { entityType: 'quiz' },
    );

    return data;
  }

  async generateVisaSuggestion(
    userDetails: {
      profession?: string;
      country_origin?: string;
      plan_period?: string;
      goal?: string;
      nationality?: string;
      job_offer?: string;
      income_band?: string;
    },
    immigrationVisaTypes: Array<{
      id: string;
      category: string;
      description: string;
      source: string;
      processing_time?: string | null;
      estimated_cost?: string | null;
      main_requirements?: string[] | null;
    }>,
    language: string,
    options: BestVisaTypePromptOptions = {},
  ): Promise<VisaRecommendationType | null> {
    const prompt = buildBestVisaTypePrompt(
      userDetails,
      immigrationVisaTypes,
      language,
      options,
    );

    const { data: parsed } = await this.aiRouter.generateJson(
      'visa_recommendation',
      prompt,
      visaRecommendationSchema,
      { entityType: 'quiz' },
    );
    if (!parsed) return parsed;

    // Só a prosa passa pela limpeza. O id é identificador, não texto: mesmo
    // sendo inofensivo hoje (a regex não toca hífen ASCII), sanitizar
    // identificador é o tipo de hábito que um dia corrompe um.
    return {
      ...parsed,
      explanations: stripEmDashes(parsed.explanations),
    };
  }
}
