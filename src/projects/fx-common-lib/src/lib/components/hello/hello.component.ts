import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, first, map, mergeMap, of, tap} from "rxjs";
import {APP_CONFIG, AppConfig} from "../../types";

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

  appName: string;

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient) {
    this.appName = config.name;
  }

  ngOnInit(): void {
    const url = 'http://localhost:5001/supertokens-demo-20220805/us-central1/test';
    const result$ = of('dummy')
      .pipe(
        delay(5000),
        mergeMap(() => this.http.get<any>(url)),
        tap((result) => console.log('ResultRRR', result)),
        map((result) => true),
        first(),
      )
      .subscribe();
  }

}
