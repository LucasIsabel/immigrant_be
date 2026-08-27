import { REGISTRY } from './visa-steps/registry';
import type { VisaTypeSteps } from './visa-steps/types';

/**
 * The catalogue facts a visa recommendation is allowed to reason over:
 * how long a route takes, what it costs, and what it demands.
 *
 * **Nothing here is invented.** Every string is copied out of material already
 * in this repository — `countries.seed.ts` for the times and the money, the
 * step templates in `visa-steps/` for the requirements. These are figures
 * people decide where to live on, and a plausible-looking number that came
 * from a model rather than a source is worse than an empty field: the prompt
 * omits a missing value entirely, so a gap costs a line of context, while a
 * wrong one costs somebody a move.
 *
 * That is why most of the 242 visa types carry no time and no cost. The
 * country seed states one processing time and one investment figure *per
 * country*, and a country-level "2-4 months" says nothing about which of its
 * four visa categories it describes. Only where the source string names a
 * route, and exactly one category in that country carries the same name, is
 * the value attached — verbatim, keeping the qualifier the source put on it
 * ("Skilled Migrant Category: ~12-16 months" reads as a claim about the
 * skilled route, which is exactly what it is).
 */
type VisaCatalogueFact = {
  readonly processing_time?: string;
  readonly estimated_cost?: string;
};

/**
 * Keyed by country name, then by `immigration_visa_types.category` — the same
 * two strings that join `countries.seed.ts` to `visa-steps/`. A key that
 * matches no seeded category is a typo, and `visa-catalogue.spec.ts` fails on
 * it rather than letting the fact silently never be written.
 */
export const VISA_CATALOGUE_FACTS: Record<
  string,
  Record<string, VisaCatalogueFact>
