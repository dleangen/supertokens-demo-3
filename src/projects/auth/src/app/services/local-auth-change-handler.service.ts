import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

/**
 * This is to be used as a service interface, to be implemented with
 * something more useful and injected using the Angular DI framework.
 */
@Injectable({
  providedIn: 'root'
})
export class LocalAuthChangeHandlerService {

  constructor(private router: Router) {}

  /**
   * Action to take when the user signs in.
   */
  async onSignedIn(): Promise<void> {
    console.log('The user has signed in. Redirecting to top page.');
    await this.router.navigate(['/']);
  }

  /**
   * Action to take when the user signs out.
   */
  async onSignedOut(): Promise<void> {
    console.log('The user has signed out. Redirecting to signin page.');
    await this.router.navigate(['/signin']);
  }

}
