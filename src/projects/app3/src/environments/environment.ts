import {environments} from 'fx-common-lib';

export const environment = {
  ...environments.development,
  name: 'app3',
  mountpoint: 'app3.example.com',
  domain: '.example.com',
  isLocalhost: true,
  port: 4203,
  supertokens: environments.development.supertokensConfig('app3'),
};
