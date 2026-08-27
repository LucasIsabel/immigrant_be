import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { VisaRecommendationResponseDto } from './visa-recommendation-response.dto';

const failingRules = async (payload: Record<string, unknown>) => {
  const errors = await validate(
    plainToInstance(VisaRecommendationResponseDto, payload),
  );
  return errors.flatMap((error) => Object.keys(error.constraints ?? {}));
};

const RECOMMENDATION = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  explanations: 'Closest route, though no visa is required.',
};

describe('VisaRecommendationResponseDto', () => {
  it('exposes freedom_of_movement as a boolean', async () => {
    expect(
      await failingRules({ ...RECOMMENDATION, freedom_of_movement: true }),
    ).toEqual([]);
    expect(
      await failingRules({ ...RECOMMENDATION, freedom_of_movement: false }),
    ).toEqual([]);
  });

  /**
   * The field is not optional on purpose. A response that omits it reads as
   * `undefined` on the client, which is exactly the "needs a visa" branch the
   * fix exists to stop taking for an EU citizen.
   */
  it('refuses a response that leaves the field out', async () => {
    expect(await failingRules(RECOMMENDATION)).toContain('isBoolean');
  });

  it('refuses a truthy string in place of the boolean', async () => {
    expect(
      await failingRules({ ...RECOMMENDATION, freedom_of_movement: 'true' }),
    ).toContain('isBoolean');
  });
});
