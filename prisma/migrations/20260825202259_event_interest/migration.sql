-- CreateTable
CREATE TABLE "event_interests" (
    "id" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "contact" VARCHAR(200) NOT NULL,
    "event_type" VARCHAR(80) NOT NULL,
    "country_code" VARCHAR(2) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "message" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_interests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "event_interests_country_code_city_idx" ON "event_interests"("country_code", "city");
