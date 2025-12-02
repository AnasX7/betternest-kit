import * as dotenv from 'dotenv';
import { betterAuth } from 'better-auth';
import { admin, openAPI } from 'better-auth/plugins';
import { checkout, polar, portal } from '@polar-sh/better-auth';
import { expo } from '@better-auth/expo';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@repo/db';
import { polarClient } from './lib/payment.js';

dotenv.config({
  path: '../../../apps/server/.env',
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  trustedOrigins: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : [],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
  plugins: [
    admin(),
    openAPI(),
    expo(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      enableCustomerPortal: true,
      use: [
        checkout({
          products: [
            {
              productId: '724c80c3-dd00-4038-a2fa-df9642863f44',
              slug: 'pro',
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true,
        }),
        portal(),
      ],
    }),
  ],
});
