-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "BlogPersonaTheme" ADD VALUE 'CUISINE';
ALTER TYPE "BlogPersonaTheme" ADD VALUE 'GEOPOLITICS';

-- AlterTable
ALTER TABLE "blog_personas" ADD COLUMN     "tagline" VARCHAR(120);

-- Backfill the taglines of the personas the seed already created. The seed only
-- creates what is missing, so it would never fill this column on an existing
-- install; without the backfill the newsroom dropdown would show the three
-- original columnists with an empty parenthesis.
UPDATE "blog_personas" SET "tagline" = 'Imigração: política restritiva' WHERE "slug" = 'helena-vargas' AND "tagline" IS NULL;
UPDATE "blog_personas" SET "tagline" = 'Imigração: política progressista' WHERE "slug" = 'sofia-ribeiro' AND "tagline" IS NULL;
UPDATE "blog_personas" SET "tagline" = 'Viagem: cultura, bairros e o lado prático' WHERE "slug" = 'luca-moretti' AND "tagline" IS NULL;
