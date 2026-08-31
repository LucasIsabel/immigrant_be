import { normalizeCity } from './city-key';

describe('normalizeCity', () => {
  it('folds the accents the two catalogues disagree on', () => {
    // The measured case: the flat list for Portugal spells it without the
    // accent, the state-scoped list with it.
    expect(normalizeCity('Póvoa de Varzim')).toBe(
      normalizeCity('Povoa de Varzim'),
    );
    expect(normalizeCity('Águas Santas')).toBe(normalizeCity('Aguas Santas'));
  });

  it('ignores case', () => {
    expect(normalizeCity('PORTO')).toBe(normalizeCity('porto'));
  });

  it('ignores padding and doubled spaces', () => {
    expect(normalizeCity('  Vila  Nova de Gaia ')).toBe(
      normalizeCity('Vila Nova de Gaia'),
    );
  });

  it('keeps genuinely different names apart', () => {
    // `Lisboa` and `Lisbon` are two spellings of one city, and this database
    // holds businesses under both — but folding accents cannot know that, and
    // pretending otherwise would merge cities that merely look alike.
    expect(normalizeCity('Lisboa')).not.toBe(normalizeCity('Lisbon'));
    expect(normalizeCity('Porto')).not.toBe(normalizeCity('Portimão'));
  });

  it('leaves a plain name alone but for the case', () => {
    expect(normalizeCity('Matosinhos')).toBe('matosinhos');
  });
});
