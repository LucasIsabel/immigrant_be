jest.mock('@app/config/env', () => ({
  env: { INGESTION_USER_AGENT: 'aloravia-test/1.0' },
}));

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  CityNotResolvedError,
  CountryNotSupportedError,
  WikidataDiscoveryService,
  WikidataUnavailableError,
} from './wikidata-discovery.service';

const json = (body: unknown, status = 200): Response =>
  ({
    ok: status < 400,
    status,
    text: () => Promise.resolve(JSON.stringify(body)),
  }) as Response;

const text = (body: string, status = 200): Response =>
  ({ ok: status < 400, status, text: () => Promise.resolve(body) }) as Response;

/** A wbgetentities answer: id → { P31 classes, P17 countries, label, sitelinks }. */
const entities = (
  rows: Record<
    string,
    {
      p31?: string[];
      p17?: string[];
      p279?: string[];
      p131?: string[];
      label?: string;
      sitelinks?: number;
      coord?: boolean;
      website?: string;
    }
  >,
) => {
  const out: Record<string, unknown> = {};
  for (const [id, r] of Object.entries(rows)) {
    const claim = (ids: string[]) =>
      ids.map((v) => ({ mainsnak: { datavalue: { value: { id: v } } } }));
    out[id] = {
      claims: {
        ...(r.p31 && { P31: claim(r.p31) }),
        ...(r.p17 && { P17: claim(r.p17) }),
        ...(r.p279 && { P279: claim(r.p279) }),
        ...(r.p131 && { P131: claim(r.p131) }),
        ...(r.coord && { P625: [{ mainsnak: { datavalue: { value: {} } } }] }),
        ...(r.website && {
          P856: [{ mainsnak: { datavalue: { value: r.website } } }],
        }),
      },
      ...(r.label && { labels: { en: { value: r.label } } }),
      sitelinks: Object.fromEntries(
        Array.from({ length: r.sitelinks ?? 0 }, (_, i) => [`w${i}`, {}]),
      ),
    };
  }
  return json({ entities: out });
};

const sparql = (
  rows: {
    qid: string;
    label: string;
    article: string;
    point: string;
    /** The P131 the sweep reads; absent is the half that needs a city found. */
    admin?: { qid: string; label: string };
  }[],
) =>
  json({
    results: {
      bindings: rows.map((r) => ({
        item: { value: `http://www.wikidata.org/entity/${r.qid}` },
        itemLabel: { value: r.label },
        article: { value: `https://en.wikipedia.org/wiki/${r.article}` },
        coord: { value: `Point(${r.point})` },
        ...(r.admin && {
          admin: { value: `http://www.wikidata.org/entity/${r.admin.qid}` },
          adminLabel: { value: r.admin.label },
        }),
      })),
    },
  });

/** A `wikibase:around` answer: the nearest municipality, or none at all. */
const around = (city?: { qid: string; label: string; km: number }) =>
  json({
    results: {
      bindings: city
        ? [
            {
              city: { value: `http://www.wikidata.org/entity/${city.qid}` },
              cityLabel: { value: city.label },
              distance: { value: String(city.km) },
            },
          ]
        : [],
    },
  });

