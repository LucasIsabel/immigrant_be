import {
  localizeCategory,
  localizeEmbeddedCategory,
  withOriginalTranslation,
} from './localize-category';

const CATEGORY = {
  name: 'Vistos e Permissões',
  slug: 'vistos-e-permissoes',
  original_locale: 'pt',
  translations: [
    { locale: 'en', name: 'Visas and Permits', slug: 'visas-and-permits' },
    { locale: 'es', name: 'Visados y Permisos', slug: 'visados-y-permisos' },
  ],
};

describe('localizeCategory', () => {
  it('returns the requested language', () => {
    const localized = localizeCategory(CATEGORY, 'en');

    expect(localized.name).toBe('Visas and Permits');
    expect(localized.slug).toBe('visas-and-permits');
  });

  it('leaves the category alone when no language is asked for', () => {
    expect(localizeCategory(CATEGORY, undefined)).toBe(CATEGORY);
  });

  it('leaves the category alone in its own language', () => {
    expect(localizeCategory(CATEGORY, 'pt')).toBe(CATEGORY);
  });

  it('falls back to the original name when the language is missing', () => {
    // The window between an admin creating a category and the queue answering.
    // A Portuguese name in an English rail is a blemish; a category missing
    // from the navigation is a hole.
    const fresh = { ...CATEGORY, translations: [] };

    const localized = localizeCategory(fresh, 'en');

    expect(localized.name).toBe('Vistos e Permissões');
    expect(localized.slug).toBe('vistos-e-permissoes');
  });

  it('keeps every other field of the category', () => {
    const withCount = { ...CATEGORY, published_posts_count: 12 };

    expect(localizeCategory(withCount, 'en').published_posts_count).toBe(12);
  });

  it('treats a category with no declared language as Portuguese', () => {
    const noLocale = { ...CATEGORY, original_locale: undefined };

    expect(localizeCategory(noLocale, 'pt')).toBe(noLocale);
    expect(localizeCategory(noLocale, 'en').name).toBe('Visas and Permits');
  });
});

describe('localizeEmbeddedCategory', () => {
  /**
   * The case the whole feature exists for. Posts are written in English and
   * categories in Portuguese, so an English reader asks for `lang=en` on a post
   * whose original language is already English — the post needs no translation
   * and its category needs one.
   */
  it('translates the category of a post written in the requested language', () => {
    const post = {
      title: 'How to apply for a residence permit',
      original_locale: 'en',
      category: CATEGORY,
    };

    const localized = localizeEmbeddedCategory(post, 'en');

    expect(localized.category.name).toBe('Visas and Permits');
    expect(localized.title).toBe('How to apply for a residence permit');
  });

  it('leaves a post without a category alone', () => {
    const post = { title: 'Orphan', category: null };

    expect(localizeEmbeddedCategory(post, 'en')).toBe(post);
  });

  it('leaves the post alone when no language is asked for', () => {
    const post = { title: 'Any', category: CATEGORY };

    expect(localizeEmbeddedCategory(post, undefined)).toBe(post);
  });
});

/**
 * The gap found in the browser: the category page could not declare an honest
 * `hreflang` for Portuguese, because a response localized into English had
 * already overwritten `slug` and carried no Portuguese row to recover it from.
 */
describe('withOriginalTranslation', () => {
  it('adds the category itself as a row', () => {
    const complete = withOriginalTranslation(CATEGORY);

    expect(complete.translations).toContainEqual({
      locale: 'pt',
      name: 'Vistos e Permissões',
      slug: 'vistos-e-permissoes',
      translated_by: 'ORIGINAL',
      translated_by_model: null,
    });
  });

  it('keeps the written translations beside it', () => {
    const complete = withOriginalTranslation(CATEGORY);

    expect(complete.translations?.map((t) => t.locale).sort()).toEqual([
      'en',
      'es',
      'pt',
    ]);
  });

  it('leaves the Portuguese slug recoverable after localizing into English', () => {
    const asServed = localizeCategory(withOriginalTranslation(CATEGORY), 'en');

    expect(asServed.slug).toBe('visas-and-permits');
    expect(asServed.translations?.find((t) => t.locale === 'pt')?.slug).toBe(
      'vistos-e-permissoes',
    );
  });

  it('does not duplicate a row that already exists for that language', () => {
    const already = {
      ...CATEGORY,
      translations: [
        {
          locale: 'pt',
          name: 'Outro',
          slug: 'outro',
          translated_by: 'HUMAN',
          translated_by_model: null,
        },
      ],
    };

    expect(withOriginalTranslation(already)).toBe(already);
  });
});
