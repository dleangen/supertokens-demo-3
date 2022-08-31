import {TypeInput} from 'supertokens-node/types';
import {createNewSession} from './auth/create-new-session-handler';
import {signOutPOST} from './auth/sign-out-handler';
import {apiDomain, websiteDomain} from './config';
import Session from 'supertokens-node/recipe/session';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import {thirdPartySignInUpPOST} from './auth/third-party-signinup-handler';
const {Google, Github} = ThirdParty;
import Passwordless from 'supertokens-node/recipe/passwordless';

export const SuperTokensInitConfig: TypeInput = {
  framework: 'express',
  supertokens: {
    // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
    connectionURI: 'https://try.supertokens.com',
    apiKey: '<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>',
  },
  appInfo: {
    appName: 'SuperTokens SSO Demo',
    apiDomain,
    websiteDomain,
    websiteBasePath: '/signin',
    apiBasePath: '/',
    apiGatewayPath: '/supertokens-demo-20220805/us-central1/auth',
  },
  recipeList: [
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [
          // We have provided you with development keys which you can use for testing.
          // IMPORTANT: Please replace them with your own OAuth keys for production use.
          // eslint-disable-next-line new-cap
          Google({
            clientId: '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
            clientSecret: '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',
          }),
          // eslint-disable-next-line new-cap
          Github({
            clientId: '467101b197249757c71f',
            clientSecret: 'e97051221f4b6426e8fe8d51486396703012f5bd',
          }),
        ],
      },
      override: {
        apis: (originalImplementation) => {
          return {
            ...originalImplementation,
            thirdPartySignInUpPOST: thirdPartySignInUpPOST(originalImplementation),
          };
        },
      },
    }),

    Passwordless.init({
      flowType: 'USER_INPUT_CODE_AND_MAGIC_LINK',
      contactMethod: 'EMAIL',
    }),

    Session.init({
      override: {
        functions: function(originalImplementation) {
          return {
            ...originalImplementation,
            createNewSession: createNewSession(originalImplementation),
          };
        },
        apis: (originalImplementation) => {
          return {
            ...originalImplementation,
            signOutPOST: signOutPOST(originalImplementation),
          };
        },
      },
    }),
  ],
};
