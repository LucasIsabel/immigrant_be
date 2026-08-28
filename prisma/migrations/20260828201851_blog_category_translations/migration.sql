-- AlterTable
ALTER TABLE "blog_categories" ADD COLUMN     "original_locale" VARCHAR(5) NOT NULL DEFAULT 'pt';

-- CreateTable
CREATE TABLE "blog_category_translations" (
    "id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "locale" VARCHAR(5) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "translated_by" TEXT NOT NULL DEFAULT 'AI',
    "translated_by_model" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_category_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "blog_category_translations_category_id_idx" ON "blog_category_translations"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "blog_category_translations_category_id_locale_key" ON "blog_category_translations"("category_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "blog_category_translations_locale_slug_key" ON "blog_category_translations"("locale", "slug");

-- AddForeignKey
ALTER TABLE "blog_category_translations" ADD CONSTRAINT "blog_category_translations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "blog_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
