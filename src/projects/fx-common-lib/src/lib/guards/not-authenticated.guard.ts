import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SuperTokensAuthService} from "../services";

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedGuard implements CanActivate {

  constructor(
    private auth: SuperTokensAuthService,
    private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const doesSessionExist = await this.auth.checkForSession();
    if (doesSessionExist) {
      this.router.navigate(['/'])
    }

    return true;
  }
}
