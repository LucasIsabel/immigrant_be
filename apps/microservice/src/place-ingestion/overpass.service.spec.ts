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

describe('OverpassService', () => {
  let service: OverpassService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    service = new OverpassService();
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
    // As pausas entre consultas são reais em produção e irrelevantes no teste.
    jest
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
        attempts: ['name:en', 'name', 'admin_level'],
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

    it('desiste depois do segundo 429', async () => {
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
