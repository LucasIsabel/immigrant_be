import { BadRequestException } from '@nestjs/common';
import {
  crossesMidnight,
  toMinutes,
  validateOpeningHours,
} from './opening-hours.schema';

/**
 * The schedule replaces two free strings that a mask reduced to one window. The
 * cases below are the ones that could not be expressed before — and the one
 * that breaks the naive comparison, which is why the rule lives with the data.
 */

const failureFor = (value: unknown): string => {
  try {
    validateOpeningHours(value);
  } catch (error) {
    const body = (error as BadRequestException).getResponse() as {
      message: string;
    };
    return body.message;
  }
  throw new Error('expected the schedule to be rejected');
};

describe('validateOpeningHours', () => {
  it('accepts a split lunch and dinner service', () => {
    // The norm in Portugal and Brazil, and the shape the old mask threw away.
    expect(() =>
      validateOpeningHours({
        tuesday: {
          closed: false,
          intervals: [
            { open: '12:00', close: '15:00' },
            { open: '19:00', close: '23:00' },
          ],
        },
      }),
    ).not.toThrow();
  });

  it('accepts a closing day stated as closed', () => {
    expect(() =>
      validateOpeningHours({ monday: { closed: true } }),
    ).not.toThrow();
  });

  it('accepts a week that says nothing about some days', () => {
    // An absent day is "not stated", not closed — the reader answers unknown.
    expect(() =>
      validateOpeningHours({
        friday: {
          closed: false,
          intervals: [{ open: '09:00', close: '18:00' }],
        },
      }),
    ).not.toThrow();
  });

  it('accepts a bar that closes after midnight', () => {
    expect(() =>
      validateOpeningHours({
        saturday: {
          closed: false,
          intervals: [{ open: '19:00', close: '02:00' }],
        },
      }),
    ).not.toThrow();
  });

  it('lets only the last interval of a day cross midnight', () => {
    // Otherwise two intervals would occupy the same minute of the next day and
    // nothing decides which one wins.
    const message = failureFor({
      saturday: {
        closed: false,
        intervals: [
          { open: '19:00', close: '02:00' },
          { open: '12:00', close: '15:00' },
        ],
      },
    });

    expect(message).toContain('saturday.intervals[0]');
    expect(message).toContain('meia-noite');
  });

  it('refuses intervals that overlap', () => {
    const message = failureFor({
      monday: {
        closed: false,
        intervals: [
          { open: '12:00', close: '16:00' },
          { open: '15:00', close: '23:00' },
        ],
      },
    });

    expect(message).toContain('monday.intervals[1]');
    expect(message).toContain('sobreposição');
  });

  it('refuses an interval that opens and closes on the same minute', () => {
    expect(() =>
      validateOpeningHours({
        monday: {
          closed: false,
          intervals: [{ open: '12:00', close: '12:00' }],
        },
      }),
    ).toThrow(BadRequestException);
  });

  it('refuses an open day with no intervals at all', () => {
    // "Open, with no hours" is not a statement anybody can act on.
    expect(() =>
      validateOpeningHours({ monday: { closed: false, intervals: [] } }),
    ).toThrow(BadRequestException);
  });

  it('refuses a time that is not a time', () => {
    expect(() =>
      validateOpeningHours({
        monday: {
          closed: false,
          intervals: [{ open: '25:00', close: '26:00' }],
        },
      }),
    ).toThrow(BadRequestException);
  });

  it('names the day and the interval, so the owner can fix it', () => {
    const message = failureFor({
      wednesday: {
        closed: false,
        intervals: [
          { open: '09:00', close: '12:00' },
          { open: '13:00', close: '99:00' },
        ],
      },
    });

    expect(message).toContain('wednesday.intervals[1].close');
  });

  it('lets a business through with no schedule at all', () => {
    expect(() => validateOpeningHours(undefined)).not.toThrow();
    expect(() => validateOpeningHours(null)).not.toThrow();
  });
});

describe('crossesMidnight', () => {
  it('is true when the close time is earlier than the open time', () => {
    expect(crossesMidnight({ open: '19:00', close: '02:00' })).toBe(true);
  });

  it('is false for an ordinary daytime interval', () => {
    expect(crossesMidnight({ open: '09:00', close: '18:00' })).toBe(false);
  });
});

describe('toMinutes', () => {
  it('counts from midnight', () => {
    expect(toMinutes('00:00')).toBe(0);
    expect(toMinutes('01:30')).toBe(90);
    expect(toMinutes('23:59')).toBe(1439);
  });
});
