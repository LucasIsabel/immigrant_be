/**
 * One spelling of a city, as a `groupBy` over `(country, cityKey, stateKey,
 * city, state)` returns it: the rows stored under exactly this name.
 */
export interface CitySpelling {
  country: string;
  city: string;
  state: string | null;
  cityKey: string;
  /** `''` or null for no state — whatever the table stores, compared as is. */
  stateKey: string | null;
  /** How many rows carry this spelling. */
  count: number;
  /**
   * How many of those rows have a coordinate. The average below is over them
   * alone, so they, and not `count`, are what it weighs.
   */
  located: number;
  lat: number | null;
  lng: number | null;
}

/** One city, whatever spellings it was stored under. */
export interface MergedCity {
  country: string;
  city: string;
  state: string | null;
  count: number;
  /** Null when not one row of the city has a coordinate. */
  lat: number | null;
  lng: number | null;
}

interface Group {
  winner: CitySpelling;
  count: number;
  located: number;
  latSum: number;
  lngSum: number;
}

/**
 * Folds the spellings of one city into one entry.
 *
 * The lists of cities group by the stored name, and the name is not the city:
 * "Póvoa de Varzim" and "Povoa de Varzim" come from two catalogues that
 * disagree on accents, and grouped apart they were two options in the selector
 * with the content split between them. What identifies a city is `(country,
 * cityKey, stateKey)`, so that is the group here.
 *
 * - The count is the sum of the spellings.
 * - The centre is the average weighted by the rows that have a coordinate, so a
 *   spelling with one place does not pull as hard as one with thirty.
 * - The name shown is the most frequent spelling — compared by its own count,
 *   never by the running sum, which would hand the win to whichever came last.
 *   On a tie the first one stays, so a caller ordering by name gets the first
 *   in that order.
 */
export function mergeCitySpellings(rows: CitySpelling[]): MergedCity[] {
  const groups = new Map<string, Group>();

  for (const row of rows) {
    const id = JSON.stringify([row.country, row.cityKey, row.stateKey]);
    const weight = row.lat !== null && row.lng !== null ? row.located : 0;
    const latSum = weight ? (row.lat as number) * weight : 0;
    const lngSum = weight ? (row.lng as number) * weight : 0;

    const group = groups.get(id);
    if (!group) {
      groups.set(id, {
        winner: row,
        count: row.count,
        located: weight,
        latSum,
        lngSum,
      });
      continue;
    }

    group.count += row.count;
    group.located += weight;
    group.latSum += latSum;
    group.lngSum += lngSum;
    if (row.count > group.winner.count) {
      group.winner = row;
    }
  }

  return [...groups.values()].map((group) => ({
    country: group.winner.country,
    city: group.winner.city,
    state: group.winner.state,
    count: group.count,
    lat: group.located ? group.latSum / group.located : null,
    lng: group.located ? group.lngSum / group.located : null,
  }));
}
