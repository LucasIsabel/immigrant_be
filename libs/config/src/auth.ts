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

const corsOrigins = env.CORS_ORIGINS.split(',')
  .map((o) => o.trim())
  .filter(Boolean);

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
      try {
        await sendEmail({ to: user.email, subject, html });
      } catch (error) {
        console.error(
          '[auth] Failed to send reset password email to',
          user.email,
          error,
        );
      }
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
      try {
        await sendEmail({ to: user.email, subject, html });
      } catch (error) {
        console.error(
          '[auth] Failed to send verification email to',
          user.email,
          error,
        );
      }
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
    user: {
      create: {
        after: async (user) => {
          const defaultRole = await prisma.roles.findUnique({
            where: { name: 'user' },
          });
          if (!defaultRole) {
            console.error(
              '[auth] Default role "user" not found. Skipping role assignment for user',
              user.id,
            );
            return;
          }
          await prisma.userRoles.create({
            data: { userId: user.id, roleId: defaultRole.id },
          });
        },
      },
    },
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
    crossSubDomainCookies: env.COOKIE_DOMAIN
      ? {
          enabled: true,
          additionalCookies: ['better-auth.session_token'],
          domain: env.COOKIE_DOMAIN,
        }
      : { enabled: false },
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    },
  },
});
