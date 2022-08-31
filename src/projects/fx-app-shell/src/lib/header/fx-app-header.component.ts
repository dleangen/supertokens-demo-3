import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {NavigationStart, Router} from "@angular/router";
import {SuperTokensAuthService} from "fx-common-lib";

@Component({
  selector: 'lib-fx-app-header',
  templateUrl: './fx-app-header.component.html',
  styleUrls: ['./fx-app-header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;
  notAuthenticated$: Observable<boolean>;

  /**
   * We don't want to show the header on the 'auth' route.
   */
  notSigninPage = true;

  constructor(
    private auth: SuperTokensAuthService,
    private router: Router) {
    auth.checkForSession();
    this.isAuthenticated$ = auth.isAuthenticated$;
    this.notAuthenticated$ = this.isAuthenticated$
      .pipe(
        map(isAuthenticated => !isAuthenticated),
      );
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.notSigninPage = !event.url.startsWith('/signin');
      }
    });
  }

  async onSignOut(): Promise<void> {
    await this.auth.signOut();
  }
}
