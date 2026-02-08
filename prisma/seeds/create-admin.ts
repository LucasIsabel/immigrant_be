import { PrismaClient } from '../../generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@immigrant.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  // Verificar se já existe
  const existing = await prisma.users.findUnique({
    where: { email: adminEmail },
  });

  if (existing) {
    console.log(`Admin user ${adminEmail} already exists`);

    // Atualizar para admin se não for
    if (existing.role !== 'admin') {
      await prisma.users.update({
        where: { id: existing.id },
        data: { role: 'admin' },
      });
      console.log(`Updated ${adminEmail} to admin role`);
    }
    return;
  }

  // Criar novo admin
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const user = await prisma.users.create({
    data: {
      email: adminEmail,
      name: 'Administrator',
      role: 'admin',
      emailVerified: true,
    },
  });

  await prisma.accounts.create({
    data: {
      userId: user.id,
      accountId: user.id,
      providerId: 'credential',
      password: hashedPassword,
    },
  });

  console.log(`✅ Admin user created: ${adminEmail}`);
  console.log(`Password: ${adminPassword}`);
  console.log('⚠️  Change password after first login!');
}

createAdmin()
  .catch((error) => {
    console.error('Error creating admin:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
