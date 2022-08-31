import { Injectable } from '@angular/core';

/**
 * This service needs to be overridden locally.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthUrlService {

  constructor() { }

  get(): string {
    console.error('Will redirect to www.example.com, which is surely not what you want. ' +
      'You need to override this service using the Angular DI framework and redirect to the proper location.')
    return 'https://www.example.com/signin';
  }
}
