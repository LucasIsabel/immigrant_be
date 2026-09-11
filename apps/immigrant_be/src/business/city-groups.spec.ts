import { type CitySpelling, mergeCitySpellings } from './city-groups';

const spelling = (overrides: Partial<CitySpelling> = {}): CitySpelling => ({
  country: 'PT',
  city: 'Póvoa de Varzim',
  state: null,
  cityKey: 'povoa de varzim',
  stateKey: null,
  count: 1,
  located: 1,
  lat: 41.38,
  lng: -8.76,
  ...overrides,
});

describe('mergeCitySpellings', () => {
  it('answers one entry for two spellings of one city', () => {
    // The measured case: the flat catalogue spells it without the accent, the
    // state-scoped one with it, and the selector offered both.
    const cities = mergeCitySpellings([
      spelling({ city: 'Povoa de Varzim', count: 2, located: 2 }),
      spelling({ city: 'Póvoa de Varzim', count: 5, located: 5 }),
    ]);

    expect(cities).toHaveLength(1);
    expect(cities[0]).toMatchObject({ city: 'Póvoa de Varzim', count: 7 });
  });

  it('keeps namesakes in different states apart', () => {
    const cities = mergeCitySpellings([
      spelling({
        country: 'BR',
        city: 'Campo Grande',
        cityKey: 'campo grande',
        state: 'Alagoas',
        stateKey: 'alagoas',
      }),
      spelling({
        country: 'BR',
        city: 'Campo Grande',
        cityKey: 'campo grande',
        state: 'Mato Grosso do Sul',
        stateKey: 'mato grosso do sul',
      }),
    ]);

    expect(cities.map((city) => city.state)).toEqual([
      'Alagoas',
      'Mato Grosso do Sul',
    ]);
  });

  it('keeps two countries apart even when the key is the same', () => {
    // Valencia is in Spain and in Venezuela.
    const cities = mergeCitySpellings([
      spelling({ country: 'ES', city: 'Valencia', cityKey: 'valencia' }),
      spelling({ country: 'VE', city: 'Valencia', cityKey: 'valencia' }),
    ]);

    expect(cities).toHaveLength(2);
  });

  it('weighs the centre by the rows that have a coordinate', () => {
    // Three places at one point and one at another: the centre sits a quarter
    // of the way, not halfway, between them.
    const [city] = mergeCitySpellings([
      spelling({ count: 3, located: 3, lat: 41, lng: -8 }),
      spelling({ city: 'Povoa de Varzim', count: 1, located: 1, lat: 42 }),
    ]);

    expect(city.lat).toBeCloseTo(41.25);
    expect(city.lng).toBeCloseTo(-8.19);
  });

  it('does not let a spelling with no coordinate pull the centre', () => {
    const [city] = mergeCitySpellings([
      spelling({ count: 2, located: 2, lat: 40, lng: -8 }),
      spelling({
        city: 'Povoa de Varzim',
        count: 5,
        located: 0,
        lat: null,
        lng: null,
      }),
    ]);

    expect(city).toMatchObject({
      city: 'Povoa de Varzim',
      count: 7,
      lat: 40,
      lng: -8,
    });
  });

  it('answers a null centre when no row has a coordinate', () => {
    // Zero is a real place off the coast of Africa; it must not be invented.
    const [city] = mergeCitySpellings([
      spelling({ located: 0, lat: null, lng: null }),
      spelling({ city: 'Povoa de Varzim', located: 0, lat: null, lng: null }),
    ]);

    expect(city).toMatchObject({ lat: null, lng: null });
  });

  it('keeps the first spelling on a tie', () => {
    // The callers order by name, so the first is the first alphabetically.
    const [city] = mergeCitySpellings([
      spelling({ city: 'Povoa de Varzim', count: 2 }),
      spelling({ city: 'Póvoa de Varzim', count: 2 }),
    ]);

    expect(city.city).toBe('Povoa de Varzim');
  });

  it('picks the most frequent spelling by its own count, not the running sum', () => {
    // Against the sum, the third spelling (3) would lose to the 4 the first
    // two add up to, although neither of them has more than 2.
    const [city] = mergeCitySpellings([
      spelling({ city: 'POVOA DE VARZIM', count: 2 }),
      spelling({ city: 'Povoa de Varzim', count: 2 }),
      spelling({ city: 'Póvoa de Varzim', count: 3 }),
    ]);

    expect(city).toMatchObject({ city: 'Póvoa de Varzim', count: 7 });
  });

  it('shows the state of the winning spelling', () => {
    const [city] = mergeCitySpellings([
      spelling({
        country: 'BR',
        city: 'Sao Paulo',
        cityKey: 'sao paulo',
        state: 'Sao Paulo',
        stateKey: 'sao paulo',
        count: 1,
      }),
      spelling({
        country: 'BR',
        city: 'São Paulo',
        cityKey: 'sao paulo',
        state: 'São Paulo',
        stateKey: 'sao paulo',
        count: 4,
      }),
    ]);

    expect(city).toMatchObject({ city: 'São Paulo', state: 'São Paulo' });
  });
});
