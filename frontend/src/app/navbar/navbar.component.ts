import { Component } from '@angular/core';
import {Ng2TokenAuthService} from '../common/ng2-token-auth/ng2-token-auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.template.html'
})

export class NavBar {
  constructor(
    private auth: Ng2TokenAuthService
  ) { }

  signOut() {
    this.auth.signOut();
  }

  userName(): string {
    let u = this.auth.getUserData();
    return u['name'] || 'UID: ' + u['uid'];
  }
}
