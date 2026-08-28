import { buildBlogCategoryTranslationPrompt } from './blog-category-translation.prompt';

const SIBLINGS = [
  'Vistos e Permissões',
  'Mudanças na Lei e Atualizações Oficiais',
  'Sistema de Saúde',
  'Turismo',
];

describe('buildBlogCategoryTranslationPrompt', () => {
  it('shows the model the categories it sits beside', () => {
    // A category name is three words with no sentence around it, which is
    // exactly where a model guesses. "Política" alone comes back as "Policy"
    // about as often as "Politics"; next to "Vistos e Permissões" it does not.
    const prompt = buildBlogCategoryTranslationPrompt({
      name: 'Política',
      originalLocale: 'pt',
      targetLocales: ['en', 'es'],
      siblings: SIBLINGS,
    });

    for (const sibling of SIBLINGS) {
      expect(prompt).toContain(sibling);
    }
  });

  it('does not list the category among its own siblings', () => {
    const prompt = buildBlogCategoryTranslationPrompt({
      name: 'Turismo',
      originalLocale: 'pt',
      targetLocales: ['en'],
      siblings: SIBLINGS,
    });

    const listed = prompt.split('\n').filter((line) => line === '- Turismo');
    expect(listed).toHaveLength(0);
  });

  it('names every target language and asks for one key each', () => {
    const prompt = buildBlogCategoryTranslationPrompt({
      name: 'Turismo',
      originalLocale: 'pt',
      targetLocales: ['en', 'es'],
      siblings: [],
    });

    expect(prompt).toContain('English');
    expect(prompt).toContain('Spanish');
    expect(prompt).toContain('"en"');
    expect(prompt).toContain('"es"');
  });

  it('spells out the traps this domain sets', () => {
    const prompt = buildBlogCategoryTranslationPrompt({
      name: 'Política',
      originalLocale: 'pt',
      targetLocales: ['en'],
      siblings: [],
    });

    expect(prompt).toContain('Politics');
    expect(prompt).toContain('Policy');
  });

  it('never asks the model for the URL', () => {
    // The slug is a mechanical transformation with one right answer, built on
    // the server; a model asked for it returns "diploma_recognition" as often
    // as the right thing.
    const prompt = buildBlogCategoryTranslationPrompt({
      name: 'Turismo',
      originalLocale: 'pt',
      targetLocales: ['en'],
      siblings: [],
    });

    expect(prompt).not.toMatch(/"slug"/);
    expect(prompt).toContain('built from it on the server');
  });

  it('says so plainly when a category has no siblings yet', () => {
    const prompt = buildBlogCategoryTranslationPrompt({
      name: 'Primeira',
      originalLocale: 'pt',
      targetLocales: ['en'],
      siblings: [],
    });

    expect(prompt).toContain('this is the only category');
  });
});
