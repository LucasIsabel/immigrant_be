import { Logger, ServiceUnavailableException } from '@nestjs/common';
import type Redis from 'ioredis';
import { CountriesNowService } from './countriesnow.service';

const CN = 'https://countriesnow.space/api/v0.1/countries';

const reply = (body: unknown, status = 200): Response =>
  ({
    ok: status < 400,
    status,
    json: () => Promise.resolve(body),
  }) as Response;

type Upstream = {
  countries: Array<{ country: string; cities: string[] }>;
  /** Country → state names, as `/states/q` lists them. */
  states: Record<string, string[]>;
  /** State → city names, as `/state/cities/q` lists them. */
  cities: Record<string, string[]>;
  /** State → how many times its request fails before it answers. */
  failures?: Record<string, number>;
};

/**
 * Brazil as far as the tests need it: Campo Grande in two states, São Paulo
 * with an accent in the state name, and one spelling too many.
 */
const BRAZIL: Upstream = {
  countries: [
    { country: 'Brazil', cities: ['Sao Paulo', 'Campo Grande'] },
    { country: 'Monaco', cities: ['Monaco', 'Monte Carlo', 'Monaco'] },
  ],
  states: {
    Brazil: ['Alagoas', 'Mato Grosso do Sul', 'São Paulo'],
    Monaco: [],
  },
  cities: {
    Alagoas: ['Campo Grande', 'Maceió'],
    'Mato Grosso do Sul': ['Campo Grande', 'Dourados'],
    'São Paulo': [
      'Campo',
      'Campos do Jordão',
      'Novo Campo',
      'Ocampo',
      'São Paulo',
      'Sao Paulo',
    ],
  },
};

const INDEX_KEY = 'countriesnow:city-index:v1:brazil';

