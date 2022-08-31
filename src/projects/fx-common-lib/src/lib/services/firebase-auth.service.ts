import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {first, lastValueFrom} from "rxjs";

/**
 * For managing authentication to Firebase.
 *
 * This is required even if we are not using Firebase Auth. We need
 * to authenticate the user so they can access the data in the
 * Firestore.
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private auth: AngularFireAuth) {}

  async signInOrRefreshSession(firebaseToken: string): Promise<boolean> {
    const existingToken = await lastValueFrom(this.auth.idToken.pipe(first()));
    if (existingToken) {
      return false;
    }

    await this.auth.signInWithCustomToken(firebaseToken);
    return true;
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }
}
