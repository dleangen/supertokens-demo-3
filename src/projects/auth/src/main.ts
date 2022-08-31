import {APP_INITIALIZER, enableProdMode, importProvidersFrom} from '@angular/core';
import {environment} from './environments/environment';
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {USE_EMULATOR as USE_AUTH_EMULATOR} from "@angular/fire/compat/auth";
import {USE_EMULATOR as USE_DATABASE_EMULATOR} from "@angular/fire/compat/database";
import {USE_EMULATOR as USE_FIRESTORE_EMULATOR} from "@angular/fire/compat/firestore";
import {USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from "@angular/fire/compat/functions";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getFunctions, provideFunctions} from "@angular/fire/functions";
import {RouterModule} from "@angular/router";
import {APP_ROUTES} from "./app/app.routes";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import * as SuperTokens from "supertokens-web-js";
import * as Session from "supertokens-web-js/recipe/session";
import {AppConfig, APP_CONFIG, AuthChangeHandlerService} from "fx-common-lib";
import {LocalAuthChangeHandlerService} from "./app/services/local-auth-change-handler.service";

if (environment.production) {
  enableProdMode();
}

const config: AppConfig = {
  name: environment.name,
  mountpoint: environment.mountpoint,
  domain: environment.domain,
  isLocalhost: true,
  port: 4201,
}

const initSuperTokens = () => SuperTokens.init({
  appInfo: environment.supertokens['appInfo'] as any,
  recipeList: [
    Session.init({ sessionScope: environment.domain })
  ],
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: APP_CONFIG, useValue: config },
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES), BrowserAnimationsModule, HttpClientModule),
    { provide: APP_INITIALIZER, useFactory: initSuperTokens },
    { provide: AuthChangeHandlerService, useClass: LocalAuthChangeHandlerService },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099'] : undefined },
    { provide: USE_DATABASE_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9000'] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:5001'] : undefined },
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideFunctions(() => getFunctions()),
    ),
  ],
})
