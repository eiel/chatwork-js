import SimpleOAuth2 from 'simple-oauth2';
import querystring from 'querystring';
import Wreck from 'wreck';
import {
  tokenHost,
  tokenPath,
  authorizeHost,
  authorizePath,
} from '@eiel/chatwork-oauth';
import type { Client } from './client';

const auth = {
  tokenHost,
  tokenPath,
  authorizeHost,
  authorizePath,
};

const defaultHeaders = {
  Accept: 'application/json',
};
const wreck = Wreck.defaults({ baseUrl: tokenHost, headers: defaultHeaders });

/* replace original getToken */
const getToken = ({ id, secret }: Client) => (params) => {
  const credentials = `${id}:${secret}`;
  const token = Buffer.from(credentials).toString('base64');
  const Authorization = `Basic ${token}`;
  const payload = querystring.stringify({
    grant_type: 'authorization_code',
    ...params,
  });
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization,
  };
  return wreck
    .post(auth.tokenPath, { headers, payload })
    .then((result) => JSON.parse(result.payload.toString()));
};

export const createOAuth2 = (client: Client) => {
  const oauth2 = SimpleOAuth2.create({
    auth,
    client,
  });
  oauth2.authorizationCode.getToken = getToken(client);
  return oauth2;
};

export default createOAuth2;
