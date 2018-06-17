// @flow
import Koa from 'koa';
import KoaChatwork from '@eiel/koa-chatwork';

const app = new Koa();

const id = process.env.CHATWORK_OAUTH_CLIENT_ID;
if (!id) {
  throw new Error('undefiend environment variable CHATWORK_OAUTH_CLIENT_ID');
}
const secret = process.env.CHATWORK_OAUTH_CLIENT_SECRET;
if (!secret) {
  throw new Error(
    'undefiend environment variable CHATWORK_OAUTH_CLIENT_SECRET',
  );
}
const client = {
  id,
  secret,
};
const { AuthMiddleware } = KoaChatwork(client);
app.use(AuthMiddleware({ scope: ['users.profile.me:read'] }));

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3000);
