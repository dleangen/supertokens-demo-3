import {environments} from 'fx-common-lib';

export const environment = {
  ...environments.development,
  name: 'app2',
  mountpoint: 'app2.example.com',
  domain: '.example.com',
  isLocalhost: true,
  port: 4202,
  supertokens: environments.development.supertokensConfig('app2'),
};
