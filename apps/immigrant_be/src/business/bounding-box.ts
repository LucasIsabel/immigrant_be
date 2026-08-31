/** The box that contains a circle, in degrees. */
export interface BoundingBox {
  minLat: number;
  maxLat: number;
  /** Absent when a longitude box would be wrong or useless — see below. */
  minLng?: number;
  maxLng?: number;
}

/**
 * Kilometres in one degree, on the same sphere the query measures with.
 *
 * `findPublicByRadius` computes `6371 * acos(...)`, so the geometry that
 * matters here is a sphere of that radius, where a degree is
 * `2π · 6371 / 360 = 111.195 km` — not the 110.57 of the real, flattened
 * earth. Getting that wrong is easy: the box has to be a **superset** of the
 * circle the query then measures, so it must be derived from the query's
 * sphere, not from geography.
 *
 * Rounded **down** on purpose. A smaller divisor yields a wider box, and wide
 * is the only safe direction: too wide costs a few extra rows that Haversine
 * then rejects, too narrow silently drops businesses that really are within
 * the radius, with nothing on screen to say so.
 */
const KM_PER_DEGREE = 111;

/** Slack for floating-point drift, in the same safe direction. */
const MARGIN = 1.01;

/**
 * Near a pole a degree of longitude is worth almost nothing, so the box grows
 * without bound. Below this cosine the longitude bound is dropped rather than
 * stretched into nonsense.
 */
const MIN_COS_LAT = 0.01;

/**
 * The rectangle that contains a search circle, for the database to reject rows
 * cheaply before anything computes a distance.
 *
 * ## Why this exists
 *
 * `findPublicByRadius` ran Haversine over every public row. Measured on 200 000
 * businesses: 52 ms and a sequential scan. With this box and an index on
 * `(lat, lng)` the same query is 1.5 ms — and, more to the point, it stays
 * there as the table grows, while the scan rises with it.
 *
 * ## It is a prefilter, never the answer
 *
 * A box is wider than the circle it contains: at the corners it admits points
 * up to √2 radii away. The Haversine condition stays and still decides. Getting
 * this backwards would quietly return businesses outside the radius someone
 * asked for.
 *
 * ## Two cases where the longitude bound is dropped
 *
 * **Near the poles**, a degree of longitude shrinks towards zero, so the bound
 * would stretch towards the whole world and filter nothing.
 *
 * **Across the antimeridian**, a box from 179° to -179° is not a range any
 * `BETWEEN` can express — it is two. Rather than emit a condition that would
 * exclude the very rows it should keep, the bound is dropped.
 *
 * In both cases the latitude bound still applies and the query is still
 * correct; it is only less fast, in the two places on earth where that is not
 * worth the risk.
 */
export function boundingBox(
  lat: number,
  lng: number,
  radiusKm: number,
): BoundingBox {
  const dLat = (radiusKm * MARGIN) / KM_PER_DEGREE;
  const box: BoundingBox = {
    minLat: lat - dLat,
    maxLat: lat + dLat,
  };

  const cosLat = Math.cos((lat * Math.PI) / 180);
  if (Math.abs(cosLat) < MIN_COS_LAT) {
    return box;
  }

  const dLng = (radiusKm * MARGIN) / (KM_PER_DEGREE * Math.abs(cosLat));
  const minLng = lng - dLng;
  const maxLng = lng + dLng;
  if (minLng < -180 || maxLng > 180) {
    return box;
  }

  return { ...box, minLng, maxLng };
}
