import { GeminiService } from './gemini.service';
import { Injectable } from '@nestjs/common';
import { StepType } from './dto/types.dto';
import {
  Steps,
  SuggestionsDto,
  SuggestionsResponseDto,
} from './dto/suggestions.dto';
import { CountryService } from '../countries/country.service';
import { SystemRepository } from './system.repository';
import { Suggestions } from 'generated/prisma';
import { UserDetailsQueryDto } from '../users/dto/user-details-query.dto';
@Injectable()
export class SystemService {
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

      // const suggestions = await this.getSuggestionsWithEmbeddings(
      //   this.jsonToEmbeddingArrayOfObjects(steps, language),
      // );

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

          const geminiAnswerSuggestions = await Promise.all(
            geminiResponse?.suggestions?.map(async (suggestion) => {
              const country = await this.getCountryDetails(suggestion.country);

              return {
                ...suggestion,
                country_id: country?.id || '',
                country_background: country?.background_image || '',
                country_flag: country?.flag || '',
                investment_required: country?.investment_required || '',
              };
            }) || [],
          );

          const suggestion =
            await this.systemRepository.createSuggestionLanguages(
              suggestions.id,
              language,
              JSON.stringify(geminiAnswerSuggestions),
            );

          return {
            suggestions: geminiAnswerSuggestions,
            suggestion_id: suggestion?.suggestion_id || '',
          };
        }
      }

      const response = await this.geminiService.generateSuggestions(
        prompt,
        language,
      );

      const answerSuggestions = await Promise.all(
        response?.suggestions?.map(async (suggestion) => {
          const country = await this.getCountryDetails(suggestion.country);

          return {
            ...suggestion,
            country_id: country?.id || '',
            country_background: country?.background_image || '',
            country_flag: country?.flag || '',
            investment_required: country?.investment_required || '',
          };
        }) || [],
      );

      const embeddings = await this.geminiService.generateEmbeddings(
        this.jsonToEmbeddingArrayOfObjects(steps, language),
      );

      const suggestion = await this.systemRepository.createSuggestions(
        answerSuggestions,
        embeddings,
        parameters,
        language,
      );

      console.log('suggestion', suggestion);

      return {
        suggestions: answerSuggestions,
        suggestion_id: suggestion?.suggestion_id || '',
      };
    } catch (error) {
      console.error('Error creating suggestions:', error);
      return {
        suggestions: [],
        suggestion_id: '',
      };
    }
  }

  getUserAnswerBasedOnStepType = (step: Steps) => {
    switch (step.type) {
      case StepType.TARGET:
        return `My main immigration goal is: ${step.answer}.`;
      case StepType.ENGLISH:
        return `My English fluency level is: ${step.answer}.`;
      case StepType.BUDGET:
        return `I have approximately ${step.answer} dollars available for immigration-related expenses.`;
      case StepType.EDUCATION:
        return `My highest level of education is: ${step.answer}.`;
      case StepType.PROFESSIONAL:
        return `I have around ${step.answer} years of professional work experience.`;
      case StepType.CLIMATE:
        return `I prefer a climate that is ${step.answer}.`;
      case StepType.FAMILY:
        return `Regarding family considerations, ${step.answer}.`;
      case StepType.COUNTRY:
        return `I am most interested in immigrating to countries like ${step.answer}.`;
      default:
        return '';
    }
  };

  getCountryDetails = async (country: string) => {
    return await this.countryService.findOneByName(country);
  };

  async getSuggestionsWithEmbeddings(
    text: string,
  ): Promise<Suggestions[] | null> {
    try {
      console.log(
        'Generating embeddings for text:',
        text.substring(0, 100) + '...',
      );

      const embeddings = await this.geminiService.generateEmbeddings(text);

      if (!embeddings) {
        console.log('No embeddings generated');
        return null;
      }

      console.log(`Generated embeddings with dimension: ${embeddings.length}`);

      const data = await this.systemRepository.getRawSuggestionsWithEmbeddings(
        embeddings || null,
      );

      if (data && data.length > 0) {
        console.log(`Found ${data.length} suggestions from database`);
      } else {
        console.log('No suggestions found in database');
      }

      return data;
    } catch (error) {
      console.error('Error fetching suggestions with embeddings:', error);
      return null;
    }
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
      console.error('Error getting selected best visa type:', error);
      return null;
    }
  };
}
