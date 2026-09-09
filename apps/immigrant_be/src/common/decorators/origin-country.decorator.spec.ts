import { parseOriginCountry } from './origin-country.decorator';

describe('parseOriginCountry', () => {
  it('takes a country code as Cloudflare sends it', () => {
    expect(parseOriginCountry('PT')).toBe('PT');
  });

  it('accepts lower case, because a header is not a contract', () => {
    expect(parseOriginCountry('pt')).toBe('PT');
    expect(parseOriginCountry(' br ')).toBe('BR');
  });

  it('reads the first value when the header arrives repeated', () => {
    expect(parseOriginCountry(['BR', 'PT'])).toBe('BR');
  });

  /**
   * A guessed country is worse than an absent one: absent shows as unknown,
   * guessed becomes a number somebody acts on.
   */
  it.each([
    ['missing', undefined],
    ['empty', ''],
    ['three letters', 'PRT'],
    ['one letter', 'P'],
    ['digits', '12'],
    ["Cloudflare's own unknown", 'XX'],
    ['a Tor exit node', 'T1'],
    ['something forged', "PT'; DROP TABLE"],
    ['an empty array', []],
  ])('answers null for %s', (_label, input) => {
    expect(
      parseOriginCountry(input as string | string[] | undefined),
    ).toBeNull();
  });
});
