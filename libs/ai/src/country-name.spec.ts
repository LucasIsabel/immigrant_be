import { normalizeCountryName } from './country-name';

describe('normalizeCountryName', () => {
  it('ignora caixa', () => {
    expect(normalizeCountryName('GERMANY')).toBe(
      normalizeCountryName('Germany'),
    );
  });

  it('ignora acento', () => {
    // O modelo escreve o nome inglês com acento de vez em quando.
    expect(normalizeCountryName('Perú')).toBe(normalizeCountryName('Peru'));
    expect(normalizeCountryName('Panamá')).toBe(normalizeCountryName('Panama'));
  });

  it('ignora espaço extra e borda', () => {
    expect(normalizeCountryName('  New   Zealand ')).toBe(
      normalizeCountryName('New Zealand'),
    );
  });

  it('trata variações de pontuação como equivalentes', () => {
    // A variância real é o tipo de apóstrofo e o acento, não a ausência dele:
    // a pontuação vira espaço, então a fronteira de palavra é preservada.
    expect(normalizeCountryName("Côte d'Ivoire")).toBe(
      normalizeCountryName('Cote d\u2019Ivoire'),
    );
    expect(normalizeCountryName('Timor-Leste')).toBe(
      normalizeCountryName('Timor Leste'),
    );
  });

  it('NÃO aproxima nomes traduzidos', () => {
    // Este é o limite do normalizador, e é por isso que a instrução no prompt
    // existe: "Nova Zelândia" e "New Zealand" são strings sem parentesco.
    expect(normalizeCountryName('Nova Zelândia')).not.toBe(
      normalizeCountryName('New Zealand'),
    );
    expect(normalizeCountryName('Alemanha')).not.toBe(
      normalizeCountryName('Germany'),
    );
  });

  it('mantém países diferentes diferentes', () => {
    expect(normalizeCountryName('Austria')).not.toBe(
      normalizeCountryName('Australia'),
    );
  });
});
