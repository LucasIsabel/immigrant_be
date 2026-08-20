import { stripEmDashes, stripEmDashesFromPost } from './blog-prose';

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
