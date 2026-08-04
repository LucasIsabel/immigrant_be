export class CountryTranslation {
  id: string;
  language: string;
  description: string;
  benefits: string[];
  challenges: string[];
  processingTime: string;
  investmentRequired: string;
  languageRequirement: string;
}

export class Country {
  id: string;
  name: string;
  flag: string;
  region: string;
  /** Closed vocabulary (`Easy` | `Moderate` | `Hard`), translated by the client. */
  difficulty: string;
  difficultyScore: number;
  /** Closed vocabulary (`Strong` | `Moderate` | `Weak`), translated by the client. */
  jobMarket: string;
  visaOptions: string[];
  popularCities: string[];
  translations: CountryTranslation[];
}
