import {
  cityIdentity,
  normalizeCity,
  normalizeState,
  stateFilterKey,
} from './city-key';

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

describe('normalizeState', () => {
  it('folds a state the same way a city is folded', () => {
    expect(normalizeState('São Paulo')).toBe(normalizeState('Sao Paulo'));
    expect(normalizeState('  Mato  Grosso do Sul ')).toBe('mato grosso do sul');
  });

  it('answers null for no state, never an empty key', () => {
    // An empty key would be a state called "", and a filter naming a real one
    // must not be confused with a row that names none.
    expect(normalizeState(undefined)).toBeNull();
    expect(normalizeState(null)).toBeNull();
    expect(normalizeState('   ')).toBeNull();
  });
});

describe('cityIdentity', () => {
  it('tells the two Campo Grandes apart', () => {
    // The capital of Mato Grosso do Sul and a town in Alagoas: one name, two
    // cities, and only the state says which is which.
    const inMatoGrossoDoSul = cityIdentity({
      city: 'Campo Grande',
      state: 'Mato Grosso do Sul',
    });
    const inAlagoas = cityIdentity({ city: 'Campo Grande', state: 'Alagoas' });

    expect(inMatoGrossoDoSul.cityKey).toBe(inAlagoas.cityKey);
    expect(inMatoGrossoDoSul).not.toEqual(inAlagoas);
  });

  it('leaves the state key null when no state was given', () => {
    expect(cityIdentity({ city: 'Lisboa' })).toEqual({
      cityKey: 'lisboa',
      stateKey: null,
    });
  });

  it('recognises "Sao Paulo" and "São Paulo" as one city in one state', () => {
    expect(cityIdentity({ city: 'Sao Paulo', state: 'Sao Paulo' })).toEqual(
      cityIdentity({ city: 'São Paulo', state: 'São Paulo' }),
    );
  });
});

describe('stateFilterKey', () => {
  it('narrows a city filter by its state', () => {
    expect(stateFilterKey({ city: 'Campo Grande', state: 'Alagoas' })).toBe(
      'alagoas',
    );
  });

  it('does not narrow when no state was sent', () => {
    expect(stateFilterKey({ city: 'Campo Grande' })).toBeNull();
  });

  it('does not read a state sent without a city', () => {
    // The state is a tiebreak between namesakes, not a level of its own.
    expect(stateFilterKey({ state: 'Alagoas' })).toBeNull();
  });
});
