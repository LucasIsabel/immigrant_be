import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  Optional,
  ServiceUnavailableException,
} from '@nestjs/common';
import type Redis from 'ioredis';
import { normalizeCity, normalizeState } from '../business/city-key';
import { CountriesNowCityMatchDto } from './dto/countries-now-city-match.dto';
import { CountriesNowCountryDto } from './dto/countries-now-country.dto';
import { CountriesNowCurrencyDto } from './dto/countries-now-currency.dto';
import { CountriesNowStateDto } from './dto/countries-now-state.dto';

export const COUNTRIES_NOW_REDIS = 'COUNTRIES_NOW_REDIS';

const CN_BASE = 'https://countriesnow.space/api/v0.1/countries';
const CN_CURRENCY = `${CN_BASE}/currency/q`;
const CN_STATES_Q = `${CN_BASE}/states/q`;
const CN_STATE_CITIES_Q = `${CN_BASE}/state/cities/q`;

/**
 * Versioned so a change to the stored shape starts from empty keys instead of
 * reading yesterday's layout for a day.
 */
const CITY_INDEX_KEY_PREFIX = 'countriesnow:city-index:v1:';
const CITY_INDEX_TTL_SECONDS = 86_400;

/**
 * Enough to build the United States (50 states) in well under two seconds,
 * few enough that a cold index does not look like a burst to CountriesNow.
 */
const STATE_FETCH_CONCURRENCY = 8;

const collator = new Intl.Collator(undefined, { sensitivity: 'base' });

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

/**
 * One state's cities — the shape shared through Redis. Grouped because the
 * state name repeats for every city otherwise, which is most of the payload.
 * `state` is null only for a country without subdivisions.
 */
type CityIndexGroup = { state: string | null; cities: string[] };

/** A row of the in-process index: the city, its state, and its folded name. */
type CityIndexEntry = { city: string; state: string | null; cityKey: string };

@Injectable()
export class CountriesNowService {
  private readonly logger = new Logger(CountriesNowService.name);

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

  private readonly cityIndexCache = new Map<
    string,
    { entries: CityIndexEntry[]; at: number }
  >();

  /** The index being loaded right now, per folded country name. */
  private readonly cityIndexLoads = new Map<
    string,
    Promise<CityIndexEntry[]>
  >();

  constructor(
    @Optional()
    @Inject(COUNTRIES_NOW_REDIS)
    private readonly redis?: Redis,
  ) {
    if (!redis) {
      this.logger.warn(
        'No Redis client: every process builds its own city index, and builds it again after a restart.',
      );
    }
  }

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

  /**
   * The cities of a country whose name matches what somebody typed, each with
   * its state.
   *
   * The universe is the wizard's: a business can only be registered in a city
   * the per-state lists name, and those lists name far more than the flat one
   * — 832 names in Portugal and 4 226 in Brazil exist only there. Searching
   * here, rather than shipping the union to the browser, keeps each answer a
   * handful of rows whether the country is Monaco or the United States.
   *
   * Ranked by how the name matches — equal, then prefix, then the start of a
   * later word ("grande" finds Campo Grande), then anywhere — and by name
   * inside each rank, so the city somebody is spelling out comes first.
   */
  async searchCities(
    country: string,
    q: string,
    limit = 20,
  ): Promise<CountriesNowCityMatchDto[]> {
    const query = normalizeCity(q);
    if (!query) {
      return [];
    }

    const matches: Array<{ entry: CityIndexEntry; score: number }> = [];
    for (const entry of await this.getCityIndex(country)) {
      const score = matchScore(entry.cityKey, query);
      if (score !== null) {
        matches.push({ entry, score });
      }
    }

    return matches
      .sort(
        (a, b) =>
          a.score - b.score ||
          collator.compare(a.entry.city, b.entry.city) ||
          compareStates(a.entry.state, b.entry.state),
      )
      .slice(0, limit)
      .map(({ entry }) => ({ city: entry.city, state: entry.state }));
  }

  /**
   * In-process first, then Redis, then CountriesNow.
   *
   * Single-flight: a cold index costs one request per state, and the selector
   * fires a search per keystroke. Without sharing the load, five letters typed
   * before the first build finished would ask CountriesNow for every state
   * five times.
   */
  private async getCityIndex(country: string): Promise<CityIndexEntry[]> {
    const key = normalizeCity(country);
    if (!key) {
      return [];
    }

    const hit = this.cityIndexCache.get(key);
    if (hit && Date.now() - hit.at < this.countriesTtlMs) {
      return hit.entries;
    }

    let load = this.cityIndexLoads.get(key);
    if (!load) {
      load = this.loadCityIndex(country, key).finally(() =>
        this.cityIndexLoads.delete(key),
      );
      this.cityIndexLoads.set(key, load);
    }
    return load;
  }

  private async loadCityIndex(
    country: string,
    key: string,
  ): Promise<CityIndexEntry[]> {
    let groups = await this.readSharedCityIndex(key);

    if (!groups) {
      groups = await this.buildCityIndex(country);
      if (!groups) {
        // Not a CountriesNow country. Nothing is kept for it, which is what
        // stops an anonymous caller from filling memory and Redis with keys.
        return [];
      }
      await this.writeSharedCityIndex(key, groups);
    }

    const entries = indexEntries(groups);
    this.cityIndexCache.set(key, { entries, at: Date.now() });
    return entries;
  }

