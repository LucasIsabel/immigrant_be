import { DEFAULT_LOCALE, resolveLocale } from './locale';

describe('resolveLocale', () => {
  it('keeps a language the product actually writes', () => {
    expect(resolveLocale('en')).toBe('en');
    expect(resolveLocale('pt')).toBe('pt');
    expect(resolveLocale('es')).toBe('es');
  });

  it('reads a regional tag as its language', () => {
    expect(resolveLocale('pt-BR')).toBe('pt');
    expect(resolveLocale('EN_US')).toBe('en');
    expect(resolveLocale('  es-AR  ')).toBe('es');
  });

  it('falls back to the default rather than hand a template a hole', () => {
    // The column is a plain string, so these are all reachable rows.
    for (const value of ['fr', '', '   ', 'x', 'português', null, undefined]) {
      expect(resolveLocale(value)).toBe(DEFAULT_LOCALE);
    }
  });
});
