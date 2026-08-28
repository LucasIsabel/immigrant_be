import { buildBusinessPageModerationPrompt } from './business-page-moderation.prompt';

const INPUT = {
  name: 'Rita Andrade',
  description: 'Guia licenciada no Porto',
  website: 'https://rita.example.com',
  businessType: 'guia-turistico',
  typeDataText: {
    'tours[0].name': 'Ribeira a pé',
    'tours[0].description': 'Do Infante à Sé pelas escadas.',
    'menu[3].name': 'Bacalhau à Brás',
  },
  typeDataLinks: {
    'tours[0].imageUrl': 'https://cdn.example.com/ribeira.jpg',
    'itinerary[0].photos[2].url': 'https://cdn.example.com/stop.jpg',
  },
};

describe('buildBusinessPageModerationPrompt', () => {
  it('carries the page sections and their paths into the content block', () => {
    const prompt = buildBusinessPageModerationPrompt(INPUT);

    expect(prompt).toContain('tours[0].description');
    expect(prompt).toContain('Do Infante à Sé pelas escadas.');
    expect(prompt).toContain('menu[3].name');
    expect(prompt).toContain('itinerary[0].photos[2].url');
  });

  it('no longer claims to analyse fields it is not given', () => {
    // The old wording promised "ALL text fields" while typeData — most of the
    // page — never reached the model.
    const prompt = buildBusinessPageModerationPrompt(INPUT);

    expect(prompt).not.toContain(
      'Analyze ALL text fields: name, description, address, website, email, phone, whatsapp',
    );
    expect(prompt).toContain('typeDataText');
  });

  it('tells the model to cite the exact field key, so a reviewer can find it', () => {
    const prompt = buildBusinessPageModerationPrompt(INPUT);

    expect(prompt).toContain('set `field` to that exact key');
    expect(prompt).toContain('tours[2].description');
  });

  it('puts photo URLs under the adult-links rule', () => {
    const prompt = buildBusinessPageModerationPrompt(INPUT);

    expect(prompt).toContain('adult-links rule');
    expect(prompt).toContain('photo URLs included');
  });

  it('still builds a valid prompt for a page with no typeData', () => {
    const prompt = buildBusinessPageModerationPrompt({
      name: 'Padaria',
      businessType: 'restaurante',
    });

    expect(prompt).toContain('Padaria');
    expect(prompt).not.toContain('"typeDataText"');
  });
});
