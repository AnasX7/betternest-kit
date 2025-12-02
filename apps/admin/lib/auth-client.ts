import { polarClient } from '@polar-sh/better-auth';
import { createAuthClient } from 'better-auth/react';
import { nextCookies } from 'better-auth/next-js';
import { adminClient } from 'better-auth/client/plugins';

export const auth = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SERVER_URL!
      : 'http://localhost:3000',
  plugins: [nextCookies(), adminClient(), polarClient()],
});
