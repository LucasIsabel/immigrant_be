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

  it('accepts a full four-step answer set', async () => {
    expect(
      await failingRules({
        profession: 'Software Engineer',
        country_origin: 'South America',
        plan_period: '1 year',
        goal: 'work',
        nationality: 'PT',
        job_offer: 'signed_contract',
      }),
    ).toEqual([]);
  });

  it('accepts every value the form can send', async () => {
    const goals = [
      'work',
      'study',
      'family',
      'retirement_income',
      'investment',
      'remote_work',
    ];
    const jobOffers = ['signed_contract', 'negotiating', 'none'];
    const incomeBands = ['under_1000', '1000_2500', '2500_5000', 'over_5000'];

    for (const goal of goals) {
      expect(await failingRules({ goal })).toEqual([]);
    }
    for (const job_offer of jobOffers) {
      expect(await failingRules({ job_offer })).toEqual([]);
    }
    for (const income_band of incomeBands) {
      expect(await failingRules({ income_band })).toEqual([]);
    }
  });

  it('rejects a typo in a keyed field instead of forwarding it', async () => {
    // The keyed fields exist so the backend, not the form copy, decides the
    // wording the model reads. Letting `remote-work` through would put a value
    // nothing maps into the prompt, and the recommendation would quietly be
    // made on a goal nobody chose.
    expect(await failingRules({ goal: 'remote-work' })).toContain('isIn');
    expect(await failingRules({ job_offer: 'signed' })).toContain('isIn');
    expect(await failingRules({ income_band: '2500-5000' })).toContain('isIn');
  });

  it('rejects a nationality that is not an uppercase ISO2 code', async () => {
    expect(await failingRules({ nationality: 'pt' })).toContain('matches');
    expect(await failingRules({ nationality: 'PRT' })).toContain('matches');
    expect(await failingRules({ nationality: 'Portugal' })).toContain(
      'matches',
    );
  });

  it('keeps every new field optional', async () => {
    // The quiz branches: `job_offer` is only asked when the goal is work, and
    // `income_band` only for the income-based goals. A required field here
    // would 400 the majority of real answer sets.
    expect(await failingRules({ goal: 'study' })).toEqual([]);
  });
});
