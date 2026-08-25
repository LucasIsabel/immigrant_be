-- CreateEnum
CREATE TYPE "PlaceReviewStatus" AS ENUM ('DRAFT', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CityIngestionStatus" AS ENUM ('PROCESSING', 'FAILED', 'READY_FOR_REVIEW', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "places" ADD COLUMN     "generated_by_model" TEXT,
ADD COLUMN     "generation_cost_usd" DECIMAL(10,6),
ADD COLUMN     "ingestion_id" UUID,
ADD COLUMN     "osm_id" BIGINT,
ADD COLUMN     "osm_type" VARCHAR(10),
ADD COLUMN     "review_status" "PlaceReviewStatus" NOT NULL DEFAULT 'APPROVED',
ADD COLUMN     "wikidata_id" VARCHAR(20),
ADD COLUMN     "wikipedia_monthly_views" INTEGER;

-- CreateTable
CREATE TABLE "city_ingestions" (
    "id" UUID NOT NULL,
    "country_code" VARCHAR(2) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "status" "CityIngestionStatus" NOT NULL DEFAULT 'PROCESSING',
    "step" VARCHAR(30),
    "error_message" TEXT,
    "osm_area_id" BIGINT,
    "osm_matched_name" VARCHAR(120),
    "stats" JSONB,
    "requested_by_id" UUID,
    "approved_at" TIMESTAMP(3),
    "approved_by_id" UUID,
    "rejected_at" TIMESTAMP(3),
    "rejected_by_id" UUID,
    "rejection_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "city_ingestions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "city_ingestions_country_code_city_idx" ON "city_ingestions"("country_code", "city");

-- CreateIndex
CREATE INDEX "city_ingestions_status_created_at_idx" ON "city_ingestions"("status", "created_at");

-- CreateIndex
CREATE INDEX "places_ingestion_id_review_status_idx" ON "places"("ingestion_id", "review_status");

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_ingestion_id_fkey" FOREIGN KEY ("ingestion_id") REFERENCES "city_ingestions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
