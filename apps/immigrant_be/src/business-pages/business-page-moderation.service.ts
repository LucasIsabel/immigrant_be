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

@Injectable()
export class BusinessPageModerationService {
  private readonly logger = new Logger(BusinessPageModerationService.name);

  constructor(private readonly aiRouter: AiRouterService) {}

  async moderateContent(
    pendingContent: Record<string, unknown>,
    businessType: string,
  ): Promise<BusinessPageModerationResult> {
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
      const { data: parsed } = await this.aiRouter.generateJson(
        'business_moderation',
        prompt,
        businessPageModerationResultSchema,
        { entityType: 'business_page' },
      );

      if (!parsed) {
        this.logger.warn(
          'Failed to parse moderation response, defaulting to review',
        );
        return {
          riskLevel: 'medium',
          flags: [],
          summary:
            'Não foi possível analisar o conteúdo automaticamente. Revisão manual recomendada.',
          recommendation: 'review',
        };
      }

      return truncated ? this.floorForTruncation(parsed) : parsed;
    } catch (error) {
      this.logger.error(
        'Moderation AI call failed',
        error instanceof Error ? error.stack : undefined,
      );
      return {
        riskLevel: 'medium',
        flags: [],
        summary: 'Erro na análise automática. Revisão manual recomendada.',
        recommendation: 'review',
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
