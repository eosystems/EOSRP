/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation, ViewContainerRef} from '@angular/core';

import { AppState } from './app.service';
import {Ng2TokenAuthService} from './common/ng2-token-auth/ng2-token-auth.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <main>
      <div *ngIf="isSignedIn()">
      <navbar></navbar>
      </div>
      <div class="container-fluid main-container">
        <router-outlet></router-outlet>
      </div>
    </main>
  `
})
export class App {
  private viewContainerRef: ViewContainerRef;

  constructor(
    viewContainerRef: ViewContainerRef,
    private _tokenAuth: Ng2TokenAuthService
  ) {
    this.viewContainerRef = viewContainerRef;
    this._tokenAuth.initialize({
      clientBaseUrl: process.env.CLIENT_URL,
      apiBaseUrl: process.env.API_URL,
      signInRedirectPath: '/sign_in',
      signInFinalizePath: '/auth/finalize',
      signOutUrl: '/auth/sign_out',
      authProviderPaths: {
        eveonline: '/auth/eve_online'
      }
    });
  }

  isSignedIn(): boolean {
    return this._tokenAuth.isSignedIn();
  }
}
