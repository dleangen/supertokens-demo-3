import {Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AppShellModule} from "fx-app-shell";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AppShellModule,
    RouterModule,
  ],
})
export class AppComponent {}
