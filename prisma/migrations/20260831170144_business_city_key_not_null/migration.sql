-- A restrição vem separada do backfill de propósito: com `city_key` nulo um
-- negócio some da busca pública sem erro nenhum, e é melhor que uma escrita que
-- esqueça a coluna estoure na hora, alto e no lugar certo.
--
-- Segura porque a migration anterior preencheu toda a tabela.

/*
  Warnings:

  - Made the column `city_key` on table `businesses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "businesses" ALTER COLUMN "city_key" SET NOT NULL;
