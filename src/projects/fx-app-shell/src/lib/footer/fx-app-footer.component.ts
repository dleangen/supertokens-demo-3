import { Component, OnInit } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'lib-fx-app-footer',
  templateUrl: './fx-app-footer.component.html',
  styleUrls: ['./fx-app-footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  /**
   * We don't want to show the header on the 'signin' route.
   */
  notSigninPage = true;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.notSigninPage = !event.url.startsWith('/signin');
      }
    });
  }

}
