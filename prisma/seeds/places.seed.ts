import { PrismaClient } from '../../generated/prisma';
import { PLACES } from './places.data';

const prisma = new PrismaClient();

/**
 * Fixture de lugares turísticos: Lisboa, Barcelona e Toronto.
 *
 * Roda depois de `seedCountries` porque resolve `countryId` pelo nome do país.
 * O FK é opcional de propósito — se o país não estiver cadastrado como destino,
 * o lugar continua válido e buscável por `countryCode`.
 *
 * Idempotente: a chave é `[countryCode, city, slug]`, então rodar duas vezes
 * atualiza em vez de duplicar. Isso importa porque em produção o seed é passo
 * manual e pode ser repetido.
 */
export async function seedPlaces() {
  const nomes = [...new Set(PLACES.map((p) => p.countryName))];
  const paises = await prisma.country.findMany({
    where: { name: { in: nomes } },
    select: { id: true, name: true },
  });
  const idPorNome = new Map(paises.map((c) => [c.name, c.id]));

  for (const nome of nomes) {
    if (!idPorNome.has(nome)) {
      console.warn(
        `[places] País "${nome}" não está cadastrado; os lugares dele ficam sem countryId.`,
      );
    }
  }

  for (const place of PLACES) {
    const { translations, countryName, ...dados } = place;
    const countryId = idPorNome.get(countryName) ?? null;

    const salvo = await prisma.place.upsert({
      where: {
        countryCode_city_slug: {
          countryCode: place.countryCode,
          city: place.city,
          slug: place.slug,
        },
      },
      create: { ...dados, countryId },
      update: { ...dados, countryId },
      select: { id: true },
    });

    for (const t of translations) {
      await prisma.placeTranslation.upsert({
        where: {
          placeId_language: { placeId: salvo.id, language: t.language },
        },
        create: { ...t, placeId: salvo.id },
        update: { description: t.description, tip: t.tip ?? null },
      });
    }
  }

  console.log(`[places] ${PLACES.length} lugares semeados`);
}
