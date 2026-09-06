-- Give an itinerary report a way to be answered.
--
-- Until now the table only ever grew: `createReport` wrote a row and nothing in
-- the product ever read one. The admin queue this column serves lists
-- itineraries that carry at least one report nobody has decided about, and an
-- admin either unpublishes the itinerary or says the report does not stand.
--
-- Dismissing marks the row rather than deleting it. Deleting would take the
-- only trace that somebody complained, and the count of how many times an
-- itinerary has been reported *without* the reports standing up is exactly what
-- separates one person acting in bad faith from a pattern worth a second look.
--
-- Additive and nullable on purpose: the deploy runs migrations, so a column
-- that existing rows can leave empty is the only shape that is safe to ship
-- ahead of the code that writes it. Every row already in the table is
-- undecided, which is true — nobody has ever been able to decide.
ALTER TABLE "itinerary_reports" ADD COLUMN "dismissed_at" TIMESTAMP(3);

-- The queue: reports still awaiting a decision, newest first.
CREATE INDEX "itinerary_reports_dismissed_at_idx" ON "itinerary_reports"("dismissed_at");
