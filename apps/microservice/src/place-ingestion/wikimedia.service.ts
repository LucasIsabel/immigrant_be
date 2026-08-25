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
}

const WIKIDATA = 'https://www.wikidata.org/w/api.php';
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
  async popularity(wikidataIds: string[]): Promise<SinalDePopularidade[]> {
    const titulos = await this.titulosEmIngles(wikidataIds);
    const sinais: SinalDePopularidade[] = [];

    for (const [wikidataId, title] of titulos) {
      const monthlyViews = await this.mediaMensal(title);
      if (monthlyViews === null) continue;
      sinais.push({
        wikidataId,
        title,
        monthlyViews,
        extract: await this.resumo(title),
      });
    }

    return sinais;
  }

  /** QID → título do artigo em inglês. Quem não tem fica de fora do mapa. */
  private async titulosEmIngles(
    wikidataIds: string[],
  ): Promise<Map<string, string>> {
    const encontrados = new Map<string, string>();

    for (let i = 0; i < wikidataIds.length; i += LOTE) {
      const lote = wikidataIds.slice(i, i + LOTE);
      const url = `${WIKIDATA}?action=wbgetentities&props=sitelinks&format=json&ids=${lote.join('|')}`;
      const dados = await this.buscarJson<{
        entities?: Record<
          string,
          { sitelinks?: { enwiki?: { title?: string } } }
        >;
      }>(url);

      for (const [qid, entidade] of Object.entries(dados?.entities ?? {})) {
        const title = entidade.sitelinks?.enwiki?.title;
        if (title) encontrados.set(qid, title);
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
