import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent} from './header/fx-app-header.component';
import {FooterComponent} from './footer/fx-app-footer.component';
import {SignedOutComponent} from "./signed-out/fx-app-signed-out.component";
import { SignInButtonComponent } from './sign-in-button/fx-app-sign-in-button.component';
import { SignOutButtonComponent } from './sign-out-button/fx-app-sign-out-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SignedOutComponent,
    SignInButtonComponent,
    SignOutButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SignedOutComponent,
    SignInButtonComponent,
    SignOutButtonComponent
  ],
})
export class AppShellModule { }
