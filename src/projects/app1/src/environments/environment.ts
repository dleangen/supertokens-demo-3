import {environments} from 'fx-common-lib';

export const environment = {
  ...environments.development,
  name: 'app1',
  mountpoint: 'app1.example.com',
  domain: '.example.com',
  isLocalhost: true,
  port: 4201,
  supertokens: environments.development.supertokensConfig('app1'),
};
