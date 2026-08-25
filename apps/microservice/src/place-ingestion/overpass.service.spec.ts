// O parse do env roda no import de `@app/config/env`, então importar o service
// já exigiria DATABASE_URL, GEMINI_API_KEY e companhia. Localmente o `.env`
// esconde isso; no CI, não. Mesmo mock que os specs de business-pages usam.
jest.mock('@app/config/env', () => ({
  env: {
    OVERPASS_BASE_URL: 'https://overpass.test/api/interpreter',
    INGESTION_USER_AGENT: 'aloravia-test/1.0',
  },
}));

import {
  AreaNotResolvedError,
  OverpassService,
  OverpassUnavailableError,
} from './overpass.service';

/** Fabrica uma resposta do `fetch` com o corpo já pronto. */
const resposta = (
  body: unknown,
  init: { status?: number; headers?: Record<string, string> } = {},
): Response =>
  ({
    ok: (init.status ?? 200) < 400,
    status: init.status ?? 200,
    headers: new Headers(init.headers ?? {}),
    json: () => Promise.resolve(body),
  }) as Response;

const areaEncontrada = (id: number, name = 'Lisboa') =>
  resposta({ elements: [{ type: 'relation', id, tags: { name } }] });

const sondaComConteudo = (total = 42) =>
  resposta({
    elements: [{ type: 'count', id: 0, tags: { total: `${total}` } }],
  });

const vazio = () => resposta({ elements: [] });

/** O `/api/status`, que responde texto puro e não JSON. */
const statusSemSlot = (segundos: number) =>
  ({
    ok: true,
    status: 200,
    headers: new Headers(),
    text: () =>
      Promise.resolve(
        `Rate limit: 2\n0 slots available now.\nSlot available after: 2026-08-25T12:18:02Z, in ${segundos} seconds.`,
      ),
  }) as unknown as Response;

