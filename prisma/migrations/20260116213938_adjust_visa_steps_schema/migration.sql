/*
  Warnings:

  - You are about to drop the column `visa_type_recommendation_id` on the `visa_steps` table. All the data in the column will be lost.
  - Added the required column `visa_type_id` to the `visa_steps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."visa_steps" DROP CONSTRAINT "visa_steps_visa_type_recommendation_id_fkey";

-- AlterTable
ALTER TABLE "visa_steps" DROP COLUMN "visa_type_recommendation_id",
ADD COLUMN     "visa_type_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "visa_steps" ADD CONSTRAINT "visa_steps_visa_type_id_fkey" FOREIGN KEY ("visa_type_id") REFERENCES "immigration_visa_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
