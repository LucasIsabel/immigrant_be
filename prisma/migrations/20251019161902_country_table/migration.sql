-- CreateTable
CREATE TABLE "country_descriptions" (
    "id" UUID NOT NULL,
    "language" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "country_id" UUID NOT NULL,

    CONSTRAINT "country_descriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "difficulty_score" INTEGER NOT NULL,
    "visa_options" TEXT[],
    "processing_time" TEXT NOT NULL,
    "investment_required" TEXT NOT NULL,
    "language_requirement" TEXT NOT NULL,
    "job_market" TEXT NOT NULL,
    "benefits" TEXT[],
    "challenges" TEXT[],
    "popular_cities" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "background_image" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "country_descriptions_country_id_language_key" ON "country_descriptions"("country_id", "language");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- AddForeignKey
ALTER TABLE "country_descriptions" ADD CONSTRAINT "country_descriptions_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
