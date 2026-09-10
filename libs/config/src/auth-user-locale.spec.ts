import { localeOf } from './locale';

describe('localeOf', () => {
  it('reads the language off a better-auth user', () => {
    expect(localeOf({ id: 'u-1', language: 'en' })).toBe('en');
    expect(localeOf({ id: 'u-1', language: 'es' })).toBe('es');
  });

  it('falls back to Portuguese when the field is not there', () => {
    // The hooks type their user as the base `User`, and an older row or a
    // path that never declared the field must not produce `undefined`.
    expect(localeOf({ id: 'u-1' })).toBe('pt');
    expect(localeOf({ id: 'u-1', language: null })).toBe('pt');
    expect(localeOf({ id: 'u-1', language: 42 })).toBe('pt');
  });

  it('normalises a regional tag', () => {
    expect(localeOf({ language: 'pt-BR' })).toBe('pt');
  });
});
