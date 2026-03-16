-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "email_notifications_enabled" BOOLEAN NOT NULL DEFAULT true;
