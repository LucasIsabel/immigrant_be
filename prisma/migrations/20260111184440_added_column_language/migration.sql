/*
  Warnings:

  - Added the required column `language` to the `visa_type_recommendations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visa_type_recommendations" ADD COLUMN     "language" TEXT NOT NULL;
