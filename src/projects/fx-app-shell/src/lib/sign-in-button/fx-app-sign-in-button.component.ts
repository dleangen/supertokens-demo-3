import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {AuthUrlService} from "./auth-url.service";

@Component({
  selector: 'lib-sign-in-button',
  template: '<button mat-raised-button (click)="signIn()" #signin><ng-content></ng-content></button>',
})
export class SignInButtonComponent implements AfterViewInit {

  @Input()
  color: ThemePalette;

  @ViewChild('signin')
  button!: MatButton;

  constructor(private auth: AuthUrlService) { }

  ngAfterViewInit(): void {
    this.button.color = this.color;
  }

  signIn(): void {
    const currentUrl = window.location.href;
    const redirectTo = encodeURIComponent(currentUrl);
    const destination = `${this.auth.get()}?redirectTo=${redirectTo}`;
    console.log('Redirecting...', destination);
    window.location.href = destination;
  }

}
