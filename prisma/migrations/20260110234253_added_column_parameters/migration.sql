/*
  Warnings:

  - Added the required column `parameters` to the `suggestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parameters` to the `visa_type_recommendations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "suggestions" ADD COLUMN     "parameters" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "visa_type_recommendations" ADD COLUMN     "parameters" JSONB NOT NULL;
