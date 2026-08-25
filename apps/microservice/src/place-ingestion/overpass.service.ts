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

/** Quantas vezes esperar por um slot antes de devolver o job ao BullMQ. */
const TENTATIVAS_POR_SLOT = 4;

/**
 * Minimum gap between two of our queries.
 *
 * The public server has **2 slots** and holds each for a time proportional to
 * the query's cost. Measured: Lisbon's area query took 9.9s, and the probe
 * fired right after it took a 429 — not from quota, but because the previous
 * one still held the slot.
 *
 * 15s and not 5s, and that number came from the pilot rather than from taste.
 * At 5s all three pilot cities failed every attempt at `fetch_pois`: eight
 * category queries in a row against two slots degrade into 504s. The same eight
 * queries spaced 15s apart returned 7/8 on the first try, with the single 429
 * recovered by the slot wait below.
 *
 * The cost is about two minutes per city, which the queue's one-city-per-minute
 * limiter already allowed for.
 */
const INTERVALO_MINIMO_MS = 15_000;
const ESPERA_MAXIMA_MS = 60_000;
const ESPERA_PADRAO_MS = 10_000;

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

  /** Quando a última consulta partiu, para respeitar o intervalo mínimo. */
  private ultimaConsulta = 0;

  private async aguardarVez(): Promise<void> {
    const desdeAUltima = Date.now() - this.ultimaConsulta;
    if (this.ultimaConsulta && desdeAUltima < INTERVALO_MINIMO_MS) {
      await this.esperar(INTERVALO_MINIMO_MS - desdeAUltima);
    }
    this.ultimaConsulta = Date.now();
  }

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

    const tentativas: {
      rotulo: string;
      filtro: string;
      /** O filtro é frouxo de propósito; o nome é conferido aqui. */
      confirmarNome?: boolean;
    }[] = [
      {
        rotulo: 'name:en',
        filtro: `area["name:en"="${escapado}"]["place"~"city|town"]`,
      },
      {
        rotulo: 'name',
        filtro: `area["name"="${escapado}"]["place"~"city|town"]`,
      },
      // As duas últimas existem para a cidade que não é `place=city|town` — foi
      // o caso do Rio de Janeiro. A variante por `name` não é redundante: a
      // área de Sintra é `admin_level=7` e **não tem `name:en`**, então filtrar
      // o fallback por `name:en` o tornava inútil justamente para quem ele
      // deveria resgatar. Medido em 2026-08-25.
      {
        rotulo: 'admin_level:name:en',
        filtro: `area["name:en"="${escapado}"]["boundary"="administrative"]["admin_level"~"^(6|7|8)$"]`,
      },
      {
        rotulo: 'admin_level:name',
        filtro: `area["name"="${escapado}"]["boundary"="administrative"]["admin_level"~"^(6|7|8)$"]`,
      },
      // As duas últimas cobrem o acento: o CountriesNow diz "Sao Paulo", o OSM
      // guarda "São Paulo", e nenhuma das exatas casa. Ver `padraoSemAcento`.
      {
        rotulo: 'sem-acento:place',
        filtro: `area["name"~"^${padraoSemAcento(escapado)}$"]["place"~"city|town"]`,
        confirmarNome: true,
      },
      {
        rotulo: 'sem-acento:admin_level',
        filtro: `area["name"~"^${padraoSemAcento(escapado)}$"]["boundary"="administrative"]["admin_level"~"^(6|7|8)$"]`,
        confirmarNome: true,
      },
    ];

    for (const { rotulo, filtro, confirmarNome } of tentativas) {
      const consulta = `[out:json][timeout:60];
area["ISO3166-1"="${iso}"][admin_level=2]->.pais;
${filtro}(area.pais);
out ids tags;`;
      const { elements } = await this.executar(consulta);

      const candidatas = confirmarNome
        ? elements.filter(
            (el) => semAcento(el.tags?.name ?? '') === semAcento(city),
          )
        : elements;

      for (const candidata of candidatas) {
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

  /**
   * Executa uma consulta, esperando por slot quando o servidor recusa.
   *
   * O 429 do Overpass **não é cota diária**: o `/api/status` do servidor
   * público responde "Rate limit: 2 / 1 slots available now / Slot available
   * after: …, in 11 seconds". É concorrência, e a espera certa está escrita
   * ali. Medido rodando Lisboa: uma espera fixa de 10s, uma vez só, devolvia o
   * job para o backoff de 30 minutos do BullMQ enquanto o slot liberava em 11
   * segundos.
   *
   * Por isso a espera é perguntada, não chutada, e repetida algumas vezes —
   * oito consultas por cidade contra dois slots batem em 429 com frequência
   * normal, e desistir na primeira transforma rotina em falha.
   */
  private async executar(
    consulta: string,
  ): Promise<{ elements: ElementoOverpass[] }> {
    for (let tentativa = 1; tentativa <= TENTATIVAS_POR_SLOT; tentativa++) {
      await this.aguardarVez();
      const resposta = await this.pedir(consulta);
      if (resposta.status !== 429) return this.ler(resposta);

      const espera = await this.esperaPorSlot(
        resposta.headers.get('retry-after'),
      );
      this.logger.warn(
        `Overpass 429 (${tentativa}/${TENTATIVAS_POR_SLOT}); aguardando ${espera}ms por um slot`,
      );
      await this.esperar(espera);
    }

    throw new OverpassUnavailableError(
      429,
      `Overpass recusou a consulta em ${TENTATIVAS_POR_SLOT} tentativas por falta de slot`,
    );
  }

  /**
   * Quanto esperar antes de repetir: o `Retry-After` quando vem, o
   * `/api/status` quando não vem, e 10s quando nem isso responde.
   */
  private async esperaPorSlot(cabecalho: string | null): Promise<number> {
    const doCabecalho = Number(cabecalho);
    if (Number.isFinite(doCabecalho) && doCabecalho > 0) {
      return Math.min(doCabecalho * 1000, ESPERA_MAXIMA_MS);
    }

    const anunciado = await this.segundosAteProximoSlot();
    if (anunciado !== null) {
      // Um segundo a mais: pedir no instante exato do anúncio ainda pega 429.
      return Math.min((anunciado + 1) * 1000, ESPERA_MAXIMA_MS);
    }

    return ESPERA_PADRAO_MS;
  }

  private async segundosAteProximoSlot(): Promise<number | null> {
    try {
      const resposta = await fetch(
        env.OVERPASS_BASE_URL.replace(/\/interpreter$/, '/status'),
        { headers: { 'User-Agent': env.INGESTION_USER_AGENT } },
      );
      if (!resposta.ok) return null;

      const texto = await resposta.text();
      if (/\b[1-9]\d* slots? available now/.test(texto)) return 0;

      const [, segundos] = /in (\d+) seconds/.exec(texto) ?? [];
      return segundos ? Number(segundos) : null;
    } catch {
      // O status é uma cortesia. Se ele também está fora, a espera padrão
      // resolve — não é motivo para derrubar a ingestão.
      return null;
    }
  }

  private async ler(
    resposta: Response,
  ): Promise<{ elements: ElementoOverpass[] }> {
    if (!resposta.ok) {
      throw new OverpassUnavailableError(
        resposta.status,
        `Overpass respondeu ${resposta.status}${await this.motivo(resposta)}`,
      );
    }
    return (await resposta.json()) as { elements: ElementoOverpass[] };
  }

  /**
   * O que o Overpass diz junto do código de erro.
   *
   * O corpo vem em HTML, mas carrega uma frase útil — "runtime error: … The
   * server is probably too busy to handle your request." diz ao admin que é só
   * tentar de novo, enquanto "Overpass respondeu 504" não diz nada. Vale o
   * `replace` porque essa mensagem termina no `errorMessage` da ingestão, que é
   * o que aparece na tela de revisão.
   */
  private async motivo(resposta: Response): Promise<string> {
    try {
      const corpo = await resposta.text();
      const [, erro] = /Error: ([^<]+)/.exec(corpo) ?? [];
      return erro ? ` — ${erro.trim().replace(/\s+/g, ' ')}` : '';
    } catch {
      return '';
    }
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

  private esperar(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/** "São Paulo" e "Sao Paulo" viram a mesma coisa. */
function semAcento(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/\p{Mn}/gu, '')
    .toLowerCase();
}

/**
 * Padrão que casa o nome independentemente de acento.
 *
 * O Overpass não tem comparação insensível a acento, e **classe de caracteres
 * não resolve**: `[aàáâã]` devolveu zero para "São Paulo" porque o regex dele
 * trabalha byte a byte e o `ã` ocupa dois. O `.` casa o caractere inteiro, e
 * essa foi a saída — cada vogal (mais `c` e `n`, que carregam cedilha e til)
 * vira `.`.
 *
 * O padrão fica **frouxo de propósito**: `^S.. P..l.$` casou 28 áreas no
 * Brasil, entre elas 21 "San Pablo" e duas "St. Pauls". Quem separa é a
 * conferência do nome no nosso lado, com `semAcento` — sobrou exatamente uma,
 * `3600298285`, São Paulo cidade. Frouxo na consulta, exato na verificação:
 * pedir precisão ao Overpass aqui não é possível, e aceitar o primeiro
 * resultado dele seria loteria.
 */
function padraoSemAcento(cidade: string): string {
  return cidade
    .split('')
    .map((caractere) =>
      /[aeiouAEIOUcCnN]/.test(caractere)
        ? '.'
        : caractere.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    )
    .join('');
}
