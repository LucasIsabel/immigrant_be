import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildBestVisaTypePrompt } from './best-visa-type.prompt';

const VISA_TYPE = {
  id: 'b7c1a6ee-0000-4000-8000-000000000000',
  category: 'Work Visa',
  description: 'For skilled workers',
  source: 'https://example.com',
};

const LEGACY_PROFILE = {
  profession: 'Software Engineer',
  country_origin: 'South America',
  plan_period: '1 year',
};

describe('buildBestVisaTypePrompt', () => {
  describe('user profile', () => {
    it('renders the goal with the job offer folded into it', () => {
      const prompt = buildBestVisaTypePrompt(
        { ...LEGACY_PROFILE, goal: 'work', job_offer: 'signed_contract' },
        [VISA_TYPE],
        'pt',
      );

      expect(prompt).toContain('- Goal: work (has a signed job offer)');
    });

    it('renders the passport and the income band', () => {
      const prompt = buildBestVisaTypePrompt(
        { ...LEGACY_PROFILE, nationality: 'PT', income_band: '2500_5000' },
        [VISA_TYPE],
        'pt',
      );

      expect(prompt).toContain('- Passport: PT');
      expect(prompt).toContain('- Monthly income/savings: 2500-5000 EUR');
    });

    it('turns the stored keys into wording, not the keys themselves', () => {
      // The frontend sends `retirement_income` precisely so the prose lives in
      // the prompt. Leaking the key would make a copy change on the form a
      // change to what the model reads.
      const prompt = buildBestVisaTypePrompt(
        { goal: 'retirement_income', income_band: 'under_1000' },
        [VISA_TYPE],
        'pt',
      );

      expect(prompt).toContain(
        '- Goal: retirement or living on passive income',
      );
      expect(prompt).toContain('- Monthly income/savings: under 1000 EUR');
      expect(prompt).not.toContain('retirement_income');
      expect(prompt).not.toContain('under_1000');
    });

    it('writes "Not specified" for a profile field the user skipped', () => {
      // Unlike the catalogue fields below, an unanswered question is itself
      // information: the model should see that the user gave no passport, not
      // silently assume one.
      const prompt = buildBestVisaTypePrompt({}, [VISA_TYPE], 'pt');

      expect(prompt).toContain('- Goal: Not specified');
      expect(prompt).toContain('- Passport: Not specified');
      expect(prompt).toContain('- Monthly income/savings: Not specified');
    });
  });

  describe('visa catalogue', () => {
    it('renders the processing time, cost and requirements', () => {
      const prompt = buildBestVisaTypePrompt(
        LEGACY_PROFILE,
        [
          {
            ...VISA_TYPE,
            processing_time: '2–4 months',
            estimated_cost: 'D7: €920/month',
            main_requirements: ['Valid passport', 'Proof of accommodation'],
          },
        ],
        'pt',
      );

      expect(prompt).toContain('   Processing time: 2–4 months');
      expect(prompt).toContain('   Estimated cost: D7: €920/month');
      expect(prompt).toContain(
        '   Main requirements: Valid passport; Proof of accommodation',
      );
    });

    it('omits the line of a catalogue field that has no value', () => {
      // Most of the 242 seeded visa types have no published processing time or
      // cost, and printing "unknown" would read as a finding about the route
      // rather than a gap in our data — which is exactly the inference that
      // sends someone down the wrong visa.
      const prompt = buildBestVisaTypePrompt(
        LEGACY_PROFILE,
        [
          {
            ...VISA_TYPE,
            processing_time: null,
            estimated_cost: null,
            main_requirements: [],
          },
        ],
        'pt',
      );

      expect(prompt).not.toContain('Processing time:');
      expect(prompt).not.toContain('Estimated cost:');
      expect(prompt).not.toContain('Main requirements:');
    });

    it('tells the model not to rank a visa type by a figure it was never given', () => {
      const prompt = buildBestVisaTypePrompt(LEGACY_PROFILE, [VISA_TYPE], 'pt');

      expect(prompt).toContain(
        'Never present it as faster, slower, cheaper or easier than one that does state them',
      );
    });
  });

  describe('what the recommendation weighs', () => {
    it('asks the model to check the passport for an agreement route', () => {
      const prompt = buildBestVisaTypePrompt(LEGACY_PROFILE, [VISA_TYPE], 'pt');

      expect(prompt).toContain('CPLP');
      expect(prompt).toContain('EU freedom of movement');
      expect(prompt).toContain('Mercosur');
    });

    it('forbids recommending a visa the user cannot afford', () => {
      const prompt = buildBestVisaTypePrompt(LEGACY_PROFILE, [VISA_TYPE], 'pt');

      expect(prompt).toContain(
        'falls below it, that visa is not an option. Do not recommend it, however well it fits otherwise',
      );
    });
  });

  describe('freedom of movement', () => {
    /**
     * The wrong answer this fix exists to stop: a Portuguese citizen moving to
     * Spain being told to apply for a Residence Visa (Type D). The route still
     * comes back as context, but the prose around it must be about
     * registration, and the flag on the response cannot be contradicted by it.
     */
    it('tells the model no visa is required and to frame it as registration', () => {
      const prompt = buildBestVisaTypePrompt(
        { ...LEGACY_PROFILE, nationality: 'PT' },
        [VISA_TYPE],
        'pt',
        { freedomOfMovement: true },
      );

      expect(prompt).toContain('### This applicant needs no visa');
      expect(prompt).toContain('registration rather than application');
      expect(prompt).toContain('residence certificate');
      expect(prompt).toContain('"Type D"');
    });

    it('still asks for a route from the list, as context', () => {
      const prompt = buildBestVisaTypePrompt(
        { ...LEGACY_PROFILE, nationality: 'PT' },
        [VISA_TYPE],
        'pt',
        { freedomOfMovement: true },
      );

      expect(prompt).toContain('Still return the closest route from the list');
      expect(prompt).toContain(`Visa Type ID: ${VISA_TYPE.id}`);
    });

    it('says nothing at all when the flag is off', () => {
      const off = buildBestVisaTypePrompt(LEGACY_PROFILE, [VISA_TYPE], 'pt', {
        freedomOfMovement: false,
      });

      // Byte-for-byte the prompt of a caller that passes no options at all:
      // the instruction may not leak into the general case, where it would be
      // simply false.
      expect(off).toBe(
        buildBestVisaTypePrompt(LEGACY_PROFILE, [VISA_TYPE], 'pt'),
      );
      expect(off).not.toContain('needs no visa');
    });
  });

  it('leaves the prompt a legacy profile used to produce otherwise untouched', () => {
    // The fixture is the exact output of this function before the profile and
    // catalogue fields existed. Everything this change adds is listed in
    // ADDITIONS; strip those and the byte-for-byte original must come back.
    //
    // The point is that nothing else moved. The JSON contract, the criteria
    // that were already there and the writing rules are what production has
    // been running against, and a reformat that quietly reworded one of them
    // has to fail here rather than ship as a side effect.
    const ADDITIONS = [
      '- Goal: Not specified\n',
      '- Passport: Not specified\n',
      '- Monthly income/savings: Not specified\n',
      '7. **Passport**: The passport may open a route nobody else can use, or make a visa unnecessary altogether. Bilateral and multilateral agreements (CPLP for Portuguese-speaking nationals, EU freedom of movement for EU/EEA/Swiss citizens, Mercosur residence for South American nationals, visa-waiver and working-holiday agreements) usually beat the general route on both cost and paperwork, so check for one before recommending a standard visa\n',
      "8. **Affordability**: Where a visa states a financial threshold (minimum income, savings, investment) and the user's stated income or savings falls below it, that visa is not an option. Do not recommend it, however well it fits otherwise\n",
      '- A visa type with no processing time, cost or requirements listed above simply has none recorded. Never present it as faster, slower, cheaper or easier than one that does state them, and never state a figure for it\n',
    ];

    const before = readFileSync(
      join(
        __dirname,
        '__fixtures__',
        'best-visa-type-before-profile-and-catalogue.txt',
      ),
      'utf8',
    );

    const stripped = ADDITIONS.reduce(
      (prompt, addition) => {
        expect(prompt).toContain(addition);
        return prompt.replace(addition, '');
      },
      buildBestVisaTypePrompt(LEGACY_PROFILE, [VISA_TYPE], 'pt'),
    );

    expect(stripped).toBe(before);
  });
});
