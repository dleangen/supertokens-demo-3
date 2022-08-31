import {Injectable, OnDestroy} from '@angular/core';
import {
  BehaviorSubject,
  delay,
  distinctUntilChanged,
  mergeMap,
  of,
  repeat,
  skip,
  Subscription,
  tap
} from "rxjs";
import * as Session from "supertokens-web-js/recipe/session";
import {FirebaseAuthService} from "./firebase-auth.service";
import {AuthChangeHandlerService} from "./auth-change-handler.service";

@Injectable({
  providedIn: 'root'
})
export class SuperTokensAuthService implements OnDestroy {

  private hasSessionSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.hasSessionSubject.asObservable();
  userId$ = this.isAuthenticated$
    .pipe(
      mergeMap(hasSession => hasSession ? Session.getUserId() : of(null)),
    );

  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(
    private firebase: FirebaseAuthService,
    private change: AuthChangeHandlerService) {
    this.subscription1 = of({}).pipe(
      mergeMap(() => this.checkForSession()),
      // Only check for Session if we are not in "skipNextChangeDetection" mode.
      tap(hasSession => this.hasSessionSubject.next(hasSession)),
      delay(3000),
      repeat(),
    ).subscribe();

    this.subscription2 = this.isAuthenticated$
      .pipe(
        distinctUntilChanged(),
        // The first skipped value is the default (false) value set in the constructor.
        // The second skipped value is the initial value read when the page is loaded, so not a "change".
        // Following that, we are ready to listen to authentication changes.
        skip(2),
        tap(isAuthenticated => isAuthenticated ? this.onSignedIn() : this.onSignedOut() ),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  async checkForSession(): Promise<boolean> {
    return Session.doesSessionExist();
  }

  async signOut(): Promise<void> {
    await Session.signOut();
    await this.firebase.signOut();
    this.hasSessionSubject.next(false);
  }

  private async onSignedIn(): Promise<void> {
    const token = (await Session.getAccessTokenPayloadSecurely()).firebaseToken;
    // Don't need to await this: run in parallel
    await this.firebase.signInOrRefreshSession(token);
    return this.change.onSignedIn();
  }

  private async onSignedOut(): Promise<void> {
    return this.change.onSignedOut();
  }
}
