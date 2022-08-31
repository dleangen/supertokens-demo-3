import { Injectable } from '@angular/core';

/**
 * This is to be used as a service interface, to be implemented with
 * something more useful and injected using the Angular DI framework.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthChangeHandlerService {

  /**
   * Action to take when the user signs in.
   */
  async onSignedIn(): Promise<void> {
    console.log('The user has signed in');
  }

  /**
   * Action to take when the user signs out.
   */
  async onSignedOut(): Promise<void> {
    console.log('The user has signed out');
  }

}
