import {
  buildPlaceWritingPrompt,
  type PlaceFacts,
} from './place-writing.prompt';
import { PLACE_TEXT_LIMITS } from '../schemas/place-texts.schema';

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

  describe('os limites que o schema impõe', () => {
    /*
     * O schema recusava descrição acima de 400 caracteres e o prompt não dizia
     * número nenhum. Um modelo obediente escrevia "uma ou duas frases" longas,
     * acertava em tudo, e era recusado sempre — a explicação mais provável para
     * um lugar ter falhado nove tentativas seguidas (immigrant_be#330).
     */
    it('diz ao modelo os números que o schema vai cobrar', () => {
      const p = buildPlaceWritingPrompt(fatos());

      expect(p).toContain(String(PLACE_TEXT_LIMITS.descriptionMin));
      expect(p).toContain(String(PLACE_TEXT_LIMITS.descriptionMax));
      expect(p).toContain(String(PLACE_TEXT_LIMITS.tipMax));
    });

    it('avisa que a chave da dica tem de existir mesmo quando é nula', () => {
      // `tip` ausente é recusada pelo schema; `null` é aceite. A diferença não
      // é adivinhável a partir de "ou null".
      expect(buildPlaceWritingPrompt(fatos())).toContain(
        'omitting it is not the same as null',
      );
    });

    it('pede as chaves exactas, e sem cerca de código à volta', () => {
      const p = buildPlaceWritingPrompt(fatos());

      expect(p).toContain('keys exactly pt, en and es');
      expect(p).toContain('no code fence');
    });
  });
});
