import {AfterViewInit, Component, HostListener, OnDestroy} from '@angular/core';
import * as ReactDOM from "react-dom";
import * as React from "react";
import SuperTokensUI from "./supertokens-ui";
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {InitializeSuperTokensUiService} from "../../services/initialize-supertokens-ui.service";
import {SuperTokensAuthService} from 'fx-common-lib';

@Component({
  template: `<div [id]="supertokensUiId"></div>`,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
})
export class SignInComponent implements OnDestroy, AfterViewInit {

  public supertokensUiId = "supertokens-ui";

  /**
   * There is an edge case when the screen is already showing the signin component
   * and the authentication state changes. This is to take care of that edge case.
   */
  @HostListener('document:visibilitychange', ['$event'])
  async visibilitychange() {
    if (!document.hidden) {
      const isAuthenticated = await this.auth.checkForSession();
      if (isAuthenticated) {
        this.router.navigate(['/']);
      }
    }
  }

  constructor(
    private auth: SuperTokensAuthService,
    private init: InitializeSuperTokensUiService,
    private router: Router) {}

  ngAfterViewInit(): void {
    ReactDOM.render(React.createElement(SuperTokensUI), document.getElementById(this.supertokensUiId));
  }

  ngOnDestroy(): void {
    ReactDOM.unmountComponentAtNode(document.getElementById(this.supertokensUiId) as Element);
  }
}
