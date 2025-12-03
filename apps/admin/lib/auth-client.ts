// import { polarClient } from '@polar-sh/better-auth';
import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';
import { polarClient } from '@/lib/polar-client';

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SERVER_URL!
      : 'http://localhost:3000',
  plugins: [adminClient(), polarClient()],
});
