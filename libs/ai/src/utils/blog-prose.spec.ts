import {
  stripEmDashes,
  stripEmDashesDeep,
  stripEmDashesFromPost,
} from './blog-prose';

describe('stripEmDashes', () => {
  it('troca travessão por vírgula', () => {
    expect(stripEmDashes('The quota is tight — applicants wait longer.')).toBe(
      'The quota is tight, applicants wait longer.',
    );
  });

  it('mantém intervalo numérico com hífen', () => {
    expect(stripEmDashes('Targets for 2019–2024 rose.')).toBe(
      'Targets for 2019-2024 rose.',
    );
  });
});

describe('stripEmDashesFromPost', () => {
  it('limpa título, excerpt e conteúdo', () => {
    const cleaned = stripEmDashesFromPost({
      title: 'Canada — new rules',
      excerpt: 'A change — and a wait.',
      content: 'Body — still here.',
    });

    expect(cleaned).toEqual({
      title: 'Canada, new rules',
      excerpt: 'A change, and a wait.',
      content: 'Body, still here.',
    });
  });
});

describe('stripEmDashesDeep', () => {
  it('limpa strings em qualquer profundidade, inclusive dentro de arrays', () => {
    const cleaned = stripEmDashesDeep({
      documents: [
        { name: 'Passport — valid', notes: 'Renew early — lines are long.' },
      ],
      financial: { description: 'Proof of income for 2019–2024.' },
    });

    expect(cleaned).toEqual({
      documents: [
        { name: 'Passport, valid', notes: 'Renew early, lines are long.' },
      ],
      financial: { description: 'Proof of income for 2019-2024.' },
    });
  });

  it('não toca chaves, mesmo que contenham travessão', () => {
    // Chave é identificador de estrutura; renomeá-la quebraria quem lê o JSON.
    const cleaned = stripEmDashesDeep({ 'step—one': 'Go — now.' });

    expect(cleaned).toEqual({ 'step—one': 'Go, now.' });
  });

  it('deixa valores não-string intactos', () => {
    const input = { count: 3, done: false, missing: null, ratio: 0.5 };

    expect(stripEmDashesDeep(input)).toEqual(input);
  });

  it('aceita string e array na raiz', () => {
    expect(stripEmDashesDeep('A — B')).toBe('A, B');
    expect(stripEmDashesDeep(['A — B', 1])).toEqual(['A, B', 1]);
  });
});
