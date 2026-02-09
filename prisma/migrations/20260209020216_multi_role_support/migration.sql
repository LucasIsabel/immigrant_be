-- AlterTable: Convert single role to roles array
-- Step 1: Add the new roles column with default
ALTER TABLE "users" ADD COLUMN "roles" "UserRole"[] NOT NULL DEFAULT ARRAY['user']::"UserRole"[];

-- Step 2: Copy existing role data into the new array column
UPDATE "users" SET "roles" = ARRAY["role"];

-- Step 3: Drop the old single-value column
ALTER TABLE "users" DROP COLUMN "role";
