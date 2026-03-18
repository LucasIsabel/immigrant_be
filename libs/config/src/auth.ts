import bcrypt from 'bcrypt';

import { PrismaClient } from '../../../generated/prisma';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { env } from './env';
import { sendEmail } from '@app/email/send-email';
import { buildResetPasswordEmail } from '@app/email/templates/reset-password.template';
import { buildVerificationEmail } from '@app/email/templates/verification.template';
import { extractResetTokenFromBetterAuthUrl } from './auth-reset-token.util';

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
    autoSignIn: false,
    requireEmailVerification: true,
    password: {
      hash: (password: string) => bcrypt.hash(password, 10),
      verify: ({ password, hash }: { password: string; hash: string }) =>
        bcrypt.compare(password, hash),
    },
    sendResetPassword: async ({ user, url, token }) => {
      const resetToken = extractResetTokenFromBetterAuthUrl(url, token);

      if (!resetToken) {
        console.error(
          '[auth] Failed to extract reset password token from Better Auth URL. Email will not be sent.',
        );
        return;
      }

      const resetUrl = new URL('/reset-password', env.FRONTEND_URL);
      resetUrl.searchParams.set('token', resetToken);

      const { subject, html } = buildResetPasswordEmail(
        'en',
        resetUrl.toString(),
        user.name,
      );
      await sendEmail({ to: user.email, subject, html });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const verificationUrl = new URL(url);
      verificationUrl.searchParams.set(
        'callbackURL',
        `${env.FRONTEND_URL}/verify-email?verified=true`,
      );
      const { subject, html } = buildVerificationEmail(
        'en',
        verificationUrl.toString(),
        user.name,
      );
      await sendEmail({ to: user.email, subject, html });
    },
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
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
    crossSubDomainCookies: {
      enabled: env.NODE_ENV === 'production',
      additionalCookies: ['better-auth.session_token'],
      domain: '.immigrantmatch.com',
    },
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    },
  },
});
