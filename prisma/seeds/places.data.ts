import { PlaceCategory } from '../../generated/prisma';

export interface PlaceTranslationSeed {
  language: 'pt' | 'en' | 'es';
  description: string;
  tip?: string;
}

export interface PlaceSeed {
  name: string;
  slug: string;
  category: PlaceCategory;
  countryCode: string;
  /** Nome do país como está em `Country.name`, para resolver o FK. */
  countryName: string;
  /** Exatamente como o CountriesNow devolve — "Lisbon", não "Lisboa". */
  city: string;
  lat: number;
  lng: number;
  imageUrl?: string;
  popularityScore: number;
  isFree: boolean;
  address?: string;
  website?: string;
  sourceUrl?: string;
  translations: PlaceTranslationSeed[];
}

/**
 * Caixa delimitadora de cada cidade do fixture. Serve ao teste: coordenada
 * fora daqui é erro de digitação, e um pin no oceano é difícil de notar
 * lendo o diff.
 */
export const CITY_BBOX: Record<
  string,
  { minLat: number; maxLat: number; minLng: number; maxLng: number }
> = {
  Lisbon: { minLat: 38.68, maxLat: 38.82, minLng: -9.25, maxLng: -9.08 },
  Barcelona: { minLat: 41.34, maxLat: 41.47, minLng: 2.08, maxLng: 2.23 },
  Toronto: { minLat: 43.6, maxLat: 43.72, minLng: -79.55, maxLng: -79.3 },
};