describe('OverpassService', () => {
  let service: OverpassService;
  let fetchMock: jest.Mock;
  let esperarSpy: jest.SpyInstance;

  beforeEach(() => {
    service = new OverpassService();
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
    // As pausas entre consultas são reais em produção e irrelevantes no teste.
    esperarSpy = jest
      .spyOn(
        service as unknown as { esperar: (ms: number) => Promise<void> },
        'esperar',
      )
      .mockResolvedValue(undefined);
  });

  const consultaDaChamada = (i: number): string =>
    String((fetchMock.mock.calls[i][1] as { body: string }).body);

  describe('resolveArea', () => {
    it('resolve por name:en na primeira tentativa', async () => {
      // A nossa lista de cidades vem do CountriesNow em inglês.
      fetchMock
        .mockResolvedValueOnce(areaEncontrada(3600058433))
        .mockResolvedValueOnce(sondaComConteudo());

      await expect(service.resolveArea('PT', 'Lisbon')).resolves.toBe(
        3600058433,
      );
      expect(consultaDaChamada(0)).toContain(
        encodeURIComponent('area["name:en"="Lisbon"]'),
      );
    });

    it('cai para name quando name:en não existe', async () => {
      fetchMock
        .mockResolvedValueOnce(vazio())
        .mockResolvedValueOnce(areaEncontrada(3600001234, 'Porto'))
        .mockResolvedValueOnce(sondaComConteudo());

      await expect(service.resolveArea('PT', 'Porto')).resolves.toBe(
        3600001234,
      );
      expect(consultaDaChamada(1)).toContain(
        encodeURIComponent('area["name"="Porto"]'),
      );
    });

    it('tenta admin_level por name quando a área não tem name:en', async () => {
      // A área de Sintra é admin_level=7 e **não tem** name:en. Filtrar o
      // fallback por name:en o tornava inútil exatamente para o caso que ele
      // existe para resolver.
      fetchMock
        .mockResolvedValueOnce(vazio())
        .mockResolvedValueOnce(vazio())
        .mockResolvedValueOnce(vazio())
        .mockResolvedValueOnce(areaEncontrada(3605400893, 'Sintra'))
        .mockResolvedValueOnce(sondaComConteudo());

      await expect(service.resolveArea('PT', 'Sintra')).resolves.toBe(
        3605400893,
      );
      expect(consultaDaChamada(3)).toContain(
        encodeURIComponent(
          'area["name"="Sintra"]["boundary"="administrative"]',
        ),
      );
    });

    it('cai para admin_level quando a cidade não é place=city', async () => {
      // Foi o caso do Rio de Janeiro na medição.
      fetchMock
        .mockResolvedValueOnce(vazio())
        .mockResolvedValueOnce(vazio())
        .mockResolvedValueOnce(areaEncontrada(3600002697, 'Rio de Janeiro'))
        .mockResolvedValueOnce(sondaComConteudo());

      await expect(service.resolveArea('BR', 'Rio de Janeiro')).resolves.toBe(
        3600002697,
      );
      expect(consultaDaChamada(2)).toContain(
        encodeURIComponent('"boundary"="administrative"'),
      );
    });

    it('resolve a cidade acentuada que a nossa lista escreve sem acento', async () => {
      // O CountriesNow diz "Sao Paulo", o OSM guarda "São Paulo": as quatro
      // tentativas exatas devolvem zero. O padrão frouxo casa, e a conferência
      // do nome no nosso lado é quem descarta "San Pablo" e "St. Pauls" —
      // medido: 28 candidatos no Brasil, um só sobrevive.
      fetchMock
        .mockResolvedValueOnce(vazio())
        .mockResolvedValueOnce(vazio())
        .mockResolvedValueOnce(vazio())
        .mockResolvedValueOnce(vazio())
        .mockResolvedValueOnce(
          resposta({
            elements: [
              { type: 'relation', id: 3601309985, tags: { name: 'San Pablo' } },
              { type: 'relation', id: 3600298285, tags: { name: 'São Paulo' } },
            ],
          }),
        )
        .mockResolvedValueOnce(sondaComConteudo());

      await expect(service.resolveArea('BR', 'Sao Paulo')).resolves.toBe(
        3600298285,
      );
      // O corpo é `application/x-www-form-urlencoded`, onde espaço vira `+`.
      expect(
        decodeURIComponent(consultaDaChamada(4).replace(/\+/g, ' ')),
      ).toContain('^S.. P..l.$');
    });

    it('não aceita candidata cujo nome só bate por acaso no padrão frouxo', async () => {
      // Sem a conferência, "San Pablo" seria aceito como "Sao Paulo".
      fetchMock
        .mockResolvedValueOnce(vazio())
        .mockResolvedValueOnce(vazio())
        .mockResolvedValueOnce(vazio())
        .mockResolvedValueOnce(vazio())
        .mockResolvedValue(
          resposta({
            elements: [
              { type: 'relation', id: 3601309985, tags: { name: 'San Pablo' } },
            ],
          }),
        );

      await expect(service.resolveArea('BR', 'Sao Paulo')).rejects.toThrow(
        AreaNotResolvedError,
      );
    });

    it('recusa área que existe mas está vazia', async () => {
      // Aceitar apontaria o resto do pipeline para o nada.
      fetchMock
        .mockResolvedValueOnce(areaEncontrada(3600009999))
        .mockResolvedValueOnce(sondaComConteudo(0))
        .mockResolvedValue(vazio());

      await expect(service.resolveArea('PT', 'Fantasia')).rejects.toThrow(
        AreaNotResolvedError,
      );
    });

    it('reporta a falha com as tentativas, em vez de devolver nada', async () => {
      fetchMock.mockResolvedValue(vazio());

      await expect(
        service.resolveArea('XX', 'Cidade Inexistente'),
      ).rejects.toMatchObject({
        name: 'AreaNotResolvedError',
        city: 'Cidade Inexistente',
        attempts: [
          'name:en',
          'name',
          'admin_level:name:en',
          'admin_level:name',
          'sem-acento:place',
          'sem-acento:admin_level',
        ],
      });
    });

    it('escapa aspas no nome da cidade', async () => {
      fetchMock
        .mockResolvedValueOnce(areaEncontrada(1))
        .mockResolvedValueOnce(sondaComConteudo());

      await service.resolveArea('PT', 'Vila "Real"');
      expect(consultaDaChamada(0)).toContain(encodeURIComponent('\\"Real\\"'));
    });
  });

  describe('429 e 504', () => {
    it('honra o Retry-After e repete uma vez', async () => {
      fetchMock
        .mockResolvedValueOnce(
          resposta({}, { status: 429, headers: { 'retry-after': '3' } }),
        )
        .mockResolvedValueOnce(areaEncontrada(42))
        .mockResolvedValueOnce(sondaComConteudo());

      await expect(service.resolveArea('PT', 'Lisbon')).resolves.toBe(42);
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it('lança erro retentável no 504, para o BullMQ re-tentar', async () => {
      // Foi o que a consulta grande do Rio devolveu.
      fetchMock.mockResolvedValue(resposta({}, { status: 504 }));

      await expect(service.resolveArea('BR', 'Rio de Janeiro')).rejects.toThrow(
        OverpassUnavailableError,
      );
    });

    it('carrega o motivo que o Overpass deu, não só o código', async () => {
      // "Overpass respondeu 504" não diz ao admin o que fazer; a frase do
      // próprio servidor diz que é congestionamento e que vale tentar de novo.
      fetchMock.mockResolvedValue({
        ok: false,
        status: 504,
        headers: new Headers(),
        text: () =>
          Promise.resolve(
            '<p>Error: runtime error: Dispatcher_Client::request_read_and_idx::timeout. The server is probably too busy to handle your request.</p>',
          ),
      } as unknown as Response);

      await expect(service.resolveArea('PT', 'Lisbon')).rejects.toThrow(
        /server is probably too busy/,
      );
    });

    it('pergunta ao /api/status quanto esperar quando não há Retry-After', async () => {
      // O 429 do Overpass é falta de slot, não cota: o próprio servidor diz
      // quando o próximo libera. Chutar 10s devolvia o job para o backoff de
      // 30 minutos do BullMQ enquanto o slot liberava em 11 segundos.
      fetchMock
        .mockResolvedValueOnce(resposta({}, { status: 429 }))
        .mockResolvedValueOnce(statusSemSlot(11))
        .mockResolvedValueOnce(areaEncontrada(42))
        .mockResolvedValueOnce(sondaComConteudo());

      await expect(service.resolveArea('PT', 'Lisbon')).resolves.toBe(42);
      // Um segundo a mais que o anunciado: pedir no instante exato ainda pega 429.
      expect(esperarSpy).toHaveBeenCalledWith(12_000);
      expect(String(fetchMock.mock.calls[1][0])).toContain('/api/status');
    });

    it('desiste depois de esperar por slot algumas vezes', async () => {
      fetchMock.mockResolvedValue(resposta({}, { status: 429 }));

      await expect(service.resolveArea('PT', 'Lisbon')).rejects.toMatchObject({
        name: 'OverpassUnavailableError',
        status: 429,
      });
    });
  });

  describe('fetchPois', () => {
    const elemento = (over: Record<string, unknown> = {}) => ({
      type: 'node',
      id: 1,
      lat: 38.69,
      lon: -9.21,
      tags: { name: 'Torre de Belém', wikidata: 'Q215003' },
      ...over,
    });

    it('spaces the queries out, area resolution included', async () => {
      // Two slots on the public server: area and probe fired back to back take
      // a 429. The pilot measured 5s as too tight — all three cities failed
      // every attempt — and 15s as enough.
      fetchMock
        .mockResolvedValueOnce(areaEncontrada(42))
        .mockResolvedValueOnce(sondaComConteudo());

      await service.resolveArea('PT', 'Lisbon');

      const pauses = esperarSpy.mock.calls.map(([ms]) => ms as number);
      expect(pauses.some((ms) => ms > 0 && ms <= 15_000)).toBe(true);
    });

    it('consulta uma categoria por vez', async () => {
      fetchMock.mockResolvedValue(vazio());
      await service.fetchPois(3600058433);
      // Oito categorias no enum.
      expect(fetchMock).toHaveBeenCalledTimes(8);
    });

    it('exige wikidata na consulta', async () => {
      // Sem QID não há ranking depois; filtrar aqui economiza cota.
      fetchMock.mockResolvedValue(vazio());
      await service.fetchPois(1);
      expect(consultaDaChamada(0)).toContain(
        encodeURIComponent('["wikidata"]'),
      );
    });

    it('não pede artwork nem memorial', async () => {
      // São 161 estátuas e 97 placas em Lisboa; um guia não é inventário.
      fetchMock.mockResolvedValue(vazio());
      await service.fetchPois(1);
      const todas = fetchMock.mock.calls.map((_, i) => consultaDaChamada(i));
      expect(todas.join()).not.toContain('artwork');
      expect(todas.join()).not.toContain('memorial');
    });

    it('descarta elemento sem nome, sem wikidata ou sem coordenada', async () => {
      fetchMock.mockResolvedValue(
        resposta({
          elements: [
            elemento({ tags: { wikidata: 'Q1' } }),
            elemento({ id: 2, tags: { name: 'Sem QID' } }),
            elemento({ id: 3, lat: undefined, lon: undefined }),
          ],
        }),
      );
      await expect(service.fetchPois(1)).resolves.toEqual([]);
    });

    it('usa o center de way e relation, que não têm lat/lon próprios', async () => {
      fetchMock
        .mockResolvedValueOnce(
          resposta({
            elements: [
              elemento({
                type: 'way',
                lat: undefined,
                lon: undefined,
                center: { lat: 1.5, lon: 2.5 },
              }),
            ],
          }),
        )
        .mockResolvedValue(vazio());

      const [poi] = await service.fetchPois(1);
      expect(poi).toMatchObject({ osmType: 'way', lat: 1.5, lng: 2.5 });
    });

    it('não repete um elemento que casa em duas categorias', async () => {
      // Um castelo que também é museu.
      fetchMock.mockResolvedValue(resposta({ elements: [elemento()] }));
      const pois = await service.fetchPois(1);
      expect(pois).toHaveLength(1);
    });

    it('marca gratuito só com fee=no ou categoria de rua', async () => {
      fetchMock
        .mockResolvedValueOnce(
          resposta({
            elements: [
              elemento({ tags: { name: 'Pago', wikidata: 'Q1' } }),
              elemento({
                id: 2,
                tags: { name: 'Grátis', wikidata: 'Q2', fee: 'no' },
              }),
            ],
          }),
        )
        .mockResolvedValue(vazio());

      const pois = await service.fetchPois(1);
      expect(pois.map((p) => p.isFree)).toEqual([false, true]);
    });
  });
});
