import {localhostConfig} from "./localhost-config";
import {ConfigMap} from "./config-map";

export const superTokensConfig: ConfigMap = {
  appInfo: {
    appName: "Supertokens Demo 3",
    apiDomain: `OVERRIDE_THIS`,
    apiBasePath: '/auth',
    apiGatewayPath: '/folio-exchange/us-central1',
    websiteDomain: `OVERRIDE_THIS`,
    websiteBasePath: '/signin',
  },
};

export const superTokensLocalhostConfig: (appName: string) => ConfigMap = (appName: string) => {
  return {
    appInfo: {
      ...superTokensConfig['appInfo'],
      apiDomain: `http://localhost:${localhostConfig['api'].port}`,
      websiteDomain: `http://localhost:${localhostConfig[appName].port}`,
    },
  };
};
