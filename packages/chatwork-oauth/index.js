// @flow
export const tokenHost = 'https://oauth.chatwork.com';
export const tokenPath = '/token';
export const authorizeHost = 'https://www.chatwork.com';
export const authorizePath = '/packages/oauth2/login.php';
export const scopes = [
  'users.all:read',
  'users.profile.me:read',
  'users.status.me:read',
  'users.tasks.me:read',
  'rooms.all:read_write',
  'rooms.all:read',
  'rooms.all:write',
  'rooms:write',
  'rooms.info:read',
  'rooms.info:write',
  'rooms.members:read',
  'rooms.members:write',
  'rooms.messages:read',
  'rooms.messages:write',
  'rooms.tasks:read',
  'rooms.tasks:write',
  'rooms.files:read',
  'contacts.all:read_write',
  'contacts.all:read',
  'contacts.all:write',
];
