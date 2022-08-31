import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SuperTokensAuthService} from "../services/supertokens-auth.service";
import {environment} from "../environments/environment";
import {superTokensConfig} from "../environments/supertokens-config";
import {APP_CONFIG, AppConfig} from "../types/tokens";
import {HttpUrlEncodingCodec} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  private codec = new HttpUrlEncodingCodec();

  constructor(
    private auth: SuperTokensAuthService,
    private router: Router,
    @Inject(APP_CONFIG) private config: AppConfig) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const doesSessionExist = await this.auth.checkForSession();
    if (!doesSessionExist) {
      if (this.config.name === 'auth') {
        this.router.navigate([superTokensConfig['appInfo'].websiteBasePath])
      } else {
        const params = `appName=${this.config.name}&path=${this.router.url}`;
        const queryParams = this.codec.encodeKey(params);
        const url = `${environment.fx.auth.url}?${queryParams}`;
        console.log('URL', url);
        window.location.href = url;
      }
      return false;
    }

    return doesSessionExist;
  }
}
