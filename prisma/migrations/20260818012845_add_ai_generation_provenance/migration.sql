-- AlterTable
ALTER TABLE "blog_post_translations" ADD COLUMN     "translated_by_model" TEXT;

-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "generated_by_model" TEXT,
ADD COLUMN     "generation_cost_usd" DECIMAL(10,6);
