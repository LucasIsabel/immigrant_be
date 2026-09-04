/*
 * The fake repository below is `async` throughout with nothing to await: it
 * impersonates an interface that returns promises, and dropping the keyword
 * would make the double stop matching the thing it stands in for.
 */
/* eslint-disable @typescript-eslint/require-await */
jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import type { ItinerariesRepository } from './itineraries.repository';

/**
 * A repository that actually stores things.
 *
 * Plain mocks would let the reorder assertions pass against a method that was
 * called with the right arguments and did nothing — and the whole point of
 * these cases is what the rows look like afterwards. This keeps positions in
 * memory so the order can be read back.
 */
function fakeRepository() {
  type Stop = {
    id: string;
    position: number;
    city: string;
    placeId: string | null;
    businessId: string | null;
    place: {
      id: string;
      name: string;
      imageUrl: string | null;
      lat: number | null;
      lng: number | null;
      isActive: boolean;
      reviewStatus: string;
    } | null;
    business: {
      id: string;
      name: string;
      lat: number | null;
      lng: number | null;
      isPublic: boolean;
    } | null;
  };

  const itineraries = new Map<
    string,
    {
      id: string;
      userId: string;
      slug: string;
      title: string;
      countryCode: string;
      sourceItineraryId: string | null;
      copiedAt: Date | null;
      isPublic: boolean;
      createdAt: Date;
      updatedAt: Date;
      stops: Stop[];
    }
  >();

  let sequence = 0;

  const placeStop = (id: string, placeId: string, position: number): Stop => ({
    id,
    position,
    city: 'Lagos',
    placeId,
    businessId: null,
    place: {
      id: placeId,
      name: `Lugar ${placeId}`,
      imageUrl: null,
      lat: 37.1,
      lng: -8.6,
      isActive: true,
      reviewStatus: 'APPROVED',
    },
    business: null,
  });

  const repo = {
    _itineraries: itineraries,
    _placeStop: placeStop,

    findOwned: jest.fn(async (id: string, userId: string) => {
      const row = itineraries.get(id);
      return row && row.userId === userId ? structuredClone(row) : null;
    }),
    listOwned: jest.fn(
      async (
        userId: string,
        _page: number,
        _limit: number,
        countryCode?: string,
      ) => {
        const rows = [...itineraries.values()].filter(
          (r) =>
            r.userId === userId &&
            (countryCode === undefined || r.countryCode === countryCode),
        );
        return [rows.map((r) => structuredClone(r)), rows.length] as [
          (typeof rows)[number][],
          number,
        ];
      },
    ),
    findMostRecentInCountry: jest.fn(
      async (userId: string, countryCode: string) => {
        const row = [...itineraries.values()]
          .filter((r) => r.userId === userId && r.countryCode === countryCode)
          .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
        return row ? structuredClone(row) : null;
      },
    ),
    countCreatedInCountry: jest.fn(
      async (userId: string, countryCode: string) =>
        [...itineraries.values()].filter(
          (r) =>
            r.userId === userId &&
            r.countryCode === countryCode &&
            r.sourceItineraryId === null,
        ).length,
    ),
    isSlugTaken: jest.fn(async (slug: string) =>
      [...itineraries.values()].some((r) => r.slug === slug),
    ),
    create: jest.fn(
      async (data: {
        userId: string;
        slug: string;
        title: string;
        countryCode: string;
      }) => {
        const row = {
          ...data,
          sourceItineraryId: null as string | null,
          copiedAt: null as Date | null,
          id: `itin-${++sequence}`,
          isPublic: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          stops: [] as Stop[],
        };
        itineraries.set(row.id, row);
        return structuredClone(row);
      },
    ),
    update: jest.fn(async (id: string, data: Record<string, unknown>) => {
      const row = itineraries.get(id);
      if (!row) throw new Error('missing');
      Object.assign(row, data, { updatedAt: new Date() });
      return structuredClone(row);
    }),
    delete: jest.fn(async (id: string) => {
      itineraries.delete(id);
    }),
    findAddablePlace: jest.fn(async (id: string) =>
      id.startsWith('place') ? { id, city: 'Lagos' } : null,
    ),
    findAddableBusiness: jest.fn(async (id: string) =>
      id.startsWith('biz') ? { id, city: 'Cascais' } : null,
    ),
    addStop: jest.fn(
      async (data: {
        itineraryId: string;
        placeId: string | null;
        businessId: string | null;
        city: string;
      }) => {
        const row = itineraries.get(data.itineraryId);
        if (!row) throw new Error('missing');
        const position =
          row.stops.reduce((max, s) => Math.max(max, s.position), 0) + 1;
        const stop = placeStop(
          `stop-${++sequence}`,
          data.placeId ?? data.businessId ?? '',
          position,
        );
        stop.placeId = data.placeId;
        stop.businessId = data.businessId;
        if (data.businessId) {
          stop.place = null;
          stop.business = {
            id: data.businessId,
            name: `Negócio ${data.businessId}`,
            lat: 38.7,
            lng: -9.4,
            isPublic: true,
          };
        }
        stop.city = data.city;
        row.stops.push(stop);
        row.updatedAt = new Date();
        return structuredClone(stop);
      },
    ),
    deleteStop: jest.fn(async (id: string, itineraryId: string) => {
      for (const row of itineraries.values()) {
        row.stops = row.stops.filter((s) => s.id !== id);
      }
      const owner = itineraries.get(itineraryId);
      if (owner) owner.updatedAt = new Date();
    }),
    listPublic: jest.fn(async () => {
      const rows = [...itineraries.values()].filter((r) => r.isPublic);
      return [rows.map((r) => structuredClone(r)), rows.length] as [
        (typeof rows)[number][],
        number,
      ];
    }),
    findPublicBySlug: jest.fn(async (slug: string) => {
      const row = [...itineraries.values()].find(
        (r) => r.slug === slug && r.isPublic,
      );
      return row ? structuredClone(row) : null;
    }),
    findCopyOf: jest.fn(async (userId: string, sourceItineraryId: string) => {
      const row = [...itineraries.values()].find(
        (r) => r.userId === userId && r.sourceItineraryId === sourceItineraryId,
      );
      return row ? structuredClone(row) : null;
    }),
    copy: jest.fn(
      async (data: {
        userId: string;
        slug: string;
        title: string;
        countryCode: string;
        sourceItineraryId: string;
        stops: {
          placeId: string | null;
          businessId: string | null;
          city: string;
          cityKey: string;
        }[];
      }) => {
        const row = {
          userId: data.userId,
          slug: data.slug,
          title: data.title,
          countryCode: data.countryCode,
          sourceItineraryId: data.sourceItineraryId,
          copiedAt: new Date(),
          id: `itin-${++sequence}`,
          isPublic: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          // Rows of its own, holding the target ids directly — which is the
          // whole point, so the double has to store them that way too.
          stops: data.stops.map((stop, index) => {
            const copied = placeStop(
              `stop-${++sequence}`,
              stop.placeId ?? stop.businessId ?? '',
              index + 1,
            );
            copied.placeId = stop.placeId;
            copied.businessId = stop.businessId;
            copied.city = stop.city;
            if (stop.businessId) {
              copied.place = null;
              copied.business = {
                id: stop.businessId,
                name: `Negócio ${stop.businessId}`,
                lat: 38.7,
                lng: -9.4,
                isPublic: true,
              };
            }
            return copied;
          }),
        };
        itineraries.set(row.id, row);
        return structuredClone(row);
      },
    ),
    createReport: jest.fn(async () => ({ id: 'report-1' })),
    reorderStops: jest.fn(async (itineraryId: string, ordered: string[]) => {
      const row = itineraries.get(itineraryId);
      if (!row) throw new Error('missing');
      ordered.forEach((stopId, index) => {
        const stop = row.stops.find((s) => s.id === stopId);
        if (stop) stop.position = index + 1;
      });
      row.stops.sort((a, b) => a.position - b.position);
      row.updatedAt = new Date();
    }),
  };

  return repo;
}

