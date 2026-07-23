import bcrypt from 'bcrypt';

import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const ADMIN_EMAIL = requireEnv('ADMIN_EMAIL');
const ADMIN_PASSWORD = requireEnv('ADMIN_PASSWORD');
const ADMIN_NAME = requireEnv('ADMIN_NAME');

/**
 * Garante que as roles informadas existam e estejam vinculadas ao usuário.
 * Idempotente: cria a role se faltar e ignora vínculos já existentes.
 */
async function ensureRoles(userId: string, roleNames: string[]) {
  for (const name of roleNames) {
    const role = await prisma.roles.upsert({
      where: { name },
      update: {},
      create: {
        name,
        description:
          name === 'admin' ? 'Administrator role' : 'Default user role',
      },
    });

    await prisma.userRoles.upsert({
      where: { userId_roleId: { userId, roleId: role.id } },
      update: {},
      create: { userId, roleId: role.id },
    });
  }
}

async function createAdmin() {
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const existing = await prisma.users.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existing) {
    console.log(`Admin user ${ADMIN_EMAIL} already exists`);
    await ensureRoles(existing.id, ['user', 'admin']);

    // Garante que exista uma conta de credencial com a senha definida.
    const credentialAccount = await prisma.accounts.findFirst({
      where: { userId: existing.id, providerId: 'credential' },
    });

    if (credentialAccount) {
      await prisma.accounts.update({
        where: { id: credentialAccount.id },
        data: { password: hashedPassword },
      });
    } else {
      await prisma.accounts.create({
        data: {
          userId: existing.id,
          accountId: existing.id,
          providerId: 'credential',
          password: hashedPassword,
        },
      });
    }

    console.log(`✅ Admin roles/credentials ensured for ${ADMIN_EMAIL}`);
    return;
  }

  const user = await prisma.users.create({
    data: {
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
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

  await ensureRoles(user.id, ['user', 'admin']);

  console.log(`✅ Admin user created: ${ADMIN_EMAIL}`);
  console.log(`Password: ${ADMIN_PASSWORD}`);
  console.log('⚠️  Change password after first login!');
}

createAdmin()
  .catch((error) => {
    console.error('Error creating admin:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
