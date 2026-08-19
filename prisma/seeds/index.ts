import { PrismaClient } from '../../generated/prisma';
import { seedAiModelConfigs } from './ai-model-config.seed';
import { seedCountries } from './countries.seed';
import { seedBlogCategories } from './blog-categories.seed';
import { seedBlogPersonas } from './blog-personas.seed';
import { seedVisaSteps } from './visa-steps';

const prisma = new PrismaClient();

async function main() {
  try {
    await seedCountries();
    // After the countries: the steps resolve their visa type by
    // (country name, category), so the types have to exist first.
    await seedVisaSteps();
    await seedBlogCategories();
    await seedAiModelConfigs();
    await seedBlogPersonas();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
