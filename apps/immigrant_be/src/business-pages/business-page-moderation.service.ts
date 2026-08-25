import { Injectable, Logger } from '@nestjs/common';
import {
  AiRouterService,
  businessPageModerationResultSchema,
  type BusinessPageModerationResult,
  type BusinessPageModerationInput,
  buildBusinessPageModerationPrompt,
} from '@app/ai';

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

      return parsed;
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
}
