jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { AiRouterService } from '@app/ai';
import { BusinessPageModerationService } from './business-page-moderation.service';

describe('BusinessPageModerationService', () => {
  let aiRouter: { generateJson: jest.Mock };
  let service: BusinessPageModerationService;

  beforeEach(() => {
    aiRouter = { generateJson: jest.fn() };
    service = new BusinessPageModerationService(
      aiRouter as unknown as AiRouterService,
    );
  });

  it('moderates through the business_moderation scenario', async () => {
    aiRouter.generateJson.mockResolvedValue({
      data: {
        riskLevel: 'low',
        flags: [],
        summary: 'ok',
        recommendation: 'approve',
      },
      result: {},
    });

    const result = await service.moderateContent(
      { description: 'A bakery' },
      'RESTAURANT',
    );

    expect(aiRouter.generateJson).toHaveBeenCalledWith(
      'business_moderation',
      expect.any(String),
      expect.anything(),
      { entityType: 'business_page' },
    );
    expect(result.recommendation).toBe('approve');
  });

  it('defaults to manual review when the chain returns nothing usable', async () => {
    // A moderation that answers "approve" on a parse failure would wave
    // through exactly the content it exists to catch.
    aiRouter.generateJson.mockResolvedValue({ data: null, result: {} });

    const result = await service.moderateContent({}, 'RESTAURANT');

    expect(result.recommendation).toBe('review');
    expect(result.riskLevel).toBe('medium');
  });
});
