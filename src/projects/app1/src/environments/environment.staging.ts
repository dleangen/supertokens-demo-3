import {environments} from 'fx-common-lib';

export const environment = {
  ...environments.staging,
  name: 'app1',
  mountpoint: 'app1.example.com',
  domain: '.example.com',
  isLocalhost: false,
  port: 4201,
};
