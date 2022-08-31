import {Routes} from "@angular/router";
import {SignInComponent} from "./components/signin/signin.component";
import {RedirectToSigninGuard} from "./guards/redirect-to-signin.guard";
import {RedirectToGuard} from "./guards/redirect-to.guard";
import {HelloComponent, IsAuthenticatedGuard, NotFound404Component} from "fx-common-lib";

export const APP_ROUTES: Routes  = [
  /**
   * The first two routes are ust to make the URL surface a little "nicer" by not
   * having to depend on "strange" query parameters.
   *
   * This allows us to offer as our public URL surface these URLS:
   *  - /signinWithSocial (will redirect to the social signin)
   *  - /signinWithoutPassword (will redirect to the passwordless signin)
   *
   * Because we rely on query parameters, it uses the RedirectToSigninGuard
   * instead of the more simple "redirectTo" parameter already available in the
   * routes configuration.
   */
  {
    path: 'signinWithSocial',
    component: SignInComponent,
    canActivate: [RedirectToSigninGuard],
  },
  {
    path: 'signinWithoutPassword',
    component: SignInComponent,
    canActivate: [RedirectToSigninGuard],
  },
  /**
   * This is just the regular signin component.
   */
  {
    path: 'signin',
    title: 'SuperTokens Demo – Sign In',
    canActivate: [RedirectToGuard],
    children: [
      {
        path: '**',
        component: SignInComponent,
      },
    ],
  },
  {
    path: '',
    title: 'SuperTokens Demo – Hello',
    component: HelloComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: '**',
    title: 'SuperTokens Demo – Page Not Found',
    component: NotFound404Component,
  }
];
