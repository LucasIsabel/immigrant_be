-- CreateTable
CREATE TABLE "suggestions" (
    "id" UUID NOT NULL,
    "suggestions_answer" JSONB NOT NULL,
    "embeddings" vector (768),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suggestions_pkey" PRIMARY KEY ("id")
);
