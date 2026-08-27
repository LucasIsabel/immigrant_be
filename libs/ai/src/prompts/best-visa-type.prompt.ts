import {
  HUMAN_CADENCE_RULE,
  NO_AI_TELLS_RULE,
  NO_DASH_RULE,
} from './prose-rules';

/**
 * Readable wording for the keys the quiz sends.
 *
 * The frontend sends stable keys precisely so the prose lives here: a change of
 * copy on a form must not change what the model reads. An unknown key falls
 * through to itself rather than being dropped — a key the model has never seen
 * is still better evidence than silence, and the `@IsIn` on the DTO is what
 * keeps typos out in the first place.
 */
const GOAL_LABELS: Record<string, string> = {
  work: 'work',
  study: 'study',
  family: 'family',
  retirement_income: 'retirement or living on passive income',
  investment: 'investment',
  remote_work: 'remote work for an employer or clients abroad',
};

const JOB_OFFER_LABELS: Record<string, string> = {
  signed_contract: 'has a signed job offer',
  negotiating: 'negotiating an offer, nothing signed yet',
  none: 'no job offer yet',
};

const INCOME_BAND_LABELS: Record<string, string> = {
  under_1000: 'under 1000 EUR',
  '1000_2500': '1000-2500 EUR',
  '2500_5000': '2500-5000 EUR',
  over_5000: 'over 5000 EUR',
};

const NOT_SPECIFIED = 'Not specified';

function label(value: string | undefined, labels: Record<string, string>) {
  if (!value) return undefined;
  return labels[value] ?? value;
}

export function buildBestVisaTypePrompt(
  userDetails: {
    profession?: string;
    country_origin?: string;
    plan_period?: string;
    goal?: string;
    nationality?: string;
    job_offer?: string;
    income_band?: string;
  },
  immigrationVisaTypes: Array<{
    id: string;
    category: string;
    description: string;
    source: string;
    processing_time?: string | null;
    estimated_cost?: string | null;
    main_requirements?: string[] | null;
  }>,
  language: string,
): string {
  const goal = label(userDetails.goal, GOAL_LABELS);
  const jobOffer = label(userDetails.job_offer, JOB_OFFER_LABELS);
  const goalLine = [goal ?? NOT_SPECIFIED, jobOffer && `(${jobOffer})`]
    .filter(Boolean)
    .join(' ');

  // The profile fields always render, missing ones as "Not specified": what the
  // user chose not to answer is itself information, and the model has read the
  // same six lines since the quiz existed.
  const userInfoText = `
- Profession: ${userDetails.profession || NOT_SPECIFIED}
- Continent of Origin: ${userDetails.country_origin || NOT_SPECIFIED}
- Plan Period: ${userDetails.plan_period || NOT_SPECIFIED}
- Goal: ${goalLine}
- Passport: ${userDetails.nationality || NOT_SPECIFIED}
- Monthly income/savings: ${
    label(userDetails.income_band, INCOME_BAND_LABELS) ?? NOT_SPECIFIED
  }
`.trim();

  // The catalogue fields do the opposite: a missing one is omitted, never
  // printed as "unknown". Most of the 242 visa types have no published
  // processing time or cost in our data, and a column of "unknown" would read
  // as a finding about the route rather than a gap in the catalogue.
  const visaTypesText = immigrationVisaTypes
    .map((visa, index) => {
      const lines = [
        `${index + 1}. Visa Type ID: ${visa.id}`,
        `   Category: ${visa.category}`,
        `   Description: ${visa.description}`,
        `   Source: ${visa.source}`,
      ];

      if (visa.processing_time) {
        lines.push(`   Processing time: ${visa.processing_time}`);
      }
      if (visa.estimated_cost) {
        lines.push(`   Estimated cost: ${visa.estimated_cost}`);
      }
      if (visa.main_requirements?.length) {
        lines.push(
          `   Main requirements: ${visa.main_requirements.join('; ')}`,
        );
      }

      return `\n${lines.join('\n')}\n`;
    })
    .join('\n');

  return `You are an expert immigration consultant specializing in visa type recommendations.

Your task:
Based on the user's information and the available visa types for the selected country, analyze and recommend the **best matching visa type** from the provided list. Return your response **EXCLUSIVELY as valid JSON** with the recommended visa type ID and a clear explanation of why this visa type was chosen.

DO NOT write explanations, comments, introductions, or any text outside the JSON.

### User Information:
${userInfoText}

### Available Visa Types (you must choose ONLY from this list):
${visaTypesText}

### Generate an EXACT JSON with the following format:
{
  "recommended_visa_type_id": "the UUID of the best matching visa type from the list above",
  "explanations": "a clear and detailed explanation (2-4 sentences) explaining why you chose this specific visa type. The explanation should reference the user's profile (profession, continent of origin, plan period) and how it aligns with the visa type's requirements, category, and steps. Mention which criteria were most relevant in making this recommendation. IMPORTANT: In the explanations field, you MUST ONLY mention the visa type's category name (e.g., 'Work Visa', 'Student Visa', 'Skilled Worker Visa'). NEVER include the visa type ID, UUID, source URL, or any technical identifiers. Use only the category name in a natural, conversational way."
}

### Criteria you must consider when recommending:
1. **Professional Profile Match**: How well the visa type aligns with the user's profession and work experience
2. **Timeline Compatibility**: Whether the visa processing time fits within the user's plan period
3. **Eligibility Likelihood**: How likely the user is to meet the specific requirements based on their profile
4. **Visa Category Relevance**: How relevant the visa category is to the user's immigration goals
5. **Steps Complexity**: Consider the complexity and feasibility of the visa application steps
6. **Continent of Origin**: Any specific advantages or considerations based on the user's continent of origin
7. **Passport**: The passport may open a route nobody else can use, or make a visa unnecessary altogether. Bilateral and multilateral agreements (CPLP for Portuguese-speaking nationals, EU freedom of movement for EU/EEA/Swiss citizens, Mercosur residence for South American nationals, visa-waiver and working-holiday agreements) usually beat the general route on both cost and paperwork, so check for one before recommending a standard visa
8. **Affordability**: Where a visa states a financial threshold (minimum income, savings, investment) and the user's stated income or savings falls below it, that visa is not an option. Do not recommend it, however well it fits otherwise

### Important Rules:
- You MUST select a visa type ID from the provided list above
- Return ONLY the JSON object with both recommended_visa_type_id and explanations fields
- The explanations field must provide a clear, detailed reasoning (2-4 sentences) that connects the user's profile to the selected visa type
- The explanations field must be in the language: ${language}
- **CRITICAL**: In the explanations field, you MUST ONLY reference the visa type by its category name (e.g., "Work Visa", "Student Visa", "Skilled Worker Visa").
- **FORBIDDEN in explanations field**: Never include the visa type ID, UUID, source URL, steps details, or any technical identifiers. Only use the category name.
- Consider all available visa types before making your recommendation
- If multiple visa types are equally suitable, choose the one with simpler requirements or faster processing
- A visa type with no processing time, cost or requirements listed above simply has none recorded. Never present it as faster, slower, cheaper or easier than one that does state them, and never state a figure for it
- Your explanation should be specific and reference the user's profession, continent of origin, plan period, and how they relate to the visa type's characteristics
- Write the explanation in a natural, conversational tone, mentioning only the visa category name when referring to the recommended visa type

### Writing style for the explanations field:
${NO_DASH_RULE}
${NO_AI_TELLS_RULE}
${HUMAN_CADENCE_RULE}

Now generate **ONLY the JSON**.
  `;
}
