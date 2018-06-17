import type { Middleware } from 'koa';

export const createAuthMiddleware = (options: {
  scope: string[],
  oauth2: any, // SimpleOAuth2
}): Middleware => {
  const { scope, oauth2 } = options;
  const uri = oauth2.authorizationCode.authorizeURL({
    scope,
  });
  return async (ctx /* , next */) => ctx.redirect(uri);
};

export default createAuthMiddleware;
