-- CreateTable
CREATE TABLE "itineraries" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "slug" VARCHAR(160) NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "country_code" VARCHAR(2) NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itineraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_stops" (
    "id" UUID NOT NULL,
    "itinerary_id" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "place_id" UUID,
    "business_id" UUID,
    "city_key" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "itinerary_stops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_reports" (
    "id" UUID NOT NULL,
    "itinerary_id" UUID NOT NULL,
    "reason" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "itinerary_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "itineraries_slug_key" ON "itineraries"("slug");

-- CreateIndex
CREATE INDEX "itineraries_user_id_idx" ON "itineraries"("user_id");

-- CreateIndex
CREATE INDEX "itineraries_country_code_is_public_idx" ON "itineraries"("country_code", "is_public");

-- CreateIndex
CREATE INDEX "itinerary_stops_itinerary_id_position_idx" ON "itinerary_stops"("itinerary_id", "position");

-- CreateIndex
CREATE INDEX "itinerary_stops_city_key_idx" ON "itinerary_stops"("city_key");

-- CreateIndex
CREATE UNIQUE INDEX "itinerary_stops_itinerary_id_place_id_key" ON "itinerary_stops"("itinerary_id", "place_id");

-- CreateIndex
CREATE UNIQUE INDEX "itinerary_stops_itinerary_id_business_id_key" ON "itinerary_stops"("itinerary_id", "business_id");

-- CreateIndex
CREATE INDEX "itinerary_reports_itinerary_id_idx" ON "itinerary_reports"("itinerary_id");

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_stops" ADD CONSTRAINT "itinerary_stops_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "itineraries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_stops" ADD CONSTRAINT "itinerary_stops_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_stops" ADD CONSTRAINT "itinerary_stops_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_reports" ADD CONSTRAINT "itinerary_reports_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "itineraries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Exactly one target per stop.
--
-- Written by hand because Prisma cannot express a constraint that spans two
-- columns. Without it the schema would allow a stop that points at nothing and
-- a stop that points at both a place and a business, and every read would have
-- to carry the branch. `num_nonnulls` counts the arguments that are not NULL.
ALTER TABLE "itinerary_stops" ADD CONSTRAINT "itinerary_stops_exactly_one_target"
  CHECK (num_nonnulls("place_id", "business_id") = 1);
