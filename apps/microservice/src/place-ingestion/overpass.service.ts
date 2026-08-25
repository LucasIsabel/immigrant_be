import { Injectable, Logger } from '@nestjs/common';
import { env } from '@app/config/env';
import { PlaceCategory } from '../../../../generated/prisma';

/**
 * Erro que o job entende: a cidade não existe no OSM sob nenhum dos nomes que
 * tentamos. Carrega as tentativas para a mensagem no admin dizer o que foi
 * procurado, em vez de só "falhou".
 */
export class AreaNotResolvedError extends Error {
  constructor(
    readonly countryCode: string,
    readonly city: string,
    readonly attempts: string[],
  ) {
    super(
      `Nenhuma área no OSM para ${city} (${countryCode}). Tentativas: ${attempts.join(', ')}`,
    );
    this.name = 'AreaNotResolvedError';
  }
}

/** O Overpass recusou ou estourou. Retentável — o BullMQ é quem re-tenta. */
export class OverpassUnavailableError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'OverpassUnavailableError';
  }
}

export interface OverpassPoi {
  osmType: 'node' | 'way' | 'relation';
  osmId: number;
  name: string;
  wikidataId: string;
  lat: number;
  lng: number;
  category: PlaceCategory;
  address?: string;
  website?: string;
  isFree: boolean;
}

/**
 * Seletores por categoria.
 *
 * `artwork` e `memorial` ficam de fora de propósito: numa consulta a Lisboa
 * vieram 161 estátuas e 97 placas contra 36 museus, e "Pastéis de Belém"
 * entrou como atração. Um guia turístico não é um inventário de placas.
 */
const SELETORES: Record<PlaceCategory, string[]> = {
  MUSEUM: ['nwr["tourism"~"^(museum|gallery)$"]'],
  LANDMARK: [
    'nwr["historic"~"^(castle|fort|monument|tower|city_gate|archaeological_site)$"]',
    'nwr["building"="cathedral"]',
  ],
  VIEWPOINT: ['nwr["tourism"="viewpoint"]'],
  BEACH: ['nwr["natural"="beach"]'],
  NATURE: [
    'nwr["leisure"~"^(park|garden)$"]',
    'nwr["boundary"="national_park"]',
  ],
  FOOD_MARKET: ['nwr["amenity"="marketplace"]'],
  NIGHTLIFE: ['nwr["amenity"="nightclub"]'],
  NEIGHBORHOOD: ['nwr["place"~"^(suburb|quarter|neighbourhood)$"]'],
};

/**
 * As áreas do Overpass são o id da relação + 3600000000.
 * Documentado porque o número aparece cru nas consultas.
 */
const OFFSET_AREA = 3_600_000_000;

interface ElementoOverpass {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

@Injectable()
export class OverpassService {
  private readonly logger = new Logger(OverpassService.name);

