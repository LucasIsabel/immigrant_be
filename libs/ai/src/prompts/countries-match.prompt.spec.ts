import { buildCountriesMatchPrompt } from './countries-match.prompt';

const prompt = buildCountriesMatchPrompt(
  'I hold a PT passport.',
  ['Spain', 'Brazil'],
  'pt',
);

describe('buildCountriesMatchPrompt', () => {
  it('lists the available countries and the response language', () => {
    expect(prompt).toContain('Spain, Brazil');
    expect(prompt).toContain('### Idioma da resposta:\npt');
  });

  describe('freedom of movement', () => {
    /**
     * The quiz writes `reasons` and `visa_options` in prose, next to a
     * `freedom_of_movement` boolean the backend computes. If the prompt does
     * not know the rule, the two disagree on the same screen.
     */
    it('tells the model an EU/EEA/Swiss passport needs no visa', () => {
      expect(prompt).toContain('### Livre circulação (UE/EEE/Suíça):');
      expect(prompt).toContain('**não\nprecisa de visto**');
      expect(prompt).toContain('sem visto, basta registrar a\nresidência');
    });

    it('draws the line at EEA and Switzerland, not at Schengen', () => {
      // Iceland, Liechtenstein and Norway are EEA rather than EU; Ireland and
      // Cyprus are EU and outside Schengen. Every one of them is a case a
      // Schengen-shaped rule would answer backwards.
      expect(prompt).toContain('Islândia, Liechtenstein, Noruega');
      expect(prompt).toContain('Suíça');
      expect(prompt).toContain('Irlanda e Chipre estão na UE e fora');
      expect(prompt).toContain('Turquia e Reino Unido não estão');
    });
  });
});
