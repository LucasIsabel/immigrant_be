import bcrypt from 'bcrypt';

import { PrismaClient } from '../../../generated/prisma';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { env } from './env';

const prisma = new PrismaClient();

const corsOrigins = env.CORS_ORIGINS.split(',');

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
    usePlural: true,
    debugLogs: env.NODE_ENV === 'development',
  }),
  origin: corsOrigins,
  allowedHeaders: ['Content-Type', 'Authorization'],
  allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedOrigins: corsOrigins,
  trustedOrigins: corsOrigins,
  allowedCredentials: true,
  basePath: '/api/v1/auth',
  secret: env.PRIVATE_KEY,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    password: {
      hash: (password: string) => bcrypt.hash(password, 10),
      verify: ({ password, hash }: { password: string; hash: string }) =>
        bcrypt.compare(password, hash),
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
    additionalFields: {
      roles: {
        type: 'string',
        defaultValue: '[]',
      },
    },
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const userRoles = await prisma.userRoles.findMany({
            where: { userId: session.userId },
            select: { role: { select: { name: true } } },
          });
          const roleNames = userRoles.map((ur) => ur.role.name);
          return {
            data: { ...session, roles: JSON.stringify(roleNames) },
          };
        },
      },
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
});
