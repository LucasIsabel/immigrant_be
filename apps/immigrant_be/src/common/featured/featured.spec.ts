import { isFeaturedAt } from './featured';

/**
 * Quando um destaque conta.
 *
 * A faixa que isto alimenta fica acima da lista, no lugar onde o leitor
 * acredita estar a ver o melhor da cidade — então o que importa aqui é não
 * mostrar nada que já não devesse estar lá.
 */

const NOW = new Date('2026-09-01T12:00:00Z');
const ONTEM = new Date('2026-08-31T12:00:00Z');
const AMANHA = new Date('2026-09-02T12:00:00Z');

describe('isFeaturedAt', () => {
  it('não destaca o que ninguém marcou', () => {
    expect(
      isFeaturedAt(
        { featureKind: null, featuredFrom: null, featuredUntil: null },
        NOW,
      ),
    ).toBe(false);
  });

  it('destaca o que está marcado sem datas', () => {
    // O caso comum de uma escolha editorial: vale enquanto estiver marcada.
    expect(
      isFeaturedAt(
        { featureKind: 'CURATED', featuredFrom: null, featuredUntil: null },
        NOW,
      ),
    ).toBe(true);
  });

  it('ainda não destaca o que começa amanhã', () => {
    expect(
      isFeaturedAt(
        { featureKind: 'PAID', featuredFrom: AMANHA, featuredUntil: null },
        NOW,
      ),
    ).toBe(false);
  });

  it('deixa de destacar o que acabou ontem', () => {
    // A razão de as datas existirem: sem fim, uma promoção paga fica
    // permanente porque ninguém se lembrou dela.
    expect(
      isFeaturedAt(
        { featureKind: 'PAID', featuredFrom: null, featuredUntil: ONTEM },
        NOW,
      ),
    ).toBe(false);
  });

  it('destaca dentro da janela', () => {
    expect(
      isFeaturedAt(
        { featureKind: 'PAID', featuredFrom: ONTEM, featuredUntil: AMANHA },
        NOW,
      ),
    ).toBe(true);
  });

  it('conta o próprio instante do início e do fim', () => {
    // Um limite tem de pertencer a um dos lados, e pertence ao destaque: uma
    // campanha que "vai até dia 2" inclui o dia 2.
    expect(
      isFeaturedAt(
        { featureKind: 'PAID', featuredFrom: NOW, featuredUntil: NOW },
        NOW,
      ),
    ).toBe(true);
  });
});
