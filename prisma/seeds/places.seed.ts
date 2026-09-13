import { PrismaClient } from '../../generated/prisma';
import { normalizeCity } from './city-key';
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
    const { translations, countryName, ...fields } = place;
    // The key every public read compares — see `Place.cityKey`.
    const dados = {
      ...fields,
      cityKey: normalizeCity(place.city),
    };
    const countryId = idPorNome.get(countryName) ?? null;

    const where = {
      // Curated places name no state, and "no state" is the empty key — see
      // `Place.stateKey` for why it is not null.
      countryCode_city_stateKey_slug: {
        countryCode: place.countryCode,
        city: place.city,
        stateKey: '',
        slug: place.slug,
      },
    };

    const existing = await prisma.place.findUnique({
      where,
      select: { imageUrl: true, imageLicense: true, imageAuthor: true },
    });
    // Never overwrite an image that was already migrated to R2 with a legacy Wikimedia hotlink.
    const hasR2Image =
      existing?.imageUrl && !existing.imageUrl.includes('wikimedia.org');
    const updateData = {
      ...dados,
      countryId,
      ...(hasR2Image
        ? {
            imageUrl: existing.imageUrl,
            imageLicense: existing.imageLicense,
            imageAuthor: existing.imageAuthor,
          }
        : {}),
    };

    const salvo = await prisma.place.upsert({
      where,
      create: { ...dados, countryId },
      update: updateData,
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
