import type { ContractRouterClient } from '@orpc/contract';
import { createORPCClient, onError } from '@orpc/client';
import { OpenAPILink } from '@orpc/openapi-client/fetch';
import { ResponseValidationPlugin } from '@orpc/contract/plugins';
import { contract } from '@repo/api';

const link = new OpenAPILink(contract, {
  url: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000',
  fetch: (request, init) => {
    return globalThis.fetch(request, {
      ...init,
      credentials: 'include', // Include cookies for cross-origin requests
    });
  },
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
  plugins: [new ResponseValidationPlugin(contract)],
});

const client: ContractRouterClient<typeof contract> = createORPCClient(link);

export const api = client;
