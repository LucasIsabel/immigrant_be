import { isBanActive } from './ban';

const NOW = new Date('2026-09-06T12:00:00Z');
const UMA_HORA_ANTES = new Date('2026-09-06T11:00:00Z');
const UMA_HORA_DEPOIS = new Date('2026-09-06T13:00:00Z');

/**
 * The rule two places depend on: the sign-in door and the request guard. They
 * share this function precisely so they cannot drift into disagreeing about
 * who is banned — a disagreement that reads as a ban that works on some routes.
 */
describe('isBanActive', () => {
  it('lets an ordinary account through', () => {
    expect(isBanActive({ banned: false, banExpires: null }, NOW)).toBe(false);
  });

  it('holds a ban with no deadline', () => {
    expect(isBanActive({ banned: true, banExpires: null }, NOW)).toBe(true);
  });

  it('holds a ban whose deadline has not arrived', () => {
    expect(
      isBanActive({ banned: true, banExpires: UMA_HORA_DEPOIS }, NOW),
    ).toBe(true);
  });

  it('lets a ban end when its deadline passes', () => {
    // The column stays `true` after the deadline — nothing sweeps it. Reading
    // `banned` alone is what made a one-hour ban permanent.
    expect(isBanActive({ banned: true, banExpires: UMA_HORA_ANTES }, NOW)).toBe(
      false,
    );
  });

  it('treats the exact deadline as over', () => {
    expect(isBanActive({ banned: true, banExpires: NOW }, NOW)).toBe(false);
  });

  it('ignores a deadline on an account that is not banned', () => {
    // What `unbanUser` leaves behind: `banned` false with the old expiry still
    // sitting in the column.
    expect(
      isBanActive({ banned: false, banExpires: UMA_HORA_DEPOIS }, NOW),
    ).toBe(false);
  });

  it('says no for a user that does not exist', () => {
    expect(isBanActive(null, NOW)).toBe(false);
  });

  it('says no when the column was never set', () => {
    expect(isBanActive({ banned: null, banExpires: null }, NOW)).toBe(false);
  });
});
