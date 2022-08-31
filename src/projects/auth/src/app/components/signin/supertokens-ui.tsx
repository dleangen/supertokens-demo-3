import * as React from "react";
import * as SuperTokens from "supertokens-auth-react";

class SuperTokensUI extends React.Component<any, any> {

    override render() {
        if (SuperTokens.canHandleRoute()) {
            return SuperTokens.getRoutingComponent();
        }
        return "Route not found";
    }
}

export default SuperTokensUI;
