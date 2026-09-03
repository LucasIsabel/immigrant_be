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
    listOwned: jest.fn(async (userId: string) => {
      const rows = [...itineraries.values()].filter((r) => r.userId === userId);
      return [rows.map((r) => structuredClone(r)), rows.length] as [
        (typeof rows)[number][],
        number,
      ];
    }),
    findMostRecentInCountry: jest.fn(
      async (userId: string, countryCode: string) => {
        const row = [...itineraries.values()]
          .filter((r) => r.userId === userId && r.countryCode === countryCode)
          .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
        return row ? structuredClone(row) : null;
      },
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
    deleteStop: jest.fn(async (id: string) => {
      for (const row of itineraries.values()) {
        row.stops = row.stops.filter((s) => s.id !== id);
      }
    }),
    reorderStops: jest.fn(async (itineraryId: string, ordered: string[]) => {
      const row = itineraries.get(itineraryId);
      if (!row) throw new Error('missing');
      ordered.forEach((stopId, index) => {
        const stop = row.stops.find((s) => s.id === stopId);
        if (stop) stop.position = index + 1;
      });
      row.stops.sort((a, b) => a.position - b.position);
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
