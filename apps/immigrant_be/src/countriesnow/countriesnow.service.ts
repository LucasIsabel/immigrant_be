import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CountriesNowCountryDto } from './dto/countries-now-country.dto';
import { CountriesNowCurrencyDto } from './dto/countries-now-currency.dto';
import { CountriesNowStateDto } from './dto/countries-now-state.dto';

const CN_BASE = 'https://countriesnow.space/api/v0.1/countries';
const CN_CURRENCY = `${CN_BASE}/currency/q`;
const CN_STATES_Q = `${CN_BASE}/states/q`;
const CN_STATE_CITIES_Q = `${CN_BASE}/state/cities/q`;

type CountriesNowUpstreamRow = {
  iso2?: string;
  iso3?: string;
  country?: string;
  cities?: string[];
};

type RestCountry = {
  name?: { common?: string };
  cca2?: string;
  currencies?: Record<string, { name?: string; symbol?: string }>;
};

@Injectable()
export class CountriesNowService {
  private countriesCache: {
    data: CountriesNowCountryDto[];
    at: number;
  } | null = null;

  private readonly countriesTtlMs = 86_400_000;

  private readonly statesCache = new Map<
    string,
    { data: CountriesNowStateDto[]; at: number }
  >();

  private readonly stateCitiesCache = new Map<
    string,
    { data: string[]; at: number }
  >();

  async getCountries(): Promise<CountriesNowCountryDto[]> {
    if (
      this.countriesCache &&
      Date.now() - this.countriesCache.at < this.countriesTtlMs
    ) {
      return this.countriesCache.data;
    }

    let res: Response;
    try {
      res = await fetch(CN_BASE, {
        headers: { Accept: 'application/json' },
      });
    } catch {
      throw new ServiceUnavailableException('Countries upstream unreachable');
    }

    if (!res.ok) {
      throw new BadGatewayException(`Countries upstream ${res.status}`);
    }

    const body = (await res.json()) as {
      error?: boolean;
      msg?: string;
      data?: CountriesNowUpstreamRow[];
    };

    if (body.error === true || !Array.isArray(body.data)) {
      throw new BadGatewayException(body.msg || 'Invalid countries payload');
    }

    const data: CountriesNowCountryDto[] = body.data.map((row) => ({
      iso2: String(row.iso2 ?? ''),
      iso3: String(row.iso3 ?? ''),
      country: String(row.country ?? ''),
      cities: Array.isArray(row.cities) ? row.cities.map((c) => String(c)) : [],
    }));

    this.countriesCache = { data, at: Date.now() };
    return data;
  }

  async getStates(country: string): Promise<CountriesNowStateDto[]> {
    const c = country?.trim();
    if (!c) {
      throw new BadRequestException('country query param required');
    }
    const key = c.toLowerCase();
    const hit = this.statesCache.get(key);
    if (hit && Date.now() - hit.at < this.countriesTtlMs) {
      return hit.data;
    }

    const statesUrl = `${CN_STATES_Q}?country=${encodeURIComponent(c)}`;
    let res: Response;
    try {
      res = await fetch(statesUrl, {
        headers: { Accept: 'application/json' },
      });
    } catch {
      throw new ServiceUnavailableException('States upstream unreachable');
    }

    if (!res.ok) {
      throw new BadGatewayException(`States upstream ${res.status}`);
    }

    const body = (await res.json()) as {
      error?: boolean;
      msg?: string;
      data?:
        | {
            states?: Array<{ name?: string; state_code?: string }>;
          }
        | Array<{ name?: string; state_code?: string }>;
    };

    if (body.error === true) {
      const empty: CountriesNowStateDto[] = [];
      this.statesCache.set(key, { data: empty, at: Date.now() });
      return empty;
    }

    let rawStates: Array<{ name?: string; state_code?: string }> = [];
    if (Array.isArray(body.data)) {
      rawStates = body.data;
    } else if (
      body.data &&
      typeof body.data === 'object' &&
      Array.isArray(body.data.states)
    ) {
      rawStates = body.data.states;
    }

    const data: CountriesNowStateDto[] = rawStates
      .map((row) => ({
        name: String(row.name ?? '').trim(),
        stateCode: row.state_code ? String(row.state_code) : undefined,
      }))
      .filter((row) => row.name.length > 0)
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
      );

