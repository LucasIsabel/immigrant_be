/**
 * The form a city name is compared in.
 *
 * City names arrive from two different CountriesNow catalogues — one flat per
 * country, one scoped to a state — and they disagree. For Portugal the flat
 * list carries no accents at all (0 of 673 names) while the state-scoped list
 * the wizard uses carries 27 accented names in Porto District alone. So the
 * same place is `Póvoa de Varzim` on one screen and `Povoa de Varzim` on
 * another, and an exact comparison finds neither from the other.
 *
 * Names are still **stored and shown** exactly as they were typed. Only the
 * comparison is folded, which is the difference between correcting someone's
 * spelling and merely recognising it.
 *
 * `NFD` splits a letter from its accent so the combining marks can be dropped;
 * the case fold and the whitespace collapse handle the rest.
 */
export function normalizeCity(city: string): string {
  return fold(city);
}

/**
 * The form a state name is compared in, or null when there is no state.
 *
 * The same fold as the city, and for the same reason one step up: "Sao Paulo"
 * and "São Paulo" are one state. The fold is ours alone — CountriesNow only
 * answers to the accented spelling, so what goes back to it is the name as
 * stored, never this key.
 *
 * Null rather than an empty key for a blank: an unknown state has to stay
 * distinguishable from a state, because a filter that names one must not match
 * rows that name none.
 */
export function normalizeState(
  state: string | null | undefined,
): string | null {
  return state?.trim() ? fold(state) : null;
}

/**
 * What identifies a city: its key, and the key of its state.
 *
 * A name alone does not. Brazil has 252 city names shared between states —
 * Campo Grande is the capital of Mato Grosso do Sul and also a town in Alagoas
 * — and inside one state no name repeats. So the state is the tiebreak, and
 * `stateKey` is null where the country has no subdivisions or nobody said.
 */
export function cityIdentity(location: {
  city: string;
  state?: string | null;
}): { cityKey: string; stateKey: string | null } {
  return {
    cityKey: normalizeCity(location.city),
    stateKey: normalizeState(location.state),
  };
}

/**
 * The state key a city filter narrows by, or null when it should not narrow.
 *
 * Only alongside a city. The state is how two cities with one name are told
 * apart, not a level of its own, so a state sent without a city is not read —
 * and a request with no state at all builds exactly the query it built before
 * states existed, which is what keeps every link already shared working.
 */
export function stateFilterKey(filter: {
  city?: string;
  state?: string;
}): string | null {
  return filter.city ? normalizeState(filter.state) : null;
}

function fold(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}
