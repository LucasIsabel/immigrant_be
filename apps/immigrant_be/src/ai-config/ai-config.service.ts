import {
  AI_SCENARIOS,
  AiRouterService,
  AiScenario,
  DEFAULT_MODEL_CHAINS,
  ModelConfigService,
} from '@app/ai';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AiConfigRepository } from './ai-config.repository';
import {
  AiModelConfigResponseDto,
  OpenRouterStatusDto,
  UpdateAiModelConfigDto,
} from './dto/ai-model-config.dto';
import { AiUsagePeriod, AiUsageQueryDto } from './dto/ai-usage-query.dto';
import { AiUsageResponseDto } from './dto/ai-usage-response.dto';

@Injectable()
export class AiConfigService {
  constructor(
    private readonly aiConfigRepository: AiConfigRepository,
    private readonly modelConfig: ModelConfigService,
    private readonly aiRouter: AiRouterService,
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

  /**
   * Só o cooldown. A presença da chave saiu daqui quando `OPEN_ROUTER` virou
   * obrigatória no `envSchema`: um campo que nunca pode ser falso não informa
   * nada, e sugerir que possa ser é pior que não expor.
   */
  async getOpenRouterStatus(): Promise<OpenRouterStatusDto> {
    return await this.aiRouter.getOpenRouterStatus();
  }

  async getUsage(query: AiUsageQueryDto): Promise<AiUsageResponseDto> {
    const period = query.period ?? AiUsagePeriod.week;
    const to = new Date();
    const from = new Date(to);

    if (period === AiUsagePeriod.day) {
      from.setUTCDate(from.getUTCDate() - 1);
    } else if (period === AiUsagePeriod.month) {
      from.setUTCDate(from.getUTCDate() - 30);
    } else {
      from.setUTCDate(from.getUTCDate() - 7);
    }

    const [
      totals,
      totalFailures,
      byScenario,
      byModel,
      byErrorKind,
      failuresByScenario,
      failuresByModel,
    ] = await this.aiConfigRepository.aggregateUsage(from);

    const scenarioFailures = new Map(
      failuresByScenario.map((row) => [row.scenario, row._count._all]),
    );
    const modelFailures = new Map(
      failuresByModel.map((row) => [row.model, row._count._all]),
    );

    return {
      period,
      from,
      to,
      totals: {
        calls: totals._count._all,
        costUsd:
          totals._sum.costUsd === null ? null : Number(totals._sum.costUsd),
        failures: totalFailures,
      },
      byScenario: byScenario.map((row) => ({
        scenario: row.scenario,
        calls: row._count._all,
        costUsd: row._sum.costUsd === null ? null : Number(row._sum.costUsd),
        failures: scenarioFailures.get(row.scenario) ?? 0,
      })),
      byModel: byModel.map((row) => ({
        model: row.model,
        calls: row._count._all,
        costUsd: row._sum.costUsd === null ? null : Number(row._sum.costUsd),
        failures: modelFailures.get(row.model) ?? 0,
      })),
      byErrorKind: byErrorKind.map((row) => ({
        errorKind: row.errorKind,
        count: row._count._all,
      })),
    };
  }
}
