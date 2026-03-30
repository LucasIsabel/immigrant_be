/*
  Warnings:

  - Added the required column `updated_at` to the `publisher_qualifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "publisher_qualifications" ADD COLUMN     "override_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "override_at" TIMESTAMP(3),
ADD COLUMN     "override_by" UUID,
ADD COLUMN     "override_reason" TEXT,
ADD COLUMN     "override_value" BOOLEAN,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "publisher_qualifications" ADD CONSTRAINT "publisher_qualifications_override_by_fkey" FOREIGN KEY ("override_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
