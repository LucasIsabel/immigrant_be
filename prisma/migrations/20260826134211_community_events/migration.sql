-- CreateEnum
CREATE TYPE "CommunityEventStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CommunityEventCategory" AS ENUM ('CONCERT', 'FAIR', 'MEETUP', 'WORKSHOP', 'EXHIBITION', 'SPORTS', 'FOOD', 'OTHER');

-- CreateTable
CREATE TABLE "community_events" (
    "id" UUID NOT NULL,
    "organizer_id" UUID NOT NULL,
    "slug" VARCHAR(160) NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "category" "CommunityEventCategory" NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3),
    "timezone" VARCHAR(64) NOT NULL,
    "country_code" VARCHAR(2) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "venue_name" VARCHAR(120) NOT NULL,
    "venue_address" VARCHAR(200) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "business_id" UUID,
    "contact_email" VARCHAR(100),
    "contact_phone" VARCHAR(20),
    "is_free" BOOLEAN NOT NULL DEFAULT true,
    "price_note" VARCHAR(80),
    "external_url" VARCHAR(300),
    "min_age" INTEGER,
    "terms_version" VARCHAR(20) NOT NULL,
    "terms_accepted_at" TIMESTAMP(3) NOT NULL,
    "status" "CommunityEventStatus" NOT NULL DEFAULT 'DRAFT',
    "submitted_at" TIMESTAMP(3),
    "approved_at" TIMESTAMP(3),
    "approved_by" UUID,
    "rejected_at" TIMESTAMP(3),
    "rejected_by" UUID,
    "rejection_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "community_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_event_reports" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "reason" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "community_event_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "community_events_slug_key" ON "community_events"("slug");

-- CreateIndex
CREATE INDEX "community_events_country_code_city_status_starts_at_idx" ON "community_events"("country_code", "city", "status", "starts_at");

-- CreateIndex
CREATE INDEX "community_events_organizer_id_idx" ON "community_events"("organizer_id");

-- CreateIndex
CREATE INDEX "community_event_reports_event_id_idx" ON "community_event_reports"("event_id");

-- AddForeignKey
ALTER TABLE "community_events" ADD CONSTRAINT "community_events_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_events" ADD CONSTRAINT "community_events_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_events" ADD CONSTRAINT "community_events_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_events" ADD CONSTRAINT "community_events_rejected_by_fkey" FOREIGN KEY ("rejected_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_event_reports" ADD CONSTRAINT "community_event_reports_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "community_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
