import {environments} from 'fx-common-lib';

export const environment = {
  ...environments.production,
  name: 'auth',
  mountpoint: 'auth.example.com',
  domain: '.example.com',
  isLocalhost: false,
  port: 4201,
};
