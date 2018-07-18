// @flow
import { parse as urlParse } from 'url';
import type { Middleware } from 'koa';

export const createCallbackMiddleware = ({ oauth2 }): Middleware => async (
  ctx,
  next,
) => {
  const url = urlParse(ctx.url, true);
  if (!url.query) {
    ctx.throw(400);
    return;
  }
  if (!url.query.code) {
    ctx.throw(400);
    return;
  }
  const tokenConfig = {
    code: url.query.code,
  };
  const result = await oauth2.authorizationCode.getToken(tokenConfig);
  const accessToken = oauth2.accessToken.create(result);
  ctx.redirect('/');
  return next();
};

export default createCallbackMiddleware;
