import { Injectable, Logger } from '@nestjs/common';
import { env } from '@app/config/env';

export interface SinalDePopularidade {
  wikidataId: string;
  /** Título do artigo em inglês. */
  title: string;
  /** Média mensal de visitas nos últimos 12 meses. */
  monthlyViews: number;
  /** Primeiro parágrafo do artigo — o que ancora o texto da IA em fato. */
  extract: string | null;
  /**
   * The Commons filename from the P18 claim, or null when the entity has no
   * image. Rides along on the wbgetentities call the ranking already makes —
   * fetching it separately would cost one extra request per place.
   */
  commonsFile: string | null;
}

/** What Commons knows about one image: where to get it, and whom to credit. */
export interface CommonsImage {
  /** Direct URL of the 800px-wide rendition. */
  url: string;
  mime: string;
  /** Licence short name (e.g. "CC BY-SA 4.0", "Public domain"). */
  license: string | null;
  /** Author, HTML stripped. CC licences require crediting them. */
  author: string | null;
}

const WIKIDATA = 'https://www.wikidata.org/w/api.php';
const COMMONS = 'https://commons.wikimedia.org/w/api.php';
const PAGEVIEWS =
  'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user';
const SUMMARY = 'https://en.wikipedia.org/api/rest_v1/page/summary';

/** O `wbgetentities` aceita até 50 ids por chamada. */
const LOTE = 50;

@Injectable()
export class WikimediaService {
  private readonly logger = new Logger(WikimediaService.name);

  /**
   * Converte QIDs do Wikidata no sinal de popularidade de cada lugar.
   *
   * É esta etapa que separa um guia turístico de um inventário. O Overpass não
   * tem noção de importância: numa consulta a Miami, 88 dos 99 resultados eram
   * parque de bairro. Ter artigo na Wikipédia em inglês, e quantas pessoas o
   * leem, é o sinal mais próximo de "as pessoas visitam isto" que existe de
   * graça.
   *
   * **Sem artigo em inglês, o lugar é descartado.** Medido: a Torre de Belém
   * tem ~13.000 visitas por mês, a estátua do Fernando Pessoa tem 219, e o
   * Museu Geológico não tem artigo. O corte cai exatamente onde deveria.
   */
  async popularity(
    wikidataIds: string[],
    /**
     * O resumo só interessa a quem vai escrever o texto — os 10 escolhidos.
     * Buscá-lo no ranqueamento custaria uma requisição por candidato
     * descartado: numa cidade com ~100 candidatos, 90 chamadas jogadas fora,
     * contra uma API de cortesia. Quem ranqueia passa `false`.
     */
    opcoes: { withExtract?: boolean } = {},
  ): Promise<SinalDePopularidade[]> {
    const { withExtract = true } = opcoes;
    const titulos = await this.titulosEmIngles(wikidataIds);
    const sinais: SinalDePopularidade[] = [];

    for (const [wikidataId, entidade] of titulos) {
      const monthlyViews = await this.mediaMensal(entidade.title);
      if (monthlyViews === null) continue;
      sinais.push({
        wikidataId,
        title: entidade.title,
        monthlyViews,
        extract: withExtract ? await this.resumo(entidade.title) : null,
        commonsFile: entidade.commonsFile,
      });
    }

    return sinais;
  }

  /**
   * Resolve one Commons file to its 800px URL, licence and author.
   *
   * Everything comes from the imageinfo API — the URL is never string-built.
   * That is a lesson, not a preference: hand-assembled Commons URLs produced
   * ten straight HTTP 400s earlier in this project.
   */
  async imageInfo(commonsFile: string): Promise<CommonsImage | null> {
    const title = encodeURIComponent(`File:${commonsFile}`);
    const url =
      `${COMMONS}?action=query&prop=imageinfo` +
      `&iiprop=url|extmetadata&iiurlwidth=800&format=json&titles=${title}`;

    const dados = await this.buscarJson<{
      query?: {
        pages?: Record<
          string,
          {
            imageinfo?: {
              thumburl?: string;
              thumbmime?: string;
              extmetadata?: Record<string, { value?: string }>;
            }[];
          }
        >;
      };
    }>(url);

    const page = Object.values(dados?.query?.pages ?? {})[0];
    const info = page?.imageinfo?.[0];
    if (!info?.thumburl) return null;

    const meta = info.extmetadata ?? {};
    return {
      url: info.thumburl,
      mime: info.thumbmime ?? 'image/jpeg',
      license: stripHtml(meta.LicenseShortName?.value) ?? null,
      author: stripHtml(meta.Artist?.value) ?? null,
    };
  }

