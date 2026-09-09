/**
 * The content for `full-businesses.seed.ts`, kept apart so the seed itself
 * stays about the writing and this file stays about the data.
 *
 * Written to answer one question: what does the product look like when a page
 * is actually full? A restaurant with thirty dishes across every course, and a
 * guide with twenty-nine tours and a mapped itinerary, exercise the layouts
 * that a one-dish seed never reaches — the menu's category grouping, the
 * numbered map, the tab bar, the photo galleries.
 */

export interface SeedDish {
  name: string;
  price: number;
  category: string;
  description: string;
  photo: string;
  featured?: boolean;
}

const photo = (seed: string) => `https://picsum.photos/seed/${seed}/800/600`;

/**
 * Thirty dishes across the five categories the wizard actually writes.
 *
 * The first draft used free Portuguese labels — `Entradas`, `Sopas`,
 * `Pratos de peixe` — because the schema takes any string. The public template
 * does not: `categoryOf` recognises `starter`, `main`, `dessert`, `drink` and
 * `other`, and buckets everything else into `other`. Thirty dishes rendered
 * under a single heading called "Outros", which is not what a page built
 * through the wizard would ever look like.
 *
 * A seed that does not match what the product produces tests the wrong thing.
 */
export const FULL_MENU: SeedDish[] = [
  // Entradas
  {
    name: 'Pão de alho com azeite',
    price: 3.5,
    category: 'other',
    description:
      'Pão alentejano tostado, alho assado e azeite de Trás-os-Montes.',
    photo: photo('dish-pao-alho'),
  },
  {
    name: 'Azeitonas temperadas',
    price: 2.8,
    category: 'other',
    description: 'Galega curada em casa com orégãos, alho e casca de limão.',
    photo: photo('dish-azeitonas'),
  },
  {
    name: 'Queijo da Serra amanteigado',
    price: 8.9,
    category: 'starter',
    description: 'Meia cura da Serra da Estrela, servido à colher com broa.',
    photo: photo('dish-queijo'),
    featured: true,
  },
  {
    name: 'Presunto de porco preto',
    price: 11.5,
    category: 'starter',
    description: 'Cortado à faca, dezoito meses de cura no Alentejo.',
    photo: photo('dish-presunto'),
  },
  {
    name: 'Pataniscas de bacalhau',
    price: 7.2,
    category: 'starter',
    description:
      'Quatro unidades, massa leve, servidas com arroz de feijão à parte.',
    photo: photo('dish-pataniscas'),
  },
  {
    name: 'Peixinhos da horta',
    price: 6.4,
    category: 'starter',
    description:
      'Feijão-verde em tempura — o prato que os portugueses levaram ao Japão.',
    photo: photo('dish-peixinhos'),
  },

  // Sopas
  {
    name: 'Caldo verde',
    price: 4.5,
    category: 'starter',
    description:
      'Couve-galega cortada fina, batata, chouriço e um fio de azeite.',
    photo: photo('dish-caldoverde'),
    featured: true,
  },
  {
    name: 'Sopa da pedra',
    price: 5.8,
    category: 'starter',
    description: 'Feijão, carnes de porco e hortaliça — versão de Almeirim.',
    photo: photo('dish-sopapedra'),
  },
  {
    name: 'Creme de abóbora e castanha',
    price: 4.9,
    category: 'starter',
    description:
      'Abóbora assada, castanha da Padrela e um toque de noz-moscada.',
    photo: photo('dish-abobora'),
  },

  // Pratos de peixe
  {
    name: 'Bacalhau à Brás',
    price: 16.5,
    category: 'main',
    description:
      'Lascas desfiadas, batata palha cortada na casa, ovo cremoso e azeitona preta.',
    photo: photo('dish-bras'),
    featured: true,
  },
  {
    name: 'Bacalhau com natas',
    price: 17.2,
    category: 'main',
    description: 'Gratinado no forno de lenha, com cebola caramelizada.',
    photo: photo('dish-natas'),
  },
  {
    name: 'Polvo à lagareiro',
    price: 21.9,
    category: 'main',
    description:
      'Polvo do Algarve assado inteiro, batata a murro e muito azeite.',
    photo: photo('dish-polvo'),
  },
  {
    name: 'Arroz de tamboril',
    price: 19.5,
    category: 'main',
    description: 'Malandrinho, para dois, com coentros e camarão da costa.',
    photo: photo('dish-tamboril'),
  },
  {
    name: 'Sardinha assada (época)',
    price: 13.8,
    category: 'main',
    description: 'Seis sardinhas na brasa, pimento assado e batata cozida.',
    photo: photo('dish-sardinha'),
  },
  {
    name: 'Caldeirada do dia',
    price: 18.4,
    category: 'main',
    description: 'O que veio da lota, em camadas, com pão para o caldo.',
    photo: photo('dish-caldeirada'),
  },

  // Pratos de carne
  {
    name: 'Francesinha do Porto',
    price: 14.9,
    category: 'main',
    description:
      'Molho fechado de manhã, queijo da ilha, ovo estrelado e batata frita.',
    photo: photo('dish-francesinha'),
    featured: true,
  },
  {
    name: 'Cozido à portuguesa',
    price: 18.9,
    category: 'main',
    description: 'Só às quintas. Carnes, enchidos, hortaliça e arroz do caldo.',
    photo: photo('dish-cozido'),
  },
  {
    name: 'Bife à café',
    price: 16.2,
    category: 'main',
    description: 'Vazia maturada, molho de natas e mostarda, ovo a cavalo.',
    photo: photo('dish-bife'),
  },
  {
    name: 'Leitão da Bairrada',
    price: 19.8,
    category: 'main',
    description: 'Pele estaladiça, laranja e a pimenta que a casa faz.',
    photo: photo('dish-leitao'),
  },
  {
    name: 'Arroz de pato',
    price: 15.6,
    category: 'main',
    description: 'Terminado no forno com rodelas de chouriço.',
    photo: photo('dish-pato'),
  },
  {
    name: 'Alheira de Mirandela',
    price: 12.4,
    category: 'main',
    description: 'Grelhada, com ovo escalfado e grelos salteados.',
    photo: photo('dish-alheira'),
  },

  // Vegetariano
  {
    name: 'Migas de grão com espinafres',
    price: 11.9,
    category: 'main',
    description: 'Pão de véspera, grão da casa, muito alho e azeite.',
    photo: photo('dish-migas'),
  },
  {
    name: 'Açorda de coentros',
    price: 10.5,
    category: 'main',
    description: 'Coentros frescos, alho, azeite e ovo escalfado.',
    photo: photo('dish-acorda'),
  },

  // Sobremesas
  {
    name: 'Pastel de nata',
    price: 1.6,
    category: 'dessert',
    description: 'Feito de manhã, canela e açúcar em pó à parte.',
    photo: photo('dish-nata'),
    featured: true,
  },
  {
    name: 'Pudim Abade de Priscos',
    price: 5.4,
    category: 'dessert',
    description: 'Com toucinho, como manda a receita de Braga.',
    photo: photo('dish-pudim'),
  },
  {
    name: 'Arroz doce',
    price: 4.2,
    category: 'dessert',
    description: 'Canela desenhada à mão, como em casa da avó.',
    photo: photo('dish-arrozdoce'),
  },
  {
    name: 'Toucinho do céu',
    price: 4.8,
    category: 'dessert',
    description: 'Amêndoa e gema, receita conventual de Guimarães.',
    photo: photo('dish-toucinho'),
  },

  // Bebidas
  {
    name: 'Vinho da casa (copo)',
    price: 2.5,
    category: 'drink',
    description: 'Tinto do Douro ou branco do Vinho Verde.',
    photo: photo('drink-vinho'),
  },
  {
    name: 'Vinho verde (garrafa)',
    price: 14.0,
    category: 'drink',
    description: 'Alvarinho de Monção, colheita do ano passado.',
    photo: photo('drink-verde'),
  },
  {
    name: 'Ginjinha de Óbidos',
    price: 3.2,
    category: 'drink',
    description: 'Servida em copo de chocolate, se quiser.',
    photo: photo('drink-ginja'),
  },
];

