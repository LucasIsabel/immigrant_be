jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { AiRouterService, MODERATION_FIELD_MAX_CHARS } from '@app/ai';
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
      { entityType: 'business_page', entityId: undefined },
    );
    expect(result.result.recommendation).toBe('approve');
  });

  it('defaults to manual review when the chain returns nothing usable', async () => {
    // A moderation that answers "approve" on a parse failure would wave
    // through exactly the content it exists to catch.
    aiRouter.generateJson.mockResolvedValue({ data: null, result: {} });

    const result = await service.moderateContent({}, 'RESTAURANT');

    expect(result.result.recommendation).toBe('review');
    expect(result.result.riskLevel).toBe('medium');
  });

  it('sends the page sections to the model, named by their path', async () => {
    // typeData holds the tours, the menu and the itinerary — most of what a
    // page publishes — and none of it used to reach the moderator.
    aiRouter.generateJson.mockResolvedValue({
      data: {
        riskLevel: 'low',
        flags: [],
        summary: 'ok',
        recommendation: 'approve',
      },
      result: {},
    });

    await service.moderateContent(
      {
        name: 'Rita Andrade',
        typeData: {
          tours: [
            {
              name: 'Ribeira a pé',
              description: 'Do Infante à Sé pelas escadas.',
              imageUrl: 'https://cdn.example.com/ribeira.jpg',
            },
          ],
          itinerary: [
            {
              name: 'Cais',
              photos: [{ url: 'https://cdn.example.com/stop.jpg' }],
            },
          ],
        },
      },
      'guia-turistico',
    );

    const prompt = aiRouter.generateJson.mock.calls[0][1] as string;
    expect(prompt).toContain('tours[0].description');
    expect(prompt).toContain('Do Infante à Sé pelas escadas.');
    expect(prompt).toContain('itinerary[0].photos[0].url');
    expect(prompt).toContain('https://cdn.example.com/ribeira.jpg');
  });

  it('sends restaurant menu dishes the same way', async () => {
    aiRouter.generateJson.mockResolvedValue({
      data: {
        riskLevel: 'low',
        flags: [],
        summary: 'ok',
        recommendation: 'approve',
      },
      result: {},
    });

    await service.moderateContent(
      {
        typeData: {
          menu: [{ name: 'Bacalhau à Brás', description: 'Com azeitona.' }],
        },
      },
      'restaurante',
    );

    const prompt = aiRouter.generateJson.mock.calls[0][1] as string;
    expect(prompt).toContain('menu[0].name');
    expect(prompt).toContain('Bacalhau à Brás');
  });

  it('omits the typeData sections when there is nothing to send', async () => {
    aiRouter.generateJson.mockResolvedValue({
      data: {
        riskLevel: 'low',
        flags: [],
        summary: 'ok',
        recommendation: 'approve',
      },
      result: {},
    });

    await service.moderateContent({ description: 'A bakery' }, 'restaurante');

    // The rules always name the sections; what must be absent is the key in
    // the content payload itself.
    const prompt = aiRouter.generateJson.mock.calls[0][1] as string;
    expect(prompt).not.toContain('"typeDataText"');
    expect(prompt).not.toContain('"typeDataLinks"');
  });

  it('never approves on its own when part of the content went unread', async () => {
    // Something was too long to analyse, so a human has to look. Approving
    // here would sign off on text nobody read.
    aiRouter.generateJson.mockResolvedValue({
      data: {
        riskLevel: 'low',
        flags: [],
        summary: 'Tudo certo.',
        recommendation: 'approve',
      },
      result: {},
    });

    const result = await service.moderateContent(
      {
        typeData: {
          itinerary: [
            { description: 'x'.repeat(MODERATION_FIELD_MAX_CHARS + 10) },
          ],
        },
      },
      'guia-turistico',
    );

    expect(result.result.riskLevel).toBe('medium');
    expect(result.result.recommendation).toBe('review');
    expect(result.result.summary).toContain('não foi analisada');
  });

  it('leaves a worse verdict alone when the content was truncated', async () => {
    aiRouter.generateJson.mockResolvedValue({
      data: {
        riskLevel: 'high',
        flags: [],
        summary: 'Violação clara.',
        recommendation: 'reject',
      },
      result: {},
    });

    const result = await service.moderateContent(
      {
        typeData: {
          itinerary: [
            { description: 'x'.repeat(MODERATION_FIELD_MAX_CHARS + 10) },
          ],
        },
      },
      'guia-turistico',
    );

    expect(result.result.riskLevel).toBe('high');
    expect(result.result.recommendation).toBe('reject');
  });
});
