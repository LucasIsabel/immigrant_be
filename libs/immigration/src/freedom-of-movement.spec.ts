import {
  FREEDOM_OF_MOVEMENT_COUNTRIES,
  hasFreedomOfMovement,
} from './freedom-of-movement';

describe('FREEDOM_OF_MOVEMENT_COUNTRIES', () => {
  it('holds the 27 EU states, the 3 non-EU EEA states and Switzerland', () => {
    expect(FREEDOM_OF_MOVEMENT_COUNTRIES.size).toBe(31);
  });

  /**
   * The boundary that motivated the fix. Schengen and freedom of movement are
   * different sets, and every country below sits on the difference — building
   * the list from Schengen would get all four wrong.
   */
  it('is built from EU + EEA + CH, not from Schengen', () => {
    // EEA but not EU: the EEA Agreement extends free movement of persons.
    expect(FREEDOM_OF_MOVEMENT_COUNTRIES.has('NO')).toBe(true);
    expect(FREEDOM_OF_MOVEMENT_COUNTRIES.has('IS')).toBe(true);
    expect(FREEDOM_OF_MOVEMENT_COUNTRIES.has('LI')).toBe(true);
    // Neither EU nor EEA, but has the right by bilateral agreement.
    expect(FREEDOM_OF_MOVEMENT_COUNTRIES.has('CH')).toBe(true);
    // EU but outside Schengen: border checks are not the same question.
    expect(FREEDOM_OF_MOVEMENT_COUNTRIES.has('IE')).toBe(true);
    expect(FREEDOM_OF_MOVEMENT_COUNTRIES.has('CY')).toBe(true);
    // In neither set, however close to the bloc.
    expect(FREEDOM_OF_MOVEMENT_COUNTRIES.has('TR')).toBe(false);
    expect(FREEDOM_OF_MOVEMENT_COUNTRIES.has('GB')).toBe(false);
  });
});

describe('hasFreedomOfMovement', () => {
  it('answers true for a member passport into a member country', () => {
    // The bug report: Portugal to Spain was being told to apply for a Type D.
    expect(hasFreedomOfMovement('PT', 'ES')).toBe(true);
    expect(hasFreedomOfMovement('NO', 'ES')).toBe(true);
    expect(hasFreedomOfMovement('IE', 'DE')).toBe(true);
    expect(hasFreedomOfMovement('CH', 'IT')).toBe(true);
    expect(hasFreedomOfMovement('LI', 'AT')).toBe(true);
  });

  it('answers false for a passport that carries no such right', () => {
    expect(hasFreedomOfMovement('TR', 'DE')).toBe(false);
    expect(hasFreedomOfMovement('GB', 'ES')).toBe(false);
    expect(hasFreedomOfMovement('BR', 'ES')).toBe(false);
    expect(hasFreedomOfMovement('US', 'PT')).toBe(false);
  });

  it('answers false for a member passport into a non-member country', () => {
    expect(hasFreedomOfMovement('PT', 'BR')).toBe(false);
    expect(hasFreedomOfMovement('DE', 'GB')).toBe(false);
    expect(hasFreedomOfMovement('ES', 'TR')).toBe(false);
  });

  it('answers false when either code is missing', () => {
    // The quiz question is optional and `Country.iso2` is nullable: an unknown
    // passport must never be read as an exemption.
    expect(hasFreedomOfMovement(undefined, 'ES')).toBe(false);
    expect(hasFreedomOfMovement('PT', undefined)).toBe(false);
    expect(hasFreedomOfMovement(null, null)).toBe(false);
    expect(hasFreedomOfMovement('', 'ES')).toBe(false);
  });

  it('compares codes case-insensitively', () => {
    expect(hasFreedomOfMovement('pt', 'es')).toBe(true);
    expect(hasFreedomOfMovement('Pt', 'eS')).toBe(true);
  });
});
