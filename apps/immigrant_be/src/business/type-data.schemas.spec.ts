jest.mock('../../../../generated/prisma', () => ({
  BusinessType: {
    RESTAURANT: 'RESTAURANT',
    LEGAL: 'LEGAL',
    TOUR_GUIDE: 'TOUR_GUIDE',
    GENERAL: 'GENERAL',
  },
}));

import { BadRequestException } from '@nestjs/common';
import { BusinessType } from '../../../../generated/prisma';
import { validateTypeData } from './type-data.schemas';

/**
 * `typeData` reaches the database through a JSON column, so a field with no
 * maximum is a field that stores a megabyte. These caps are not product rules:
 * they are the point where content stops being content.
 */

const stop = (overrides: Record<string, unknown> = {}) => ({
  name: 'Alfama',
  description: 'A walk through the oldest quarter.',
  ...overrides,
});

const bodyOf = (error: unknown): { message: string } =>
  (error as BadRequestException).getResponse() as { message: string };

const failureFor = (typeData: object): { message: string } => {
  try {
    validateTypeData(BusinessType.TOUR_GUIDE, typeData);
  } catch (error) {
    return bodyOf(error);
  }
  throw new Error('expected the payload to be rejected');
};

describe('validateTypeData', () => {
  it('accepts what a real guide fills in', () => {
    expect(() =>
      validateTypeData(BusinessType.TOUR_GUIDE, {
        itinerary: [stop(), stop({ name: 'Belém' })],
        tours: [{ name: 'Old town', duration: '3h', price: 40 }],
      }),
    ).not.toThrow();
  });

  it('rejects a stop description past the cap', () => {
    expect(() =>
      validateTypeData(BusinessType.TOUR_GUIDE, {
        itinerary: [stop({ description: 'a'.repeat(2001) })],
      }),
    ).toThrow(BadRequestException);
  });

  /**
   * The whole point of the change: `flatten().fieldErrors` said `itinerary`
   * and nothing else, so an owner with eleven stops could not tell which one
   * to fix.
   */
  it('names the stop, the field and the limit', () => {
    const body = failureFor({
      itinerary: [stop(), stop(), stop({ description: 'a'.repeat(2001) })],
    });

    expect(body.message).toContain('itinerary[2].description');
    expect(body.message).toContain('2000');
  });

  it('speaks the language the owner is reading', () => {
    // This lands in a toast on their own page, so it follows the same rule as
    // every other message the API throws at a person.
    const body = failureFor({
      itinerary: [stop({ description: 'a'.repeat(2001) })],
    });

    expect(body.message).toContain('no máximo 2000 caracteres');
  });

  it('counts items, not characters, when a collection is too long', () => {
    const body = failureFor({
      itinerary: [
        stop({ photos: Array(7).fill({ url: 'https://a.co/p.jpg' }) }),
      ],
    });

    expect(body.message).toContain('itinerary[0].photos');
    expect(body.message).toContain('no máximo 6 itens');
  });

  it('reports every problem at once, not the first one', () => {
    // An owner who fixes one field and is told about the next has to submit
    // the form once per mistake.
    const body = failureFor({
      itinerary: [
        stop({ description: 'a'.repeat(2001) }),
        stop({ city: 'c'.repeat(101) }),
      ],
    });

    expect(body.message).toContain('itinerary[0].description');
    expect(body.message).toContain('itinerary[1].city');
  });

  it('bounds the collections themselves', () => {
    expect(() =>
      validateTypeData(BusinessType.TOUR_GUIDE, {
        itinerary: Array(51).fill(stop()),
      }),
    ).toThrow(BadRequestException);

    expect(() =>
      validateTypeData(BusinessType.TOUR_GUIDE, {
        tours: Array(31).fill({ name: 'Tour', duration: '2h', price: 10 }),
      }),
    ).toThrow(BadRequestException);
  });

  /**
   * Capping the tour guide's collections and leaving the restaurant's open
   * would only move the hole: the same crafted request works through `menu`.
   */
  it('bounds the restaurant menu too', () => {
    expect(() =>
      validateTypeData(BusinessType.RESTAURANT, {
        menu: Array(201).fill({ name: 'Bacalhau', price: 20 }),
      }),
    ).toThrow(BadRequestException);
  });

  it('lets a page with no typeData through untouched', () => {
    expect(() =>
      validateTypeData(BusinessType.GENERAL, undefined),
    ).not.toThrow();
    expect(() => validateTypeData(BusinessType.GENERAL, null)).not.toThrow();
  });
});
