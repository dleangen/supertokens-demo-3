import {environments} from 'fx-common-lib';

export const environment = {
  ...environments.production,
  name: 'app1',
  mountpoint: 'app1.example.com',
  domain: '.example.com',
  isLocalhost: false,
  port: 4201,
};
