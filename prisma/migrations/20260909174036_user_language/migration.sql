-- The language somebody reads, so e-mail sent outside a request can use it.
--
-- Additive and defaulted, so every existing row gets `pt` without a backfill
-- step: that is the locale the unprefixed URLs serve and the one the product
-- is written for. Before this column, verification e-mail went out in
-- hardcoded English and approval and rejection in hardcoded Portuguese —
-- there was nothing to choose a language with.
ALTER TABLE "users" ADD COLUMN "language" TEXT NOT NULL DEFAULT 'pt';
