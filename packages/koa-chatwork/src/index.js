// @flow
import type { Middleware } from 'koa';
import { createAuthMiddleware } from './createAuthMiddleware';
import { createOAuth2 } from './simple-oauth2';
import type { Client } from './client';

const defaultOptions = {
  signinPath: '/chatwork/auth',
  scope: ['users.profile.me:read'],
};

type Options = {
  scope?: string[],
  signinPath?: string,
  client: Client,
};

const createKoaChatwork = (_options: Options): Middleware => {
  const options = { ..._options, ...defaultOptions };
  const oauth2 = createOAuth2(options.client);
  const AuthMiddleware = createAuthMiddleware({ scope: options.scope, oauth2 });
  return (ctx, next) => {
    if (ctx.path === options.signinPath) {
      return AuthMiddleware(ctx, async () => {});
    }
    return next();
  };
};

export default createKoaChatwork;
