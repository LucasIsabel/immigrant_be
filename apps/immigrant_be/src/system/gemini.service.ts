import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CountryService } from '../countries/country.service';
import {
  GeminiBaseService,
  suggestionsSchema,
  SuggestionsType,
  visaRecommendationSchema,
  VisaRecommendationType,
  buildCountriesMatchPrompt,
  buildBestVisaTypePrompt,
  stripEmDashes,
} from '@app/ai';

@Injectable()
export class GeminiService extends GeminiBaseService {
  constructor(
    configService: ConfigService,
    private readonly countryService: CountryService,
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

    const {
      response: { text },
    } = await this.model.generateContent(prompt);

    return this.parseJsonResponse(text(), suggestionsSchema);
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
    }>,
    language: string,
  ): Promise<VisaRecommendationType | null> {
    const prompt = buildBestVisaTypePrompt(
      userDetails,
      immigrationVisaTypes,
      language,
    );

    const {
      response: { text },
    } = await this.model.generateContent(prompt);

    const parsed = this.parseJsonResponse(text(), visaRecommendationSchema);
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