describe('ItinerariesService', () => {
  let repo: ReturnType<typeof fakeRepository>;
  let service: ItinerariesService;

  beforeEach(() => {
    repo = fakeRepository();
    service = new ItinerariesService(repo as unknown as ItinerariesRepository);
  });

  const add = (placeId: string, itineraryId?: string) =>
    service.addStop('user-a', {
      itineraryId,
      placeId,
      countryCode: 'pt',
      defaultTitle: 'Meu roteiro em Portugal',
    });

  describe('quick-add', () => {
    it('creates the itinerary on the first stop and appends afterwards', async () => {
      const first = await add('place-1');
      expect(first.created).toBe(true);
      expect(first.position).toBe(1);

      const second = await add('place-2');
      expect(second.created).toBe(false);
      expect(second.itineraryId).toBe(first.itineraryId);
      expect(second.position).toBe(2);
    });

    it('normalises the country code, so "pt" and "PT" share one itinerary', async () => {
      const first = await add('place-1');
      const second = await service.addStop('user-a', {
        placeId: 'place-2',
        countryCode: 'PT',
        defaultTitle: 'Outro',
      });

      expect(second.itineraryId).toBe(first.itineraryId);
      expect(second.created).toBe(false);
    });

    it('refuses the same target twice in one itinerary', async () => {
      await add('place-1');
      await expect(add('place-1')).rejects.toBeInstanceOf(ConflictException);
    });

    /*
     * The target is resolved before anything is written. Without that order, a
     * request naming a place that does not exist would still leave a brand new
     * empty itinerary behind — and the person would find it later with no idea
     * where it came from.
     */
    it('creates nothing when the target cannot be added', async () => {
      await expect(add('desconhecido')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(repo.create).not.toHaveBeenCalled();
    });

    it('refuses a stop whose country is not the itinerary’s', async () => {
      const first = await add('place-1');
      await expect(
        service.addStop('user-a', {
          itineraryId: first.itineraryId,
          placeId: 'place-2',
          countryCode: 'ES',
          defaultTitle: 'irrelevante',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('creating an itinerary, and the ceiling on it', () => {
    const criar = (title: string, countryCode = 'PT') =>
      service.create('user-a', { title, countryCode });

    it('creates an empty itinerary somebody asked for', async () => {
      const made = await criar('Porto num fim de semana');

      expect(made.title).toBe('Porto num fim de semana');
      expect(made.countryCode).toBe('PT');
      expect(made.stops).toEqual([]);
      expect(made.isPublic).toBe(false);
      expect(made.isCopy).toBe(false);
    });

    it('allows three in a country and refuses the fourth', async () => {
      await criar('Um');
      await criar('Dois');
      await criar('Três');

      await expect(criar('Quatro')).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });

    it('counts per country, so a full Portugal does not block Spain', async () => {
      await criar('Um');
      await criar('Dois');
      await criar('Três');

      await expect(criar('Uno', 'ES')).resolves.toMatchObject({
        countryCode: 'ES',
      });
    });

    /*
     * The whole reason copies are exempt: somebody who copied three Portuguese
     * itineraries would otherwise be unable to write one of their own, and the
     * recopy-to-refresh flow would hit a wall they never built.
     */
    it('does not count copies against the ceiling', async () => {
      const { itineraryId } = await add('place-1');
      await service.setVisibility(itineraryId, 'user-a', { isPublic: true });
      const publico = await service.getMine(itineraryId, 'user-a');

      // user-b now owns a Portuguese itinerary they did not write.
      await service.copyPublic(publico.slug, 'user-b');
      expect((await service.listMine('user-b', {})).total).toBe(1);

      // It buys them nothing and costs them nothing: three of their own still
      // fit, and only the fourth is refused.
      for (const title of ['Meu um', 'Meu dois', 'Meu três']) {
        await expect(
          service.create('user-b', { title, countryCode: 'PT' }),
        ).resolves.toMatchObject({ title });
      }
      await expect(
        service.create('user-b', { title: 'Meu quatro', countryCode: 'PT' }),
      ).rejects.toBeInstanceOf(UnprocessableEntityException);

      // Four rows in the country, three of them written by them.
      expect(
        (await service.listMine('user-b', { countryCode: 'PT' })).total,
      ).toBe(4);
    });

    it('normalises the country code, so "pt" and "PT" share one ceiling', async () => {
      await criar('Um', 'pt');
      await criar('Dois', 'PT');
      await criar('Três', 'pt');

      await expect(criar('Quatro', 'PT')).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });
  });

  describe('starting a second itinerary from a card', () => {
    it('creates a new one instead of appending to the most recent', async () => {
      const first = await add('place-1');

      const second = await service.addStop('user-a', {
        placeId: 'place-2',
        countryCode: 'pt',
        defaultTitle: 'Porto num fim de semana',
        startNew: true,
      });

      expect(second.itineraryId).not.toBe(first.itineraryId);
      expect(second.created).toBe(true);
      expect(second.itineraryTitle).toBe('Porto num fim de semana');
      // This is the acceptance for #412: two itineraries, one country.
      const mine = await service.listMine('user-a', {});
      expect(mine.total).toBe(2);
    });

    it('refuses startNew together with an itineraryId', async () => {
      const { itineraryId } = await add('place-1');

      await expect(
        service.addStop('user-a', {
          itineraryId,
          placeId: 'place-2',
          countryCode: 'pt',
          defaultTitle: 'Contraditório',
          startNew: true,
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('writes no stop when the ceiling refuses the new itinerary', async () => {
      await service.create('user-a', { title: 'Um', countryCode: 'PT' });
      await service.create('user-a', { title: 'Dois', countryCode: 'PT' });
      await service.create('user-a', { title: 'Três', countryCode: 'PT' });

      await expect(
        service.addStop('user-a', {
          placeId: 'place-1',
          countryCode: 'pt',
          defaultTitle: 'Quatro',
          startNew: true,
        }),
      ).rejects.toBeInstanceOf(UnprocessableEntityException);

      // Nothing half-written: no fourth itinerary, and no orphan stop.
      const mine = await service.listMine('user-a', {});
      expect(mine.total).toBe(3);
      expect(mine.data.every((it) => it.stopCount === 0)).toBe(true);
    });

    it('still appends to the most recent when nothing is asked', async () => {
      const first = await add('place-1');
      const again = await add('place-2');

      expect(again.itineraryId).toBe(first.itineraryId);
      expect(again.created).toBe(false);
    });
  });

  describe('listing my itineraries by country', () => {
    it('returns only the country asked for', async () => {
      await service.create('user-a', { title: 'Lisboa', countryCode: 'PT' });
      await service.create('user-a', { title: 'Madrid', countryCode: 'ES' });

      const pt = await service.listMine('user-a', { countryCode: 'pt' });

      expect(pt.total).toBe(1);
      expect(pt.data[0].title).toBe('Lisboa');
    });

    it('returns everything when no country is asked for', async () => {
      await service.create('user-a', { title: 'Lisboa', countryCode: 'PT' });
      await service.create('user-a', { title: 'Madrid', countryCode: 'ES' });

      expect((await service.listMine('user-a', {})).total).toBe(2);
    });
  });

  describe('ownership', () => {
    it('answers 404 — not 403 — for somebody else’s itinerary', async () => {
      const mine = await add('place-1');

      await expect(
        service.getMine(mine.itineraryId, 'user-b'),
      ).rejects.toBeInstanceOf(NotFoundException);
      await expect(
        service.rename(mine.itineraryId, 'user-b', { title: 'Roubado' }),
      ).rejects.toBeInstanceOf(NotFoundException);
      await expect(
        service.setVisibility(mine.itineraryId, 'user-b', { isPublic: true }),
      ).rejects.toBeInstanceOf(NotFoundException);
      await expect(
        service.remove(mine.itineraryId, 'user-b'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('rename', () => {
    it('changes the title and leaves the slug alone', async () => {
      const { itineraryId } = await add('place-1');
      const before = await service.getMine(itineraryId, 'user-a');

      const after = await service.rename(itineraryId, 'user-a', {
        title: 'Tour praia de Portugal',
      });

      expect(after.title).toBe('Tour praia de Portugal');
      expect(after.slug).toBe(before.slug);
    });
  });

  describe('reorder', () => {
    const buildThree = async () => {
      const { itineraryId } = await add('place-1');
      await add('place-2');
      await add('place-3');
      const detail = await service.getMine(itineraryId, 'user-a');
      return { itineraryId, ids: detail.stops.map((s) => s.id) };
    };

    it('rewrites the positions 1..n in the order given', async () => {
      const { itineraryId, ids } = await buildThree();
      const reversed = [...ids].reverse();

      const after = await service.reorderStops(itineraryId, 'user-a', {
        stopIds: reversed,
      });

      expect(after.stops.map((s) => s.id)).toEqual(reversed);
      expect(after.stops.map((s) => s.position)).toEqual([1, 2, 3]);
    });

    it.each([
      ['a stop is missing', (ids: string[]) => ids.slice(0, 2)],
      ['a stop repeats', (ids: string[]) => [ids[0], ids[0], ids[1]]],
      [
        'a stranger’s stop is named',
        (ids: string[]) => [ids[0], ids[1], 'stop-de-outro'],
      ],
    ])('refuses the order when %s', async (_label, mangle) => {
      const { itineraryId, ids } = await buildThree();

      await expect(
        service.reorderStops(itineraryId, 'user-a', { stopIds: mangle(ids) }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    /*
     * Two reorders racing each other.
     *
     * `position` deliberately carries no unique, which is what lets a full
     * permutation be a plain sequence of updates. The risk that buys is a
     * broken sequence — a gap, or two stops sharing a number — so whichever
     * call lands last has to leave a clean 1..n behind.
     */
    it('leaves no gap and no duplicate when two reorders overlap', async () => {
      const { itineraryId, ids } = await buildThree();

      await Promise.all([
        service.reorderStops(itineraryId, 'user-a', {
          stopIds: [ids[2], ids[0], ids[1]],
        }),
        service.reorderStops(itineraryId, 'user-a', {
          stopIds: [ids[1], ids[2], ids[0]],
        }),
      ]);

      const after = await service.getMine(itineraryId, 'user-a');
      const positions = after.stops.map((s) => s.position).sort();

      expect(positions).toEqual([1, 2, 3]);
      expect(new Set(after.stops.map((s) => s.id)).size).toBe(3);
    });
  });

  describe('the public read', () => {
    const publicar = async () => {
      const { itineraryId } = await add('place-1');
      await add('place-2');
      await add('place-3');
      await service.setVisibility(itineraryId, 'user-a', { isPublic: true });
      return itineraryId;
    };

    it('404s on an itinerary its owner has not published', async () => {
      const { itineraryId } = await add('place-1');
      const mine = await service.getMine(itineraryId, 'user-a');

      await expect(service.getPublic(mine.slug)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    /*
     * The renumbering is the whole reason this happens in one place. Numbering
     * before filtering would leave a gap; filtering in the map alone would
     * slide every later pin by one, and pin three would stop being item three.
     */
    it('drops an unavailable stop and renumbers what is left, without a gap', async () => {
      const itineraryId = await publicar();
      const stored = repo._itineraries.get(itineraryId);
      const meio = stored?.stops[1];
      if (meio?.place) meio.place.isActive = false;

      const detail = await service.getPublic(stored?.slug ?? '');

      expect(detail.stops).toHaveLength(2);
      expect(detail.stops.map((s) => s.number)).toEqual([1, 2]);
      expect(detail.stops.map((s) => s.name)).toEqual([
        'Lugar place-1',
        'Lugar place-3',
      ]);
    });

    it('keeps a stop that has no coordinate, and says so with nulls', async () => {
      const itineraryId = await publicar();
      const stored = repo._itineraries.get(itineraryId);
      const semCoordenada = stored?.stops[1];
      if (semCoordenada?.place) {
        semCoordenada.place.lat = null;
        semCoordenada.place.lng = null;
      }

      const detail = await service.getPublic(stored?.slug ?? '');

      // Still three stops, still numbered 1..3 — it simply cannot be a pin.
      expect(detail.stops.map((s) => s.number)).toEqual([1, 2, 3]);
      expect(detail.stops[1].lat).toBeNull();
      expect(detail.stops[1].lng).toBeNull();
    });

    it('counts only what a visitor can see, and covers with the first photo', async () => {
      const itineraryId = await publicar();
      const stored = repo._itineraries.get(itineraryId);
      if (stored?.stops[0].place) stored.stops[0].place.isActive = false;
      if (stored?.stops[2].place) stored.stops[2].place.imageUrl = 'foto.jpg';

      const list = await service.listPublic({});

      expect(list.data[0].stopCount).toBe(2);
      expect(list.data[0].coverImageUrl).toBe('foto.jpg');
    });
  });

  describe('copying a public itinerary', () => {
    const publicar = async () => {
      const { itineraryId } = await add('place-1');
      await add('place-2');
      await add('place-3');
      await service.setVisibility(itineraryId, 'user-a', { isPublic: true });
      const mine = await service.getMine(itineraryId, 'user-a');
      return { itineraryId, slug: mine.slug };
    };

    it('gives the caller a private itinerary with the same stops in order', async () => {
      const { slug } = await publicar();

      const copy = await service.copyPublic(slug, 'user-b');
      const mine = await service.getMine(copy.id, 'user-b');

      expect(mine.title).toBe('Meu roteiro em Portugal');
      expect(mine.isPublic).toBe(false);
      expect(mine.stops.map((stop) => stop.name)).toEqual([
        'Lugar place-1',
        'Lugar place-2',
        'Lugar place-3',
      ]);
      expect(mine.stops.map((stop) => stop.position)).toEqual([1, 2, 3]);
    });

    it('gives the copy its own address, never the original’s', async () => {
      const { slug } = await publicar();

      const copy = await service.copyPublic(slug, 'user-b');

      // Two itineraries cannot share a slug, and the copy is not a mirror of
      // the original — it is a second thing that happens to start the same.
      expect(copy.slug).not.toBe(slug);
    });

    /*
     * This is the whole request. A copy that a source could take with it would
     * be a bookmark, and a bookmark is what the reader already had.
     */
    it('survives the original being unpublished and then deleted', async () => {
      const { itineraryId, slug } = await publicar();
      const copy = await service.copyPublic(slug, 'user-b');

      await service.setVisibility(itineraryId, 'user-a', { isPublic: false });
      await service.remove(itineraryId, 'user-a');

      const mine = await service.getMine(copy.id, 'user-b');
      expect(mine.stops).toHaveLength(3);
      // Still a copy afterwards. The provenance is a fact about the past, and
      // it does not stop being true because what it points at is gone — which
      // is the whole reason it is a bare uuid and not a relation that would
      // have been nulled here.
      expect(mine.isCopy).toBe(true);
      expect(await service.getPublic(slug).catch(() => 'foi-se')).toBe(
        'foi-se',
      );
    });

    it('skips an unavailable stop and renumbers without a gap', async () => {
      const { itineraryId, slug } = await publicar();
      const stored = repo._itineraries.get(itineraryId);
      const meio = stored?.stops[1];
      if (meio?.place) meio.place.isActive = false;

      const copy = await service.copyPublic(slug, 'user-b');
      const mine = await service.getMine(copy.id, 'user-b');

      expect(mine.stops.map((stop) => stop.name)).toEqual([
        'Lugar place-1',
        'Lugar place-3',
      ]);
      expect(mine.stops.map((stop) => stop.position)).toEqual([1, 2]);
    });

    it('refuses to copy an itinerary with nothing left to copy', async () => {
      const { itineraryId, slug } = await publicar();
      const stored = repo._itineraries.get(itineraryId);
      for (const stop of stored?.stops ?? []) {
        if (stop.place) stop.place.isActive = false;
      }

      // The public detail still opens — `findPublicBySlug` does not require an
      // available stop — so the empty copy is reachable and has to be refused
      // rather than silently made.
      await expect(service.copyPublic(slug, 'user-b')).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });

    it('404s on an itinerary that was never published', async () => {
      const { itineraryId } = await add('place-1');
      const mine = await service.getMine(itineraryId, 'user-a');

      await expect(
        service.copyPublic(mine.slug, 'user-b'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    /*
     * This asserted the opposite until now, and the reversal is deliberate.
     *
     * Two copies of one source side by side are a pair of itineraries with the
     * same name where only one is current, and the reader has to work out
     * which. Refusing the second is what makes "copy again to get the updated
     * version" possible at all — the refusal is the question the overwrite
     * dialog answers.
     */
    it('refuses a second copy of the same source, so recopying can mean refresh', async () => {
      const { slug } = await publicar();

      const first = await service.copyPublic(slug, 'user-b');

      await expect(service.copyPublic(slug, 'user-b')).rejects.toBeInstanceOf(
        ConflictException,
      );

      const mine = await service.listMine('user-b', {});
      expect(mine.total).toBe(1);
      expect(mine.data[0].id).toBe(first.id);
    });

    it('marks a copy as copied, and something written here as not', async () => {
      const { itineraryId, slug } = await publicar();

      const copy = await service.copyPublic(slug, 'user-b');
      const theirs = await service.getMine(copy.id, 'user-b');
      const original = await service.getMine(itineraryId, 'user-a');

      expect(theirs.isCopy).toBe(true);
      // Not `toBeInstanceOf(Date)`: the fake clones rows with `structuredClone`,
      // which hands back a Date from another realm — a real date that fails an
      // identity check against this file's `Date`.
      expect(theirs.copiedAt).not.toBeNull();
      expect(Number.isFinite(new Date(theirs.copiedAt as Date).getTime())).toBe(
        true,
      );
      expect(original.isCopy).toBe(false);
      expect(original.copiedAt).toBeNull();
    });

    it('lets two different readers each copy the same source', async () => {
      const { slug } = await publicar();

      const b = await service.copyPublic(slug, 'user-b');
      const c = await service.copyPublic(slug, 'user-c');

      // The pair is unique per reader, not per source.
      expect(b.id).not.toBe(c.id);
      expect(b.slug).not.toBe(c.slug);
    });
  });

  describe('editing a stop list touches the itinerary', () => {
    /*
     * Two things read `updatedAt` and were quietly wrong without this: the
     * order of "my most recent itinerary in this country", which decides where
     * a quick-add lands, and the comparison against `copiedAt` that tells a
     * copy it has been edited since it was taken.
     */
    const stale = new Date('2020-01-01T00:00:00.000Z');

    it('marks the itinerary changed when the stops are reordered', async () => {
      const { itineraryId } = await add('place-1');
      await add('place-2');
      const stored = repo._itineraries.get(itineraryId);
      if (stored) stored.updatedAt = stale;

      const [first, second] = (await service.getMine(itineraryId, 'user-a'))
        .stops;
      await service.reorderStops(itineraryId, 'user-a', {
        stopIds: [second.id, first.id],
      });

      expect(
        repo._itineraries.get(itineraryId)?.updatedAt.getTime(),
      ).toBeGreaterThan(stale.getTime());
    });

    it('marks it changed when a stop is removed', async () => {
      const { itineraryId, stopId } = await add('place-1');
      await add('place-2');
      const stored = repo._itineraries.get(itineraryId);
      if (stored) stored.updatedAt = stale;

      await service.removeStop(itineraryId, stopId, 'user-a');

      expect(
        repo._itineraries.get(itineraryId)?.updatedAt.getTime(),
      ).toBeGreaterThan(stale.getTime());
    });
  });

  describe('the report', () => {
    it('stores a real one', async () => {
      const { itineraryId } = await add('place-1');
      await service.setVisibility(itineraryId, 'user-a', { isPublic: true });
      const mine = await service.getMine(itineraryId, 'user-a');

      const answer = await service.report(mine.slug, {
        reason: 'O título é ofensivo.',
      });

      expect(answer).toEqual({ received: true });
      expect(repo.createReport).toHaveBeenCalled();
    });

    /*
     * A filled honeypot answers exactly like a real report. Telling a bot it
     * was caught is telling it how to try again.
     */
    it('drops a bot in silence, answering the same', async () => {
      const { itineraryId } = await add('place-1');
      await service.setVisibility(itineraryId, 'user-a', { isPublic: true });
      const mine = await service.getMine(itineraryId, 'user-a');

      const answer = await service.report(mine.slug, {
        reason: 'O título é ofensivo.',
        website: 'http://spam.example',
      });

      expect(answer).toEqual({ received: true });
      expect(repo.createReport).not.toHaveBeenCalled();
    });
  });

  describe('stops that went out of view', () => {
    it('keeps them listed for the owner, flagged, and out of the count', async () => {
      const { itineraryId } = await add('place-1');
      await add('place-2');

      // The second place is deactivated behind the owner's back.
      const stored = repo._itineraries.get(itineraryId);
      const dead = stored?.stops[1];
      if (dead?.place) dead.place.isActive = false;

      const detail = await service.getMine(itineraryId, 'user-a');
      expect(detail.stops).toHaveLength(2);
      expect(detail.stops.map((s) => s.available)).toEqual([true, false]);

      const list = await service.listMine('user-a', {});
      expect(list.data[0].stopCount).toBe(1);
      expect(list.data[0].unavailableStopCount).toBe(1);
    });
  });
});
