import bcrypt from 'bcrypt';

import { PrismaClient } from '../../generated/prisma';
import { FULL_ITINERARY, FULL_MENU, FULL_TOURS } from './full-businesses.data';

/**
 * Six owners with pages, so the product can be looked at full rather than
 * empty.
 *
 * Production has one business, and every layout decision so far was taken
 * against a page with almost nothing on it. A thirty-dish menu groups into
 * seven courses, twenty-nine tours overflow whatever list was designed for
 * three, and an eight-stop itinerary gives the numbered map something to
 * draw. That is the point of this seed: to find out what breaks when the
 * screen is full.
 *
 * Two of each kind are deliberately thin, because "full" only means anything
 * next to "not full".
 *
 * Idempotent by e-mail: running it twice replaces the six, it does not
 * duplicate them.
 */

/**
 * Refuses to run anywhere but a local database.
 *
 * This seed writes six fictional owners with published pages. In production
 * that is not test data, it is six fake businesses in a public directory, and
 * nothing downstream would tell them apart from real ones.
 *
 * The check is on the database the process is actually pointed at, not on a
 * script name or an environment variable someone forgot to set: `NODE_ENV`
 * is unset far more often than it is wrong, and a seed guarded only by its own
 * name is guarded by whoever is typing.
 *
 * It runs after `generated/prisma` has loaded `.env`, so `DATABASE_URL` here is
 * the one Prisma is about to connect with — including when it came from a file
 * rather than the shell. Checking the effective target is the whole point;
 * checking what the caller happened to type would miss the case that matters.
 *
 * There is no override flag on purpose. If this ever needs to run against a
 * remote database, that is a decision worth making in a diff.
 */
const LOCAL_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  '::1',
  'host.docker.internal',
]);

function assertLocalDatabase(): void {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('This seed never runs with NODE_ENV=production.');
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set — refusing to guess.');
  }

  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    throw new Error('DATABASE_URL is not a URL this seed can check.');
  }

  if (!LOCAL_HOSTS.has(host)) {
    throw new Error(
      `Refusing to seed: ${host} is not a local database. This seed publishes ` +
        'six fictional businesses and belongs on a machine you can throw away.',
    );
  }
}

const prisma = new PrismaClient();

const PASSWORD = 'Seed12345!';

/** Same fold the repository applies, copied rather than imported: a seed that
 *  reaches into `apps/` drags the Nest module graph in with it. */
const cityKey = (city: string) =>
  city
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();

/** `normalizeState`: the same fold, and null — never "" — for no state. */
const stateKey = (state: unknown) =>
  typeof state === 'string' && state.trim() ? cityKey(state) : null;

const photo = (seed: string) => `https://picsum.photos/seed/${seed}/1200/800`;

const OPEN_ALL_WEEK = {
  monday: {
    closed: false,
    intervals: [
      { open: '12:00', close: '15:00' },
      { open: '19:00', close: '23:00' },
    ],
  },
  tuesday: {
    closed: false,
    intervals: [
      { open: '12:00', close: '15:00' },
      { open: '19:00', close: '23:00' },
    ],
  },
  wednesday: {
    closed: false,
    intervals: [
      { open: '12:00', close: '15:00' },
      { open: '19:00', close: '23:00' },
    ],
  },
  thursday: {
    closed: false,
    intervals: [
      { open: '12:00', close: '15:00' },
      { open: '19:00', close: '23:30' },
    ],
  },
  friday: {
    closed: false,
    intervals: [
      { open: '12:00', close: '15:00' },
      { open: '19:00', close: '00:30' },
    ],
  },
  saturday: {
    closed: false,
    intervals: [
      { open: '12:30', close: '16:00' },
      { open: '19:00', close: '00:30' },
    ],
  },
  sunday: { closed: true },
};

const SIMPLE_HOURS = {
  monday: { closed: true },
  tuesday: { closed: false, intervals: [{ open: '10:00', close: '18:00' }] },
  wednesday: { closed: false, intervals: [{ open: '10:00', close: '18:00' }] },
  thursday: { closed: false, intervals: [{ open: '10:00', close: '18:00' }] },
  friday: { closed: false, intervals: [{ open: '10:00', close: '18:00' }] },
  saturday: { closed: false, intervals: [{ open: '10:00', close: '14:00' }] },
  sunday: { closed: true },
};

interface SeedSpec {
  email: string;
  name: string;
  businessType: 'RESTAURANT' | 'TOUR_GUIDE';
  slug: string;
  business: Record<string, unknown>;
  typeData: Record<string, unknown>;
}