  /**
   * Encontra a área da cidade no OSM.
   *
   * A cascata existe porque o nome que o OSM usa não é o da nossa lista de
   * cidades, que vem do CountriesNow em inglês: `name="Lisbon"` devolve zero
   * resultados, porque no OSM ela se chama "Lisboa". Já `name:en="Lisbon"`
   * devolve a cidade inteira.
   *
   * A terceira tentativa existe para cidades que não estão marcadas como
   * `place=city` — foi o caso do Rio de Janeiro.
   *
   * Cada candidata passa por uma sonda barata antes de ser aceita: uma área que
   * existe mas não tem nada dentro apontaria o resto do pipeline para o vazio.
   */
  async resolveArea(countryCode: string, city: string): Promise<number> {
    const iso = countryCode.toUpperCase();
    const escapado = city.replace(/"/g, '\\"');

    const tentativas: { rotulo: string; filtro: string }[] = [
      {
        rotulo: 'name:en',
        filtro: `area["name:en"="${escapado}"]["place"~"city|town"]`,
      },
      {
        rotulo: 'name',
        filtro: `area["name"="${escapado}"]["place"~"city|town"]`,
      },
      {
        rotulo: 'admin_level',
        filtro: `area["name:en"="${escapado}"]["boundary"="administrative"]["admin_level"~"^(6|7|8)$"]`,
      },
    ];

    for (const { rotulo, filtro } of tentativas) {
      const consulta = `[out:json][timeout:60];
area["ISO3166-1"="${iso}"][admin_level=2]->.pais;
${filtro}(area.pais);
out ids tags;`;
      const { elements } = await this.executar(consulta);

      for (const candidata of elements) {
        const areaId = candidata.id;
        if (await this.temConteudo(areaId)) {
          this.logger.log(
            `Área do OSM para ${city} (${iso}) resolvida por ${rotulo}: ${areaId} — "${candidata.tags?.name ?? '?'}"`,
          );
          return areaId;
        }
      }
    }

    throw new AreaNotResolvedError(
      iso,
      city,
      tentativas.map((t) => t.rotulo),
    );
  }

  /** O nome que o OSM usa para a área — "Lisboa" onde a nossa lista diz "Lisbon". */
  async areaName(areaId: number): Promise<string | null> {
    const { elements } = await this.executar(
      `[out:json][timeout:30];rel(${areaId - OFFSET_AREA});out tags 1;`,
    );
    return elements[0]?.tags?.name ?? null;
  }

  /**
   * Os pontos de interesse de uma área, uma categoria por vez.
   *
   * Serializado e com intervalo entre as consultas de propósito: a consulta
   * única que pedia tudo de uma vez tomou 504 no Rio. Oito consultas pequenas
   * cabem no orçamento do servidor público; uma grande, não.
   *
   * `["wikidata"]` é filtro de entrada porque sem QID não há como ranquear
   * depois — o elemento seria descartado de qualquer forma, e filtrar aqui
   * economiza cota.
   */
  async fetchPois(areaId: number): Promise<OverpassPoi[]> {
    const encontrados: OverpassPoi[] = [];

    for (const [categoria, seletores] of Object.entries(SELETORES) as [
      PlaceCategory,
      string[],
    ][]) {
      const corpo = seletores
        .map((s) => `  ${s}["wikidata"]["name"](area.alvo);`)
        .join('\n');
      const consulta = `[out:json][timeout:60];
area(${areaId})->.alvo;
(
${corpo}
);
out center tags;`;

      const { elements } = await this.executar(consulta);
      for (const el of elements) {
        const poi = this.paraPoi(el, categoria);
        if (poi) encontrados.push(poi);
      }

      await this.esperar(5_000);
    }

    // Um mesmo elemento pode casar em duas categorias (um castelo que também é
    // museu). A primeira vence, porque a ordem dos seletores é a preferência.
    const porChave = new Map<string, OverpassPoi>();
    for (const poi of encontrados) {
      const chave = `${poi.osmType}/${poi.osmId}`;
      if (!porChave.has(chave)) porChave.set(chave, poi);
    }
    return [...porChave.values()];
  }

  private paraPoi(
    el: ElementoOverpass,
    category: PlaceCategory,
  ): OverpassPoi | null {
    const tags = el.tags ?? {};
    const lat = el.lat ?? el.center?.lat;
    const lng = el.lon ?? el.center?.lon;
    if (!tags.name || !tags.wikidata || lat == null || lng == null) return null;

    const endereco = [tags['addr:street'], tags['addr:housenumber']]
      .filter(Boolean)
      .join(', ');

    return {
      osmType: el.type as OverpassPoi['osmType'],
      osmId: el.id,
      name: tags.name,
      wikidataId: tags.wikidata,
      lat,
      lng,
      category,
      address: endereco || undefined,
      website: tags.website ?? undefined,
      // `fee=no` é afirmação; a ausência da tag não é. Categorias que só existem
      // ao ar livre são gratuitas por natureza.
      isFree:
        tags.fee === 'no' ||
        category === 'NEIGHBORHOOD' ||
        category === 'VIEWPOINT' ||
        category === 'BEACH',
    };
  }

  /**
   * Uma área pode existir e não conter nada de turístico — nesse caso ela é a
   * área errada, e aceitar apontaria o pipeline para o vazio.
   */
  private async temConteudo(areaId: number): Promise<boolean> {
    const { elements } = await this.executar(
      `[out:json][timeout:30];area(${areaId})->.a;nwr["tourism"](area.a);out count;`,
    );
    const total = Number(elements[0]?.tags?.total ?? 0);
    return total > 0;
  }

  private async executar(
    consulta: string,
  ): Promise<{ elements: ElementoOverpass[] }> {
    const resposta = await this.pedir(consulta);

    // 429 costuma vir com Retry-After curto: esperar e repetir uma vez sai mais
    // barato do que devolver o job para o backoff de 30s do BullMQ.
    if (resposta.status === 429) {
      const espera = this.retryAfterMs(resposta.headers.get('retry-after'));
      this.logger.warn(`Overpass 429; aguardando ${espera}ms e repetindo`);
      await this.esperar(espera);
      const segunda = await this.pedir(consulta);
      return this.ler(segunda);
    }

    return this.ler(resposta);
  }

  private async ler(
    resposta: Response,
  ): Promise<{ elements: ElementoOverpass[] }> {
    if (!resposta.ok) {
      throw new OverpassUnavailableError(
        resposta.status,
        `Overpass respondeu ${resposta.status}`,
      );
    }
    return (await resposta.json()) as { elements: ElementoOverpass[] };
  }

  private pedir(consulta: string): Promise<Response> {
    return fetch(env.OVERPASS_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': env.INGESTION_USER_AGENT,
      },
      body: new URLSearchParams({ data: consulta }).toString(),
    });
  }

  private retryAfterMs(cabecalho: string | null): number {
    const segundos = Number(cabecalho);
    if (Number.isFinite(segundos) && segundos > 0) {
      return Math.min(segundos * 1000, 60_000);
    }
    return 10_000;
  }

  private esperar(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
