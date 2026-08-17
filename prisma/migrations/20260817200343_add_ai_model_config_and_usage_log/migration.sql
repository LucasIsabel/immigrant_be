-- CreateTable
CREATE TABLE "ai_model_configs" (
    "id" UUID NOT NULL,
    "scenario" TEXT NOT NULL,
    "primary_model" TEXT NOT NULL,
    "fallback_models" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_model_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_usage_logs" (
    "id" UUID NOT NULL,
    "scenario" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "input_tokens" INTEGER,
    "output_tokens" INTEGER,
    "cost_usd" DECIMAL(10,6),
    "entity_type" TEXT,
    "entity_id" UUID,
    "error_kind" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_usage_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_model_configs_scenario_key" ON "ai_model_configs"("scenario");

-- CreateIndex
CREATE INDEX "ai_usage_logs_scenario_created_at_idx" ON "ai_usage_logs"("scenario", "created_at");

-- CreateIndex
CREATE INDEX "ai_usage_logs_created_at_idx" ON "ai_usage_logs"("created_at");
