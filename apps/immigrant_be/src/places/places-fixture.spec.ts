// O fixture vive em `prisma/seeds/`, mas o jest só varre `apps` e `libs` — por
// isso o teste mora aqui, ao lado do módulo que serve esses dados.
import { CITY_BBOX, PLACES } from '../../../../prisma/seeds/places.data';

/**
 * O fixture é dado escrito à mão, e os erros que ele produz são silenciosos:
 * um pin no oceano ou uma tradução faltando não quebram nada — só aparecem
 * como buraco na tela. Por isso o teste é sobre os dados, não sobre o código
 * que os grava.
 */
describe('fixture de lugares', () => {
  it('tem 30 lugares em três cidades', () => {
    expect(PLACES).toHaveLength(30);
    const porCidade = PLACES.reduce<Record<string, number>>((acc, p) => {
      acc[p.city] = (acc[p.city] ?? 0) + 1;
      return acc;
    }, {});
    expect(porCidade).toEqual({ Lisbon: 10, Barcelona: 10, Toronto: 10 });
  });

  it('não repete a chave [countryCode, city, slug]', () => {
    const chaves = PLACES.map((p) => `${p.countryCode}|${p.city}|${p.slug}`);
    expect(new Set(chaves).size).toBe(PLACES.length);
  });

  it('usa o nome de cidade do CountriesNow, não a versão traduzida', () => {
    // "Lisboa" nunca casaria com o seletor, que lê do CountriesNow em inglês.
    expect(PLACES.map((p) => p.city)).not.toContain('Lisboa');
  });

  it('põe cada coordenada dentro da caixa da própria cidade', () => {
    for (const p of PLACES) {
      const box = CITY_BBOX[p.city];
      expect(box).toBeDefined();
      expect(p.lat).toBeGreaterThanOrEqual(box.minLat);
      expect(p.lat).toBeLessThanOrEqual(box.maxLat);
      expect(p.lng).toBeGreaterThanOrEqual(box.minLng);
      expect(p.lng).toBeLessThanOrEqual(box.maxLng);
    }
  });

  it('traduz descrição e dica nos três idiomas', () => {
    for (const p of PLACES) {
      expect(p.translations.map((t) => t.language).sort()).toEqual([
        'en',
        'es',
        'pt',
      ]);
      for (const t of p.translations) {
        expect(t.description.length).toBeGreaterThan(20);
      }
    }
  });

  it('dá a cada cidade uma escala de popularidade sem empate', () => {
    for (const city of Object.keys(CITY_BBOX)) {
      const scores = PLACES.filter((p) => p.city === city).map(
        (p) => p.popularityScore,
      );
      expect(new Set(scores).size).toBe(scores.length);
      expect(Math.max(...scores)).toBe(100);
    }
  });

  it('só aponta imagem para o Wikimedia, e sem parâmetro de rastreamento', () => {
    for (const p of PLACES) {
      if (!p.imageUrl) continue;
      expect(p.imageUrl).toMatch(/^https:\/\/upload\.wikimedia\.org\//);
      expect(p.imageUrl).not.toContain('utm_');
    }
  });

  it('gera slug a partir de caracteres seguros para URL', () => {
    for (const p of PLACES) {
      expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });
});