  /**
   * Every city the wizard offers for a country, grouped by state — or null
   * when CountriesNow does not know the country.
   *
   * All or nothing. A state that still fails after its retry fails the whole
   * build, and nothing is cached: half an index would be a city that "does not
   * exist" for a day, while a failed build is only a search that fails now and
   * is tried again on the next keystroke.
   *
   * State names are kept exactly as `/states/q` returns them. The fold is for
   * comparing; CountriesNow only answers to the accented spelling, and the
   * wizard sends back whatever the selector hands it.
   *
   * Going through `getCitiesInState` is on purpose: building the index warms
   * the same 24 h cache the wizard's state step reads.
   */
  private async buildCityIndex(
    country: string,
  ): Promise<CityIndexGroup[] | null> {
    const startedAt = Date.now();
    const key = normalizeCity(country);
    const known = (await this.getCountries()).find(
      (row) => normalizeCity(row.country) === key,
    );
    if (!known) {
      return null;
    }

    const states = [
      ...new Set((await this.getStates(known.country)).map((s) => s.name)),
    ];

    const groups: CityIndexGroup[] =
      states.length === 0
        ? [{ state: null, cities: known.cities }]
        : await mapWithConcurrency(
            states,
            STATE_FETCH_CONCURRENCY,
            async (state) => ({
              state,
              cities: await this.citiesInStateWithRetry(known.country, state),
            }),
          );

    const rows = groups.reduce((sum, group) => sum + group.cities.length, 0);
    this.logger.log(
      `city index for ${known.country}: ${states.length} states, ${rows} rows, ${Date.now() - startedAt} ms`,
    );
    return groups;
  }

  private async citiesInStateWithRetry(
    country: string,
    state: string,
  ): Promise<string[]> {
    try {
      return await this.getCitiesInState(country, state);
    } catch (error) {
      this.logger.warn(
        `cities of ${state} (${country}) failed, retrying once: ${describeError(error)}`,
      );
      return this.getCitiesInState(country, state);
    }
  }

  /**
   * Redis is where the index is shared, never a condition for searching: a
   * failed read is a miss, and the index is built here instead.
   */
  private async readSharedCityIndex(
    key: string,
  ): Promise<CityIndexGroup[] | null> {
    if (!this.redis) {
      return null;
    }

    try {
      const raw = await this.redis.get(CITY_INDEX_KEY_PREFIX + key);
      if (!raw) {
        return null;
      }
      const parsed: unknown = JSON.parse(raw);
      return isCityIndex(parsed) ? parsed : null;
    } catch (error) {
      this.logger.warn(
        `Could not read the city index of "${key}" from Redis: ${describeError(error)}`,
      );
      return null;
    }
  }

  private async writeSharedCityIndex(
    key: string,
    groups: CityIndexGroup[],
  ): Promise<void> {
    if (!this.redis) {
      return;
    }

    try {
      await this.redis.set(
        CITY_INDEX_KEY_PREFIX + key,
        JSON.stringify(groups),
        'EX',
        CITY_INDEX_TTL_SECONDS,
      );
    } catch (error) {
      // The index still serves this process; only the other ones will build
      // their own.
      this.logger.warn(
        `Could not share the city index of "${key}" through Redis: ${describeError(error)}`,
      );
    }
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

/**
 * The rows the search scans, one per city identity.
 *
 * De-duplicated by the folded `(city, state)` pair — the same identity a
 * business is stored under — because two spellings of one place in one state
 * ("Póvoa de Varzim", "Povoa de Varzim") would otherwise be two options that
 * select the same city.
 */
function indexEntries(groups: CityIndexGroup[]): CityIndexEntry[] {
  const seen = new Set<string>();
  const entries: CityIndexEntry[] = [];

  for (const { state, cities } of groups) {
    const stateKey = normalizeState(state) ?? '';
    for (const name of cities) {
      const city = name.trim();
      const cityKey = normalizeCity(city);
      const identity = `${stateKey} ${cityKey}`;
      if (!cityKey || seen.has(identity)) {
        continue;
      }
      seen.add(identity);
      entries.push({ city, state, cityKey });
    }
  }

  return entries;
}

/**
 * 0 equal, 1 prefix, 2 prefix of a later word, 3 anywhere; null when the name
 * does not contain the query at all. Both sides arrive folded.
 */
function matchScore(cityKey: string, query: string): number | null {
  if (cityKey === query) {
    return 0;
  }
  if (cityKey.startsWith(query)) {
    return 1;
  }

  let at = cityKey.indexOf(query);
  if (at < 0) {
    return null;
  }
  while (at >= 0) {
    if (!/[\p{L}\p{N}]/u.test(cityKey[at - 1])) {
      return 2;
    }
    at = cityKey.indexOf(query, at + 1);
  }
  return 3;
}

/** A country without subdivisions first, then states by name. */
function compareStates(a: string | null, b: string | null): number {
  if (a === b) {
    return 0;
  }
  if (a === null) {
    return -1;
  }
  if (b === null) {
    return 1;
  }
  return collator.compare(a, b);
}

/**
 * `fn` over every item, at most `limit` at a time, results in input order.
 *
 * Stops handing out work at the first failure: the build is all or nothing, so
 * whatever is still queued would be requested only to be thrown away.
 */
async function mapWithConcurrency<T, R>(
  items: readonly T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  let failed = false;

  const worker = async (): Promise<void> => {
    while (!failed && next < items.length) {
      const index = next++;
      try {
        results[index] = await fn(items[index]);
      } catch (error) {
        failed = true;
        throw error;
      }
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker),
  );
  return results;
}

function isCityIndex(value: unknown): value is CityIndexGroup[] {
  return (
    Array.isArray(value) &&
    value.every((group: unknown) => {
      if (typeof group !== 'object' || group === null) {
        return false;
      }
      const { state, cities } = group as { state?: unknown; cities?: unknown };
      return (
        (state === null || typeof state === 'string') &&
        Array.isArray(cities) &&
        cities.every((city) => typeof city === 'string')
      );
    })
  );
}

function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
