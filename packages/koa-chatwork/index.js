// @flow
import SimpleOAuth2 from 'simple-oauth2';
import {
  tokenHost,
  tokenPath,
  authorizeHost,
  authorizePath,
} from '@eiel/chatwork-oauth';
import type { Middleware } from 'koa';

const auth = {
  tokenHost,
  tokenPath,
  authorizeHost,
  authorizePath,
};

type Client = {
  id: string,
  secret: string,
};

const createOAuth2 = (client: Client) =>
  SimpleOAuth2.create({
    auth,
    client,
  });

export const createAuthMiddleWare = (options: {
  scope: string[],
  oauth2: any, // SimpleOAuth2
}): Middleware => {
  const { scope, oauth2 } = options;
  const uri = oauth2.authorizationCode.authorizeURL({
    scope,
  });
  return async (ctx /* , next */) => ctx.redirect(uri);
};

const createKoaChatwork = (client: Client) => {
  const oauth2 = createOAuth2(client);
  return {
    AuthMiddleware: ({ scope }: { scope: string[] }) =>
      createAuthMiddleWare({ scope, oauth2 }),
  };
};
export default createKoaChatwork;
