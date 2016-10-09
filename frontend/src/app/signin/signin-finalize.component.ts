import {Component} from '@angular/core';
import {Ng2TokenAuthService} from '../common/ng2-token-auth/ng2-token-auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'sign-in-finalize',
  template: `
    <div class="row mt-20">
      Setup Initial Userdata...
    </div>
  `
})

export class SignInFinalizeComponent {
  private authenticateParams: any;

  constructor(
    private _auth: Ng2TokenAuthService,
    private activatedRoute: ActivatedRoute,
    private http: Http,
    private router: Router
  ) {
    this
      .activatedRoute
      .queryParams
      .subscribe(params => {
        let p = {
          accessToken: params['auth_token'],
          client: params['client_id'],
          expiry: params['expiry'],
          config: params['config'],
          uid: params['uid'],
          tokenType: 'Bearer',
        };
        this.authenticateParams = p;
      });
  }

  ngOnInit() {
    this._auth.signInFinalize(this.authenticateParams);
    this
      .http
      .get(process.env.API_URL + "/api/users/me")
      .map(v => v.json())
      .subscribe(
        r => {
          this._auth.setUserData(r);
          this.router.navigate(['dashboard']);
        }
      );
  }
}
