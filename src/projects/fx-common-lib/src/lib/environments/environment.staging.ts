import {firebaseDefaultConfig} from "./firebase-default-config";
import {superTokensConfig} from "./supertokens-config";

export const environment = {
  production: false,
  useEmulators: false,
  firebase: firebaseDefaultConfig,
  supertokens: {
    appInfo: {
      ...superTokensConfig['appInfo'],
      apiDomain: 'http://localhost:5001',
      websiteDomain: 'http://localhost:4200',
    },
  },
  fx: {
    auth: {
      url: 'http://auth.example-staging.com',
    },
    app1: {
      url: 'http://app1.example-staging.com',
    },
    app2: {
      url: 'http://app2.example-staging.com',
    },
    app3: {
      url: 'http://app3.example-staging.com',
    },
  },
};