const SPECS: SeedSpec[] = [
  {
    email: 'taberna.completa@seed.aloravia.com',
    name: 'Marta Gonçalves',
    businessType: 'RESTAURANT',
    slug: 'taberna-do-bolhao',
    business: {
      name: 'Taberna do Bolhão',
      description:
        'Cozinha portuguesa de sempre, a duas ruas do mercado. O bacalhau é desfiado à mão todas as manhãs e a batata palha é cortada aqui — dá trabalho, e é a diferença que se prova. Trinta pratos na carta, sete deles só de peixe, e um cozido às quintas que acaba antes das duas.',
      address: 'Rua Formosa 312, Porto',
      city: 'Porto',
      country: 'Portugal',
      state: 'Porto',
      lat: 41.1489,
      lng: -8.6053,
      phone: '+351222001122',
      email: 'reservas@tabernadobolhao.pt',
      website: 'https://tabernadobolhao.pt',
      photos: Array.from({ length: 6 }, (_, i) => photo(`taberna-${i}`)),
      openingHours: OPEN_ALL_WEEK,
    },
    typeData: {
      cuisine: 'Portuguesa tradicional',
      priceRange: '$$',
      acceptsReservations: true,
      openingHoursWeekdays: '12h–15h e 19h–23h',
      openingHoursWeekend: 'Sábado até às 00h30 · Domingo encerrado',
      menu: FULL_MENU,
    },
  },
  {
    email: 'cantinho.lisboa@seed.aloravia.com',
    name: 'Rui Pereira',
    businessType: 'RESTAURANT',
    slug: 'cantinho-da-se',
    business: {
      name: 'Cantinho da Sé',
      description: 'Petiscos e vinho a copo, na subida para a Sé de Lisboa.',
      address: 'Rua do Barão 12, Lisboa',
      city: 'Lisboa',
      country: 'Portugal',
      state: 'Lisboa',
      lat: 38.7106,
      lng: -9.1327,
      phone: '+351218889900',
      photos: [photo('cantinho-0'), photo('cantinho-1')],
      openingHours: SIMPLE_HOURS,
    },
    typeData: {
      cuisine: 'Petiscos',
      priceRange: '$',
      acceptsReservations: false,
      menu: [
        {
          name: 'Tábua de queijos',
          price: 12.5,
          category: 'starter',
          description: 'Quatro queijos nacionais e compota da casa.',
        },
        {
          name: 'Croquetes de novilho',
          price: 6.5,
          category: 'starter',
          description: 'Seis unidades, mostarda antiga.',
        },
        {
          name: 'Vinho a copo',
          price: 2.2,
          category: 'drink',
          description: 'Tinto ou branco, do dia.',
        },
      ],
    },
  },
  {
    email: 'mar.aberto@seed.aloravia.com',
    name: 'Sofia Nunes',
    businessType: 'RESTAURANT',
    slug: 'mar-aberto-cascais',
    business: {
      name: 'Mar Aberto',
      description: 'Peixe da lota de Cascais, grelhado à vista de quem passa.',
      address: 'Avenida Dom Carlos I 44, Cascais',
      city: 'Cascais',
      country: 'Portugal',
      state: 'Lisboa',
      lat: 38.6968,
      lng: -9.4215,
      phone: '+351214830011',
      website: 'https://maraberto.example.pt',
      photos: [photo('maraberto-0')],
      openingHours: SIMPLE_HOURS,
    },
    typeData: {
      cuisine: 'Peixe e marisco',
      priceRange: '$$$',
      acceptsReservations: true,
      menu: [
        {
          name: 'Robalo grelhado',
          price: 24.0,
          category: 'main',
          description: 'Inteiro, ao peso, com batata a murro.',
        },
        {
          name: 'Arroz de marisco',
          price: 27.5,
          category: 'main',
          description: 'Para dois, malandrinho.',
        },
      ],
    },
  },
  {
    email: 'guia.completo@seed.aloravia.com',
    name: 'André Salgado',
    businessType: 'TOUR_GUIDE',
    slug: 'andre-salgado-porto',
    business: {
      name: 'André Salgado — Guia do Porto',
      description:
        'Guia licenciado desde 2011, nascido em Campanhã. Vinte e nove percursos, do amanhecer na Foz ao fado à noite, e nenhum grupo com mais de vinte pessoas. Falo português, inglês, espanhol e francês, e conheço as escadas que se evitam.',
      address: 'Praça da Liberdade 1, Porto',
      city: 'Porto',
      country: 'Portugal',
      state: 'Porto',
      lat: 41.1462,
      lng: -8.6109,
      phone: '+351912345678',
      email: 'andre@guiadoporto.pt',
      website: 'https://guiadoporto.pt',
      photos: Array.from({ length: 6 }, (_, i) => photo(`guia-${i}`)),
      openingHours: OPEN_ALL_WEEK,
    },
    typeData: {
      languages: ['Português', 'Inglês', 'Espanhol', 'Francês'],
      meetingPoint:
        'Em frente à estação de São Bento, junto ao painel de azulejos da direita.',
      meetingPointLat: 41.1456,
      meetingPointLng: -8.6106,
      meetingPointNote:
        'Levo um chapéu azul e uma pasta com o mapa do Porto de 1892.',
      profileImage: photo('guia-perfil'),
      countryOfOrigin: 'Portugal',
      featured: true,
      whatsapp: '+351912345678',
      tours: FULL_TOURS,
      itinerary: FULL_ITINERARY,
    },
  },
  {
    email: 'guia.lisboa@seed.aloravia.com',
    name: 'Inês Carvalho',
    businessType: 'TOUR_GUIDE',
    slug: 'ines-carvalho-lisboa',
    business: {
      name: 'Inês Carvalho — Alfama a pé',
      description:
        'Alfama e Mouraria, devagar, para quem prefere ouvir a andar.',
      address: 'Largo das Portas do Sol, Lisboa',
      city: 'Lisboa',
      country: 'Portugal',
      state: 'Lisboa',
      lat: 38.7118,
      lng: -9.13,
      phone: '+351933221100',
      photos: [photo('ines-0'), photo('ines-1')],
      openingHours: SIMPLE_HOURS,
    },
    typeData: {
      languages: ['Português', 'Inglês'],
      meetingPoint: 'Miradouro das Portas do Sol.',
      tours: [
        {
          name: 'Alfama sem pressa',
          duration: '2h30',
          price: 26,
          description: 'Do miradouro ao Museu do Fado, por becos.',
          stopCount: 5,
          maxParticipants: 10,
        },
        {
          name: 'Mouraria e o fado antigo',
          duration: '2h',
          price: 24,
          description: 'Onde a Severa cantou, e o que sobrou disso.',
          stopCount: 4,
          maxParticipants: 12,
        },
      ],
    },
  },
  {
    email: 'guia.algarve@seed.aloravia.com',
    name: 'Tiago Brito',
    businessType: 'TOUR_GUIDE',
    slug: 'tiago-brito-algarve',
    business: {
      name: 'Tiago Brito — Costa Vicentina',
      description:
        'Caminhadas na costa oeste, fora de época e fora do alcatrão.',
      address: 'Rua da Praia, Aljezur',
      city: 'Aljezur',
      country: 'Portugal',
      state: 'Faro',
      lat: 37.3186,
      lng: -8.8025,
      phone: '+351966554433',
      photos: [photo('tiago-0')],
      openingHours: SIMPLE_HOURS,
    },
    typeData: {
      languages: ['Português', 'Inglês', 'Alemão'],
      tours: [
        {
          name: 'Trilho dos Pescadores, etapa 1',
          duration: '5h',
          price: 45,
          description: 'Odeceixe a Aljezur, com a maré a favor.',
          stopCount: 6,
          maxParticipants: 12,
        },
      ],
    },
  },
];

