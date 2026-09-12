-- CreateEnum
CREATE TYPE "CityIngestionScope" AS ENUM ('CITY', 'COUNTRY');

-- AlterTable
ALTER TABLE "city_ingestions" ADD COLUMN     "categories" "PlaceCategory"[] DEFAULT ARRAY[]::"PlaceCategory"[],
ADD COLUMN     "scope" "CityIngestionScope" NOT NULL DEFAULT 'CITY';
