import { normalizeCountryName } from '@app/ai';
import { pickTranslation } from '../countries/country-translation.util';
import { GeminiService } from './gemini.service';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { StepType } from './dto/types.dto';
import {
  Steps,
  SuggestionsDto,
  SuggestionsResponseDto,
} from './dto/suggestions.dto';
import { CountryService } from '../countries/country.service';
import { SystemRepository } from './system.repository';
import { Prisma, Suggestions } from 'generated/prisma';
import { UserDetailsQueryDto } from '../users/dto/user-details-query.dto';

@Injectable()
export class SystemService {
  private readonly logger = new Logger(SystemService.name);

  constructor(
    private readonly geminiService: GeminiService,
    private readonly countryService: CountryService,
    private readonly systemRepository: SystemRepository,
  ) {}

  async getCountries() {
    return await this.countryService.findAll();
  }

  async createSuggestions({
    steps,
    parameters,
    language = 'en',
  }: SuggestionsDto & {
    parameters: SuggestionsDto;
    language?: string;
  }): Promise<SuggestionsResponseDto> {
    try {
      let prompt = '';

      steps.forEach((step) => {
        prompt += this.getUserAnswerBasedOnStepType(step);
      });

      const suggestions =
        await this.getSuggestionsAccordingToParameters(parameters);

      if (suggestions) {
        const data = await this.getSuggestionAccordingToLanguage(
          suggestions.id,
          language,
        );

        if (data) {
          return data;
        } else {
          const geminiResponse = await this.geminiService.generateSuggestions(
            prompt,
            language,
          );

          const enrichedSuggestions =
            await this.enrichSuggestionsWithCountryDetails(
              geminiResponse?.suggestions || [],
              language,
            );

          const suggestion =
            await this.systemRepository.createSuggestionLanguages(
              suggestions.id,
              language,
              JSON.stringify(enrichedSuggestions),
            );

          return {
            suggestions: enrichedSuggestions,
            suggestion_id: suggestion?.suggestion_id || '',
          };
        }
      }

      const response = await this.geminiService.generateSuggestions(
        prompt,
        language,
      );

      const enrichedSuggestions =
        await this.enrichSuggestionsWithCountryDetails(
          response?.suggestions || [],
          language,
        );

      const embeddings = await this.geminiService.generateEmbeddings(
        this.jsonToEmbeddingArrayOfObjects(steps, language),
      );

      const suggestion = await this.systemRepository.createSuggestions(
        enrichedSuggestions as unknown as Prisma.InputJsonValue,
        embeddings,
        parameters,
        language,
      );

      this.logger.debug(`Suggestion created: ${suggestion?.suggestion_id}`);

      return {
        suggestions: enrichedSuggestions,
        suggestion_id: suggestion?.suggestion_id || '',
      };
    } catch (error) {
      this.logger.error(
        'Error creating suggestions',
        error instanceof Error ? error.stack : undefined,
      );
      throw new InternalServerErrorException('Failed to create suggestions');
    }
  }

