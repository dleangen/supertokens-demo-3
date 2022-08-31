import {environments} from 'fx-common-lib';

export const environment = {
  ...environments.development,
  name: 'auth',
  mountpoint: 'localhost:4200',
  domain: 'localhost',
  isLocalhost: true,
  port: 4201,
  supertokens: environments.development.supertokensConfig('auth'),
};
