-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "city_key" VARCHAR(100);

-- CreateIndex
CREATE INDEX "businesses_city_key_is_public_idx" ON "businesses"("city_key", "is_public");

-- Backfill: a mesma normalização que `normalizeCity` faz no repositório, dita
-- em SQL porque a coluna tem de nascer preenchida — uma linha com `city_key`
-- nulo é um negócio que a busca pública deixa de encontrar.
--
-- `translate` em vez de `unaccent`: a extensão não está instalada neste
-- servidor, e instalar uma extensão para um backfill de uma linha seria trocar
-- um problema pequeno por uma dependência permanente. O mapa abaixo foi gerado
-- a partir do próprio Unicode, não digitado à mão.
UPDATE "businesses"
SET "city_key" = lower(
  regexp_replace(
    btrim(translate("city", 'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüýÿĀāĂăĄąĆćĈĉĊċČčĎďĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĨĩĪīĬĭĮįİĴĵĶķĹĺĻļĽľŃńŅņŇňŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž', 'AAAAAACEEEEIIIINOOOOOUUUUYaaaaaaceeeeiiiinooooouuuuyyAaAaAaCcCcCcCcDdEeEeEeEeEeGgGgGgGgHhIiIiIiIiIJjKkLlLlLlNnNnNnOoOoOoRrRrRrSsSsSsSsTtTtUuUuUuUuUuUuWwYyYZzZzZz')),
    '\s+', ' ', 'g'
  )
)
WHERE "city" IS NOT NULL;
