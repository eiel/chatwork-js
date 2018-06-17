// @flow
import { createAuthMiddleware } from './createAuthMiddleware';
import { createOAuth2 } from './simple-oauth2';
import type { Client } from './client';

const createKoaChatwork = (client: Client) => {
  const oauth2 = createOAuth2(client);
  return {
    AuthMiddleware: ({ scope }: { scope: string[] }) =>
      createAuthMiddleware({ scope, oauth2 }),
  };
};
export default createKoaChatwork;