> = {
  Australia: {
    // "Skilled (Permanent): ~10 months; Skilled (Temporary): ~98 days median"
    // and "the 190 needs a state-set financial declaration" — this is the only
    // Australian category covering the skilled routes and subclass 190.
    'Work & Skilled Migration Visas': {
      processing_time:
        'Skilled (Permanent): ~10 months; Skilled (Temporary): ~98 days median',
      estimated_cost: 'The 190 needs a state-set financial declaration',
    },
  },
  Austria: {
    // "Red-White-Red Card: 70 of 100 points; Other Key Workers need
    // €3,465/month gross" — Other Key Workers is a Red-White-Red Card route,
    // and this is the category named after the card.
    'Work & Qualified Migration (e.g., Red-White-Red Card)': {
      estimated_cost:
        'Red-White-Red Card: 70 of 100 points; Other Key Workers need €3,465/month gross',
    },
  },
  Belgium: {
    'Long-Stay Visa (Type D) / Single Permit': {
      estimated_cost:
        'Single Permit: €47,500 in Flanders, €53,220 in Wallonia, €3,703/month in Brussels',
    },
  },
  Canada: {
    // "80% of PR applications within 6 months; add 3-4 months when applying
    // from abroad". The settlement-funds figure is deliberately left off: the
    // country string attaches it to no route.
    'Permanent Residence (PR)': {
      processing_time:
        '80% of PR applications within 6 months; add 3–4 months when applying from abroad',
    },
  },
  'Costa Rica': {
    'Temporary Residence (Rentista / Inversionista)': {
      estimated_cost:
        'Rentista: US$2,500/month for two years; Inversionista US$200,000 after the reduced tier lapsed',
    },
  },
  Croatia: {
    'Digital Nomad Residence Permit': {
      estimated_cost:
        'Digital nomad: 2.5x the average net salary, €3,622.50/month, or €43,470 saved',
    },
  },
  Cyprus: {
    'Permanent Residence by Investment': {
      processing_time: '6 months for the fast-track investment route',
      estimated_cost:
        'Permanent residence: €300,000 in new-build property plus €50,000/year in secured income',
    },
  },
  Czechia: {
    // Only the business clause is attached: "Long-term stay: CZK 46,950 plus
    // CZK 6,260 per month" fits the Employee Card and the trade-licence visa
    // equally, so it belongs to neither.
    'Long-Term Business Visa (Trade Licence)': {
      estimated_cost: 'Business route CZK 156,500',
    },
  },
  Denmark: {
    'Work Residence Permit (Pay Limit / Positive List)': {
      estimated_cost:
        'Pay Limit Scheme: DKK 552,000/year, DKK 446,000 supplementary; raised each January',
    },
  },
  'Dominican Republic': {
    // The trailing "or US$200,000 invested" is dropped: investment is the
    // Permanent Residence route, not the Pensionado/Rentista one.
    'Pensionado / Rentista Residence': {
      estimated_cost: 'Pensionado US$1,500/month, Rentista US$2,000/month',
    },
  },
  Estonia: {
    'Digital Nomad Visa (Type D)': {
      estimated_cost:
        'Digital nomad: roughly €4,500/month in gross income over the previous six months',
    },
  },
  France: {
    // The Blue Card and business-creator clauses match no French category here.
    'Talent Passport / Skilled Worker Visas': {
      estimated_cost: 'Talent Passport: €39,582/year',
    },
  },
  Greece: {
    'Residence Permit for Investors (Golden Visa)': {
      estimated_cost:
        'Golden Visa: €800,000 in Attica, Thessaloniki and the larger islands; €400,000 elsewhere',
    },
  },
  Hungary: {
    'White Card (Digital Nomad Residence Permit)': {
      estimated_cost: 'White Card: roughly €3,000/month in income',
    },
    'Guest Investor Residence Permit': {
      estimated_cost: 'Guest Investor Programme: from €250,000',
    },
  },
  Iceland: {
    'Long-Term Remote Work Visa': {
      estimated_cost:
        'Remote work visa: ISK 1,000,000/month, or ISK 1,300,000 with family',
    },
  },
  Indonesia: {
    'Remote Worker KITAS (E33G)': {
      estimated_cost: 'Remote worker route: US$60,000 in annual income',
    },
    'Second Home Visa': {
      estimated_cost:
        'Second Home Visa: roughly IDR 2 billion held in a state bank',
    },
  },
  Italy: {
    // "Elective residency: €31,160/year" is left off: no Italian category here
    // is named for it.
    'Investor / Self-Employment Visa': {
      estimated_cost: 'Investor visa from €250,000',
    },
  },
  Malaysia: {
    'Malaysia My Second Home (MM2H)': {
      estimated_cost:
        'MM2H Silver: US$150,000 deposit plus RM600,000 property; Gold US$500,000; Platinum US$1M',
    },
  },
  Malta: {
    'Malta Permanent Residence Programme (MPRP)': {
      processing_time: '4–6 months for the MPRP',
      estimated_cost:
        'MPRP: €99,000 in government payments plus property from €375,000 to buy or €14,000/year to rent',
    },
    'Nomad Residence Permit': {
      processing_time: '30–40 days for the Nomad Residence Permit',
    },
  },
  Mexico: {
    'Temporary Resident Visa (Residente Temporal)': {
      estimated_cost:
        'Temporary residency: US$4,200/month in income or US$70,000 in savings, UMA-indexed',
    },
  },
  'New Zealand': {
    'Resident Visa / Permanent Residence Pathway': {
      processing_time: 'Skilled Migrant Category: ~12–16 months',
      estimated_cost: 'Skilled Migrant: 6 points plus a skilled job offer',
    },
    'Student Visa': {
      estimated_cost: 'Student visa needs NZD 20,000/year',
    },
  },
  Norway: {
    'Residence Permit for Skilled Workers': {
      estimated_cost:
        'Skilled worker: NOK 624,700/year with a master, NOK 545,400 with a bachelor',
    },
  },
  Panama: {
    'Friendly Nations Visa': {
      estimated_cost:
        'Friendly Nations: US$200,000 in property or a 3-year deposit',
    },
    'Qualified Investor Visa': {
      estimated_cost: 'Qualified Investor from US$300,000',
    },
  },
  Peru: {
    'Rentista Visa': {
      estimated_cost: 'Rentista: US$1,000/month in passive income',
    },
  },
  Portugal: {
    // D7 is the passive-income route named in this category's description. D8
    // is left off: no Portuguese category here names it.
    'Residence Visa (Type D)': {
      estimated_cost: 'D7: €920/month',
    },
  },
  Qatar: {
    // "Residence from QAR 730,000 in freehold property" is left off: it names
    // no route, and the investor category does not carry the wording.
    'Permanent Residency Permit': {
      estimated_cost: 'Permanent residency from QAR 3.65 million',
    },
  },
  Romania: {
    'Digital Nomad Visa': {
      estimated_cost:
        'Digital nomad: 3x the average gross salary, about €5,600/month',
    },
  },
  Singapore: {
    // The GIP clause matches no Singaporean category here.
    'Work Passes (Employment Pass, S Pass, Work Permit)': {
      estimated_cost: 'Employment Pass from SGD 5,600/month, rising with age',
    },
  },
  'South Korea': {
    'Long-Stay / Work / Student / Skilled Visas (D, E, F etc)': {
      estimated_cost: 'D-8: KRW 100 million per investor, wired from abroad',
    },
  },
  Sweden: {
    'Short-stay Visa (Schengen visa up to 90 days)': {
      processing_time: 'Schengen visa: up to 15 days',
    },
    'Residence Permit (for stay over 90 days – work, study, family reunification)':
      {
        processing_time: 'Work permit: 1–4 months',
        estimated_cost:
          'Work permit: SEK 34,470/month, equal to 90% of the national median salary',
      },
  },
  Thailand: {
    'Long-Term Resident (LTR) Visa': {
      estimated_cost: 'LTR: US$80,000/year in passive income',
    },
  },
  Turkey: {
    'Citizenship by Investment': {
      estimated_cost:
        'Citizenship by investment: from US$400,000 in real estate held for three years',
    },
  },
  'United Arab Emirates': {
    'Golden / Long-Term Residency Program': {
      estimated_cost: 'Golden Visa investment routes from AED 2 million',
    },
  },
  'United Kingdom': {
    'Work Visas': {
      estimated_cost:
        'Skilled Worker: salary from £38,700/year; visa fee £819 plus £1,035/year surcharge',
    },
  },
  'United States': {
    'EB-5 Immigrant Investor Visa': {
      estimated_cost:
        'EB-5: US$800,000 in a targeted employment area, or US$1,050,000 otherwise',
    },
  },
};

