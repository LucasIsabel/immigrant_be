// O parse do env roda no import de `@app/config/env`, então importar o service
// já exigiria DATABASE_URL, GEMINI_API_KEY e companhia. Localmente o `.env`
// esconde isso; no CI, não. Mesmo mock que os specs de business-pages usam.
jest.mock('@app/config/env', () => ({
  env: {
    OVERPASS_BASE_URL: 'https://overpass.test/api/interpreter',
    INGESTION_USER_AGENT: 'aloravia-test/1.0',
  },
}));

import { WikimediaService } from './wikimedia.service';

const resposta = (body: unknown, status = 200): Response =>
  ({
    ok: status < 400,
    status,
    json: () => Promise.resolve(body),
  }) as Response;

const sitelinks = (mapa: Record<string, string | null>) =>
  resposta({
    entities: Object.fromEntries(
      Object.entries(mapa).map(([qid, title]) => [
        qid,
        { sitelinks: title ? { enwiki: { title } } : {} },
      ]),
    ),
  });

const visitas = (...mensais: number[]) =>
  resposta({ items: mensais.map((views) => ({ views })) });

describe('WikimediaService', () => {
  let service: WikimediaService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    service = new WikimediaService();
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  const urlDaChamada = (i: number): string =>
    String(fetchMock.mock.calls[i][0]);

  it('devolve o sinal completo de um lugar', async () => {
    fetchMock
      .mockResolvedValueOnce(sitelinks({ Q215003: 'Belém Tower' }))
      .mockResolvedValueOnce(visitas(12000, 13000, 14000))
      .mockResolvedValueOnce(resposta({ extract: 'A 16th-century tower.' }));

    await expect(service.popularity(['Q215003'])).resolves.toEqual([
      {
        wikidataId: 'Q215003',
        title: 'Belém Tower',
        monthlyViews: 13000,
        extract: 'A 16th-century tower.',
      },
    ]);
  });

  it('descarta quem não tem artigo em inglês', async () => {
    // É o filtro contra as estátuas e os parques de bairro: o Museu Geológico
    // de Lisboa não tem artigo, e some daqui.
    fetchMock.mockResolvedValueOnce(
      sitelinks({ Q215003: 'Belém Tower', Q10333493: null }),
    );
    fetchMock
      .mockResolvedValueOnce(visitas(100))
      .mockResolvedValueOnce(resposta({ extract: null }));

    const sinais = await service.popularity(['Q215003', 'Q10333493']);
    expect(sinais.map((s) => s.wikidataId)).toEqual(['Q215003']);
  });

  it('usa média, não soma', async () => {
    // Artigo criado no meio do período não pode parecer menos visitado.
    fetchMock
      .mockResolvedValueOnce(sitelinks({ Q1: 'X' }))
      .mockResolvedValueOnce(visitas(100, 200, 300))
      .mockResolvedValueOnce(resposta({ extract: null }));

    const [sinal] = await service.popularity(['Q1']);
    expect(sinal.monthlyViews).toBe(200);
  });

  it('descarta quem não tem dado de visitas', async () => {
    fetchMock
      .mockResolvedValueOnce(sitelinks({ Q1: 'X' }))
      .mockResolvedValueOnce(resposta({ items: [] }));

    await expect(service.popularity(['Q1'])).resolves.toEqual([]);
  });

  it('sobrevive a falha de rede — o lugar sai do ranking, a cidade não cai', async () => {
    fetchMock
      .mockResolvedValueOnce(sitelinks({ Q1: 'X' }))
      .mockRejectedValueOnce(new Error('ECONNRESET'));

    await expect(service.popularity(['Q1'])).resolves.toEqual([]);
  });

  it('aceita resumo ausente sem descartar o lugar', async () => {
    // O extract ancora o texto da IA, mas a falta dele não invalida a
    // popularidade — o prompt simplesmente recebe menos fato.
    fetchMock
      .mockResolvedValueOnce(sitelinks({ Q1: 'X' }))
      .mockResolvedValueOnce(visitas(500))
      .mockResolvedValueOnce(resposta({}, 404));

    const [sinal] = await service.popularity(['Q1']);
    expect(sinal).toMatchObject({ monthlyViews: 500, extract: null });
  });

  it('pede os QIDs em lotes de 50', async () => {
    const qids = Array.from({ length: 120 }, (_, i) => `Q${i}`);
    fetchMock.mockResolvedValue(resposta({ entities: {} }));

    await service.popularity(qids);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(urlDaChamada(0).split('ids=')[1].split('|')).toHaveLength(50);
  });

  it('troca espaço por underscore no título da URL', async () => {
    fetchMock
      .mockResolvedValueOnce(sitelinks({ Q1: 'São Jorge Castle' }))
      .mockResolvedValueOnce(visitas(1))
      .mockResolvedValueOnce(resposta({ extract: null }));

    await service.popularity(['Q1']);
    expect(urlDaChamada(1)).toContain('S%C3%A3o_Jorge_Castle');
  });

  it('pede uma janela de 12 meses terminando no mês corrente', async () => {
    fetchMock
      .mockResolvedValueOnce(sitelinks({ Q1: 'X' }))
      .mockResolvedValueOnce(visitas(1))
      .mockResolvedValueOnce(resposta({ extract: null }));

    await service.popularity(['Q1']);
    const [inicio, fim] = urlDaChamada(1).split('/monthly/')[1].split('/');
    expect(inicio).toMatch(/^\d{8}00$/);
    expect(fim).toMatch(/^\d{8}00$/);
    expect(Number(fim.slice(0, 4)) - Number(inicio.slice(0, 4))).toBe(1);
  });
});