export interface SeedTour {
  name: string;
  duration: string;
  price: number;
  description: string;
  imageUrl: string;
  badgeLabel?: string;
  stopCount: number;
  maxParticipants: number;
}

/** Twenty-nine tours — one under the schema's ceiling of thirty. */
export const FULL_TOURS: SeedTour[] = [
  [
    'Ribeira e as seis pontes',
    '3h',
    32,
    'Do Infante à Ponte Luís I pelas escadas que ninguém sobe duas vezes.',
    'Mais reservado',
    12,
  ],
  [
    'Porto ao amanhecer',
    '2h30',
    28,
    'Começa às 6h30, acaba com pastel de nata quente na Foz.',
    'Novo',
    8,
  ],
  [
    'Vinhos de Gaia, três caves',
    '4h',
    65,
    'Prova em Taylor, Graham e uma casa pequena que não está nos guias.',
    'Mais vendido',
    10,
  ],
  [
    'Livrarias e o Porto escrito',
    '2h',
    24,
    'Lello sem fila, a Chaminé da Mota e o café onde Camilo escrevia.',
    undefined,
    14,
  ],
  [
    'Azulejo, do Carmo a São Bento',
    '2h30',
    26,
    'Ler uma parede: quem pagou, quem pintou e o que quis dizer.',
    undefined,
    15,
  ],
  [
    'Mercado do Bolhão e provas',
    '3h',
    42,
    'Sete bancas, sete provas, uma conversa com cada vendedor.',
    'Mais vendido',
    10,
  ],
  [
    'Francesinha crawl',
    '3h30',
    48,
    'Quatro casas, quatro molhos, um veredicto no fim.',
    undefined,
    8,
  ],
  [
    'Foz e a foz do Douro a pé',
    '3h',
    30,
    'Do Passeio Alegre ao Farol, com paragem no jardim de Serralves.',
    undefined,
    12,
  ],
  [
    'Serralves e a arquitetura de Siza',
    '3h',
    45,
    'A casa Art Déco, o museu branco e o porquê da luz do norte.',
    undefined,
    16,
  ],
  [
    'Douro de comboio, dia inteiro',
    '9h',
    95,
    'Régua e Pinhão pela linha que corre colada ao rio.',
    'Dia inteiro',
    20,
  ],
  [
    'Barcos rabelos e o rio de trabalho',
    '2h',
    22,
    'O que era o rio antes das barragens, contado em Gaia.',
    undefined,
    18,
  ],
  [
    'Porto invisível: vilas operárias',
    '2h30',
    27,
    'As ilhas do Porto, onde vive a cidade que os postais não mostram.',
    undefined,
    10,
  ],
  [
    'Cordoaria, Clérigos e a torre',
    '2h',
    25,
    'Subir os 240 degraus e perceber a cidade de cima.',
    undefined,
    14,
  ],
  [
    'Street art de Miguel Januário',
    '2h',
    23,
    'O +MaisMenos e o que a cidade deixou ficar nas paredes.',
    'Novo',
    12,
  ],
  [
    'Matosinhos e a lota',
    '4h',
    52,
    'A lota de manhã, o peixe grelhado na rua ao meio-dia.',
    undefined,
    10,
  ],
  [
    'Piscinas das Marés, Siza',
    '2h30',
    29,
    'A obra que é betão e mar e não se decide.',
    undefined,
    12,
  ],
  [
    'Vila Nova de Gaia a pé',
    '3h',
    28,
    'Do Jardim do Morro ao Mosteiro, sem apanhar o teleférico.',
    undefined,
    15,
  ],
  [
    'Noite no Porto: fado e petiscos',
    '3h30',
    55,
    'Casa de fado sem turistas, três petiscos e um copo.',
    'Mais reservado',
    8,
  ],
  [
    'Bolhão ao pôr do sol',
    '2h',
    26,
    'A cidade a fechar o dia, do Bolhão à Batalha.',
    undefined,
    14,
  ],
  [
    'Braga e Bom Jesus',
    '8h',
    78,
    'O escadório a pé e a catedral mais antiga do país.',
    'Dia inteiro',
    20,
  ],
  [
    'Guimarães, onde Portugal nasceu',
    '8h',
    78,
    'O castelo, o paço e o centro que a UNESCO guardou.',
    'Dia inteiro',
    20,
  ],
  [
    'Aveiro e Costa Nova',
    '7h',
    72,
    'Moliceiros, ovos-moles e as casas às riscas.',
    undefined,
    20,
  ],
  [
    'Amarante e o Tâmega',
    '6h',
    62,
    'A ponte de São Gonçalo e os doces com nome que ninguém diz alto.',
    undefined,
    16,
  ],
  [
    'Peneda-Gerês, um dia',
    '9h',
    88,
    'Cascatas, espigueiros e a estrada romana.',
    'Dia inteiro',
    14,
  ],
  [
    'Porto para quem volta',
    '2h30',
    30,
    'Para quem já viu tudo: seis sítios que não estão em lado nenhum.',
    undefined,
    10,
  ],
  [
    'Fotografia: o Porto à tarde',
    '3h',
    40,
    'Luz das cinco, seis enquadramentos, revisão no fim.',
    undefined,
    8,
  ],
  [
    'Porto com crianças',
    '2h30',
    26,
    'Ritmo curto, muita escada evitada e gelado no fim.',
    undefined,
    16,
  ],
  [
    'Café, torra e história',
    '2h',
    24,
    'Três torrefações, do Majestic ao que abriu o ano passado.',
    'Novo',
    12,
  ],
  [
    'A pé de Campanhã a São Bento',
    '3h',
    27,
    'A cidade que muda de rua para rua, do bairro à estação.',
    undefined,
    12,
  ],
].map(
  ([name, duration, price, description, badgeLabel, maxParticipants], i) => ({
    name: name as string,
    duration: duration as string,
    price: price as number,
    description: description as string,
    imageUrl: photo(`tour-${i}`),
    ...(badgeLabel ? { badgeLabel: badgeLabel as string } : {}),
    stopCount: 4 + (i % 7),
    maxParticipants: maxParticipants as number,
  }),
);

