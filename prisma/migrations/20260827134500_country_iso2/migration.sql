-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "iso2" VARCHAR(2);

-- CreateIndex
CREATE UNIQUE INDEX "countries_iso2_key" ON "countries"("iso2");
