import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";

/**
 * This service needs to be overridden locally.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthUrlService {

  constructor() { }

  get(): string {
    return `${environment.fx.auth.url}${environment.fx.auth.signin}`;
  }
}