  private async enrichSuggestionsWithCountryDetails(
    suggestions: Array<{ country: string; [key: string]: any }>,
    language: string,
  ): Promise<import('./dto/suggestions.dto').SuggestionItem[]> {
    return Promise.all(
      suggestions.map(async (suggestion) => {
        const country = await this.getCountryDetails(suggestion.country);

        // Build a full SuggestionItem with defaults for missing properties
        const item: any = {
          // `country` é chave de busca, sempre em inglês; `country_label` é o
          // que a tela mostra. Enquanto o modelo não devolver o rótulo, cair no
          // próprio `country` mantém o comportamento anterior.
          country: country?.name || suggestion.country,
          country_label:
            suggestion.country_label || country?.name || suggestion.country,
          compatibility:
            typeof suggestion.compatibility === 'number'
              ? suggestion.compatibility
              : 0,
          reasons: Array.isArray(suggestion.reasons) ? suggestion.reasons : [],
          cities: Array.isArray(suggestion.cities) ? suggestion.cities : [],
          visa_options: Array.isArray(suggestion.visa_options)
            ? suggestion.visa_options
            : [],
          country_background:
            country?.background_image || suggestion.country_background || '',
          country_flag: country?.flag || suggestion.country_flag || '',
          country_id: country?.id || suggestion.country_id || '',
          investment_required:
            pickTranslation(country?.translations, language)
              ?.investment_required ||
            suggestion.investment_required ||
            '',
          average_visa_processing_time:
            suggestion.average_visa_processing_time || '',
          job_market: suggestion.job_market || '',
          education_quality: suggestion.education_quality || '',
          difficulty: suggestion.difficulty || '',
          health_care: suggestion.health_care || '',
          languages: Array.isArray(suggestion.languages)
            ? suggestion.languages
            : [],
        };

        return item as import('./dto/suggestions.dto').SuggestionItem;
      }),
    );
  }

  private static readonly STEP_TEMPLATES: Record<
    StepType,
    (answer: string) => string
  > = {
    [StepType.TARGET]: (a) => `My main immigration goal is: ${a}.`,
    [StepType.ENGLISH]: (a) => `My English fluency level is: ${a}.`,
    [StepType.BUDGET]: (a) =>
      `I have approximately ${a} dollars available for immigration-related expenses.`,
    [StepType.EDUCATION]: (a) => `My highest level of education is: ${a}.`,
    [StepType.PROFESSIONAL]: (a) =>
      `I have around ${a} years of professional work experience.`,
    [StepType.CLIMATE]: (a) => `I prefer a climate that is ${a}.`,
    [StepType.FAMILY]: (a) => `Regarding family considerations, ${a}.`,
    [StepType.COUNTRY]: (a) =>
      `I am most interested in immigrating to countries like ${a}.`,
  };

  getUserAnswerBasedOnStepType = (step: Steps): string => {
    const template = SystemService.STEP_TEMPLATES[step.type];
    return template ? template(step.answer) : '';
  };

  getCountryDetails = async (country: string) => {
    const exact = await this.countryService.findOneByName(country);
    if (exact) return exact;

    // Segunda tentativa, tolerante a caixa, acento, espaço e pontuação. Sai
    // barata: são 62 países, carregados uma vez por requisição de sugestão.
    const wanted = normalizeCountryName(country);
    const all = await this.countryService.findAllNames();
    const loose = all.find(
      (candidate) => normalizeCountryName(candidate.name) === wanted,
    );

    if (loose) {
      this.logger.warn(
        `Country matched only after normalization: "${country}" -> "${loose.name}". ` +
          'The model is not copying the name verbatim from the list.',
      );
      return await this.countryService.findOneByName(loose.name);
    }

    // Falhava em silêncio: sem log nenhum, o resultado chegava ao usuário sem
    // foto, sem bandeira e sem country_id, e não havia como saber por quê.
    this.logger.error(
      `Country not found for "${country}". The suggestion will be served ` +
        'without image, flag and country_id, and a plan created from it will ' +
        'have no visa types.',
    );
    return null;
  };

  async getSuggestionsWithEmbeddings(
    text: string,
  ): Promise<Suggestions[] | null> {
    this.logger.debug(
      `Generating embeddings for text: ${text.substring(0, 100)}...`,
    );

    const embeddings = await this.geminiService.generateEmbeddings(text);

    if (!embeddings) {
      this.logger.debug('No embeddings generated');
      return null;
    }

    this.logger.debug(
      `Generated embeddings with dimension: ${embeddings.length}`,
    );

    const data = await this.systemRepository.getRawSuggestionsWithEmbeddings(
      embeddings || null,
    );

    if (data && data.length > 0) {
      this.logger.debug(`Found ${data.length} suggestions from database`);
    } else {
      this.logger.debug('No suggestions found in database');
    }

    return data;
  }

