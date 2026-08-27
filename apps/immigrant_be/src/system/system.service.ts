import { normalizeCountryName } from '@app/ai';
import { hasFreedomOfMovement } from '@app/immigration';
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
  SuggestionItem,
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

      const passport = SystemService.passportFromSteps(steps);

      const suggestions =
        await this.getSuggestionsAccordingToParameters(parameters);

      if (suggestions) {
        const data = await this.getSuggestionAccordingToLanguage(
          suggestions.id,
          language,
          passport,
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
              passport,
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
          passport,
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
    passportIso2?: string,
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
          // Never taken from the model: whether a passport needs a visa is a
          // fact about two ISO codes, not a judgement, and the quiz prompt
          // that writes `reasons` is the same one that could get it wrong.
          freedom_of_movement: hasFreedomOfMovement(
            passportIso2,
            country?.iso2,
          ),
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
    /**
     * Vai antes do critério de vistos no raciocínio do modelo: elegibilidade,
     * acordos e tempo de processamento dependem do passaporte, e o prompt já
     * manda considerar "vistos ou oportunidades de residência".
     */
    [StepType.NATIONALITY]: (a) =>
      `I hold a ${a} passport, so assess visa eligibility, bilateral agreements ` +
      `and processing times from that citizenship.`,
  };

  /**
   * The ISO2 passport code the quiz was answered with, if it was asked.
   *
   * The `NATIONALITY` step already arrives as a two-letter code, so this is a
   * lookup and not a parse. It is `undefined` when the step is absent — an
   * older client, or a user who skipped it — and `hasFreedomOfMovement` then
   * answers `false`, which is the only honest reading of an unknown passport.
   */
  private static passportFromSteps(steps: Steps[]): string | undefined {
    return steps.find((step) => step.type === StepType.NATIONALITY)?.answer;
  }

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
    passportIso2?: string,
  ): Promise<SuggestionsResponseDto | null> => {
    const stored = await this.systemRepository.getSuggestionAccordingToLanguage(
      suggestionId,
      language,
    );

    if (!stored?.suggestions?.length) return stored;

    return {
      ...stored,
      suggestions: await this.refreshCountryFields(
        stored.suggestions,
        language,
        passportIso2,
      ),
    };
  };

  /**
   * Reidrata os campos que vieram do cadastro de países.
   *
   * `enrichSuggestionsWithCountryDetails` copia foto, bandeira e investimento
   * para dentro do JSON no momento da geração, e esse JSON é servido como
   * está. Quando o cadastro muda depois — imagem adicionada, bandeira
   * corrigida, tradução ajustada — a sugestão fica com o valor da época, para
   * sempre.
   *
   * Foi o que aconteceu em produção: Malta, Portugal, Thailand, Indonesia e
   * Costa Rica ficaram com `country_background` vazio mesmo tendo
   * `country_id` e bandeira preenchidos, porque na geração aquele país ainda
   * não tinha imagem. Hoje nenhum dos 62 países está sem imagem, e a sugestão
   * continuava vazia.
   *
   * Resolver na leitura cura o dado já gravado sem migração. O que a IA
   * escreveu — motivos, cidades, compatibilidade, `country_label` — não é
   * tocado: aquilo é do modelo, não do cadastro.
   */
  private async refreshCountryFields(
    suggestions: SuggestionItem[],
    language: string,
    passportIso2?: string,
  ): Promise<SuggestionItem[]> {
    const ids = [
      ...new Set(suggestions.map((s) => s.country_id).filter(Boolean)),
    ];

    const countries = await Promise.all(
      ids.map((id) => this.countryService.findOne(id).catch(() => null)),
    );
    const byId = new Map(
      countries.filter((c) => c != null).map((c) => [c.id, c]),
    );

    // `freedom_of_movement` is recomputed here for the same reason the photo
    // is: it belongs to the passport and the country, not to the snapshot.
    // Rows written before the field existed carry none at all, and a missing
    // boolean reads as "needs a visa" on the client — the exact wrong answer.
    return suggestions.map((suggestion) => {
      const country = byId.get(suggestion.country_id);

      if (!country) return { ...suggestion, freedom_of_movement: false };

      return {
        ...suggestion,
        country_background:
          country.background_image || suggestion.country_background,
        country_flag: country.flag || suggestion.country_flag,
        investment_required:
          pickTranslation(country.translations, language)
            ?.investment_required || suggestion.investment_required,
        freedom_of_movement: hasFreedomOfMovement(passportIso2, country.iso2),
      };
    });
  }

  getSelectedBestVisaType = async (
    userDetails: UserDetailsQueryDto,
    countryId: string,
    language = 'en',
  ) => {
    try {
      const country = await this.countryService.getCountryById(countryId);

      // Decided here, from two ISO codes, and then given to the model as an
      // instruction rather than asked of it. The boolean the client branches
      // on and the prose the user reads have to come from the same fact, or a
      // "no visa required" flag arrives next to a paragraph about a Type D.
      const freedomOfMovement = hasFreedomOfMovement(
        userDetails.nationality,
        country?.iso2,
      );

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

        // The cached row is keyed by (country_id, parameters, language) and
        // `parameters` is the whole DTO, nationality included, so a cached
        // recommendation cannot cross passports. The flag is still recomputed
        // rather than stored: rows written before this change have none, and
        // recomputing costs a set lookup.
        return {
          id: geminiResponse?.recommended_visa_type_id || '',
          explanations: geminiResponse?.explanations || '',
          freedom_of_movement: freedomOfMovement,
        };
      }

      const geminiResponse = await this.geminiService.generateVisaSuggestion(
        userDetails,
        country?.immigration_visa_types || [],
        language,
        { freedomOfMovement },
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
        freedom_of_movement: freedomOfMovement,
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
