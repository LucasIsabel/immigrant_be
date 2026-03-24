-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('RESTAURANT', 'LEGAL', 'TOUR_GUIDE', 'GENERAL');

-- CreateTable
CREATE TABLE "businesses" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "business_type" "BusinessType" NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "address" VARCHAR(200),
    "city" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100),
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "phone" VARCHAR(20),
    "email" VARCHAR(100),
    "website" VARCHAR(200),
    "photos" TEXT[],
    "type_data" JSONB,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "businesses_user_id_idx" ON "businesses"("user_id");

-- CreateIndex
CREATE INDEX "businesses_business_type_is_public_idx" ON "businesses"("business_type", "is_public");

-- CreateIndex
CREATE INDEX "businesses_city_is_public_idx" ON "businesses"("city", "is_public");

-- AddForeignKey
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