async function seedOne(spec: SeedSpec, hashedPassword: string) {
  const existing = await prisma.users.findFirst({
    where: { email: spec.email },
  });
  if (existing) {
    // Cascade takes the business, the page and the accounts with it, which is
    // what makes a re-run a replacement rather than a second copy.
    await prisma.users.delete({ where: { id: existing.id } });
  }

  const user = await prisma.users.create({
    data: { email: spec.email, name: spec.name, emailVerified: true },
  });

  await prisma.accounts.create({
    data: {
      userId: user.id,
      accountId: user.id,
      providerId: 'credential',
      password: hashedPassword,
    },
  });

  const role = await prisma.roles.findFirst({ where: { name: 'user' } });
  if (role) {
    await prisma.userRoles.create({
      data: { userId: user.id, roleId: role.id },
    });
  }

  // Built first and cast once: `spec.business` is a loose record so the seed
  // can hold six different shapes in one array, and spreading it straight into
  // Prisma's input type does not typecheck.
  const businessData = {
    ...spec.business,
    userId: user.id,
    businessType: spec.businessType,
    cityKey: cityKey(spec.business.city as string),
    stateKey: stateKey(spec.business.state),
    typeData: spec.typeData,
    isPublic: true,
  };

  const business = await prisma.business.create({
    data: businessData as Parameters<typeof prisma.business.create>[0]['data'],
  });

  // Approved, not draft: a page waiting for review is invisible, and invisible
  // is exactly what this seed exists to stop being.
  const content = {
    ...spec.business,
    businessType: spec.businessType,
    typeData: spec.typeData,
  };

  await prisma.businessPage.create({
    data: {
      businessId: business.id,
      slug: spec.slug,
      businessType:
        spec.businessType === 'RESTAURANT' ? 'restaurante' : 'guia-turistico',
      approvedContent: content as never,
      approvedAt: new Date(),
      pendingContent: content as never,
      status: 'APPROVED',
      slugLockedAt: new Date(),
    },
  });

  const items =
    (spec.typeData.menu as unknown[])?.length ??
    (spec.typeData.tours as unknown[])?.length ??
    0;
  console.log(
    `  ✅ ${spec.business.name as string} — ${items} itens — /my-city/pg/${
      spec.businessType === 'RESTAURANT' ? 'restaurante' : 'guia-turistico'
    }/${spec.slug}`,
  );
}

async function main() {
  assertLocalDatabase();

  const hashedPassword = await bcrypt.hash(PASSWORD, 10);

  console.log(`\nA semear ${SPECS.length} negócios completos…\n`);
  for (const spec of SPECS) {
    await seedOne(spec, hashedPassword);
  }

  console.log(`\n  Password de todos: ${PASSWORD}`);
  console.log('  Emails: *@seed.aloravia.com\n');
}

main()
  .catch((error) => {
    console.error('Erro ao semear:', error);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
