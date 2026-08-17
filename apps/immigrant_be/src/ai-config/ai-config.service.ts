import {
  AI_SCENARIOS,
  AiRouterService,
  AiScenario,
  DEFAULT_MODEL_CHAINS,
  ModelConfigService,
  OpenRouterService,
} from '@app/ai';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AiConfigRepository } from './ai-config.repository';
import {
  AiModelConfigResponseDto,
  OpenRouterStatusDto,
  UpdateAiModelConfigDto,
} from './dto/ai-model-config.dto';

@Injectable()
export class AiConfigService {
  constructor(
    private readonly aiConfigRepository: AiConfigRepository,
    private readonly modelConfig: ModelConfigService,
    private readonly aiRouter: AiRouterService,
    private readonly openRouter: OpenRouterService,
  ) {}

  /**
   * Validated here rather than by `@IsIn` on a param DTO so the message can name
   * the accepted values — a wrong scenario is a typo, and a 400 that lists the
   * options costs one round trip less than one that does not.
   */
  private assertScenario(scenario: string): AiScenario {
    if (!(AI_SCENARIOS as readonly string[]).includes(scenario)) {
      throw new BadRequestException(
        `Unknown scenario "${scenario}". Accepted: ${AI_SCENARIOS.join(', ')}`,
      );
    }
    return scenario as AiScenario;
  }

  /**
   * Every scenario, including the ones with no row yet — those show the code
   * default with `persisted: false`, so the panel never hides a scenario just
   * because nobody has configured it.
   */
  async listConfigs(): Promise<AiModelConfigResponseDto[]> {
    const rows = await this.aiConfigRepository.findAll();
    const byScenario = new Map(rows.map((row) => [row.scenario, row]));

    return AI_SCENARIOS.map((scenario) => {
      const row = byScenario.get(scenario);

      if (row) {
        return {
          scenario,
          primaryModel: row.primaryModel,
          fallbackModels: row.fallbackModels,
          persisted: true,
        };
      }

      return {
        scenario,
        primaryModel: DEFAULT_MODEL_CHAINS[scenario].primaryModel,
        fallbackModels: DEFAULT_MODEL_CHAINS[scenario].fallbackModels,
        persisted: false,
      };
    });
  }

  async updateConfig(
    rawScenario: string,
    dto: UpdateAiModelConfigDto,
  ): Promise<AiModelConfigResponseDto> {
    const scenario = this.assertScenario(rawScenario);

    const row = await this.aiConfigRepository.upsert(scenario, {
      primaryModel: dto.primaryModel,
      fallbackModels: dto.fallbackModels,
    });

    // Without this the edit would only take effect after the cache TTL, which
    // reads as "the panel did nothing".
    this.modelConfig.invalidate(scenario);

    return {
      scenario: row.scenario,
      primaryModel: row.primaryModel,
      fallbackModels: row.fallbackModels,
      persisted: true,
    };
  }

  getOpenRouterStatus(): OpenRouterStatusDto {
    return {
      ...this.aiRouter.openRouterStatus,
      configured: this.openRouter.isConfigured,
    };
  }
}
