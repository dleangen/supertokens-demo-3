import {firebaseDefaultConfig} from "./firebase-default-config";
import {superTokensLocalhostConfig} from "./supertokens-config";
import {localhostConfig} from "./localhost-config";

export const environment =  {
  production: false,
  useEmulators: true,
  firebase: firebaseDefaultConfig,
  supertokensConfig: superTokensLocalhostConfig,
  fx: {
    auth: {
      url: `http://localhost:${localhostConfig['auth'].port}`,
      signin: '/signin',
    },
    app1: {
      url: `http://localhost:${localhostConfig['app1'].port}`,
    },
    app2: {
      url: `http://localhost:${localhostConfig['app2'].port}`,
    },
    app3: {
      url: `http://localhost:${localhostConfig['app3'].port}`,
    },
  },
};
