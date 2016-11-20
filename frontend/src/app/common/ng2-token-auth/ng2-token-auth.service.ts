import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Http} from '@angular/http';

@Injectable()
export class Ng2TokenAuthService implements CanActivate {
  private _userData;
  private _options;

  constructor(
    private _http: Http,
    private router: Router
  ) {
    this.resetUserData();
  }

  canActivate() {
    if (this.isSignedIn()) {
      return true;
    } else {
      if (this._options.signInRedirectPath) {
        this.router.navigate([this._options.signInRedirectPath]);
      }
    }
    return false;
  }

  initialize(options?: any) {
    let defaultOptions = {
      clientBaseUrl: "http://localhost:3100",
      apiBaseUrl: 'http://localhost:3100',

      signInUrl: '/auth/sign_in',
      signInRedirectPath: '/sign_in',
      signInFinalizePath: '/auth/finalize',
      windowType: "sameWindow",

      signOutUrl: '/auth/sign_out',
      signOutRedirectPath: '/sign_in',

      authProviderPaths: {
        github: '/auth/github'
      }
    };

    this._options = (<any>Object).assign(defaultOptions, options);
    this.setupUserDataFromLocalStorage();
  }

  isSignedIn(): boolean {
    if (this._userData == null){
      return false;
    }
    if (this._userData.id == null){
      return false;
    }
    return true;
  }

  getUserData(): any {
    return this._userData;
  }

  setUserData(data: any) {
    localStorage.setItem('userData', JSON.stringify(data));
    this._userData = data;
  }

  resetUserData() {
    this._userData = null;
  }

  signInOauth(provider: string, originUrl?: string, windowType?: string) {
    let signInUrl = this._options.authProviderPaths[provider];
    let _originUrl = originUrl;
    let _windowType = windowType;

    if (!_originUrl) {
      _originUrl = this._options.clientBaseUrl + this._options.signInFinalizePath;
    }
    if (!_windowType) {
      _windowType = this._options.windowType;
    }

    let url = this._options.apiBaseUrl + signInUrl + '?';
    url += 'auth_origin_url=' + _originUrl;
    url += '&omniauth_window_type=' + _windowType;
    window.location.href = url;
  }

  signInFinalize(authParams: any) {
    localStorage.setItem('accessToken', authParams.accessToken);
    localStorage.setItem('tokenType', authParams.tokenType);
    localStorage.setItem('client', authParams.client);
    localStorage.setItem('expiry', authParams.expiry);
    localStorage.setItem('config', authParams.config);
    localStorage.setItem('uid', authParams.uid);
  }

  signOut() {
    let url = this._options.apiBaseUrl + this._options.signOutUrl;
    this
      ._http
      .delete(url)
      .subscribe(
        _ => {
          localStorage.clear();
          this.resetUserData();
          this.router.navigate([this._options.signOutRedirectPath]);
        },
        _ => {
          localStorage.clear();
          this.resetUserData();
          this.router.navigate([this._options.signOutRedirectPath]);
        },
      );
  }

  getAuthDataFromLocalStorage(): any {
    let params = {
      accessToken: localStorage.getItem('accessToken'),
      tokenType: localStorage.getItem('tokenType'),
      client: localStorage.getItem('client'),
      expiry: localStorage.getItem('expiry'),
      config: localStorage.getItem('config'),
      uid: localStorage.getItem('uid'),
      userData: JSON.parse(localStorage.getItem('userData') || '{}'),
    };
    return params;
  }

  private setupUserDataFromLocalStorage() {
    this.setUserData(this.getAuthDataFromLocalStorage().userData);
  }
}