    this.statesCache.set(key, { data, at: Date.now() });
    return data;
  }

  async getCitiesInState(country: string, state: string): Promise<string[]> {
    const c = country?.trim();
    const s = state?.trim();
    if (!c || !s) {
      throw new BadRequestException('country and state query params required');
    }
    const key = `${c.toLowerCase()}::${s.toLowerCase()}`;
    const hit = this.stateCitiesCache.get(key);
    if (hit && Date.now() - hit.at < this.countriesTtlMs) {
      return hit.data;
    }

    const citiesUrl = `${CN_STATE_CITIES_Q}?country=${encodeURIComponent(c)}&state=${encodeURIComponent(s)}`;
    let res: Response;
    try {
      res = await fetch(citiesUrl, {
        headers: { Accept: 'application/json' },
      });
    } catch {
      throw new ServiceUnavailableException(
        'State cities upstream unreachable',
      );
    }

    if (!res.ok) {
      throw new BadGatewayException(`State cities upstream ${res.status}`);
    }

    const body = (await res.json()) as {
      error?: boolean;
      msg?: string;
      data?: unknown;
    };

    if (body.error === true || body.data === undefined) {
      const empty: string[] = [];
      this.stateCitiesCache.set(key, { data: empty, at: Date.now() });
      return empty;
    }

    let names: string[] = [];
    if (Array.isArray(body.data)) {
      names = body.data.map((x) => String(x));
    } else if (
      body.data &&
      typeof body.data === 'object' &&
      Array.isArray((body.data as { cities?: unknown[] }).cities)
    ) {
      names = (body.data as { cities: string[] }).cities.map((x) => String(x));
    }

    const data = [...new Set(names.map((n) => n.trim()).filter(Boolean))].sort(
      (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }),
    );

    this.stateCitiesCache.set(key, { data, at: Date.now() });
    return data;
  }

  async getCurrency(
    country?: string,
    iso2?: string,
  ): Promise<CountriesNowCurrencyDto> {
    const c = country?.trim();
    const iso = iso2?.trim().toUpperCase();

    if (!c && !iso) {
      throw new BadRequestException('country or iso2 query param required');
    }

    if (c) {
      try {
        const url = `${CN_CURRENCY}?country=${encodeURIComponent(c)}`;
        const res = await fetch(url, {
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          const body = (await res.json()) as {
            error?: boolean;
            data?: { currency?: string; name?: string; iso2?: string };
          };
          if (
            !body.error &&
            body.data?.currency &&
            typeof body.data.currency === 'string'
          ) {
            return {
              currencyCode: body.data.currency,
              countryName: body.data.name ?? c,
              iso2: (body.data.iso2 ?? iso ?? '').toUpperCase() || 'XX',
            };
          }
        }
      } catch {
        // fall through to REST Countries
      }
    }

    if (iso && /^[A-Z]{2}$/.test(iso)) {
      const fromRest = await this.fetchRestCountriesCurrency(iso);
      if (fromRest) {
        return fromRest;
      }
    }

    throw new NotFoundException('Currency not found');
  }

  private async fetchRestCountriesCurrency(
    code: string,
  ): Promise<CountriesNowCurrencyDto | null> {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha/${code.toLowerCase()}`,
        { headers: { Accept: 'application/json' } },
      );
      if (!res.ok) {
        return null;
      }
      const raw: unknown = await res.json();
      const arr = Array.isArray(raw) ? raw : [];
      const row = arr[0] as RestCountry | undefined;
      if (!row?.currencies || typeof row.currencies !== 'object') {
        return null;
      }
      const entries = Object.entries(row.currencies);
      const first = entries[0];
      if (!first) {
        return null;
      }
      const [codeKey] = first;
      return {
        currencyCode: codeKey,
        countryName: row.name?.common ?? code,
        iso2: row.cca2 ?? code,
      };
    } catch {
      return null;
    }
  }
}
