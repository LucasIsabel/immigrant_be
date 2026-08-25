-- CreateEnum
CREATE TYPE "PlaceCategory" AS ENUM ('LANDMARK', 'MUSEUM', 'NATURE', 'BEACH', 'VIEWPOINT', 'FOOD_MARKET', 'NIGHTLIFE', 'NEIGHBORHOOD');

-- CreateTable
CREATE TABLE "places" (
    "id" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "slug" VARCHAR(140) NOT NULL,
    "category" "PlaceCategory" NOT NULL,
    "country_code" VARCHAR(2) NOT NULL,
    "country_id" UUID,
    "city" VARCHAR(100) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "image_url" VARCHAR(300),
    "popularity_score" INTEGER NOT NULL DEFAULT 0,
    "is_free" BOOLEAN NOT NULL DEFAULT false,
    "address" VARCHAR(200),
    "website" VARCHAR(200),
    "source_url" VARCHAR(300),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "place_translations" (
    "id" UUID NOT NULL,
    "language" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tip" TEXT,
    "place_id" UUID NOT NULL,

    CONSTRAINT "place_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "places_country_code_city_is_active_idx" ON "places"("country_code", "city", "is_active");

-- CreateIndex
CREATE UNIQUE INDEX "places_country_code_city_slug_key" ON "places"("country_code", "city", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "place_translations_place_id_language_key" ON "place_translations"("place_id", "language");

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_translations" ADD CONSTRAINT "place_translations_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;
