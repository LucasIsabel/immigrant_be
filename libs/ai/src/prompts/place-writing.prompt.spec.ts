import {
  buildPlaceWritingPrompt,
  type PlaceFacts,
} from './place-writing.prompt';

const fatos = (over: Partial<PlaceFacts> = {}): PlaceFacts => ({
  name: 'Torre de Belém',
  category: 'LANDMARK',
  city: 'Lisbon',
  country: 'Portugal',
  isFree: false,
  ...over,
});

describe('buildPlaceWritingPrompt', () => {
  it('põe os fatos no prompt', () => {
    const p = buildPlaceWritingPrompt(
      fatos({ address: 'Av. Brasília', monthlyViews: 12997 }),
    );
    expect(p).toContain('Torre de Belém');
    expect(p).toContain('LANDMARK');
    expect(p).toContain('Lisbon, Portugal');
    expect(p).toContain('Av. Brasília');
    expect(p).toContain('12997');
  });

  it('omite o que não foi colhido, em vez de mandar campo vazio', () => {
    // Uma linha "Address: null" convida o modelo a preencher a lacuna.
    const p = buildPlaceWritingPrompt(fatos());
    expect(p).not.toContain('Address');
    expect(p).not.toContain('Website');
    expect(p).not.toContain('Wikipedia summary');
  });

  it('proíbe explicitamente horário e preço', () => {
    // São os campos que um modelo preenche com plausibilidade quando não sabe,
    // e que mandariam alguém para uma porta fechada.
    const p = buildPlaceWritingPrompt(fatos());
    expect(p).toContain('No opening hours');
    expect(p).toContain('no ticket prices');
    expect(p).toContain('Never state a fact that is not above');
  });

  it('diz que a entrada é gratuita só quando é', () => {
    expect(buildPlaceWritingPrompt(fatos({ isFree: true }))).toContain(
      'Entry: free',
    );
    expect(buildPlaceWritingPrompt(fatos({ isFree: false }))).toContain(
      'Entry: paid or unknown',
    );
  });

  it('compõe as regras de prosa em vez de reescrevê-las', () => {
    const p = buildPlaceWritingPrompt(fatos());
    expect(p).toContain('Never use an em dash');
    expect(p).toContain('Avoid AI tells');
  });

  it('pede os três idiomas escritos nativamente, não traduzidos', () => {
    const p = buildPlaceWritingPrompt(fatos());
    expect(p).toContain('Portuguese (pt-BR), English and Spanish');
    expect(p).toContain('Do not translate the Portuguese');
  });
});
