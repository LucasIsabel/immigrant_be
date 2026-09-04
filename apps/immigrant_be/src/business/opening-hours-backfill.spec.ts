import { weeklyScheduleSchema } from './opening-hours.schema';

/**
 * The contract between a migration and this schema.
 *
 * `backfill_legacy_opening_hours` builds the week in SQL — `jsonb_object_agg`
 * over a list of weekday names — and this schema is what every reader parses it
 * with. Two hands writing the same shape, and nothing in Postgres knows about
 * Zod: the day the schema gains a required field, or renames one, the migration
 * keeps writing the old shape and the rows it already wrote stop parsing.
 *
 * The literal below is what the SQL produces, verified against a row it wrote
 * into the local database. It is here so that change fails a test instead of a
 * page.
 */
const AS_THE_SQL_WRITES_IT = {
  monday: { closed: false, intervals: [{ open: '12:00', close: '15:00' }] },
  tuesday: { closed: false, intervals: [{ open: '12:00', close: '15:00' }] },
  wednesday: { closed: false, intervals: [{ open: '12:00', close: '15:00' }] },
  thursday: { closed: false, intervals: [{ open: '12:00', close: '15:00' }] },
  friday: { closed: false, intervals: [{ open: '12:00', close: '15:00' }] },
  saturday: { closed: false, intervals: [{ open: '12:00', close: '23:30' }] },
  sunday: { closed: false, intervals: [{ open: '12:00', close: '23:30' }] },
};

describe('the legacy opening-hours backfill', () => {
  it('writes a week this schema accepts', () => {
    const result = weeklyScheduleSchema.safeParse(AS_THE_SQL_WRITES_IT);

    expect(result.success).toBe(true);
  });

  it('spreads the two legacy strings the way they were meant', () => {
    const week = weeklyScheduleSchema.parse(AS_THE_SQL_WRITES_IT);

    // `weekdays` was Monday to Friday and `weekend` was Saturday and Sunday.
    // That is all those two strings ever meant, and all that can be recovered.
    const monday = week.monday;
    const saturday = week.saturday;
    if (monday?.closed !== false || saturday?.closed !== false) {
      throw new Error('both days should be open in this fixture');
    }
    expect(monday.intervals).toEqual([{ open: '12:00', close: '15:00' }]);
    expect(saturday.intervals).toEqual([{ open: '12:00', close: '23:30' }]);
  });

  /*
   * The mask destroyed split service at the moment of typing — `12:00 – 15:00 e
   * 19:00 – 23:00` was stored as `12:00 - 15:00` — so there is nothing on disk
   * to recover it from. One interval per day is the honest ceiling of what a
   * backfill can know, and the owner adds the second from the editor.
   */
  it('recovers one interval a day, because one is all the old shape held', () => {
    const week = weeklyScheduleSchema.parse(AS_THE_SQL_WRITES_IT);

    for (const day of Object.values(week)) {
      if (day && !day.closed) {
        expect(day.intervals).toHaveLength(1);
      }
    }
  });
});
