import { GeminiService } from './gemini.service';
import { Injectable } from '@nestjs/common';
import { StepType } from './dto/types.dto';
import {
  Steps,
  SuggestionsDto,
  SuggestionsResponseDto,
} from './dto/suggestions.dto';
import { CountryService } from '../countries/country.service';

@Injectable()
export class SystemService {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly countryService: CountryService,
  ) {}

  async getCountries() {
    return await this.countryService.findAll();
  }

  async createSuggestions({
    steps,
    language = 'en',
  }: SuggestionsDto & { language?: string }): Promise<SuggestionsResponseDto> {
    try {
      let prompt = '';

      steps.forEach((step) => {
        prompt += this.getUserAnswerBasedOnStepType(step);
      });

      const response = await this.geminiService.generateSuggestions(
        prompt,
        language,
      );

      const countryWithDetails = await Promise.all(
        response?.suggestions?.map(async (suggestion) => {
          const country = await this.getCountryDetails(suggestion.country);

          return {
            ...suggestion,
            country_background: country?.background_image || '',
            country_flag: country?.flag || '',
            investment_required: country?.investment_required || '',
          };
        }) || [],
      );

      return { suggestions: countryWithDetails };
    } catch {
      return {
        suggestions: [],
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

  async createPlan() {
    return await this.planService.create(createPlanDto);
  }
}
