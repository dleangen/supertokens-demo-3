import { Injectable } from '@angular/core';
import * as SuperTokens from "supertokens-auth-react";
import {environment} from "../../environments/environment";
import {ManageRedirectStateService} from "fx-common-lib";
import * as Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import ThirdPartySignInAndUpProvidersForm_Override from "../components/signin/thirdparty-form-override";
import ThirdPartySignInAndUpCallbackTheme_Override from "../components/signin/thirdparty-spinner-override";

const {Github, Google} = ThirdParty;

@Injectable({
  providedIn: 'root'
})
export class InitializeSuperTokensUiService {

constructor(private redirect: ManageRedirectStateService) {
    SuperTokens.init({
      appInfo: environment.supertokens['appInfo'],
      recipeList: [
        ThirdParty.init({
          signInAndUpFeature: {
            termsOfServiceLink: "https://example.com/terms-of-service",
            privacyPolicyLink: "https://example.com/privacy-policy",
            providers: [Github.init(), Google.init()],
          },
          emailVerificationFeature: {
            mode: "REQUIRED",
          },
          onHandleEvent: (context) => {
            if (context.action === "SUCCESS") {
              if (redirect.exists()) {
                const redirectTo = redirect.get();
                redirect.purge();
                window.location.href = redirectTo;
              }
            }
          },
          override: {
            components: {
              ThirdPartySignInAndUpProvidersForm_Override,
              ThirdPartySignInAndUpCallbackTheme_Override,
            },
            // emailVerification: {
            //   components: {
            //     // Please refer to Overriding email verification components below
            //   },
            },
        }),

        Passwordless.init({
          contactMethod: 'EMAIL',
          signInUpFeature: {
            termsOfServiceLink: "https://example.com/terms-of-service",
            privacyPolicyLink: "https://example.com/privacy-policy"
          }
        }),

        Session.init({ sessionScope: environment.domain }),
      ],
    });
  }

}
