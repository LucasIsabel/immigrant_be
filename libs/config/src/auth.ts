import bcrypt from 'bcrypt';

import { PrismaClient } from '../../../generated/prisma';
import { betterAuth } from 'better-auth';
import { beforeSessionCreate } from './session-create';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { env } from './env';
import { sendEmail } from '@app/email/send-email';
import { buildResetPasswordEmail } from '@app/email/templates/reset-password.template';
import { buildVerificationEmail } from '@app/email/templates/verification.template';
import { extractResetTokenFromBetterAuthUrl } from './auth-reset-token.util';
import { localeOf } from './locale';

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
        localeOf(user),
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
        localeOf(user),
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
  user: {
    additionalFields: {
      /**
       * The language this person reads, sent by the front-end at sign-up and
       * whenever they switch it.
       *
       * Declaring it is not decoration: better-auth's adapter walks only the
       * declared schema and drops any key it does not know, going in and
       * coming out. Undeclared, a `language` in the sign-up body vanishes with
       * no error — which is how this column sat at its default for everyone
       * while the templates were already translated.
       *
       * No `defaultValue`, so the column's own `DEFAULT 'pt'` is the single
       * place that decides when nothing is sent. And no `transform`, though
       * normalising here would read better: a function in this position makes
       * the inferred type of `auth` reach for `@better-auth/core/db`, which
       * pnpm does not hoist and TypeScript cannot name (TS2742). Every reader
       * already passes the value through `resolveLocale`, so a forged request
       * can leave an odd string in the column but cannot reach a template with
       * it.
       */
      language: {
        type: 'string',
        required: false,
      },
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
        before: (session) => beforeSessionCreate(session, prisma),
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
