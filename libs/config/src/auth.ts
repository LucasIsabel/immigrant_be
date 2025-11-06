import bcrypt from 'bcrypt';

import { PrismaClient } from '../../../generated/prisma';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
    usePlural: true,
    debugLogs: process.env.NODE_ENV === 'development',
  }),
  origin: ['http://localhost:3000'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedOrigins: ['http://localhost:3000', 'http://localhost:3001'],
  trustedOrigins: ['http://localhost:3000', 'http://localhost:3001'],
  allowedCredentials: true,
  basePath: '/api/v1/auth',
  secret: process.env.PRIVATE_KEY,
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
      maxAge: 60 * 5, // 7 days
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
});