/**
 * The step groups whose entries are requirements rather than actions.
 *
 * `submission_fees`, `biometrics_health` and `post_approval_steps` are things
 * the applicant *does*; these two are what the applicant must *have*.
 */
const REQUIREMENT_GROUPS = [
  'core_documents',
  'financial_requirements',
] as const;

/**
 * First words that make a step an instruction, not a requirement.
 *
 * Both groups above still carry the occasional imperative — "Check the
 * Mercosur nationality route first", "Pay the residence application fee",
 * "Open an Egyptian bank account early". Those are steps to take, and listing
 * them as requirements would tell the model the applicant must *hold* a fee
 * payment. English puts the imperative first, so the first word separates the
 * two cleanly; this list was read off the full first-word inventory of all
 * 242 templates, so it is exhaustive over the seed as it stands, and
 * `visa-catalogue.spec.ts` fails if a new template introduces another.
 *
 * Participles are deliberately absent and stay in: "Completed Schengen
 * application form" and "Registered address throughout the qualifying period"
 * are documents, while "Complete the investment" and "Register for tax" are
 * not.
 */
const INSTRUCTION_FIRST_WORDS = new Set([
  'Agree',
  'Appoint',
  'Apply',
  'Book',
  'Budget',
  'Buy',
  'Carry',
  'Check',
  'Choose',
  'Complete',
  'Confirm',
  'Decide',
  'Declare',
  'Do',
  'Engage',
  'Establish',
  'File',
  'Find',
  'Get',
  'Having',
  'Hold',
  'Identify',
  'Include',
  'Keep',
  'Know',
  'Meet',
  // "No proof of income is required" is the absence of a requirement; under a
  // "Main requirements" heading it reads as its opposite.
  'No',
  'Note',
  'Obtain',
  'Open',
  'Pay',
  'Pick',
  'Plan',
  'Prepare',
  'Prove',
  'Register',
  'Request',
  'Reserve',
  'Route',
  'Run',
  'Score',
  'Show',
  'State',
  'Submit',
  'Transfer',
  'Understand',
  'Verify',
]);

/** True when the step name reads as an instruction rather than a document. */
export function isInstruction(name: string): boolean {
  return INSTRUCTION_FIRST_WORDS.has(name.split(/[\s,]/)[0]);
}

/**
 * The requirements of one visa type, in the wording of its step template.
 *
 * Derived rather than copied so the catalogue cannot drift from the checklist
 * the user is actually handed. English only: the visa type row itself has no
 * translations, and the key derives from `en` anyway.
 */
export function mainRequirementsFor(steps: VisaTypeSteps): string[] {
  const requirements: string[] = [];

  for (const group of REQUIREMENT_GROUPS) {
    for (const spec of steps[group] ?? []) {
      if (spec.required === false) continue;
      const name = spec.en[0];
      if (isInstruction(name)) continue;
      requirements.push(name);
    }
  }

  return requirements;
}

/**
 * Everything known about one visa type, ready to be written to the row.
 *
 * `country` and `category` are the join keys; an unknown pair yields an empty
 * fact and an empty requirement list rather than throwing, because the seed
 * must still write a visa type whose template has not been authored yet.
 */
export function catalogueFieldsFor(
  country: string,
  category: string,
): {
  processing_time: string | null;
  estimated_cost: string | null;
  main_requirements: string[];
} {
  const fact = VISA_CATALOGUE_FACTS[country]?.[category] ?? {};
  const steps = REGISTRY[country]?.[category];

  return {
    processing_time: fact.processing_time ?? null,
    estimated_cost: fact.estimated_cost ?? null,
    main_requirements: steps ? mainRequirementsFor(steps) : [],
  };
}
