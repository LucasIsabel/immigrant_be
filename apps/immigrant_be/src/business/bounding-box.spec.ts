import { boundingBox } from './bounding-box';

/** Great-circle distance, the same one the query computes. */
function km(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const rad = (d: number) => (d * Math.PI) / 180;
  return (
    6371 *
    Math.acos(
      Math.cos(rad(aLat)) *
        Math.cos(rad(bLat)) *
        Math.cos(rad(bLng) - rad(aLng)) +
        Math.sin(rad(aLat)) * Math.sin(rad(bLat)),
    )
  );
}

const PORTO = { lat: 41.1496, lng: -8.6109 };

/** O ponto a `d` km de (lat, lng) num dado rumo, pela geometria da esfera. */
function destino(lat: number, lng: number, d: number, bearing: number) {
  const R = 6371;
  const rad = (x: number) => (x * Math.PI) / 180;
  const deg = (x: number) => (x * 180) / Math.PI;
  const f1 = rad(lat);
  const l1 = rad(lng);
  const b = rad(bearing);
  const f2 = Math.asin(
    Math.sin(f1) * Math.cos(d / R) +
      Math.cos(f1) * Math.sin(d / R) * Math.cos(b),
  );
  const l2 =
    l1 +
    Math.atan2(
      Math.sin(b) * Math.sin(d / R) * Math.cos(f1),
      Math.cos(d / R) - Math.sin(f1) * Math.sin(f2),
    );
  return { lat: deg(f2), lng: deg(l2) };
}

describe('boundingBox', () => {
  /**
   * The one that matters. A box is wider than its circle, and everything the
   * circle contains has to survive it — otherwise the prefilter silently drops
   * businesses that are genuinely within the radius someone asked for.
   */
  /**
   * Em várias latitudes de propósito. Um grau de meridiano vale 110.57 km no
   * equador e 111.69 nos polos, e a primeira versão desta caixa dividia pela
   * média — o que a tornava estreita demais **perto do equador** e em mais
   * lugar nenhum. Um anel só no Porto passava, e o Brasil está sobre a linha.
   */
  it.each([
    ['Porto', 41.1496, -8.6109],
    ['Macapá, sobre o equador', 0.034, -51.07],
    ['Nairobi, logo abaixo', -1.29, 36.82],
    ['Reiquiavique, bem ao norte', 64.14, -21.9],
  ])('contains every point inside the circle — %s', (_, lat, lng) => {
    const raio = 15;
    const box = boundingBox(lat, lng, raio);

    // O anel é gerado pela fórmula esférica de destino, não pela mesma
    // aproximação plana que a caixa usa — senão o teste concordaria com o erro
    // em vez de o apanhar.
    for (let bearing = 0; bearing < 360; bearing += 5) {
      const p = destino(lat, lng, raio * 0.999, bearing);

      expect(km(lat, lng, p.lat, p.lng)).toBeLessThanOrEqual(raio);
      expect(p.lat).toBeGreaterThanOrEqual(box.minLat);
      expect(p.lat).toBeLessThanOrEqual(box.maxLat);
      if (box.minLng !== undefined) {
        expect(p.lng).toBeGreaterThanOrEqual(box.minLng);
        expect(p.lng).toBeLessThanOrEqual(box.maxLng as number);
      }
    }
  });

  it('is wider than the circle at the corners — which is why Haversine stays', () => {
    // O canto da caixa está a √2 raios do centro. Se a caixa decidisse
    // sozinha, este ponto entraria numa busca de 15 km estando a 21.
    const box = boundingBox(PORTO.lat, PORTO.lng, 15);
    const canto = km(PORTO.lat, PORTO.lng, box.maxLat, box.maxLng as number);

    expect(canto).toBeGreaterThan(15);
    expect(canto).toBeLessThan(15 * 1.5);
  });

  it('drops the longitude bound near a pole', () => {
    // Ali um grau de longitude não vale quase nada, e o limite esticaria para
    // o mundo inteiro sem filtrar coisa nenhuma.
    const box = boundingBox(89.9, 0, 15);

    // A latitude continua limitada, e larga o bastante para o raio pedido —
    // asserção sobre o comportamento, não sobre a constante, que já mudou uma
    // vez por ser a errada.
    expect(box.maxLat - box.minLat).toBeGreaterThanOrEqual((2 * 15) / 111.7);
    expect(box.minLng).toBeUndefined();
    expect(box.maxLng).toBeUndefined();
  });

  it('drops the longitude bound across the antimeridian', () => {
    // De 179.9 para além de 180 não é um intervalo que um BETWEEN exprima —
    // são dois, e emitir um só excluiria justamente as linhas que devia manter.
    const box = boundingBox(-16.5, 179.95, 50);

    expect(box.minLng).toBeUndefined();
    expect(box.maxLng).toBeUndefined();
    expect(box.maxLat).toBeGreaterThan(-16.5);
  });

  it('keeps the longitude bound everywhere else', () => {
    const box = boundingBox(PORTO.lat, PORTO.lng, 15);

    expect(box.minLng).toBeDefined();
    expect(box.maxLng).toBeDefined();
  });

  it('widens with the radius', () => {
    const perto = boundingBox(PORTO.lat, PORTO.lng, 5);
    const longe = boundingBox(PORTO.lat, PORTO.lng, 50);

    expect(longe.maxLat - longe.minLat).toBeGreaterThan(
      perto.maxLat - perto.minLat,
    );
  });
});
