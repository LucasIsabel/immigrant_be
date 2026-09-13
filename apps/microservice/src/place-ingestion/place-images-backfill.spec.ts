import { extractCommonsFileFromUrl } from '../../../../scripts/backfill-place-images';

describe('extractCommonsFileFromUrl', () => {
  it('extracts filename from standard thumbnail URLs', () => {
    expect(
      extractCommonsFileFromUrl(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/MAAT.jpg/960px-MAAT.jpg',
      ),
    ).toBe('MAAT.jpg');
  });

  it('decodes URI characters in the filename', () => {
    expect(
      extractCommonsFileFromUrl(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Bel%C3%A9m_Tower_in_Lisbon%2C_Portugal.jpg/960px-Bel%C3%A9m_Tower_in_Lisbon%2C_Portugal.jpg',
      ),
    ).toBe('Belém_Tower_in_Lisbon,_Portugal.jpg');
  });

  it('extracts filename from direct (non-thumbnail) Wikimedia URLs', () => {
    expect(
      extractCommonsFileFromUrl(
        'https://upload.wikimedia.org/wikipedia/commons/6/6d/Barcelona_-_Carrer_del_Bisbe.jpg',
      ),
    ).toBe('Barcelona_-_Carrer_del_Bisbe.jpg');
  });

  it('returns null for R2 or external non-wikimedia URLs', () => {
    expect(
      extractCommonsFileFromUrl(
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/places/pt/lisbon/livraria-bertrand.jpg',
      ),
    ).toBeNull();
    expect(
      extractCommonsFileFromUrl('https://images.unsplash.com/photo-123'),
    ).toBeNull();
  });
});
