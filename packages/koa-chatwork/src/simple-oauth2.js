import SimpleOAuth2 from 'simple-oauth2';
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

export const createOAuth2 = (client: Client) =>
  SimpleOAuth2.create({
    auth,
    client,
  });

export default createOAuth2;
