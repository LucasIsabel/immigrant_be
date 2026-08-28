import {
  flattenModerationContent,
  MODERATION_FIELD_MAX_CHARS,
  MODERATION_TOTAL_MAX_CHARS,
} from './moderation-flatten.util';

const tourGuideTypeData = {
  profileImage: 'https://cdn.example.com/rita.jpg',
  meetingPoint: 'Praça do Infante, junto à estátua',
  countryOfOrigin: 'Portugal',
  languages: ['Português', 'Inglês'],
  featured: true,
  tours: [
    {
      id: '2f1c7c1e-0000-4000-8000-000000000001',
      name: 'Ribeira a pé',
      duration: '3 h',
      price: 35,
      description: 'Do Infante à Sé pelas escadas.',
      imageUrl: 'https://cdn.example.com/ribeira.jpg',
    },
    {
      id: '2f1c7c1e-0000-4000-8000-000000000002',
      name: 'Douro de carro',
      duration: '9 h',
      price: 420,
      description: 'Duas quintas e almoço no vale.',
    },
  ],
  itinerary: [
    {
      id: '2f1c7c1e-0000-4000-8000-000000000003',
      name: 'Cais da Ribeira',
      description: 'Paragem de copo, no balcão de sempre.',
      lat: 41.14,
      lng: -8.61,
      photos: [
        { url: 'https://cdn.example.com/stop-a.jpg', lat: 41.14 },
        { url: 'https://cdn.example.com/stop-b.jpg' },
      ],
    },
  ],
};

const restaurantTypeData = {
  cuisine: 'Portuguesa',
  menu: [
    { name: 'Peixinhos da horta', price: 8.5, category: 'Petiscos' },
    {
      name: 'Bacalhau à Brás',
      price: 14.5,
      description: 'Com azeitona preta.',
    },
    {
      name: 'Arroz de pato',
      price: 16,
      photo: 'https://cdn.example.com/pato.jpg',
    },
  ],
};

describe('flattenModerationContent', () => {
  it('names every text leaf by its path in the page content', () => {
    const { text } = flattenModerationContent(tourGuideTypeData);

    expect(text['tours[1].name']).toBe('Douro de carro');
    expect(text['tours[1].description']).toBe('Duas quintas e almoço no vale.');
    expect(text['itinerary[0].description']).toBe(
      'Paragem de copo, no balcão de sempre.',
    );
    expect(text['meetingPoint']).toBe('Praça do Infante, junto à estátua');
    expect(text['languages[0]']).toBe('Português');
  });

  it('routes photo and profile URLs into links, where the adult-links rule reaches them', () => {
    const { text, links } = flattenModerationContent(tourGuideTypeData);

    expect(links['profileImage']).toBe('https://cdn.example.com/rita.jpg');
    expect(links['tours[0].imageUrl']).toBe(
      'https://cdn.example.com/ribeira.jpg',
    );
    expect(links['itinerary[0].photos[1].url']).toBe(
      'https://cdn.example.com/stop-b.jpg',
    );
    expect(text['profileImage']).toBeUndefined();
  });

  it('names restaurant menu fields the same way', () => {
    const { text, links } = flattenModerationContent(restaurantTypeData);

    expect(text['menu[1].name']).toBe('Bacalhau à Brás');
    expect(text['menu[1].description']).toBe('Com azeitona preta.');
    expect(links['menu[2].photo']).toBe('https://cdn.example.com/pato.jpg');
  });

  it('skips identifiers and non-string leaves, which hold nothing to moderate', () => {
    const { text } = flattenModerationContent(tourGuideTypeData);

    const keys = Object.keys(text);
    expect(keys.some((key) => key.endsWith('.id'))).toBe(false);
    expect(text['tours[0].price']).toBeUndefined();
    expect(text['itinerary[0].lat']).toBeUndefined();
    expect(text['featured']).toBeUndefined();
  });

  it('cuts a single oversized field and reports the analysis as incomplete', () => {
    const long = 'a'.repeat(MODERATION_FIELD_MAX_CHARS + 500);

    const { text, truncated } = flattenModerationContent({
      itinerary: [{ name: 'Parada', description: long }],
    });

    expect(truncated).toBe(true);
    expect(text['itinerary[0].description']).toHaveLength(
      MODERATION_FIELD_MAX_CHARS + '…[truncated]'.length,
    );
    expect(text['itinerary[0].description'].endsWith('…[truncated]')).toBe(
      true,
    );
  });

  it('leaves content within the per-field cap untouched', () => {
    const description = 'b'.repeat(2000);

    const { text, truncated } = flattenModerationContent({
      tours: [{ name: 'Passeio', description }],
    });

    expect(truncated).toBe(false);
    expect(text['tours[0].description']).toBe(description);
  });

  it('drops the tail once the total budget is spent', () => {
    const chunk = 'c'.repeat(MODERATION_FIELD_MAX_CHARS);
    const tourCount = Math.ceil(
      MODERATION_TOTAL_MAX_CHARS / MODERATION_FIELD_MAX_CHARS,
    );
    const tours = Array.from({ length: tourCount + 5 }, (_, index) => ({
      name: `Passeio ${index}`,
      description: chunk,
    }));

    const { text, truncated } = flattenModerationContent({ tours });

    expect(truncated).toBe(true);
    expect(text[`tours[${tourCount + 4}].description`]).toBeUndefined();
    expect(text['tours[0].description']).toBe(chunk);
  });

  it('keeps links even after the text budget is spent', () => {
    const chunk = 'd'.repeat(MODERATION_FIELD_MAX_CHARS);
    const tourCount = Math.ceil(
      MODERATION_TOTAL_MAX_CHARS / MODERATION_FIELD_MAX_CHARS,
    );
    const tours = Array.from({ length: tourCount + 2 }, (_, index) => ({
      description: chunk,
      imageUrl: `https://cdn.example.com/${index}.jpg`,
    }));

    const { links } = flattenModerationContent({ tours });

    expect(links[`tours[${tourCount + 1}].imageUrl`]).toBe(
      `https://cdn.example.com/${tourCount + 1}.jpg`,
    );
  });

  it('returns empty maps for anything that is not a plain object', () => {
    for (const value of [null, undefined, [], 'text', 42]) {
      expect(flattenModerationContent(value)).toEqual({
        text: {},
        links: {},
        truncated: false,
      });
    }
  });
});
