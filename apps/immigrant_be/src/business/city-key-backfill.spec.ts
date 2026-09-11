import { readFileSync } from 'fs';
import { join } from 'path';
import * as seedFold from '../../../../prisma/seeds/city-key';
import { normalizeCity, normalizeState } from './city-key';

/**
 * The contract between the migrations that backfill a key and the fold the
 * application writes it with.
 *
 * Three migrations fold a name in SQL — `city_key` of businesses, `state_key`
 * of businesses, and `city_key` of places, events and ingestions — with a
 * `translate` map, because `unaccent` is not installed. Every later write goes
 * through `normalizeCity` in TypeScript. A map that folds one letter
 * differently leaves rows whose key the application would never ask for, and
 * nothing on any screen says so: the place is simply not in its own city.
 *
 * What lies outside the map (letters that decompose beyond Latin Extended-A)
 * is the reconciliation script's business, `scripts/backfill-city-keys.ts`.
 */
const MIGRATIONS = [
  '20260831165717_business_city_key',
  '20260911120000_city_state_identity',
  '20260911150000_places_events_city_key',
];

function translateMaps(migration: string): { from: string; to: string }[] {
  const sql = readFileSync(
    join(
      __dirname,
      '../../../../prisma/migrations',
      migration,
      'migration.sql',
    ),
    'utf8',
  );
  return [...sql.matchAll(/translate\("\w+", '([^']*)', '([^']*)'\)/g)].map(
    ([, from, to]) => ({ from, to }),
  );
}

const maps = MIGRATIONS.map((migration) => ({
  migration,
  maps: translateMaps(migration),
}));

/** The map the first key was backfilled with; the others must repeat it. */
const { from, to } = maps[0].maps[0];

/** Every letter of Latin-1 Supplement and Latin Extended-A. */
const LATIN = Array.from({ length: 0x17f - 0xc0 + 1 }, (_, i) =>
  String.fromCodePoint(0xc0 + i),
);

describe('the SQL backfill of the city keys', () => {
  it('finds the map in every migration that folds a key', () => {
    // One UPDATE in each of the first two, one per table in the third.
    expect(maps.map((entry) => entry.maps.length)).toEqual([1, 1, 3]);
  });

  it('maps each letter to exactly one letter', () => {
    expect([...from]).toHaveLength([...to].length);
  });

  it('folds every letter the way normalizeCity does', () => {
    const disagreements = [...from]
      .map((letter, index) => ({ letter, sql: to[index].toLowerCase() }))
      .filter(({ letter, sql }) => normalizeCity(letter) !== sql);

    expect(disagreements).toEqual([]);
  });

  it('covers every accented letter of Latin-1 and Latin Extended-A', () => {
    // A letter NFD splits from its accent is one `normalizeCity` folds. The
    // ones it does not split — ø, ß, æ, ł — are left alone on both sides, and
    // `lower()` folds their case.
    const missing = LATIN.filter(
      (letter) => letter.normalize('NFD') !== letter && !from.includes(letter),
    );

    expect(missing).toEqual([]);
  });

  it('uses one map in every migration, so every table folds alike', () => {
    for (const entry of maps) {
      for (const map of entry.maps) {
        expect({ migration: entry.migration, ...map }).toEqual({
          migration: entry.migration,
          from,
          to,
        });
      }
    }
  });
});

describe('the fold the seeds write keys with', () => {
  // A copy, because the production image ships `prisma/` without `apps/`.
  // Held here to the application's answer so the copy cannot drift.
  it('folds a city as the application does', () => {
    const names = [
      ...LATIN,
      'Póvoa de Varzim',
      '  Vila  Nova de Gaia ',
      'SÃO PAULO',
    ];

    for (const name of names) {
      expect(seedFold.normalizeCity(name)).toBe(normalizeCity(name));
    }
  });

  it('folds a state as the application does, null for none', () => {
    for (const state of ['Mato Grosso do Sul', 'São Paulo', '   ', null]) {
      expect(seedFold.normalizeState(state)).toBe(normalizeState(state));
    }
    expect(seedFold.normalizeState(undefined)).toBeNull();
  });
});
