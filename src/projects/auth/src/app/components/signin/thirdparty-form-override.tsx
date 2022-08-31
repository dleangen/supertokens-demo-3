import React from "react";
import {ComponentOverride} from "supertokens-auth-react/lib/build/components/componentOverride/componentOverride";

const ThirdPartySignInAndUpProvidersForm_Override: ComponentOverride<any> = ({ DefaultComponent, ...props }) => {
    return (
      <div>
        <p>
          Or sign up if this is your first time here.
        </p>
        <DefaultComponent {...props} />
      </div>
  );
};

export default ThirdPartySignInAndUpProvidersForm_Override;