export const PLACES: PlaceSeed[] = [
  // ─── Portugal · Lisbon ───────────────────────────────────────────────────
  {
    name: 'Torre de Belém',
    slug: 'torre-de-belem',
    category: PlaceCategory.LANDMARK,
    countryCode: 'PT',
    countryName: 'Portugal',
    city: 'Lisbon',
    lat: 38.6916,
    lng: -9.216,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Bel%C3%A9m_Tower_in_Lisbon%2C_Portugal.jpg/960px-Bel%C3%A9m_Tower_in_Lisbon%2C_Portugal.jpg',
    popularityScore: 100,
    isFree: false,
    address: 'Av. Brasília, 1400-038 Lisboa',
    sourceUrl: 'https://www.torrebelem.gov.pt/',
    translations: [
      {
        language: 'pt',
        description:
          'Torre manuelina do século XVI na margem do Tejo, erguida para guardar a entrada do porto.',
        tip: 'A fila da escada em caracol é longa: chegue na abertura.',
      },
      {
        language: 'en',
        description:
          'A 16th-century Manueline tower on the Tagus, built to guard the harbour entrance.',
        tip: 'The spiral staircase queues up fast — arrive at opening time.',
      },
      {
        language: 'es',
        description:
          'Torre manuelina del siglo XVI a orillas del Tajo, levantada para vigilar la entrada del puerto.',
        tip: 'La escalera de caracol se llena: llega a la hora de apertura.',
      },
    ],
  },
  {
    name: 'Mosteiro dos Jerónimos',
    slug: 'mosteiro-dos-jeronimos',
    category: PlaceCategory.LANDMARK,
    countryCode: 'PT',
    countryName: 'Portugal',
    city: 'Lisbon',
    lat: 38.6979,
    lng: -9.2065,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/The_Jer%C3%B3nimos_Monastery_or_Hieronymites_Monastery.png/960px-The_Jer%C3%B3nimos_Monastery_or_Hieronymites_Monastery.png',
    popularityScore: 95,
    isFree: false,
    address: 'Praça do Império 1400-206 Lisboa',
    sourceUrl: 'https://www.mosteirojeronimos.gov.pt/',
    translations: [
      {
        language: 'pt',
        description:
          'Mosteiro do século XVI onde está o túmulo de Vasco da Gama; a igreja tem entrada separada do claustro.',
        tip: 'A igreja é gratuita; o claustro é o bilhete pago.',
      },
      {
        language: 'en',
        description:
          '16th-century monastery holding Vasco da Gama’s tomb; the church and cloister have separate entrances.',
        tip: 'The church is free — only the cloister needs a ticket.',
      },
      {
        language: 'es',
        description:
          'Monasterio del siglo XVI con la tumba de Vasco da Gama; iglesia y claustro tienen entradas distintas.',
        tip: 'La iglesia es gratuita; solo el claustro requiere entrada.',
      },
    ],
  },
  {
    name: 'Castelo de São Jorge',
    slug: 'castelo-de-sao-jorge',
    category: PlaceCategory.LANDMARK,
    countryCode: 'PT',
    countryName: 'Portugal',
    city: 'Lisbon',
    lat: 38.7139,
    lng: -9.1335,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/LisbonCastle.jpg/960px-LisbonCastle.jpg',
    popularityScore: 88,
    isFree: false,
    address: 'R. de Santa Cruz do Castelo, 1100-129 Lisboa',
    sourceUrl: 'https://castelodesaojorge.pt/',
    translations: [
      {
        language: 'pt',
        description:
          'Fortificação moura no ponto mais alto da cidade, com muralhas que se percorrem a pé.',
        tip: 'A subida é íngreme — o elétrico 28 poupa as pernas.',
      },
      {
        language: 'en',
        description:
          'Moorish fortress on the city’s highest hill, with ramparts you can walk end to end.',
        tip: 'The climb is steep — tram 28 saves your legs.',
      },
      {
        language: 'es',
        description:
          'Fortaleza mora en la colina más alta de la ciudad, con murallas que se recorren a pie.',
        tip: 'La subida es empinada: el tranvía 28 te ahorra el esfuerzo.',
      },
    ],
  },
  {
    name: 'Praça do Comércio',
    slug: 'praca-do-comercio',
    category: PlaceCategory.LANDMARK,
    countryCode: 'PT',
    countryName: 'Portugal',
    city: 'Lisbon',
    lat: 38.7075,
    lng: -9.1364,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Lisbon_%2836211708233%29_%28cropped%29.jpg/960px-Lisbon_%2836211708233%29_%28cropped%29.jpg',
    popularityScore: 80,
    isFree: true,
    address: 'Praça do Comércio, 1100-148 Lisboa',
    translations: [
      {
        language: 'pt',
        description:
          'A praça aberta para o rio, reconstruída depois do terramoto de 1755. Ponto de partida natural para a Baixa.',
        tip: 'O fim de tarde pega o sol batendo no arco da Rua Augusta.',
      },
      {
        language: 'en',
        description:
          'The riverfront square rebuilt after the 1755 earthquake — the natural starting point for the Baixa.',
        tip: 'Late afternoon light hits the Rua Augusta arch best.',
      },
      {
        language: 'es',
        description:
          'La plaza abierta al río, reconstruida tras el terremoto de 1755. Punto de partida natural hacia la Baixa.',
        tip: 'A última hora de la tarde el sol ilumina el arco de Rua Augusta.',
      },
    ],
  },
  {
    name: 'Time Out Market',
    slug: 'time-out-market',
    category: PlaceCategory.FOOD_MARKET,
    countryCode: 'PT',
    countryName: 'Portugal',
    city: 'Lisbon',
    lat: 38.7071,
    lng: -9.1459,
    popularityScore: 74,
    isFree: true,
    address: 'Av. 24 de Julho 49, 1200-479 Lisboa',
    website: 'https://www.timeoutmarket.com/lisboa/',
    translations: [
      {
        language: 'pt',
        description:
          'Mercado da Ribeira convertido em praça de alimentação com bancas de cozinheiros conhecidos da cidade.',
        tip: 'Almoce antes das 12h30 — depois disso não há mesa livre.',
      },
      {
        language: 'en',
        description:
          'The old Ribeira market turned food hall, with stalls from the city’s better-known cooks.',
        tip: 'Eat before 12:30 — after that there are no free tables.',
      },
      {
        language: 'es',
        description:
          'El antiguo mercado da Ribeira convertido en patio de comidas con puestos de cocineros reconocidos.',
        tip: 'Come antes de las 12:30; después no hay mesas libres.',
      },
    ],
  },
  {
    name: 'Alfama',
    slug: 'alfama',
    category: PlaceCategory.NEIGHBORHOOD,
    countryCode: 'PT',
    countryName: 'Portugal',
    city: 'Lisbon',
    lat: 38.7118,
    lng: -9.1296,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Lisbon_alfalma.jpg/960px-Lisbon_alfalma.jpg',
    popularityScore: 70,
    isFree: true,
    translations: [
      {
        language: 'pt',
        description:
          'O bairro mais antigo da cidade, um labirinto de becos que sobreviveu ao terramoto. Casas de fado à noite.',
        tip: 'Perder-se é o passeio — não tente seguir o mapa.',
      },
      {
        language: 'en',
        description:
          'The oldest quarter, a maze of alleys that survived the earthquake. Fado houses after dark.',
        tip: 'Getting lost is the point — don’t follow the map.',
      },
      {
        language: 'es',
        description:
          'El barrio más antiguo, un laberinto de callejones que sobrevivió al terremoto. Casas de fado por la noche.',
        tip: 'Perderse es el plan: no sigas el mapa.',
      },
    ],
  },
  {
    name: 'Oceanário de Lisboa',
    slug: 'oceanario-de-lisboa',
    category: PlaceCategory.MUSEUM,
    countryCode: 'PT',
    countryName: 'Portugal',
    city: 'Lisbon',
    lat: 38.7633,
    lng: -9.0938,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Lisboa_June_2014-8a.jpg/960px-Lisboa_June_2014-8a.jpg',
    popularityScore: 66,
    isFree: false,
    address: 'Esplanada Dom Carlos I, 1990-005 Lisboa',
    website: 'https://www.oceanario.pt/',
    translations: [
      {
        language: 'pt',
        description:
          'Um dos maiores aquários da Europa, construído em torno de um único tanque central de quatro habitats.',
        tip: 'Compre o bilhete online: a bilheteira tem fila quase sempre.',
      },
      {
        language: 'en',
        description:
          'One of Europe’s largest aquariums, built around a single central tank shared by four habitats.',
        tip: 'Buy online — the ticket desk almost always has a queue.',
      },
      {
        language: 'es',
        description:
          'Uno de los mayores acuarios de Europa, construido en torno a un único tanque central con cuatro hábitats.',
        tip: 'Compra online: la taquilla casi siempre tiene cola.',
      },
    ],
  },
  {
    name: 'Miradouro da Senhora do Monte',
    slug: 'miradouro-da-senhora-do-monte',
    category: PlaceCategory.VIEWPOINT,
    countryCode: 'PT',
    countryName: 'Portugal',
    city: 'Lisbon',
    lat: 38.7205,
    lng: -9.1332,
    popularityScore: 58,
    isFree: true,
    translations: [
      {
        language: 'pt',
        description:
          'O ponto mais alto de Lisboa aberto ao público: vê-se o castelo, a Baixa e a ponte de uma vez só.',
        tip: 'É o melhor pôr do sol da cidade, e o mais cheio — chegue 40min antes.',
      },
      {
        language: 'en',
        description:
          'The highest public viewpoint in Lisbon: castle, Baixa and the bridge all in one frame.',
        tip: 'Best sunset in town, and the busiest — come 40min early.',
      },
      {
        language: 'es',
        description:
          'El mirador público más alto de Lisboa: castillo, Baixa y puente en una sola vista.',
        tip: 'La mejor puesta de sol, y la más concurrida: llega 40min antes.',
      },
    ],
  },
  {
    name: 'MAAT',
    slug: 'maat',
    category: PlaceCategory.MUSEUM,
    countryCode: 'PT',
    countryName: 'Portugal',
    city: 'Lisbon',
    lat: 38.6957,
    lng: -9.1946,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/MAAT.jpg/960px-MAAT.jpg',
    popularityScore: 44,
    isFree: false,
    address: 'Av. Brasília, 1300-598 Lisboa',
    website: 'https://maat.pt/',
    translations: [
      {
        language: 'pt',
        description:
          'Museu de arte, arquitetura e tecnologia num edifício ondulado à beira-rio, com telhado que se caminha.',
        tip: 'Subir ao telhado não precisa de bilhete.',
      },
      {
        language: 'en',
        description:
          'Art, architecture and technology museum in a wave-shaped riverside building with a walkable roof.',
        tip: 'Walking the roof doesn’t need a ticket.',
      },
      {
        language: 'es',
        description:
          'Museo de arte, arquitectura y tecnología en un edificio ondulado junto al río, con azotea transitable.',
        tip: 'Subir a la azotea no requiere entrada.',
      },
    ],
  },
  {
    name: 'Bairro Alto',
    slug: 'bairro-alto',
    category: PlaceCategory.NIGHTLIFE,
    countryCode: 'PT',
    countryName: 'Portugal',
    city: 'Lisbon',
    lat: 38.7132,
    lng: -9.1454,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Lisboa-Entrada_no_Bairro_Alto-20140917.jpg/960px-Lisboa-Entrada_no_Bairro_Alto-20140917.jpg',
    popularityScore: 36,
    isFree: true,
    translations: [
      {
        language: 'pt',
        description:
          'Quarteirão de ruas estreitas que vira bar a céu aberto depois das 22h — bebe-se na calçada.',
        tip: 'Antes das 22h está quase vazio; a rua enche mais tarde.',
      },
      {
        language: 'en',
        description:
          'A grid of narrow streets that becomes an open-air bar after 10pm — people drink on the pavement.',
        tip: 'Before 10pm it’s nearly empty; the street fills later.',
      },
      {
        language: 'es',
        description:
          'Un entramado de calles estrechas que se convierte en bar al aire libre tras las 22h.',
        tip: 'Antes de las 22h está casi vacío; la calle se llena más tarde.',
      },
    ],
  },
  // ─── Espanha · Barcelona ─────────────────────────────────────────────────
  {
    name: 'Sagrada Família',
    slug: 'sagrada-familia',
    category: PlaceCategory.LANDMARK,
    countryCode: 'ES',
    countryName: 'Spain',
    city: 'Barcelona',
    lat: 41.4036,
    lng: 2.1744,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/SF_maig_2_cropped.jpg/960px-SF_maig_2_cropped.jpg',
    popularityScore: 100,
    isFree: false,
    address: 'C/ de Mallorca, 401, 08013 Barcelona',
    website: 'https://sagradafamilia.org/',
    translations: [
      {
        language: 'pt',
        description:
          'A basílica de Gaudí, em obras desde 1882. O interior é o ponto alto: colunas em forma de árvore e vitrais que mudam de cor ao longo do dia.',
        tip: 'Bilhete com hora marcada, semanas antes — não há fila para comprar na hora.',
      },
      {
        language: 'en',
        description:
          'Gaudí’s basilica, under construction since 1882. The interior is the payoff: tree-shaped columns and stained glass that shifts colour through the day.',
        tip: 'Timed tickets, booked weeks ahead — there is no same-day queue.',
      },
      {
        language: 'es',
        description:
          'La basílica de Gaudí, en obras desde 1882. El interior es lo mejor: columnas con forma de árbol y vidrieras que cambian de color.',
        tip: 'Entrada con hora, reservada con semanas de antelación.',
      },
    ],
  },
  {
    name: 'Park Güell',
    slug: 'park-guell',
    category: PlaceCategory.LANDMARK,
    countryCode: 'ES',
    countryName: 'Spain',
    city: 'Barcelona',
    lat: 41.4145,
    lng: 2.1527,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Parc_guell_-_panoramio.jpg/960px-Parc_guell_-_panoramio.jpg',
    popularityScore: 92,
    isFree: false,
    address: '08024 Barcelona',
    website: 'https://parkguell.barcelona/',
    translations: [
      {
        language: 'pt',
        description:
          'Jardim de Gaudí sobre a cidade, com o banco ondulado em mosaico e vista até ao mar.',
        tip: 'Só a zona monumental é paga; o resto do parque é livre.',
      },
      {
        language: 'en',
        description:
          'Gaudí’s garden above the city, with the undulating mosaic bench and a view to the sea.',
        tip: 'Only the monumental zone is ticketed; the rest of the park is free.',
      },
      {
        language: 'es',
        description:
          'El jardín de Gaudí sobre la ciudad, con el banco ondulado de mosaico y vistas al mar.',
        tip: 'Solo la zona monumental es de pago; el resto del parque es libre.',
      },
    ],
  },
  {
    name: 'La Boqueria',
    slug: 'la-boqueria',
    category: PlaceCategory.FOOD_MARKET,
    countryCode: 'ES',
    countryName: 'Spain',
    city: 'Barcelona',
    lat: 41.3817,
    lng: 2.1717,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Barcelona_-_Mercat_de_Sant_Josep_%28la_Boqueria%29_-_Entrance.jpg/960px-Barcelona_-_Mercat_de_Sant_Josep_%28la_Boqueria%29_-_Entrance.jpg',
    popularityScore: 84,
    isFree: true,
    address: 'La Rambla, 91, 08001 Barcelona',
    website: 'https://www.boqueria.barcelona/',
    translations: [
      {
        language: 'pt',
        description:
          'Mercado do século XIX na Rambla, com bancas de fruta, peixe e balcões onde se come de pé.',
        tip: 'As bancas do fundo têm preço de bairro; as da entrada, preço de turista.',
      },
      {
        language: 'en',
        description:
          '19th-century market off the Rambla — fruit, fish, and counters where you eat standing up.',
        tip: 'Stalls at the back charge local prices; the ones by the entrance don’t.',
      },
      {
        language: 'es',
        description:
          'Mercado del siglo XIX en la Rambla, con puestos de fruta, pescado y barras para comer de pie.',
        tip: 'Los puestos del fondo tienen precio de barrio; los de la entrada, no.',
      },
    ],
  },
  {
    name: 'Barri Gòtic',
    slug: 'barri-gotic',
    category: PlaceCategory.NEIGHBORHOOD,
    countryCode: 'ES',
    countryName: 'Spain',
    city: 'Barcelona',
    lat: 41.3833,
    lng: 2.1769,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/6/6d/Barcelona_-_Carrer_del_Bisbe.jpg',
    popularityScore: 78,
    isFree: true,
    translations: [
      {
        language: 'pt',
        description:
          'O núcleo medieval da cidade, sobre a Barcelona romana. Ruas estreitas, catedral e praças escondidas.',
        tip: 'De manhã cedo é o único horário em que se anda sem multidão.',
      },
      {
        language: 'en',
        description:
          'The medieval core, built over Roman Barcelona. Narrow lanes, the cathedral, hidden squares.',
        tip: 'Early morning is the only time you can walk it without crowds.',
      },
      {
        language: 'es',
        description:
          'El núcleo medieval, sobre la Barcelona romana. Calles estrechas, catedral y plazas escondidas.',
        tip: 'A primera hora es el único momento sin multitudes.',
      },
    ],
  },
  {
    name: 'Museu Picasso',
    slug: 'museu-picasso',
    category: PlaceCategory.MUSEUM,
    countryCode: 'ES',
    countryName: 'Spain',
    city: 'Barcelona',
    lat: 41.3851,
    lng: 2.1808,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/4/48/Museu_Picasso_Barcelona.jpg',
    popularityScore: 70,
    isFree: false,
    address: 'Carrer de Montcada, 15-23, 08003 Barcelona',
    website: 'https://www.museupicasso.bcn.cat/',
    translations: [
      {
        language: 'pt',
        description:
          'A maior coleção do Picasso jovem, em cinco palácios medievais ligados entre si.',
        tip: 'Quinta à tarde a entrada é gratuita, e por isso cheia.',
      },
      {
        language: 'en',
        description:
          'The largest collection of the young Picasso, across five linked medieval palaces.',
        tip: 'Thursday afternoons are free — and packed for that reason.',
      },
      {
        language: 'es',
        description:
          'La mayor colección del Picasso joven, en cinco palacios medievales conectados.',
        tip: 'Los jueves por la tarde la entrada es gratuita, y por eso se llena.',
      },
    ],
  },
  {
    name: 'La Barceloneta',
    slug: 'la-barceloneta',
    category: PlaceCategory.BEACH,
    countryCode: 'ES',
    countryName: 'Spain',
    city: 'Barcelona',
    lat: 41.3784,
    lng: 2.1925,
    popularityScore: 64,
    isFree: true,
    translations: [
      {
        language: 'pt',
        description:
          'A praia urbana da cidade, a dez minutos do centro histórico, com passeio marítimo até ao porto olímpico.',
        tip: 'Areia lotada no fim de semana; um pouco a nordeste esvazia.',
      },
      {
        language: 'en',
        description:
          'The city beach, ten minutes from the old town, with a promenade running to the Olympic port.',
        tip: 'Packed at weekends; walk northeast and it thins out.',
      },
      {
        language: 'es',
        description:
          'La playa urbana, a diez minutos del casco antiguo, con paseo marítimo hasta el puerto olímpico.',
        tip: 'Llena los fines de semana; camina al noreste y se vacía.',
      },
    ],
  },
  {
    name: 'Casa Batlló',
    slug: 'casa-batllo',
    category: PlaceCategory.LANDMARK,
    countryCode: 'ES',
    countryName: 'Spain',
    city: 'Barcelona',
    lat: 41.3917,
    lng: 2.165,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Casa_Batllo_Overview_Barcelona_Spain_cut.jpg/960px-Casa_Batllo_Overview_Barcelona_Spain_cut.jpg',
    popularityScore: 56,
    isFree: false,
    address: 'Pg. de Gràcia, 43, 08007 Barcelona',
    website: 'https://www.casabatllo.es/',
    translations: [
      {
        language: 'pt',
        description:
          'A casa que Gaudí reconstruiu no Passeig de Gràcia: fachada de escamas, sem uma linha reta dentro.',
        tip: 'A fachada vê-se de graça da calçada oposta.',
      },
      {
        language: 'en',
        description:
          'The house Gaudí rebuilt on Passeig de Gràcia: a scaled façade, and not one straight line inside.',
        tip: 'The façade is free to see from the opposite pavement.',
      },
      {
        language: 'es',
        description:
          'La casa que Gaudí reformó en el Passeig de Gràcia: fachada de escamas y ni una línea recta dentro.',
        tip: 'La fachada se ve gratis desde la acera de enfrente.',
      },
    ],
  },
  {
    name: 'Bunkers del Carmel',
    slug: 'bunkers-del-carmel',
    category: PlaceCategory.VIEWPOINT,
    countryCode: 'ES',
    countryName: 'Spain',
    city: 'Barcelona',
    lat: 41.4194,
    lng: 2.162,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Tur%C3%B3_Rovira.jpg/960px-Tur%C3%B3_Rovira.jpg',
    popularityScore: 48,
    isFree: true,
    translations: [
      {
        language: 'pt',
        description:
          'Baterias antiaéreas da guerra civil no alto do Turó de la Rovira, hoje o miradouro de 360° da cidade.',
        tip: 'A subida leva 20min a pé do metro; leve água.',
      },
      {
        language: 'en',
        description:
          'Civil-war anti-aircraft batteries atop Turó de la Rovira, now the city’s 360° viewpoint.',
        tip: 'A 20-minute climb from the metro — bring water.',
      },
      {
        language: 'es',
        description:
          'Baterías antiaéreas de la guerra civil en el Turó de la Rovira, hoy el mirador de 360° de la ciudad.',
        tip: 'La subida son 20min desde el metro; lleva agua.',
      },
    ],
  },
  {
    name: 'Montjuïc',
    slug: 'montjuic',
    category: PlaceCategory.NATURE,
    countryCode: 'ES',
    countryName: 'Spain',
    city: 'Barcelona',
    lat: 41.3641,
    lng: 2.1587,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Fale_-_Spain_-_Barcelona_-_8.jpg/960px-Fale_-_Spain_-_Barcelona_-_8.jpg',
    popularityScore: 40,
    isFree: true,
    translations: [
      {
        language: 'pt',
        description:
          'A colina sobre o porto: jardins, o castelo, museus e a fonte mágica, tudo ligado por caminhos a pé.',
        tip: 'O teleférico poupa a subida e dá a melhor vista do porto.',
      },
      {
        language: 'en',
        description:
          'The hill above the port: gardens, the castle, museums and the magic fountain, linked by footpaths.',
        tip: 'The cable car skips the climb and gives the best harbour view.',
      },
      {
        language: 'es',
        description:
          'La colina sobre el puerto: jardines, el castillo, museos y la fuente mágica, unidos por senderos.',
        tip: 'El teleférico evita la subida y da la mejor vista del puerto.',
      },
    ],
  },
  {
    name: 'El Born',
    slug: 'el-born',
    category: PlaceCategory.NEIGHBORHOOD,
    countryCode: 'ES',
    countryName: 'Spain',
    city: 'Barcelona',
    lat: 41.385,
    lng: 2.183,
    popularityScore: 32,
    isFree: true,
    translations: [
      {
        language: 'pt',
        description:
          'Bairro de oficinas medievais virado em zona de lojas independentes, tapas e a basílica de Santa Maria del Mar.',
        tip: 'Menos turístico que o Gòtic ao lado, e come-se melhor.',
      },
      {
        language: 'en',
        description:
          'A quarter of medieval workshops turned independent shops, tapas bars and Santa Maria del Mar.',
        tip: 'Less touristy than the Gòtic next door, and the food is better.',
      },
      {
        language: 'es',
        description:
          'Barrio de talleres medievales convertido en tiendas independientes, tapas y Santa Maria del Mar.',
        tip: 'Menos turístico que el Gòtic de al lado, y se come mejor.',
      },
    ],
  },

  // ─── Canadá · Toronto ────────────────────────────────────────────────────
  {
    name: 'CN Tower',
    slug: 'cn-tower',
    category: PlaceCategory.LANDMARK,
    countryCode: 'CA',
    countryName: 'Canada',
    city: 'Toronto',
    lat: 43.6426,
    lng: -79.3871,
    popularityScore: 100,
    isFree: false,
    address: '290 Bremner Blvd, Toronto, ON M5V 3L9',
    website: 'https://www.cntower.ca/',
    translations: [
      {
        language: 'pt',
        description:
          'A torre de 553m que organiza a silhueta da cidade. Piso de vidro e mirante a 342m.',
        tip: 'Vá ao anoitecer: paga-se uma entrada e vê-se de dia e de noite.',
      },
      {
        language: 'en',
        description:
          'The 553m tower that anchors the skyline. Glass floor and lookout at 342m.',
        tip: 'Go at dusk — one ticket buys both the day and the night view.',
      },
      {
        language: 'es',
        description:
          'La torre de 553m que ordena el perfil de la ciudad. Suelo de cristal y mirador a 342m.',
        tip: 'Ve al anochecer: una entrada te da la vista de día y de noche.',
      },
    ],
  },
  {
    name: 'St. Lawrence Market',
    slug: 'st-lawrence-market',
    category: PlaceCategory.FOOD_MARKET,
    countryCode: 'CA',
    countryName: 'Canada',
    city: 'Toronto',
    lat: 43.6487,
    lng: -79.3716,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/St_Lawerence_South_Market_Exterior_202112.jpg/960px-St_Lawerence_South_Market_Exterior_202112.jpg',
    popularityScore: 90,
    isFree: true,
    address: '93 Front St E, Toronto, ON M5E 1C3',
    website: 'https://www.stlawrencemarket.com/',
    translations: [
      {
        language: 'pt',
        description:
          'Mercado coberto desde 1803, com talhos, queijarias e o sanduíche de bacon peameal que a cidade reivindica como seu.',
        tip: 'Fecha segunda-feira. Sábado tem a feira de agricultores no prédio ao lado.',
      },
      {
        language: 'en',
        description:
          'A covered market since 1803 — butchers, cheesemongers, and the peameal bacon sandwich the city claims as its own.',
        tip: 'Closed Mondays. Saturdays add the farmers’ market next door.',
      },
      {
        language: 'es',
        description:
          'Mercado cubierto desde 1803, con carnicerías, queserías y el bocadillo de peameal bacon que la ciudad reclama como suyo.',
        tip: 'Cierra los lunes. Los sábados hay mercado de agricultores al lado.',
      },
    ],
  },
  {
    name: 'Royal Ontario Museum',
    slug: 'royal-ontario-museum',
    category: PlaceCategory.MUSEUM,
    countryCode: 'CA',
    countryName: 'Canada',
    city: 'Toronto',
    lat: 43.6677,
    lng: -79.3948,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Royal_Ontario_Museum_in_Fall_2021.jpg/960px-Royal_Ontario_Museum_in_Fall_2021.jpg',
    popularityScore: 82,
    isFree: false,
    address: '100 Queens Park, Toronto, ON M5S 2C6',
    website: 'https://www.rom.on.ca/',
    translations: [
      {
        language: 'pt',
        description:
          'História natural e culturas do mundo num prédio de 1914 com um anexo de cristal encaixado à força na fachada.',
        tip: 'Sexta à noite tem entrada reduzida.',
      },
      {
        language: 'en',
        description:
          'Natural history and world cultures in a 1914 building with a crystal wedge driven through the façade.',
        tip: 'Friday nights are discounted.',
      },
      {
        language: 'es',
        description:
          'Historia natural y culturas del mundo en un edificio de 1914 con un anexo de cristal incrustado en la fachada.',
        tip: 'Los viernes por la noche la entrada es reducida.',
      },
    ],
  },
  {
    name: 'Distillery District',
    slug: 'distillery-district',
    category: PlaceCategory.NEIGHBORHOOD,
    countryCode: 'CA',
    countryName: 'Canada',
    city: 'Toronto',
    lat: 43.6503,
    lng: -79.3596,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gooderham.jpg/960px-Gooderham.jpg',
    popularityScore: 74,
    isFree: true,
    website: 'https://www.thedistillerydistrict.com/',
    translations: [
      {
        language: 'pt',
        description:
          'Antiga destilaria vitoriana de rua de paralelepípedo, fechada ao trânsito, hoje com galerias, cafés e ateliês.',
        tip: 'Em dezembro vira mercado de Natal e cobra entrada nos fins de semana.',
      },
      {
        language: 'en',
        description:
          'A Victorian distillery of cobbled, car-free lanes, now galleries, cafés and studios.',
        tip: 'In December it becomes a Christmas market and charges weekend entry.',
      },
      {
        language: 'es',
        description:
          'Antigua destilería victoriana de calles adoquinadas y sin coches, hoy galerías, cafés y talleres.',
        tip: 'En diciembre se convierte en mercado navideño y cobra entrada los fines de semana.',
      },
    ],
  },
  {
    name: 'Kensington Market',
    slug: 'kensington-market',
    category: PlaceCategory.FOOD_MARKET,
    countryCode: 'CA',
    countryName: 'Canada',
    city: 'Toronto',
    lat: 43.6547,
    lng: -79.4005,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Kensington_Market_Toronto_August_2017_01.jpg/960px-Kensington_Market_Toronto_August_2017_01.jpg',
    popularityScore: 66,
    isFree: true,
    translations: [
      {
        language: 'pt',
        description:
          'Bairro de mercearias, roupa em segunda mão e comida de vinte cozinhas diferentes em quatro quarteirões.',
        tip: 'Em domingos de verão a rua fecha aos carros.',
      },
      {
        language: 'en',
        description:
          'A neighbourhood of grocers, second-hand clothes and food from twenty kitchens in four blocks.',
        tip: 'On summer Sundays the streets close to cars.',
      },
      {
        language: 'es',
        description:
          'Barrio de tiendas de comestibles, ropa de segunda mano y comida de veinte cocinas en cuatro manzanas.',
        tip: 'Los domingos de verano las calles se cierran al tráfico.',
      },
    ],
  },
  {
    name: 'Art Gallery of Ontario',
    slug: 'art-gallery-of-ontario',
    category: PlaceCategory.MUSEUM,
    countryCode: 'CA',
    countryName: 'Canada',
    city: 'Toronto',
    lat: 43.6536,
    lng: -79.3925,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Art_Gallery_of_Ontario_2023.jpg/960px-Art_Gallery_of_Ontario_2023.jpg',
    popularityScore: 58,
    isFree: false,
    address: '317 Dundas St W, Toronto, ON M5T 1G4',
    website: 'https://ago.ca/',
    translations: [
      {
        language: 'pt',
        description:
          'Acervo forte de arte canadense e indígena, num prédio reformado por Frank Gehry, que cresceu no bairro.',
        tip: 'A escada helicoidal de madeira é de graça, no átrio.',
      },
      {
        language: 'en',
        description:
          'A strong Canadian and Indigenous collection, in a building reworked by Frank Gehry, who grew up nearby.',
        tip: 'The spiral wooden staircase in the atrium is free to see.',
      },
      {
        language: 'es',
        description:
          'Buena colección de arte canadiense e indígena, en un edificio reformado por Frank Gehry, criado en el barrio.',
        tip: 'La escalera helicoidal de madera del atrio se ve gratis.',
      },
    ],
  },
  {
    name: 'Toronto Islands',
    slug: 'toronto-islands',
    category: PlaceCategory.BEACH,
    countryCode: 'CA',
    countryName: 'Canada',
    city: 'Toronto',
    lat: 43.6228,
    lng: -79.3817,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Toronto_Islands_2025-05-08.jpg/960px-Toronto_Islands_2025-05-08.jpg',
    popularityScore: 50,
    isFree: false,
    translations: [
      {
        language: 'pt',
        description:
          'Arquipélago a 15 minutos de ferry, sem carros, com praias e a vista clássica da silhueta da cidade.',
        tip: 'O ferry é o custo; a ilha em si é livre. Volte antes do último barco.',
      },
      {
        language: 'en',
        description:
          'A car-free archipelago 15 minutes by ferry, with beaches and the classic skyline view.',
        tip: 'The ferry is the cost; the islands are free. Mind the last boat back.',
      },
      {
        language: 'es',
        description:
          'Archipiélago sin coches a 15 minutos en ferry, con playas y la vista clásica del skyline.',
        tip: 'El ferry es el gasto; las islas son gratis. Atento al último barco.',
      },
    ],
  },
  {
    name: 'High Park',
    slug: 'high-park',
    category: PlaceCategory.NATURE,
    countryCode: 'CA',
    countryName: 'Canada',
    city: 'Toronto',
    lat: 43.6465,
    lng: -79.4637,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Hillside_Gardens_%2824677009128%29.jpg/960px-Hillside_Gardens_%2824677009128%29.jpg',
    popularityScore: 42,
    isFree: true,
    translations: [
      {
        language: 'pt',
        description:
          'O maior parque da cidade: trilhas, um lago, um zoológico pequeno e as cerejeiras que enchem o parque em maio.',
        tip: 'Na floração das cerejeiras o estacionamento fecha — vá de metrô.',
      },
      {
        language: 'en',
        description:
          'The city’s largest park: trails, a pond, a small zoo, and the cherry blossoms that fill it in May.',
        tip: 'Parking closes during blossom season — take the subway.',
      },
      {
        language: 'es',
        description:
          'El parque más grande de la ciudad: senderos, un lago, un pequeño zoo y los cerezos que florecen en mayo.',
        tip: 'En la floración cierran el aparcamiento: ve en metro.',
      },
    ],
  },
  {
    name: "Ripley's Aquarium of Canada",
    slug: 'ripleys-aquarium-of-canada',
    category: PlaceCategory.MUSEUM,
    countryCode: 'CA',
    countryName: 'Canada',
    city: 'Toronto',
    lat: 43.6424,
    lng: -79.386,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Ripley%27s_Aquarium_of_Canada%2C_Toronto%2C_Ontario.jpg/960px-Ripley%27s_Aquarium_of_Canada%2C_Toronto%2C_Ontario.jpg',
    popularityScore: 34,
    isFree: false,
    address: '288 Bremner Blvd, Toronto, ON M5V 3L9',
    website: 'https://www.ripleyaquariums.com/canada/',
    translations: [
      {
        language: 'pt',
        description:
          'Aquário ao pé da CN Tower, com um túnel de esteira rolante por baixo do tanque dos tubarões.',
        tip: 'Fica colado à torre: dá para juntar os dois no mesmo passeio.',
      },
      {
        language: 'en',
        description:
          'Aquarium at the foot of the CN Tower, with a moving-walkway tunnel under the shark tank.',
        tip: 'It’s right beside the tower — easy to pair the two.',
      },
      {
        language: 'es',
        description:
          'Acuario al pie de la CN Tower, con un túnel de cinta móvil bajo el tanque de tiburones.',
        tip: 'Está junto a la torre: fácil combinar ambas visitas.',
      },
    ],
  },
  {
    name: 'Graffiti Alley',
    slug: 'graffiti-alley',
    category: PlaceCategory.NEIGHBORHOOD,
    countryCode: 'CA',
    countryName: 'Canada',
    city: 'Toronto',
    lat: 43.648,
    lng: -79.399,
    popularityScore: 26,
    isFree: true,
    translations: [
      {
        language: 'pt',
        description:
          'Um quilômetro de beco atrás da Queen West coberto de mural autorizado, repintado o tempo todo.',
        tip: 'Muda de mês para mês; a foto de hoje não existe no ano que vem.',
      },
      {
        language: 'en',
        description:
          'A kilometre of alley behind Queen West covered in sanctioned murals, repainted constantly.',
        tip: 'It changes month to month — today’s photo won’t exist next year.',
      },
      {
        language: 'es',
        description:
          'Un kilómetro de callejón tras Queen West cubierto de murales autorizados, repintados sin parar.',
        tip: 'Cambia cada mes: la foto de hoy no existirá el año que viene.',
      },
    ],
  },
];
