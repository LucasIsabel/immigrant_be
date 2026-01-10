-- CreateTable
CREATE TABLE "visa_type_recommendations" (
    "id" UUID NOT NULL,
    "country_id" UUID NOT NULL,
    "gemini_response" JSONB NOT NULL,
    "embeddings" vector(768),
    "user_details" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visa_type_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "visa_type_recommendations_country_id_idx" ON "visa_type_recommendations"("country_id");

-- AddForeignKey
ALTER TABLE "visa_type_recommendations" ADD CONSTRAINT "visa_type_recommendations_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
