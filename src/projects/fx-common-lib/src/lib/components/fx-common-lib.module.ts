import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {NotFound404Component} from './404-not-found/404-not-found.component';
import {HelloComponent} from './hello/hello.component';

@NgModule({
  declarations: [
    NotFound404Component,
    HelloComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
  ],
  exports: [
    NotFound404Component,
    HelloComponent,
  ],
})
export class AppShellModule { }
