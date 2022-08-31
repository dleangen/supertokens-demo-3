import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {ManageRedirectStateService} from "fx-common-lib";

@Injectable({
  providedIn: 'root'
})
export class RedirectToGuard implements CanActivate {

  constructor(
    private redirect: ManageRedirectStateService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {

    const redirectToParam = 'redirectTo';
    const hasRedirect = route.queryParamMap.has(redirectToParam);
    if (hasRedirect) {
      const urlTree = this.router.parseUrl(state.url);
      const redirectToValue = urlTree.queryParams[redirectToParam];
      delete urlTree.queryParams[redirectToParam];
      this.redirect.set(redirectToValue);
      return urlTree;
    }

    return true;
  }

}
