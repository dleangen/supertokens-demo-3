import {environments} from 'fx-common-lib';

export const environment = {
  ...environments.staging,
  name: 'app3',
  mountpoint: 'app3.example.com',
  domain: '.example.com',
  isLocalhost: false,
  port: 4203,
};
