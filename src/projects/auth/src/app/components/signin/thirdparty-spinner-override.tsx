import React from 'react';
import {ComponentOverride} from "supertokens-auth-react/lib/build/components/componentOverride/componentOverride";

/**
 * Component taken from https://github.com/icarus-sullivan/react-spinner-material
 *
 * Unfortunately, the spinner component is not working, so I am just using plain
 * text for now. Would be nice to have a Material Spinner here for consistency.
 */
const ThirdPartySignInAndUpCallbackTheme_Override: ComponentOverride<any> = ({ DefaultComponent, ...props }) => {
    return (
      <div>
        Please wait...
        {/*<span>Is this ok?</span>*/}
        {/*<DefaultComponent {...props} />*/}
      </div>
  );
};

export default ThirdPartySignInAndUpCallbackTheme_Override;
