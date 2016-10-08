import {Component} from '@angular/core';
import {Ng2TokenAuthService} from '../common/ng2-token-auth/ng2-token-auth.service';

@Component({
  selector: 'sign-in',
  template: `
    <div class="row mt-20">
    <h2>EOSRP Sign-In</h2>
    <div class="text-center">
      <a (click)="signIn()" class="btn btn-primary">EveOnlineからログイン</a>
    </div>
    </div>
  `
})

export class SignInComponent {
  constructor(
    private _auth: Ng2TokenAuthService
  ) { }

  signIn() {
    this._auth.signInOauth('eveonline');
  }
}
