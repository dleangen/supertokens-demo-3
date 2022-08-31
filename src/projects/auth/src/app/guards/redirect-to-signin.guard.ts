import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

/**
 * Just to make the URL surface a little "nicer" by not having to depend on
 * "strange" query parameters.
 *
 * This allows us to offer as our public URL surface these URLS:
 *  - /signinWithSocial (will redirect to the social signin)
 *  - /signinWithoutPassword (will redirect to the passwordless signin)
 */
@Injectable({
  providedIn: 'root'
})
export class RedirectToSigninGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const url = state.url;
    console.log('URL', url);
    if (url.startsWith('/signinWithSocial')) {
      this.router.navigate(['/signin']);
    } else if (url.startsWith('/signinWithoutPassword')) {
      this.router.navigate(['/signin'], {queryParams: {rid: 'passwordless'}});
    } else {
      this.router.navigate(['/not-found-404']);
    }

    return false;
  }

}