describe('CountriesNowService — city search', () => {
  let fetchMock: jest.Mock;
  let redis: { get: jest.Mock; set: jest.Mock };
  let service: CountriesNowService;
  let warn: jest.SpyInstance;

  /** Answers like CountriesNow, from a fixture, and counts nothing itself. */
  const serve = (upstream: Upstream) => {
    const failures = { ...upstream.failures };
    fetchMock.mockImplementation((input: string) => {
      const url = new URL(input);

      if (url.pathname.endsWith('/states/q')) {
        const states = upstream.states[url.searchParams.get('country') ?? ''];
        return Promise.resolve(
          states
            ? reply({
                error: false,
                data: { states: states.map((name) => ({ name })) },
              })
            : reply({ error: true, msg: 'country not found' }),
        );
      }

      if (url.pathname.endsWith('/state/cities/q')) {
        const state = url.searchParams.get('state') ?? '';
        if ((failures[state] ?? 0) > 0) {
          failures[state] -= 1;
          return Promise.reject(new Error('ECONNRESET'));
        }
        return Promise.resolve(
          reply({ error: false, data: upstream.cities[state] ?? [] }),
        );
      }

      return Promise.resolve(
        reply({
          error: false,
          data: upstream.countries.map((row) => ({
            iso2: '',
            iso3: '',
            ...row,
          })),
        }),
      );
    });
  };

  const calledUrls = (): string[] =>
    fetchMock.mock.calls.map(([url]) => String(url));

  const stateUrl = (state: string) =>
    `${CN}/state/cities/q?country=Brazil&state=${encodeURIComponent(state)}`;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
    redis = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue('OK'),
    };
    warn = jest
      .spyOn(Logger.prototype, 'warn')
      .mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => undefined);
    service = new CountriesNowService(redis as unknown as Redis);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('building the index', () => {
    it('reads every state and keeps the state names exactly as CountriesNow spells them', async () => {
      serve(BRAZIL);

      await expect(service.searchCities('Brazil', 'sao')).resolves.toEqual([
        { city: 'São Paulo', state: 'São Paulo' },
      ]);

      // The accented name is the only one CountriesNow answers to.
      expect(calledUrls()).toContain(stateUrl('São Paulo'));
    });

    it('keeps one row per (city, state): two spellings in one state are one city, one name in two states is two', async () => {
      serve(BRAZIL);

      await expect(
        service.searchCities('Brazil', 'sao paulo'),
      ).resolves.toEqual([{ city: 'São Paulo', state: 'São Paulo' }]);
      await expect(
        service.searchCities('Brazil', 'campo grande'),
      ).resolves.toEqual([
        { city: 'Campo Grande', state: 'Alagoas' },
        { city: 'Campo Grande', state: 'Mato Grosso do Sul' },
      ]);
    });

    it('falls back to the flat list, with no state, for a country without subdivisions', async () => {
      serve(BRAZIL);

      await expect(service.searchCities('Monaco', 'mon')).resolves.toEqual([
        { city: 'Monaco', state: null },
        { city: 'Monte Carlo', state: null },
      ]);
    });

    it('answers nothing for a country CountriesNow does not know, and keeps nothing for it', async () => {
      serve(BRAZIL);

      await expect(service.searchCities('Atlantis', 'a')).resolves.toEqual([]);

      expect(calledUrls().some((url) => url.includes('/states/q'))).toBe(false);
      expect(redis.set).not.toHaveBeenCalled();
    });

    it('asks CountriesNow once per state when two searches arrive together', async () => {
      serve(BRAZIL);

      await Promise.all([
        service.searchCities('Brazil', 'campo'),
        service.searchCities('Brazil', 'sao'),
      ]);

      for (const state of BRAZIL.states.Brazil) {
        expect(calledUrls().filter((url) => url === stateUrl(state))).toEqual([
          stateUrl(state),
        ]);
      }
      expect(redis.get).toHaveBeenCalledTimes(1);
    });

    it('retries a state once and then builds the whole index', async () => {
      serve({ ...BRAZIL, failures: { 'Mato Grosso do Sul': 1 } });

      await expect(
        service.searchCities('Brazil', 'campo grande'),
      ).resolves.toHaveLength(2);

      expect(
        calledUrls().filter((url) => url === stateUrl('Mato Grosso do Sul')),
      ).toHaveLength(2);
    });

    it('fails the search and caches nothing when a state fails twice', async () => {
      serve({ ...BRAZIL, failures: { 'Mato Grosso do Sul': 2 } });

      await expect(service.searchCities('Brazil', 'campo')).rejects.toThrow(
        ServiceUnavailableException,
      );
      expect(redis.set).not.toHaveBeenCalled();

      // The next search builds again, and this time the index is whole —
      // not half of it remembered from the failure.
      await expect(
        service.searchCities('Brazil', 'campo grande'),
      ).resolves.toEqual([
        { city: 'Campo Grande', state: 'Alagoas' },
        { city: 'Campo Grande', state: 'Mato Grosso do Sul' },
      ]);
    });
  });

  describe('sharing the index', () => {
    it('serves a search from Redis without asking CountriesNow', async () => {
      redis.get.mockResolvedValue(
        JSON.stringify([
          { state: 'Alagoas', cities: ['Campo Grande'] },
          { state: 'Mato Grosso do Sul', cities: ['Campo Grande'] },
        ]),
      );

      await expect(service.searchCities('Brazil', 'campo')).resolves.toEqual([
        { city: 'Campo Grande', state: 'Alagoas' },
        { city: 'Campo Grande', state: 'Mato Grosso do Sul' },
      ]);

      expect(redis.get).toHaveBeenCalledWith(INDEX_KEY);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('shares what it built for a day, under the folded country name', async () => {
      serve(BRAZIL);

      await service.searchCities(' BRAZIL ', 'campo');

      expect(redis.set).toHaveBeenCalledWith(
        INDEX_KEY,
        expect.any(String),
        'EX',
        86_400,
      );
      expect(JSON.parse(redis.set.mock.calls[0][1] as string)).toEqual([
        { state: 'Alagoas', cities: ['Campo Grande', 'Maceió'] },
        { state: 'Mato Grosso do Sul', cities: ['Campo Grande', 'Dourados'] },
        {
          state: 'São Paulo',
          cities: BRAZIL.cities['São Paulo'],
        },
      ]);
      // Upstream is asked with its own spelling of the country, not the query's.
      expect(calledUrls()).toContain(stateUrl('Alagoas'));
    });

    it('still searches when Redis is down, and says so', async () => {
      serve(BRAZIL);
      redis.get.mockRejectedValue(new Error('ECONNREFUSED'));
      redis.set.mockRejectedValue(new Error('ECONNREFUSED'));

      await expect(service.searchCities('Brazil', 'dourados')).resolves.toEqual(
        [{ city: 'Dourados', state: 'Mato Grosso do Sul' }],
      );

      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('from Redis: ECONNREFUSED'),
      );
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('through Redis: ECONNREFUSED'),
      );
    });

    it('rebuilds when what Redis holds is not an index', async () => {
      serve(BRAZIL);
      redis.get.mockResolvedValue(JSON.stringify({ state: 'Alagoas' }));

      await expect(
        service.searchCities('Brazil', 'dourados'),
      ).resolves.toHaveLength(1);
      expect(redis.set).toHaveBeenCalled();
    });

    it('answers a second search from memory, touching neither Redis nor CountriesNow', async () => {
      serve(BRAZIL);
      await service.searchCities('Brazil', 'campo');
      fetchMock.mockClear();
      redis.get.mockClear();

      await expect(
        service.searchCities('Brazil', 'dourados'),
      ).resolves.toHaveLength(1);

      expect(redis.get).not.toHaveBeenCalled();
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });

  describe('ranking', () => {
    beforeEach(() => serve(BRAZIL));

    it('puts the equal name first, then prefixes, then later words, then anything that contains it', async () => {
      await expect(service.searchCities('Brazil', 'campo')).resolves.toEqual([
        { city: 'Campo', state: 'São Paulo' },
        { city: 'Campo Grande', state: 'Alagoas' },
        { city: 'Campo Grande', state: 'Mato Grosso do Sul' },
        { city: 'Campos do Jordão', state: 'São Paulo' },
        { city: 'Novo Campo', state: 'São Paulo' },
        { city: 'Ocampo', state: 'São Paulo' },
      ]);
    });

    it('matches without accents, case or repeated spaces', async () => {
      await expect(
        service.searchCities('Brazil', '  MACEIO '),
      ).resolves.toEqual([{ city: 'Maceió', state: 'Alagoas' }]);
    });

    it('stops at the limit', async () => {
      await expect(service.searchCities('Brazil', 'campo', 2)).resolves.toEqual(
        [
          { city: 'Campo', state: 'São Paulo' },
          { city: 'Campo Grande', state: 'Alagoas' },
        ],
      );
    });

    it('answers an empty list when nothing matches', async () => {
      await expect(service.searchCities('Brazil', 'xyz')).resolves.toEqual([]);
    });

    it('does not build anything for a query that folds to nothing', async () => {
      await expect(service.searchCities('Brazil', '   ')).resolves.toEqual([]);
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });
});
