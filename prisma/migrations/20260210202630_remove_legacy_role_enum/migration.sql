-- AlterTable
ALTER TABLE "users" DROP COLUMN "roles";

-- DropEnum
DROP TYPE "public"."UserRole";
