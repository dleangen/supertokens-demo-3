import {environments} from 'fx-common-lib';

export const environment = {
  ...environments.production,
  name: 'app3',
  mountpoint: 'app3.example.com',
  domain: '.example.com',
  isLocalhost: false,
  port: 4203,
};