  async getSuggestionsAccordingToParameters(
    parameters: SuggestionsDto,
  ): Promise<Suggestions | null> {
    return await this.systemRepository.getRawSuggestionsWithParameters(
      parameters,
    );
  }

  jsonToEmbeddingObject(
    obj: Record<string, any>,
    prefix = '',
    depth = 0,
  ): string {
    const indent = '  '.repeat(depth);
    let result = '';

    for (const [key, value] of Object.entries(obj)) {
      const label = prefix ? `${prefix}.${key}` : key;

      if (Array.isArray(value)) {
        result += `${indent}${label}: ${value.join(', ')}\n`;
      } else if (value !== null && typeof value === 'object') {
        result += `${indent}${label}:\n`;
        result += this.jsonToEmbeddingObject(value, label, depth + 1);
      } else {
        result += `${indent}${label}: ${value}\n`;
      }
    }

    return result.trim();
  }

  jsonToEmbeddingArrayOfObjects(input: any, prefix = '', depth = 0): string {
    const indent = '  '.repeat(depth);
    let result = '';

    if (Array.isArray(input)) {
      input.forEach((item, index) => {
        result += `${indent}${prefix ? `${prefix}[${index}]` : `[${index}]`}:\n`;
        result +=
          this.jsonToEmbeddingArrayOfObjects(item, '', depth + 1) + '\n';
      });
    } else if (input !== null && typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        const label = prefix ? `${prefix}.${key}` : key;

        if (Array.isArray(value)) {
          result += `${indent}${label}: ${value.join(', ')}\n`;
        } else if (value !== null && typeof value === 'object') {
          result += `${indent}${label}:\n`;
          result +=
            this.jsonToEmbeddingArrayOfObjects(value, label, depth + 1) + '\n';
        } else {
          result += `${indent}${label}: ${String(value)}\n`;
        }
      }
    } else {
      result += `${indent}${prefix}: ${input}\n`;
    }

    return result.trim();
  }

  getSuggestionAccordingToLanguage = async (
    suggestionId: string,
    language: string,
  ): Promise<SuggestionsResponseDto | null> => {
    return await this.systemRepository.getSuggestionAccordingToLanguage(
      suggestionId,
      language,
    );
  };

  getSelectedBestVisaType = async (
    userDetails: UserDetailsQueryDto,
    countryId: string,
    language = 'en',
  ) => {
    try {
      const country = await this.countryService.getCountryById(countryId);

      const embeddings = await this.geminiService.generateEmbeddings(
        this.jsonToEmbeddingArrayOfObjects({ ...userDetails }, language),
      );

      this.logger.debug(
        `Getting best visa type for country ${countryId}, language: ${language}`,
      );

      const bestVisaTypeRecommendation =
        await this.systemRepository.getBestVisaTypeRecommendation(
          countryId,
          userDetails,
          language,
        );

      if (bestVisaTypeRecommendation) {
        const geminiResponse = bestVisaTypeRecommendation.gemini_response as {
          recommended_visa_type_id?: string;
          explanations?: string;
        };

        return {
          id: geminiResponse?.recommended_visa_type_id || '',
          explanations: geminiResponse?.explanations || '',
        };
      }

      const geminiResponse = await this.geminiService.generateVisaSuggestion(
        userDetails,
        country?.immigration_visa_types || [],
        language,
      );

      if (!geminiResponse) {
        return null;
      }

      await this.systemRepository.createVisaTypeRecommendation(
        countryId,
        geminiResponse,
        embeddings || null,
        userDetails,
        language,
      );

      return {
        id: geminiResponse?.recommended_visa_type_id || '',
        explanations: geminiResponse?.explanations || '',
      };
    } catch (error) {
      this.logger.error(
        'Error getting selected best visa type',
        error instanceof Error ? error.stack : undefined,
      );
      throw new InternalServerErrorException(
        'Failed to get visa type recommendation',
      );
    }
  };
}