/** The mapped route: real coordinates, so the numbered map has something to draw. */
export const FULL_ITINERARY = [
  {
    name: 'Estação de São Bento',
    description: 'Vinte mil azulejos e a batalha de Valdevez na parede.',
    lat: 41.1456,
    lng: -8.6106,
  },
  {
    name: 'Sé do Porto',
    description:
      'O ponto mais alto da cidade velha, e o miradouro que ninguém espera.',
    lat: 41.143,
    lng: -8.611,
  },
  {
    name: 'Miragaia',
    description: 'O bairro judeu, antes de ser o que é agora.',
    lat: 41.1447,
    lng: -8.622,
  },
  {
    name: 'Ribeira',
    description: 'A praça que era o porto e hoje é a fotografia.',
    lat: 41.1408,
    lng: -8.6132,
  },
  {
    name: 'Ponte Luís I, tabuleiro superior',
    description:
      'Atravessar a pé pelo lado do metro, a sessenta metros do rio.',
    lat: 41.1396,
    lng: -8.6094,
  },
  {
    name: 'Jardim do Morro',
    description:
      'O sítio de onde toda a gente fotografa o Porto — e com razão.',
    lat: 41.1378,
    lng: -8.6094,
  },
  {
    name: 'Caves de Gaia',
    description: 'Onde o vinho descansa desde que os ingleses o inventaram.',
    lat: 41.137,
    lng: -8.613,
  },
  {
    name: 'Cais de Gaia',
    description: 'Os rabelos atracados, que já não levam nada a lado nenhum.',
    lat: 41.1385,
    lng: -8.6155,
  },
].map((stop, i) => ({
  ...stop,
  country: 'Portugal',
  state: 'Porto',
  city: 'Porto',
  photos: Array.from({ length: 3 }, (_, p) => ({
    url: photo(`stop-${i}-${p}`),
    lat: stop.lat,
    lng: stop.lng,
  })),
}));
