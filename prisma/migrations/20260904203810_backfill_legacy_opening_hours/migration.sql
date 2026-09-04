-- Carry the legacy opening hours into the structured column.
--
-- The columns were added in `business_opening_hours_and_timezone` with nothing
-- written into them, so every business that existed before it kept an empty
-- week — and `getOpenStatus` answers `unknown` without a schedule, which means
-- the badge never appeared for any of them. The feature shipped and did
-- nothing.
--
-- The old hours are two free-text strings living in the *page* content
-- (`business_pages.approved_content->'openingHours'`), not on the business, and
-- a mask forced them into exactly `HH:MM - HH:MM` — which is what makes this
-- parseable at all. Anything that does not match that shape is left alone
-- rather than guessed at: a row this cannot read keeps a NULL week and the
-- owner fills it in, which is honest, where a wrong guess would be a lie the
-- page states with confidence.
--
-- `weekdays` becomes Monday through Friday and `weekend` becomes Saturday and
-- Sunday, which is exactly what the two strings meant. The split-service case
-- the new shape exists for cannot be recovered here: the mask destroyed it at
-- the moment of typing, and there is nothing on disk to recover it from.
--
-- Approved content is preferred and pending is the fallback. Hours are fact,
-- not editorial — moving them out of the moderated content is precisely why
-- correcting one no longer needs re-moderation — so the owner's latest stated
-- fact is better than none.
--
-- Only rows where `opening_hours IS NULL` are touched, so this is idempotent
-- and cannot overwrite anything written since.
WITH legacy AS (
  SELECT
    b.id,
    COALESCE(
      p.approved_content->'openingHours'->>'weekdays',
      p.pending_content->'openingHours'->>'weekdays'
    ) AS week_text,
    COALESCE(
      p.approved_content->'openingHours'->>'weekend',
      p.pending_content->'openingHours'->>'weekend'
    ) AS weekend_text
  FROM businesses b
  JOIN business_pages p ON p.business_id = b.id
  WHERE b.opening_hours IS NULL
),
parsed AS (
  SELECT
    id,
    substring(week_text    from '^\s*([0-2][0-9]:[0-5][0-9])\s*[-–]\s*[0-2][0-9]:[0-5][0-9]\s*$') AS week_open,
    substring(week_text    from '^\s*[0-2][0-9]:[0-5][0-9]\s*[-–]\s*([0-2][0-9]:[0-5][0-9])\s*$') AS week_close,
    substring(weekend_text from '^\s*([0-2][0-9]:[0-5][0-9])\s*[-–]\s*[0-2][0-9]:[0-5][0-9]\s*$') AS weekend_open,
    substring(weekend_text from '^\s*[0-2][0-9]:[0-5][0-9]\s*[-–]\s*([0-2][0-9]:[0-5][0-9])\s*$') AS weekend_close
  FROM legacy
),
built AS (
  SELECT
    id,
    COALESCE((
      SELECT jsonb_object_agg(day, jsonb_build_object(
        'closed', false,
        'intervals', jsonb_build_array(jsonb_build_object('open', week_open, 'close', week_close))
      ))
      FROM unnest(ARRAY['monday','tuesday','wednesday','thursday','friday']) AS day
      WHERE week_open IS NOT NULL
    ), '{}'::jsonb)
    ||
    COALESCE((
      SELECT jsonb_object_agg(day, jsonb_build_object(
        'closed', false,
        'intervals', jsonb_build_array(jsonb_build_object('open', weekend_open, 'close', weekend_close))
      ))
      FROM unnest(ARRAY['saturday','sunday']) AS day
      WHERE weekend_open IS NOT NULL
    ), '{}'::jsonb) AS week
  FROM parsed
)
UPDATE businesses b
SET opening_hours = built.week
FROM built
WHERE built.id = b.id
  AND b.opening_hours IS NULL
  -- An empty object would be a week that says nothing while looking answered:
  -- `getOpenStatus` would stop returning `unknown` and start returning
  -- `closed` for every day, which is the badge lying rather than staying quiet.
  AND built.week <> '{}'::jsonb;
