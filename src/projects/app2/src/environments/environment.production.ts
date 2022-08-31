import {environments} from 'fx-common-lib';

export const environment = {
  ...environments.production,
  name: 'app2',
  mountpoint: 'app2.example.com',
  domain: '.example.com',
  isLocalhost: false,
  port: 4202,
};
