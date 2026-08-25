jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { ConfigService } from '@nestjs/config';
import { AiRouterService } from '@app/ai';
import { CountryService } from '../countries/country.service';
import { GeminiService } from './gemini.service';

/**
 * These two calls were the production outage: Gemini's prepaid credit ran out
 * and they had no second option. The scenario names asserted here are the
 * contract with the chain configuration — a typo would compile fine and route
 * nowhere.
 */
describe('GeminiService (system)', () => {
  let aiRouter: { generateJson: jest.Mock };
  let service: GeminiService;

  beforeEach(() => {
    aiRouter = {
      generateJson: jest.fn().mockResolvedValue({ data: null, result: {} }),
    };
    const config = { get: jest.fn().mockReturnValue('test-key') };
    const countries = {
      findAllNames: jest.fn().mockResolvedValue([{ name: 'Portugal' }]),
    };

    service = new GeminiService(
      config as unknown as ConfigService,
      countries as unknown as CountryService,
      aiRouter as unknown as AiRouterService,
    );
  });

  it('routes quiz suggestions through the quiz_suggestions scenario', async () => {
    await service.generateSuggestions('user answers', 'pt');

    expect(aiRouter.generateJson).toHaveBeenCalledWith(
      'quiz_suggestions',
      expect.stringContaining('user answers'),
      expect.anything(),
      { entityType: 'quiz' },
    );
  });

  it('routes the visa recommendation through visa_recommendation', async () => {
    await service.generateVisaSuggestion(
      { profession: 'engineer' },
      [{ id: 'v1', category: 'work', description: 'd', source: 's' }],
      'en',
    );

    expect(aiRouter.generateJson).toHaveBeenCalledWith(
      'visa_recommendation',
      expect.any(String),
      expect.anything(),
      { entityType: 'quiz' },
    );
  });

  it('strips em dashes from the prose but never from the id', async () => {
    aiRouter.generateJson.mockResolvedValue({
      data: { recommended_visa_type_id: 'v—1', explanations: 'Porque — sim.' },
      result: {},
    });

    const parsed = await service.generateVisaSuggestion({}, [], 'pt');

    expect(parsed?.recommended_visa_type_id).toBe('v—1');
    expect(parsed?.explanations).not.toContain('—');
  });
});
