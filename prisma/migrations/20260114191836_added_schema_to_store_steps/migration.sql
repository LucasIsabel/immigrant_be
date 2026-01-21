-- CreateTable
CREATE TABLE "visa_steps" (
    "id" UUID NOT NULL,
    "language" TEXT NOT NULL,
    "steps" JSONB NOT NULL DEFAULT '[]',
    "visa_type_recommendation_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visa_steps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "visa_steps" ADD CONSTRAINT "visa_steps_visa_type_recommendation_id_fkey" FOREIGN KEY ("visa_type_recommendation_id") REFERENCES "visa_type_recommendations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
