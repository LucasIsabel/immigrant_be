jest.mock('@app/config/env', () => ({
  env: { INGESTION_USER_AGENT: 'aloravia-test/1.0' },
}));

import {
  CityNotResolvedError,
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
  rows: { qid: string; label: string; article: string; point: string }[],
) =>
  json({
    results: {
      bindings: rows.map((r) => ({
        item: { value: `http://www.wikidata.org/entity/${r.qid}` },
        itemLabel: { value: r.label },
        article: { value: `https://en.wikipedia.org/wiki/${r.article}` },
        coord: { value: `Point(${r.point})` },
      })),
    },
  });

describe('WikidataDiscoveryService', () => {
  let service: WikidataDiscoveryService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    service = new WikidataDiscoveryService();
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
    jest
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
            Q174: { p17: ['Q155'], label: 'São Paulo', coord: true, sitelinks: 250 },
          }),
        );

      await expect(service.resolveCity('BR', 'Sao Paulo')).resolves.toMatchObject({
        wikidataId: 'Q174',
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
