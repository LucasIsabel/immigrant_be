import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UserDetailsQueryDto } from './user-details-query.dto';

const failingRules = async (payload: Record<string, unknown>) => {
  const errors = await validate(plainToInstance(UserDetailsQueryDto, payload));
  return errors.flatMap((error) => Object.keys(error.constraints ?? {}));
};

describe('UserDetailsQueryDto', () => {
  it('accepts a payload carrying only the profession', async () => {
    // Swagger has always marked the three fields optional and the prompt fills
    // in "Not specified" for whatever is missing, but the validation pipe used
    // to answer 400 for an omitted one.
    expect(await failingRules({ profession: 'Software Engineer' })).toEqual([]);
  });

  it('accepts an empty payload', async () => {
    expect(await failingRules({})).toEqual([]);
  });

  it('still refuses a field of the wrong type', async () => {
    expect(await failingRules({ profession: 42 })).toContain('isString');
  });
});
