import {Routes} from "@angular/router";
import {IsAuthenticatedGuard, HelloComponent, NotAuthenticatedGuard, NotFound404Component} from "fx-common-lib";
import {SignedOutComponent} from "fx-app-shell";

export const APP_ROUTES: Routes  = [
  {
    path: '',
    title: 'SuperTokens Demo – Hello',
    component: HelloComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'signedOut',
    title: 'SuperTokens Demo – Signed Out',
    component: SignedOutComponent,
    canActivate: [NotAuthenticatedGuard],
  },
  {
    path: '**',
    title: 'SuperTokens Demo – Page Not Found',
    component: NotFound404Component,
  }
];
