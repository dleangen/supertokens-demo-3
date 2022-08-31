import {InjectionToken} from "@angular/core";

export const APP_CONFIG = new InjectionToken<AppConfig>('')

export interface AppConfig {
  name: string;
  mountpoint: string;
  domain: string;
  isLocalhost: boolean;
  port: number | undefined;
}
