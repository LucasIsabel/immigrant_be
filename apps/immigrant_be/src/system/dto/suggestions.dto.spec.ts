import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SuggestionItem } from './suggestions.dto';

const failingRules = async (payload: Record<string, unknown>) => {
  const errors = await validate(plainToInstance(SuggestionItem, payload));
  return errors.flatMap((error) => Object.keys(error.constraints ?? {}));
};

const SUGGESTION = {
  country: 'Spain',
  country_label: 'Espanha',
  compatibility: 91,
  reasons: ['No visa needed for an EU passport'],
  cities: ['Madrid'],
  visa_options: [],
  country_background: 'https://example.com/spain.jpg',
  country_flag: '🇪🇸',
  country_id: '123e4567-e89b-12d3-a456-426614174000',
  investment_required: '',
  average_visa_processing_time: '',
  job_market: 'Moderate',
  education_quality: 'High',
  difficulty: 'Moderate',
  health_care: 'High',
  languages: ['Spanish'],
};

describe('SuggestionItem', () => {
  it('exposes freedom_of_movement as a boolean', async () => {
    expect(
      await failingRules({ ...SUGGESTION, freedom_of_movement: true }),
    ).toEqual([]);
  });

  it('refuses a suggestion that leaves the field out', async () => {
    // Every suggestion carries it, false by default: a missing boolean is the
    // "needs a visa" branch on the client, and an EU citizen would land there.
    expect(await failingRules(SUGGESTION)).toContain('isBoolean');
  });
});