describe('WikidataDiscoveryService', () => {
  let service: WikidataDiscoveryService;
  let fetchMock: jest.Mock;
  let waitSpy: jest.SpyInstance<Promise<void>, [number]>;

  beforeEach(() => {
    service = new WikidataDiscoveryService();
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
    waitSpy = jest
      .spyOn(
        service as unknown as { wait: (ms: number) => Promise<void> },
        'wait',
      )
      .mockResolvedValue(undefined);
  });

  describe('resolveCity', () => {
    it('picks the entity in the right country with the exact label and a coordinate', async () => {
      // The first search hit is a guess: "Porto" returns Porto Alegre first.
      fetchMock
        .mockResolvedValueOnce(
          json({ search: [{ id: 'Q40269' }, { id: 'Q36433' }] }),
        )
        .mockResolvedValueOnce(
          entities({
            Q40269: {
              p17: ['Q155'],
              label: 'Porto Alegre',
              coord: true,
              sitelinks: 90,
            },
            Q36433: {
              p17: ['Q45'],
              label: 'Porto',
              coord: true,
              sitelinks: 120,
            },
          }),
        );

      await expect(service.resolveCity('PT', 'Porto')).resolves.toEqual({
        wikidataId: 'Q36433',
        label: 'Porto',
      });
    });

    it('breaks ties on sitelink count — a city has dozens, a namesake village a handful', async () => {
      fetchMock
        .mockResolvedValueOnce(json({ search: [{ id: 'Q1' }, { id: 'Q2' }] }))
        .mockResolvedValueOnce(
          entities({
            Q1: { p17: ['Q45'], label: 'Lisbon', coord: true, sitelinks: 3 },
            Q2: { p17: ['Q45'], label: 'Lisbon', coord: true, sitelinks: 150 },
          }),
        );

      await expect(service.resolveCity('PT', 'Lisbon')).resolves.toMatchObject({
        wikidataId: 'Q2',
      });
    });

    it('matches the label ignoring accents — "Sao Paulo" is "São Paulo"', async () => {
      // CountriesNow strips the accent, Wikidata keeps it. Exact-by-bytes
      // reported the city as nonexistent in production.
      fetchMock
        .mockResolvedValueOnce(json({ search: [{ id: 'Q174' }] }))
        .mockResolvedValueOnce(
          entities({
            Q174: {
              p17: ['Q155'],
              label: 'São Paulo',
              coord: true,
              sitelinks: 250,
            },
          }),
        );

      await expect(
        service.resolveCity('BR', 'Sao Paulo'),
      ).resolves.toMatchObject({
        wikidataId: 'Q174',
      });
    });

    describe('with a state', () => {
      /**
       * Two real towns called Campo Grande in Brazil. The capital of Mato
       * Grosso do Sul has far more sitelinks, so the tie-break alone could
       * never reach the one in Alagoas.
       */
      const twoCampoGrandes = (
        parents: { ms: string[]; al: string[] } = {
          ms: ['Q43319'],
          al: ['Q40885'],
        },
      ) =>
        fetchMock
          .mockResolvedValueOnce(
            json({ search: [{ id: 'Q210945' }, { id: 'Q1804484' }] }),
          )
          .mockResolvedValueOnce(
            entities({
              Q210945: {
                p17: ['Q155'],
                label: 'Campo Grande',
                coord: true,
                sitelinks: 80,
                p131: parents.ms,
              },
              Q1804484: {
                p17: ['Q155'],
                label: 'Campo Grande',
                coord: true,
                sitelinks: 12,
                p131: parents.al,
              },
            }),
          );

      it('picks the namesake inside the state over the better-known one', async () => {
        twoCampoGrandes().mockResolvedValueOnce(
          entities({
            Q43319: { label: 'Mato Grosso do Sul' },
            Q40885: { label: 'Alagoas' },
          }),
        );

        await expect(
          service.resolveCity('BR', 'Campo Grande', 'Alagoas'),
        ).resolves.toMatchObject({ wikidataId: 'Q1804484' });
      });

      it('keeps the sitelinks tie-break without a state, and asks nothing more', async () => {
        twoCampoGrandes();

        await expect(
          service.resolveCity('BR', 'Campo Grande'),
        ).resolves.toMatchObject({ wikidataId: 'Q210945' });
        expect(fetchMock).toHaveBeenCalledTimes(2);
      });

      it('climbs a second hop when the state is not the direct parent', async () => {
        // Elsewhere a county or a district sits between the town and its
        // state; the second hop is read only because the first settled nothing.
        twoCampoGrandes({ ms: ['QRegionMS'], al: ['QRegionAL'] })
          .mockResolvedValueOnce(
            entities({
              QRegionMS: { label: 'Some region', p131: ['Q43319'] },
              QRegionAL: { label: 'Other region', p131: ['Q40885'] },
            }),
          )
          .mockResolvedValueOnce(
            entities({
              Q43319: { label: 'Mato Grosso do Sul' },
              Q40885: { label: 'Alagoas' },
            }),
          );

        await expect(
          service.resolveCity('BR', 'Campo Grande', 'Alagoas'),
        ).resolves.toMatchObject({ wikidataId: 'Q1804484' });
      });

      it('falls back to the tie-break when no candidate lies in the state', async () => {
        twoCampoGrandes().mockResolvedValueOnce(
          entities({
            Q43319: { label: 'Mato Grosso do Sul' },
            Q40885: { label: 'Alagoas' },
          }),
        );

        await expect(
          service.resolveCity('BR', 'Campo Grande', 'Paraná'),
        ).resolves.toMatchObject({ wikidataId: 'Q210945' });
      });
    });

    it('fails permanently when nothing matches — never falls back to a guess', async () => {
      fetchMock
        .mockResolvedValueOnce(json({ search: [{ id: 'Q1' }] }))
        .mockResolvedValueOnce(
          entities({ Q1: { p17: ['Q155'], label: 'Lisbon', coord: true } }),
        );

      await expect(service.resolveCity('PT', 'Lisbon')).rejects.toThrow(
        CityNotResolvedError,
      );
    });
  });

  describe('discover', () => {
    it('classifies from P31, climbs one P279 hop for unknown classes, and drops the rest', async () => {
      fetchMock
        .mockResolvedValueOnce(
          sparql([
            {
              qid: 'Q10',
              label: 'Belém Tower',
              article: 'Bel%C3%A9m_Tower',
              point: '-9.216 38.6916',
            },
            {
              qid: 'Q11',
              label: 'Some Convent',
              article: 'Some_Convent',
              point: '-9.2 38.7',
            },
            {
              qid: 'Q12',
              label: 'Some Office',
              article: 'Some_Office',
              point: '-9.1 38.7',
            },
          ]),
        )
        // P31 of the three items
        .mockResolvedValueOnce(
          entities({
            Q10: { p31: ['Q23413'] }, // castle → LANDMARK directly
            Q11: { p31: ['Q44613x'] }, // unknown class
            Q12: { p31: ['Q99999'] }, // unknown class with no useful parent
          }),
        )
        // P279 of the unknown classes
        .mockResolvedValueOnce(
          entities({
            Q44613x: { p279: ['Q44613'] }, // → monastery → LANDMARK
            Q99999: { p279: ['Q43229'] }, // → organization: nothing
          }),
        );

      const result = await service.discover('Q597');

      expect(result.rawCount).toBe(3);
      expect(result.droppedAsUnmapped).toBe(1);
      expect(result.places.map((p) => [p.wikidataId, p.category])).toEqual([
        ['Q10', 'LANDMARK'],
        ['Q11', 'LANDMARK'],
      ]);
      expect(result.places[0]).toMatchObject({
        name: 'Belém Tower',
        articleTitle: 'Belém Tower',
        lat: 38.6916,
        lng: -9.216,
      });
    });

    it('excludes what never makes a guide, even when a parent class would map it', async () => {
      // Measured on Lisbon: the airport topped the ranking through
      // "architectural structure". Its own class is the veto.
      fetchMock
        .mockResolvedValueOnce(
          sparql([
            { qid: 'Q1', label: 'Airport', article: 'Airport', point: '-9 38' },
          ]),
        )
        .mockResolvedValueOnce(entities({ Q1: { p31: ['Q1248784'] } }));

      const result = await service.discover('Q597');

      expect(result.places).toEqual([]);
      expect(result.droppedAsUnmapped).toBe(1);
    });

    it('collapses an item that comes back twice because it has two coordinates', async () => {
      fetchMock
        .mockResolvedValueOnce(
          sparql([
            {
              qid: 'Q1',
              label: 'Liberty City',
              article: 'Liberty_City',
              point: '-80.2 25.8',
            },
            {
              qid: 'Q1',
              label: 'Liberty City',
              article: 'Liberty_City',
              point: '-80.21 25.81',
            },
          ]),
        )
        .mockResolvedValueOnce(entities({ Q1: { p31: ['Q123705'] } }));

      const result = await service.discover('Q8652');

      expect(result.rawCount).toBe(1);
      expect(result.places).toHaveLength(1);
    });

    it('carries the website when Wikidata has it', async () => {
      fetchMock
        .mockResolvedValueOnce(
          sparql([
            { qid: 'Q1', label: 'MAAT', article: 'MAAT', point: '-9.2 38.7' },
          ]),
        )
        .mockResolvedValueOnce(
          entities({ Q1: { p31: ['Q33506'], website: 'https://maat.pt' } }),
        );

      const { places } = await service.discover('Q597');
      expect(places[0].website).toBe('https://maat.pt');
    });
  });

  describe('nearestMunicipality', () => {
    it('asks for the nearest municipality of that country, within 30 km', async () => {
      fetchMock.mockResolvedValueOnce(
        around({ qid: 'Q379033', label: 'Albufeira', km: 3.9 }),
      );

      const near = await service.nearestMunicipality(37.08, -8.28, 'PT');

      const query = decodeURIComponent(fetchMock.mock.calls[0][0] as string);
      expect(query).toContain('Point(-8.28 37.08)');
      expect(query).toContain('wikibase:radius "30"');
      // The municipality, never the settlement: Q486972 answers with hamlets.
      expect(query).toContain('wd:Q15284');
      // Bounded by the country, or the Algarve borrows Spanish municipalities.
      expect(query).toContain('wd:Q45');
      expect(near).toEqual({
        wikidataId: 'Q379033',
        label: 'Albufeira',
        distanceKm: 3.9,
      });
    });

    it('answers null when nothing is in range, rather than reaching further', async () => {
      fetchMock.mockResolvedValueOnce(around());

      expect(await service.nearestMunicipality(0, 0, 'PT')).toBeNull();
    });

    it('refuses a country it cannot name on Wikidata', async () => {
      await expect(
        service.nearestMunicipality(37.08, -8.28, 'ZZ'),
      ).rejects.toBeInstanceOf(CountryNotSupportedError);
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });

  describe('discoverInCountry', () => {
    const beach = (
      qid: string,
      label: string,
      point: string,
      admin?: { qid: string; label: string },
    ) => ({ qid, label, article: label.replace(/ /g, '_'), point, admin });

    it('filters by class inside the query, one class per request', async () => {
      fetchMock.mockResolvedValue(sparql([]));

      await service.discoverInCountry('PT', 'BEACH');

      const query = decodeURIComponent(fetchMock.mock.calls[0][0] as string);
      expect(query).toContain('wd:Q40080');
      expect(query).toContain('wd:Q45');
      expect(query).toContain('wdt:P31/wdt:P279*');
      // BEACH is one class, and no candidates means nothing else to ask.
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('never bundles a category into one query — that is what timed out', async () => {
      fetchMock.mockResolvedValue(sparql([]));

      await service.discoverInCountry('PT', 'LANDMARK');

      const queries = fetchMock.mock.calls.map((call) =>
        decodeURIComponent(call[0] as string),
      );
      expect(queries.length).toBeGreaterThan(10);
      for (const query of queries) {
        expect(query).toMatch(/VALUES \?class \{ wd:Q\d+ \}/);
      }
      expect(queries.some((query) => query.includes('wd:Q23413'))).toBe(true);
      expect(queries.some((query) => query.includes('wd:Q40080'))).toBe(false);
    });

    it('takes the city from P131, and asks nobody else', async () => {
      fetchMock
        .mockResolvedValueOnce(
          sparql([
            beach('Q1', 'Machico beach', '-16.76 32.71', {
              qid: 'Q693243',
              label: 'Machico',
            }),
          ]),
        )
        .mockResolvedValueOnce(entities({ Q1: { p31: ['Q40080'] } }));

      const result = await service.discoverInCountry('PT', 'BEACH');

      expect(result.places[0].city).toEqual({
        wikidataId: 'Q693243',
        label: 'Machico',
        source: 'WIKIDATA_P131',
      });
      expect(result.fromP131).toBe(1);
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('falls back to the nearest municipality, and says that is what it did', async () => {
      fetchMock
        .mockResolvedValueOnce(
          sparql([beach('Q1', 'Praia do Evaristo', '-8.28 37.08')]),
        )
        .mockResolvedValueOnce(entities({ Q1: { p31: ['Q40080'] } }))
        .mockResolvedValueOnce(
          around({ qid: 'Q379033', label: 'Albufeira', km: 3.9 }),
        );

      const result = await service.discoverInCountry('PT', 'BEACH');

      expect(result.places[0].city).toEqual({
        wikidataId: 'Q379033',
        label: 'Albufeira',
        distanceKm: 3.9,
        source: 'NEAREST_MUNICIPALITY',
      });
      expect(result.fromProximity).toBe(1);
    });

    it('keeps a place with no city at all, counted rather than invented', async () => {
      fetchMock
        .mockResolvedValueOnce(
          sparql([beach('Q1', 'Praia Perdida', '-30.0 -20.0')]),
        )
        .mockResolvedValueOnce(entities({ Q1: { p31: ['Q40080'] } }))
        .mockResolvedValueOnce(around());

      const result = await service.discoverInCountry('PT', 'BEACH');

      expect(result.places).toHaveLength(1);
      expect(result.places[0].city).toBeUndefined();
      expect(result.cityNotFound).toBe(1);
    });

    it('still vetoes what the subclass closure lets through', async () => {
      fetchMock
        .mockResolvedValueOnce(
          sparql([beach('Q1', 'Fortaleza prisão', '-9.1 38.7')]),
        )
        // A prison that is a subclass of castle arrives under LANDMARK.
        .mockResolvedValueOnce(entities({ Q1: { p31: ['Q40357'] } }));

      const result = await service.discoverInCountry('PT', 'BEACH');

      expect(result.places).toHaveLength(0);
      expect(result.droppedAsExcluded).toBe(1);
      // And no proximity call was spent on something already discarded.
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('collapses an item that comes back twice', async () => {
      fetchMock
        .mockResolvedValueOnce(
          sparql([
            beach('Q1', 'Praia da Rocha', '-8.53 37.11', {
              qid: 'Q2',
              label: 'Portimão',
            }),
            beach('Q1', 'Praia da Rocha', '-8.54 37.12', {
              qid: 'Q2',
              label: 'Portimão',
            }),
          ]),
        )
        .mockResolvedValueOnce(entities({ Q1: { p31: ['Q40080'] } }));

      const result = await service.discoverInCountry('PT', 'BEACH');

      expect(result.rawCount).toBe(1);
      expect(result.places).toHaveLength(1);
    });

    it('loses one city to a 502, not the whole sweep', async () => {
      fetchMock
        .mockResolvedValueOnce(
          sparql([
            beach('Q1', 'Machico beach', '-16.76 32.71', {
              qid: 'Q693243',
              label: 'Machico',
            }),
            beach('Q2', 'Praia do Evaristo', '-8.28 37.08'),
          ]),
        )
        .mockResolvedValueOnce(
          entities({ Q1: { p31: ['Q40080'] }, Q2: { p31: ['Q40080'] } }),
        )
        .mockResolvedValue(json({}, 502));

      const result = await service.discoverInCountry('PT', 'BEACH');

      expect(result.places).toHaveLength(2);
      expect(result.places[0].city?.source).toBe('WIKIDATA_P131');
      expect(result.places[1].city).toBeUndefined();
      expect(result.cityLookupFailed).toBe(1);
    });

    it('stops asking for cities after three refusals in a row', async () => {
      fetchMock
        .mockResolvedValueOnce(
          sparql([
            beach('Q1', 'A', '-8.1 37.1'),
            beach('Q2', 'B', '-8.2 37.2'),
            beach('Q3', 'C', '-8.3 37.3'),
            beach('Q4', 'D', '-8.4 37.4'),
          ]),
        )
        .mockResolvedValueOnce(
          entities({
            Q1: { p31: ['Q40080'] },
            Q2: { p31: ['Q40080'] },
            Q3: { p31: ['Q40080'] },
            Q4: { p31: ['Q40080'] },
          }),
        )
        .mockResolvedValue(json({}, 502));

      const result = await service.discoverInCountry('PT', 'BEACH');

      // The sweep, the entities, and three items times three attempts. The
      // fourth item is counted without being asked.
      expect(fetchMock).toHaveBeenCalledTimes(2 + 9);
      expect(result.cityLookupFailed).toBe(4);
    });

    it('records a class that never answers and sweeps on with the rest', async () => {
      fetchMock
        .mockResolvedValueOnce(json({}, 502))
        .mockResolvedValueOnce(json({}, 502))
        .mockResolvedValueOnce(json({}, 502))
        .mockResolvedValueOnce(
          sparql([
            beach('Q1', 'Miradouro da Graça', '-9.13 38.71', {
              qid: 'Q597',
              label: 'Lisbon',
            }),
          ]),
        )
        .mockResolvedValueOnce(entities({ Q1: { p31: ['Q2416723'] } }));

      const result = await service.discoverInCountry('PT', 'VIEWPOINT');

      expect(result.classesFailed).toHaveLength(1);
      expect(result.places).toHaveLength(1);
    });

    it('refuses a country it cannot name on Wikidata', async () => {
      await expect(
        service.discoverInCountry('ZZ', 'BEACH'),
      ).rejects.toBeInstanceOf(CountryNotSupportedError);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('holds the calls apart, because WDQS answers 502 to a burst', async () => {
      fetchMock
        .mockResolvedValueOnce(
          sparql([beach('Q1', 'Praia do Evaristo', '-8.28 37.08')]),
        )
        .mockResolvedValueOnce(entities({ Q1: { p31: ['Q40080'] } }))
        .mockResolvedValueOnce(
          around({ qid: 'Q379033', label: 'Albufeira', km: 3.9 }),
        );

      await service.discoverInCountry('PT', 'BEACH');

      expect(waitSpy).toHaveBeenCalled();
      for (const [ms] of waitSpy.mock.calls) {
        expect(ms).toBeGreaterThan(0);
        expect(ms).toBeLessThanOrEqual(600);
      }
    });

    it('parses the shape WDQS really answers with', async () => {
      const fixture = JSON.parse(
        readFileSync(
          join(__dirname, '__fixtures__', 'wdqs-beaches-pt.json'),
          'utf8',
        ),
      ) as unknown;
      fetchMock
        .mockResolvedValueOnce(json(fixture))
        .mockResolvedValueOnce(
          entities({
            Q7237781: { p31: ['Q40080'] },
            Q7237787: { p31: ['Q40080'] },
            Q10352815: { p31: ['Q40080'] },
          }),
        )
        .mockResolvedValueOnce(
          around({ qid: 'Q379033', label: 'Albufeira', km: 3.9 }),
        );

      const result = await service.discoverInCountry('PT', 'BEACH');

      expect(result.places).toHaveLength(3);
      expect(result.fromP131).toBe(2);
      expect(result.fromProximity).toBe(1);
      expect(result.places[0].name).toBe('Praia de Valadares');
      expect(result.places[0].lat).toBeCloseTo(41.0869, 3);
      expect(result.places[0].lng).toBeCloseTo(-8.6566, 3);
    });
  });

  describe('resilience', () => {
    it('retries a 502 — free services under load answer one every so often', async () => {
      fetchMock
        .mockResolvedValueOnce(text('<html>bad gateway</html>', 502))
        .mockResolvedValueOnce(json({ search: [] }));

      await expect(service.resolveCity('PT', 'Lisbon')).rejects.toThrow(
        CityNotResolvedError,
      );
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('recognises a WDQS timeout spliced into an HTTP 200 body', async () => {
      // A timeout arrives as 200 with the error page inside the partial JSON.
      fetchMock.mockResolvedValueOnce(
        text('{"results":{"bindings":[{"itemSPARQL-QUERY: queryStr=...', 200),
      );

      await expect(service.discover('Q597')).rejects.toThrow(
        WikidataUnavailableError,
      );
    });
  });
});
