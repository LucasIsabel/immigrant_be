import { Injectable, Logger } from '@nestjs/common';
import {
  AiRouterService,
  businessPageModerationResultSchema,
  flattenModerationContent,
  type BusinessPageModerationResult,
  type BusinessPageModerationInput,
  buildBusinessPageModerationPrompt,
} from '@app/ai';

/**
 * Appended when the content was too large to be analysed in full. User-facing
 * copy, so it stays in Portuguese like the rest of the moderation summary.
 */
const TRUNCATED_SUMMARY_NOTE =
  ' Parte do conteúdo excedeu o limite de análise automática e não foi analisada.';

/** O veredicto e quem o produziu. `model` é `null` quando ninguém respondeu. */
export interface ModerationOutcome {
  result: BusinessPageModerationResult;
  model: string | null;
}

/**
 * O que fica gravado na página.
 *
 * `origin` responde a pergunta que o admin faz ao abrir a fila — "por que esta
 * página está aqui?" — sem custar mais que uma string: `gate` é o portão do
 * submit, `manual` é alguém que apertou analisar.
 */
export interface BusinessPageModerationRecord
  extends BusinessPageModerationResult {
  model: string | null;
  analyzedAt: string;
  origin: 'gate' | 'manual';
}

/** Empacota um veredicto para persistir. */
export function toModerationRecord(
  outcome: ModerationOutcome,
  origin: BusinessPageModerationRecord['origin'],
): BusinessPageModerationRecord {
  return {
    ...outcome.result,
    model: outcome.model,
    analyzedAt: new Date().toISOString(),
    origin,
  };
}

@Injectable()
export class BusinessPageModerationService {
  private readonly logger = new Logger(BusinessPageModerationService.name);

  constructor(private readonly aiRouter: AiRouterService) {}

  /**
   * Analisa o conteúdo e diz **quem** analisou.
   *
   * O modelo sempre esteve à mão: `generateJson` devolve `{ data, result }` e
   * `result.model` é quem respondeu. Era descartado, e sem ele um veredicto
   * gravado não conta de onde veio — que é metade do valor de gravá-lo.
   */
  async moderateContent(
    pendingContent: Record<string, unknown>,
    businessType: string,
    /** Só para correlacionar a chamada no `AiUsageLog`; a análise não usa. */
    pageId?: string,
  ): Promise<ModerationOutcome> {
    const input: BusinessPageModerationInput = {
      name:
        typeof pendingContent.name === 'string'
          ? pendingContent.name
          : undefined,
      description:
        typeof pendingContent.description === 'string'
          ? pendingContent.description
          : undefined,
      logoUrl:
        typeof pendingContent.logoUrl === 'string'
          ? pendingContent.logoUrl
          : undefined,
      coverPhotoUrl:
        typeof pendingContent.coverPhotoUrl === 'string'
          ? pendingContent.coverPhotoUrl
          : undefined,
      phone:
        typeof pendingContent.phone === 'string'
          ? pendingContent.phone
          : undefined,
      whatsapp:
        typeof pendingContent.whatsapp === 'string'
          ? pendingContent.whatsapp
          : undefined,
      email:
        typeof pendingContent.email === 'string'
          ? pendingContent.email
          : undefined,
      website:
        typeof pendingContent.website === 'string'
          ? pendingContent.website
          : undefined,
      address:
        typeof pendingContent.address === 'string'
          ? pendingContent.address
          : undefined,
      city:
        typeof pendingContent.city === 'string'
          ? pendingContent.city
          : undefined,
      businessType,
    };

    // `typeData` holds the tours, the menu and the itinerary — most of what a
    // page actually publishes — and none of it used to reach the moderator.
    const { text, links, truncated } = flattenModerationContent(
      pendingContent.typeData,
    );
    if (Object.keys(text).length > 0) input.typeDataText = text;
    if (Object.keys(links).length > 0) input.typeDataLinks = links;

    const prompt = buildBusinessPageModerationPrompt(input);

    try {
      const { data: parsed, result } = await this.aiRouter.generateJson(
        'business_moderation',
        prompt,
        businessPageModerationResultSchema,
        // Sem `entityId` nem o log de custo sabia de que página se tratava.
        { entityType: 'business_page', entityId: pageId },
      );

      if (!parsed) {
        this.logger.warn(
          'Failed to parse moderation response, defaulting to review',
        );
        return {
          result: {
            riskLevel: 'medium',
            flags: [],
            summary:
              'Não foi possível analisar o conteúdo automaticamente. Revisão manual recomendada.',
            recommendation: 'review',
          },
          // O modelo respondeu — respondeu mal. Guardar qual foi é o que
          // permite descobrir depois que um deles não sabe responder isto.
          model: result?.model ?? null,
        };
      }

      return {
        result: truncated ? this.floorForTruncation(parsed) : parsed,
        model: result?.model ?? null,
      };
    } catch (error) {
      this.logger.error(
        'Moderation AI call failed',
        error instanceof Error ? error.stack : undefined,
      );
      return {
        result: {
          riskLevel: 'medium',
          flags: [],
          summary: 'Erro na análise automática. Revisão manual recomendada.',
          recommendation: 'review',
        },
        // Ninguém respondeu; dizer que um modelo disse isto seria mentira.
        model: null,
      };
    }
  }

  /**
   * Content nobody read cannot be approved by the model alone, so a truncated
   * analysis never comes back better than "review". A verdict that is already
   * worse is left alone — this raises the floor, it never lowers a finding.
   */
  private floorForTruncation(
    result: BusinessPageModerationResult,
  ): BusinessPageModerationResult {
    return {
      ...result,
      riskLevel: result.riskLevel === 'low' ? 'medium' : result.riskLevel,
      recommendation:
        result.recommendation === 'approve' ? 'review' : result.recommendation,
      summary: result.summary + TRUNCATED_SUMMARY_NOTE,
    };
  }
}
