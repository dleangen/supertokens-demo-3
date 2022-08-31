import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {SuperTokensAuthService} from "fx-common-lib";

@Component({
  selector: 'lib-sign-out-button',
  template: '<button mat-raised-button (click)="signOut()" #signout><ng-content></ng-content></button>',
})
export class SignOutButtonComponent implements AfterViewInit {

  @Input()
  color: ThemePalette;

  @ViewChild('signout')
  button!: MatButton;

  constructor(private auth: SuperTokensAuthService) { }

  ngAfterViewInit(): void {
    this.button.color = this.color;
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }
}
