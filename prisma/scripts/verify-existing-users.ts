/**
 * One-time script to mark all existing users as email-verified.
 * Run after enabling email verification to avoid locking out existing users.
 *
 * Usage: npx ts-node prisma/scripts/verify-existing-users.ts
 */
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.users.updateMany({
    where: { emailVerified: false },
    data: { emailVerified: true },
  });

  console.log(`Marked ${result.count} existing users as email-verified.`);
}

main()
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
