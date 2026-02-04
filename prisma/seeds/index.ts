import { PrismaClient } from '../../generated/prisma';
import { seedCountries } from './countries.seed';
import { seedVisaSteps } from './visa_steps.seed';

const prisma = new PrismaClient();

async function main() {
  try {
    await seedCountries();
    await seedVisaSteps();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
