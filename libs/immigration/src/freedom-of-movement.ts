/**
 * Freedom of movement: who may move without a visa, and where.
 *
 * The right this file encodes is the EU/EEA/Swiss one. A citizen of any of
 * these states moving to any other of them needs **no visa and no residence
 * permit**: entry is on the passport or national ID card, and the only
 * obligation after 90 days is to register with the host country (residence
 * certificate, tax number, social security). Telling such a person to apply
 * for a national long-stay visa is not a rough answer, it is a wrong one.
 *
 * **The list is EU + EEA + Switzerland, and deliberately not Schengen.** The
 * two sets look alike and are not the same thing, and every difference between
 * them is a case this code would otherwise get backwards:
 *
 * - `IS`, `LI`, `NO` are EEA but not EU. The EEA Agreement extends the four
 *   freedoms — including the free movement of persons — to them, so an
 *   Icelander moving to Spain is in exactly the same position as a Spaniard
 *   moving to Iceland.
 * - `CH` is neither EU nor EEA. Its Agreement on the Free Movement of Persons
 *   with the EU gives Swiss citizens the same right bilaterally.
 * - `IE` and `CY` are EU but outside the Schengen Area. Schengen is about
 *   border checks; freedom of movement is about the right to reside and work,
 *   and an Irish citizen has it in full.
 * - `TR` and `GB` are in neither set. Turkey is a Schengen candidate and a
 *   customs-union partner, not a member; the United Kingdom left on
 *   31 January 2020 and its citizens have needed a visa or permit for a
 *   long stay in the EU since the transition ended.
 *
 * Sorted by ISO 3166-1 alpha-2, in three groups so that a future accession or
 * withdrawal is edited in the group it belongs to.
 */
export const FREEDOM_OF_MOVEMENT_COUNTRIES: ReadonlySet<string> = new Set([
  // European Union (27)
  'AT',
  'BE',
  'BG',
  'CY',
  'CZ',
  'DE',
  'DK',
  'EE',
  'ES',
  'FI',
  'FR',
  'GR',
  'HR',
  'HU',
  'IE',
  'IT',
  'LT',
  'LU',
  'LV',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SE',
  'SI',
  'SK',
  // EEA, not EU (3)
  'IS',
  'LI',
  'NO',
  // Switzerland, by the bilateral Agreement on the Free Movement of Persons
  'CH',
]);

/**
 * Whether the holder of `passportIso2` may settle in `destinationIso2` without
 * a visa, under freedom of movement.
 *
 * Both codes must be known: a missing passport (the quiz question is optional)
 * or a destination whose `iso2` was never filled in answers `false`, because
 * the only honest thing to say about an unknown passport is that we cannot
 * claim the exemption. Codes are compared case-insensitively so that a `pt`
 * from an older client is not silently treated as a non-member.
 *
 * A member moving *within* their own country is not immigration at all, but it
 * still answers `true`, which is the harmless reading: a Portuguese citizen
 * needs no visa for Portugal either.
 */
export function hasFreedomOfMovement(
  passportIso2: string | null | undefined,
  destinationIso2: string | null | undefined,
): boolean {
  if (!passportIso2 || !destinationIso2) return false;

  return (
    FREEDOM_OF_MOVEMENT_COUNTRIES.has(passportIso2.toUpperCase()) &&
    FREEDOM_OF_MOVEMENT_COUNTRIES.has(destinationIso2.toUpperCase())
  );
}