  /** Download the image bytes, with the identifying User-Agent policy requires. */
  async download(url: string): Promise<Buffer | null> {
    try {
      const resposta = await fetch(url, {
        headers: { 'User-Agent': env.INGESTION_USER_AGENT },
      });
      if (!resposta.ok) {
        this.logger.warn(`Commons devolveu ${resposta.status} para ${url}`);
        return null;
      }
      return Buffer.from(await resposta.arrayBuffer());
    } catch (erro) {
      this.logger.warn(`Download falhou em ${url}: ${String(erro)}`);
      return null;
    }
  }

  /**
   * QID → título do artigo em inglês + arquivo de imagem (P18), num só pedido.
   * Quem não tem artigo fica de fora do mapa.
   */
  private async titulosEmIngles(
    wikidataIds: string[],
  ): Promise<Map<string, { title: string; commonsFile: string | null }>> {
    const encontrados = new Map<
      string,
      { title: string; commonsFile: string | null }
    >();

    for (let i = 0; i < wikidataIds.length; i += LOTE) {
      const lote = wikidataIds.slice(i, i + LOTE);
      const url = `${WIKIDATA}?action=wbgetentities&props=sitelinks|claims&format=json&ids=${lote.join('|')}`;
      const dados = await this.buscarJson<{
        entities?: Record<
          string,
          {
            sitelinks?: { enwiki?: { title?: string } };
            claims?: {
              P18?: { mainsnak?: { datavalue?: { value?: string } } }[];
            };
          }
        >;
      }>(url);

      for (const [qid, entidade] of Object.entries(dados?.entities ?? {})) {
        const title = entidade.sitelinks?.enwiki?.title;
        if (!title) continue;
        encontrados.set(qid, {
          title,
          commonsFile:
            entidade.claims?.P18?.[0]?.mainsnak?.datavalue?.value ?? null,
        });
      }
    }

    return encontrados;
  }

  /**
   * Média mensal de visitas nos últimos 12 meses.
   *
   * Média e não total porque artigo criado no meio do período não pode parecer
   * menos visitado do que é.
   */
  private async mediaMensal(title: string): Promise<number | null> {
    const { inicio, fim } = this.janelaDeDozeMeses();
    const url = `${PAGEVIEWS}/${encodeURIComponent(title.replace(/ /g, '_'))}/monthly/${inicio}/${fim}`;
    const dados = await this.buscarJson<{ items?: { views: number }[] }>(url);
    const itens = dados?.items ?? [];
    if (!itens.length) return null;
    return Math.round(
      itens.reduce((soma, item) => soma + item.views, 0) / itens.length,
    );
  }

  private async resumo(title: string): Promise<string | null> {
    const url = `${SUMMARY}/${encodeURIComponent(title.replace(/ /g, '_'))}`;
    const dados = await this.buscarJson<{ extract?: string }>(url);
    return dados?.extract ?? null;
  }

  /**
   * Devolve `null` em qualquer falha em vez de lançar.
   *
   * Um artigo sem dados de visita, ou um 404 pontual, não pode derrubar a
   * ingestão de uma cidade inteira: o lugar apenas fica de fora do ranking.
   */
  private async buscarJson<T>(url: string): Promise<T | null> {
    try {
      const resposta = await fetch(url, {
        headers: { 'User-Agent': env.INGESTION_USER_AGENT },
      });
      if (!resposta.ok) {
        this.logger.debug(`Wikimedia ${resposta.status} em ${url}`);
        return null;
      }
      return (await resposta.json()) as T;
    } catch (erro) {
      this.logger.warn(`Wikimedia falhou em ${url}: ${String(erro)}`);
      return null;
    }
  }

  /** `YYYYMMDD00` do primeiro dia de 12 meses atrás até o primeiro deste mês. */
  private janelaDeDozeMeses(): { inicio: string; fim: string } {
    const agora = new Date();
    const fim = new Date(
      Date.UTC(agora.getUTCFullYear(), agora.getUTCMonth(), 1),
    );
    const inicio = new Date(
      Date.UTC(fim.getUTCFullYear() - 1, fim.getUTCMonth(), 1),
    );
    const formatar = (d: Date) =>
      `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}0100`;
    return { inicio: formatar(inicio), fim: formatar(fim) };
  }
}

/** Commons metadata comes as HTML (the author is often a link). */
function stripHtml(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const text = value
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text || undefined;
}
